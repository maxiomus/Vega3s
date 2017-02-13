Ext.define('Vega.view.dal.edit.Body', {
    extend: 'Ext.window.Window',

    alias: 'widget.dal-edit-body',

    //maxHeight: 560,
    minHeight: 240,
    minWidth: 360,

    monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,

    bind: {
        title: '{title}'
    },

    layout: {
        type: 'fit'
    },

    padding: '0 4 4 4',
    //bodyPadding: 10,

    initComponent: function(c){
        var me = this;

        me.items = [{
            xtype: 'multiupload',
            enableEdit: false,
            features: [{
                ftype: 'rowbody',
                //bodyBefore: true,
                getAdditionalData: function(data, idx, record, orig){

                    var tpl =  '<div class="thumbnail" style="padding-left: 1.8em; margin-right: 0.6em; float:left;">' +
                        '<img id="' + record.id + '" src="' + data.path + '" width="80" height="90" /></div>';

                    tpl += '<div style="padding: 1em;"><b>File Name: ' + data.name + " - Size: " + Ext.util.Format.fileSize(data.size) + '</b></div>';

                    record.set('F_NAME', data.name);
                    record.set('F_TYPE', data.type);
                    record.set('F_SIZE', data.size);

                    return {
                        rowBody: tpl,
                        rowBodyCls: 'my-body-class'
                    }
                }
            }],
            columns: me.buildColumns(),
            fields: me.buildFields()
        }],

        me.buttons = [{
            action: 'save',
            text: 'Save',
            formBind: true,
            //glyph: 86,
            iconCls: 'fa fa-save',
            handler: function(btn){
                me.fireEvent('saveclick', btn, me);
            }
        },{
            action: 'close',
            text: 'Close',
            //glyph: 88,
            iconCls: 'fa fa-close',
            handler: function(btn){
                btn.up('window').close();
            }
        }];

        Ext.applyIf(me, {

        });

        me.callParent();
    },

    buildColumns: function(){

        return [{
            width: 30,
            menuDisabled: true,
            align: 'center',
            sortable: false,
            renderer: function(value, metaData, record, rowIndex, colIndex, store){
                return rowIndex + 1;
            }
        },{
            text: 'ID',
            dataIndex: 'id',
            menuDisabled: true,
            fixed: true,
            width: 25,
            sortable: false,
            hidden: true
        },{
            text: 'File Name',
            dataIndex: 'name',
            sortable: false,
            menuDisabled: true,
            hidden: true
        },{
            text: 'Type',
            dataIndex: 'type',
            sortable: false,
            menuDisabled: true,
            hidden: true
        },{
            text: 'Size',
            dataIndex: 'size',
            menuDisabled: true,
            sortable: false,
            hidden: true,
            formatter: 'fileSize'
        },{
            text: 'Path',
            dataIndex: 'path',
            sortable: false,
            menuDisabled: true,
            hidden: true
        },{
            xtype: 'datecolumn',
            text: 'Created',
            dataIndex: 'F_CREATED_ON',
            menuDisabled: true,
            sortable: false,
            format: 'MM-dd-yyyy',
            hidden: true
        },{
            xtype: 'datecolumn',
            text: 'Last Modified',
            dataIndex: 'F_UPDATED_ON',
            menuDisabled: true,
            sortable: false,
            format: 'MM-dd-yyyy',
            hidden: true
        },{
            text: 'Created By',
            dataIndex: 'F_USERID',
            menuDisabled: true,
            sortable: false,
            hidden: true
        },{
            text: 'Modified By',
            dataIndex: 'F_MOD_USER_ID',
            menuDisabled: true,
            sortable: false,
            hidden: true
        },{
            text: 'Category',
            sortable: false,
            dataIndex: 'F_CATEGORY',
            hidden: false
        },{
            text: 'Body #',
            sortable: false,
            dataIndex: 'F_DESC5',
            hidden: false,
            width: 140
        },{
            text: 'Original #',
            sortable: false,
            dataIndex: 'F_OWNER',
            hidden: false,
            width: 140
        },{
            text: 'Sewing Price',
            sortable: false,
            dataIndex: 'F_DESC7',
            hidden: false
        },{
            text: 'Fabric Type',
            sortable: false,
            dataIndex: 'F_MFLAG',
            hidden: false
        },{
            text: 'Body Type',
            sortable: false,
            dataIndex: 'F_DESC2',
            hidden: false,
            flex: 2
        },{
            text: 'Description',
            sortable: false,
            dataIndex: 'F_DESC1',
            hidden: false,
            flex: 3,
            renderer: function(value, metaData, rec){
                return Ext.util.Format.nl2br(value);
            }
        },{
            xtype: 'actioncolumn',
            text: '<i class="fa fa-close fa-lg red-txt"></i>',
            //iconCls: 'fa fa-close red-txt',
            width: 50,
            align: 'center',
            menuDisabled: true,
            sortable: false,
            items: [{
                //icon: 'resources/images/shared/icon-error.png',
                //glyph: 45,
                //ui: 'default',
                iconCls: 'fa fa-remove red-txt',
                tooltip: 'Remove',
                handler: function(view, rowIndex, colIndex) {
                    //var store = grid.getStore();
                    //store.removeAt(rowIndex);
                    var field = view.grid.up('multiupload').fileUpload,
                        rec = view.getStore().getAt(rowIndex);
                    rec.drop();
                    //view.grid.getSelectionModel().deselectAll();
                    //console.log(rec.id * -1 - 1)
                    if(rec.phantom){
                        field.removeFileFromQueue(rec.id * -1 - 1)
                    }
                }
            }]
        }];
    },

    buildFields: function(){
        var memBodies = Ext.create('Ext.data.Store', {
            pageSize: 50,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        var remoteBodies = Ext.create('Ext.data.Store', {
            fields: [{
                name: 'id',
                sortType: 'asUCString'
            },{
                name: 'text',
                sortType: 'asUCString'
            }],

            pageSize: 0,
            remoteFilter: true,
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/bodies',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                load: function(s){
                    memBodies.getProxy().setData(s.getRange());
                    memBodies.load();
                }
            }
        });

        return [{
            xtype: 'combo',
            name: 'F_CATEGORY',
            fieldLabel: 'Category',
            hideEmptyLabel: false,
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            bind: {
                store: '{types}',
                value: '{components.selection.F_CATEGORY}',
                disabled: '{!components.selection}'
            },
            valueField: "text",
            displayField: "text",
            //forceSelection: true,
            //selectOnFocus: true,
            allowBlank: false,
            editable: false,
            autoLoadOnValue: true,
            queryMode: "local",
            //queryParam: "filter",
            triggerAction: 'all',
            minChars: 1,
            matchFieldWidth: true,
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                triggerClear: function(combo){

                },

                select: function(combo, rec, e){

                }
            }
        },{
            xtype: "textfield",
            name: 'F_DESC5',
            fieldLabel: "Body #",
            //hideLabel: true,
            //labelWidth: 50,
            //width: 160,
            bind: {
                value: '{components.selection.F_DESC5}',
                disabled: '{!components.selection}'
            }
        },{
            xtype: "tagfield",
            name: 'F_OWNER',
            fieldLabel: "Original #",
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            bind: {
                store: '{bodies}',
                value: '{components.selection.F_OWNER}',
                disabled: '{!components.selection}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            pageSize: 25,
            queryMode: "remote",
            queryParam: "filter",
            //triggerAction: 'last',
            //lastQuery: '',
            minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                triggerClear: function(combo){

                },
                beforequery: function(qe){
                    delete qe.combo.lastQuery;
                },
                select: function(combo, rec, e){

                }
            }
        },{
            xtype: "textfield",
            name: 'F_DESC7',
            fieldLabel: "Sewing Price",
            //hideLabel: true,
            bind: {
                value: '{components.selection.F_DESC7}',
                disabled: '{!components.selection}'
            }

        },{
            xtype: "combo",
            name: 'F_MFLAG',
            fieldLabel: "Fabric Type",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{fabricTypes}',
                value: '{components.selection.F_MFLAG}',
                disabled: '{!components.selection}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //filterPickList: true,
            //pageSize: 25,
            minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }]
        },{
            xtype: "tagfield",
            name: 'F_DESC2',
            fieldLabel: "Body Type",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{bodyTypes}',
                value: '{components.selection.F_DESC2}',
                disabled: '{!components.selection}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //filterPickList: true,
            //pageSize: 25,
            minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }]
        },{
            xtype: 'textareafield',
            name: 'F_DESC1',
            fieldLabel: 'Description',
            grow: true,
            //hidLabel: true,
            bind: {
                value: '{components.selection.F_DESC1}',
                disabled: '{!components.selection}'
            }
        }];

    }

})
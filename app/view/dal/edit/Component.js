Ext.define('Vega.view.dal.edit.Component', {
    extend: 'Ext.window.Window',

    alias: 'widget.dal-edit-component',

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

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {

        });

        me.items = [{
            xtype: 'multiupload',
            features: [{
                ftype: 'rowbody',
                //bodyBefore: true,
                getAdditionalData: function(data, idx, record, orig){
                    var themes = !Ext.isEmpty(data.F_DESC9) ? data.F_DESC9 : '',
                        colorway = !Ext.isEmpty(data.F_DESC10) ? data.F_DESC10 : ''
                        descript = !Ext.isEmpty(data.F_DESC1) ? data.F_DESC1 : '';

                    var tpl =  '<div class="thumbnail" style="padding-left: 1.8em; margin-right: 0.6em; float:left;">' +
                        '<img id="' + record.id + '" src="' + data.path + '" width="80" height="90" /></div>' +
                        '<div style="padding-top: 0.8em;">Themes: ' + themes + '</div>' +
                        '<div style="padding-left: 0.8em">Colorway: ' + colorway + '</div>' +
                        '<div style="padding-left: 0.8em;padding-top: 0.3em;">Desc: ' + descript + '</div>';

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
        }];

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
            dataIndex: 'F_NAME',
            sortable: false,
            menuDisabled: true,
            hidden: true
        },{
            text: 'Type',
            dataIndex: 'F_TYPE',
            menuDisabled: true,
            sortable: false,
            hidden: true
        },{
            text: 'Size',
            dataIndex: 'F_SIZE',
            menuDisabled: true,
            sortable: false,
            hidden: true,
            formatter: 'fileSize'
        },{
            xtype: 'datecolumn',
            text: 'Created',
            dataIndex: 'created',
            menuDisabled: true,
            sortable: false,
            format: 'MM-dd-yyyy',
            hidden: true
        },{
            xtype: 'datecolumn',
            text: 'Last Modified',
            dataIndex: 'lastmod',
            menuDisabled: true,
            sortable: false,
            format: 'MM-dd-yyyy',
            hidden: true
        },{
            text: 'Category',
            sortable: false,
            dataIndex: 'F_CATEGORY',
            hidden: false,
            width: 100
        },{
            text: ' #',
            sortable: false,
            dataIndex: 'F_DESC6',
            hidden: false,
            flex: 1
        },{
            text: 'Color',
            sortable: false,
            dataIndex: 'F_DESC3',
            hidden: false,
            flex: 1
        },{
            text: 'Type',
            sortable: false,
            dataIndex: 'F_DESC2',
            hidden: false,
            width: 140
        },{
            text: 'Side',
            sortable: false,
            dataIndex: 'F_MFLAG',
            hidden: false,
            width: 100
        },{
            text: 'Vendor',
            sortable: false,
            dataIndex: 'F_DESC4',
            hidden: false,
            flex: 1
        },{
            text: 'Account',
            sortable: false,
            dataIndex: 'F_DESC8',
            hidden: true,
            width: 140
        },{
            text: 'Theme',
            sortable: false,
            dataIndex: 'F_DESC9',
            hidden: true,
            width: 140
        },{
            text: 'Colorway',
            sortable: true,
            dataIndex: 'F_DESC10',
            hidden: true,
            width: 140
        },{
            text: 'Description',
            sortable: false,
            dataIndex: 'F_DESC1',
            hidden: true,
            flex: 1,
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
                    //console.log(gridview, rec.id * -1 - 1)
                    if(rec.phantom){
                        field.removeFileFromQueue(rec.id * -1 - 1)
                    }
                }
            }]
        }];
    },

    buildFields: function(){
        //var compStore = Ext.create('Vega.store.Components');
        /*
         compTypeStore = Ext.create('Vega.store.RawMatTypes', {
         autoLoad: true
         }),
         */

        var memComponents = Ext.create('Ext.data.Store', {
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

        var remoteComponents = Ext.create('Vega.store.Components', {
            autoLoad: true,

            listeners: {
                load: function(s){
                    memComponents.getProxy().setData(s.getRange());
                    memComponents.load();
                }
            }
        });

        var memColors = Ext.create('Ext.data.Store', {
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

        var remoteColors = Ext.create('Ext.data.Store', {
            autoLoad: true,
            remoteFilter: true,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/colors',

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                load: function(s){
                    memColors.getProxy().setData(s.getRange());
                    memColors.load();
                }
            }
        });

        Ext.apply(remoteComponents.getProxy().extraParams, {
            type: 'PRINTS'
        });

        return [{
            xtype: 'combo',
            name: 'F_CATEGORY',
            reference: 'cboCategory',
            fieldLabel: 'Category',
            //hideLabel: true,
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
            publishes: '{value}',
            //forceSelection: true,
            //selectOnFocus: true,
            editable: false,
            autoLoadOnValue: true,
            minChars: 0,
            matchFieldWidth: false,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'all',
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

                select: function(combo, rec, e){
                    var cboCode = combo.ownerCt.query('combo[name="F_DESC6"]')[0],
                        store = cboCode.getStore();

                    Ext.apply(store.getProxy().extraParams, {
                        type: rec.data.text.trim()
                    });

                    store.reload({
                        callback: function(){

                        }
                    });
                }
            }
        },{
            xtype: "memorycombo",
            name: 'F_DESC6',
            fieldLabel: "Code #",
            //hideLabel: true,
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            store: memComponents,
            bind: {
                value: '{components.selection.F_DESC6}',
                disabled: '{!components.selection}'
            },
            valueField: "label",
            displayField: "label",
            //forceSelection: false,
            selectOnFocus: true,
            selectOnTab: true,
            autoLoadOnValue: true,
            minChars: 1,
            matchFieldWidth: false,
            pageSize: 50,
            queryMode: 'local',
            //queryParam: "filter",
            //queryDelay: 800,
            //triggerAction: 'last',
            //lastQuery: '',
            /*
            tpl: [
                '<tpl for=".">',
                //'<tpl if="[xindex] == 1">',
                '<table class="cbStyles-list" width="100%">',
                //'<tr>',
                //'<th>Style</th>',
                //'<th>Description</th>',
                //'</tr>',
                //'</tpl>',
                '<tr class="x-boundlist-item">',
                '<td style="padding:0px 0px;" width="60%">{id}</td>',
                '<td width="40%">{text}</td>',
                '</tr>',
                '<tpl if="[xcount-xindex]==0">',
                '</table>',
                '</tpl>',
                '</tpl>'
            ],
            */
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
                    //delete qe.combo.lastQuery;
                },
                select: function(combo, rec, e){
                    /*
                    var cboColor = combo.ownerCt.query('combo[name="F_DESC3"]')[0],
                        store = cboColor.getStore();

                    Ext.apply(store.getProxy().extraParams, {
                        type: rec.data.text.trim(),
                        style: rec.data.id.trim()
                    });

                    store.reload({
                        callback: function(){
                            cboColor.select(store.first());
                            cboColor.fireEvent('select', combo, [store.first()]);
                        }
                    });
                    */
                }
            }
        },{
            xtype: "memorycombo",
            name: 'F_DESC3',
            fieldLabel: "Color",
            //hideLabel: true,
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            store: memColors,
            bind: {
                //store: '{compColors}',
                value: '{components.selection.F_DESC3}',
                disabled: '{!components.selection}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            pageSize: 50,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'last',
            //lastQuery: '',
            minChars: 0,
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
                    //delete qe.combo.lastQuery;
                },
                select: function(combo, record, e){
                    // Error
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC2',
            fieldLabel: "Type",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{bomtypes}',
                value: '{components.selection.F_DESC2}',
                disabled: '{!components.selection}'
            },
            valueField: "id",
            displayField: "id",
            //forceSelection: false,
            selectOnFocus: true,
            autoLoadOnValue: true,
            //pageSize: 100,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            minChars: 0,
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
                render: function(c) {
                    this.on('focus', function () {
                        this.expand();
                    });
                },
                triggerClear: function(combo){

                },
                beforequery: function(qe){
                    //if triggerAction: 'last'
                    //delete qe.combo.lastQuery;
                },
                select: function(combo, record, e){
                    // Error
                    /*
                    vendorStore.reload({
                        callback: function(){

                        }
                    });
                    */
                }
            }
        },{
            xtype: 'combo',
            name: 'F_MFLAG',
            fieldLabel: 'Side',
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{sides}',
                value: '{components.selection.F_MFLAG}',
                disabled: '{!components.selection}'
            },
            valueField: "text",
            displayField: "text",
            //forceSelection: false,
            selectOnFocus: true,
            autoLoadOnValue: true,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            minChars: 0,
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
                render: function(c) {
                    this.on('focus', function () {
                        this.expand();
                    });
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC4',
            fieldLabel: "Vendor",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{vendors}',
                value: '{components.selection.F_DESC4}',
                disabled: '{!components.selection}'

            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            autoLoadOnValue: true,
            queryMode: 'local',
            //queryParam: "filter",
            triggerAction: 'all',
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
            }]
        },{
            xtype: "combo",
            name: 'F_DESC8',
            fieldLabel: "Account",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{customers}',
                value: '{components.selection.F_DESC8}',
                disabled: '{!components.selection}'

            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            autoLoadOnValue: true,
            queryMode: 'local',
            //queryParam: "filter",
            triggerAction: 'all',
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
            }]
        },{
            xtype: "tagfield",
            name: 'F_DESC9',
            fieldLabel: "Theme",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{themes}',
                value: '{components.selection.F_DESC9}',
                disabled: '{!components.selection}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            autoLoadOnValue: true,
            queryMode: 'local',
            filterPickList: true,
            //queryParam: "filter",
            triggerAction: 'all',
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
            }]
        },{
            xtype: "tagfield",
            name: 'F_DESC10',
            fieldLabel: "Colorway",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{pantones}',
                value: '{components.selection.F_DESC10}',
                disabled: '{!components.selection}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            queryMode: 'remote',
            queryParam: "filter",
            triggerAction: 'all',
            //lastQuery: '',
            //filterPickList: true,
            //pageSize: 100,
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

});
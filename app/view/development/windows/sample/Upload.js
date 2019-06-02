/**
 * Created by tech on 10/9/2014.
 */
Ext.define('Vega.view.development.windows.sample.Upload', {
    extend: 'Ext.window.Window',

    requires: [
        'Vega.view.development.windows.sample.UploadController',
        'Vega.view.development.windows.sample.UploadModel'
    ],

    alias: 'widget.windows-sample-upload',

    controller: "windows-sample-upload",
    viewModel: {
        type: "windows-sample-upload"
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'Upload',
        iconCls: 'x-fa fa-upload',
        titlePosition: 0,
        titleAlign: 'left'
    },

    padding: '0 10 10 10',

    bind: {
        title: '{title}'
    },

    minWidth: 720,
    minHeight: 480,

    //modal: true,
    monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,

    tools: [{
        type: 'pin'
    }],

    initComponent: function() {
        var me = this;

        // Calculating the textfield height...
        var field = new Ext.form.field.Text({
                renderTo: document.body
            }), fieldHeight = field.getHeight(),
            padding = 5,
            remainingHeight;

        field.destroy();
        remainingHeight = padding + fieldHeight * 3;

        me.width = document.body.clientWidth - 660;
        me.height = document.body.clientHeight - 320;

        /*
        Ext.define('File', {
            extend: 'Ext.data.Model',
            fields: [ 'id', 'name', 'size', 'lastmod' ],
            idProperty: 'id'
        });

        var fileStore = Ext.create('Ext.data.Store', {
            model: 'File'
        });
        */

        /*
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
            fields: [{
                name: 'id',
                sortType: 'asUCString'
            },{
                name: 'text',
                sortType: 'asUCString'
            }],

            autoLoad: true,

            listeners: {
                load: function(s){
                    memComponents.getProxy().setData(remoteComponents.getRange());
                    memComponents.load();
                }
            }
        });

        Ext.apply(Ext.getStore('Components').getProxy().extraParams, {
            type: 'PRINTS'
        });
        */

        Ext.getStore('memComponents').clearFilter();
        Ext.getStore('memComponents').filter('text', 'PRINTS');

        Ext.applyIf(me, {
            items: [{
                xtype: 'form',

                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                //border: false,
                //bodyPadding: 5,
                bodyStyle: {
                    //background: '#f4f4f4'
                },

                items: [{
                    xtype: 'fieldset',
                    flex: 1,
                    title: 'File Info',
                    frame: false,
                    fieldDefaults: {
                        //margin: 1,
                        //labelAlign: 'right',
                        //labelWidth: 100,
                        //msgTarget: 'qtip'
                    },
                    items: [{
                        xtype: 'combo',
                        fieldLabel: 'Style #',
                        labelAlign: 'top',
                        name: 'style',
                        hideTrigger: true,
                        allowBlank: false,
                        readOnly: true,
                        bind: {
                            //store: '{styles}',
                            value: '{selected.style}'
                        },
                        store: 'memStyles',
                        remoteStore: 'Styles',
                        valueField: 'id',
                        displayField: 'id',
                        editable: false,
                        selectOnFocus: false,
                        selectOnTab: false,
                        //typeAhead: true,
                        //forceSelection: true,
                        minChars: 1,
                        matchFieldWidth: true,
                        queryMode: 'local',
                        //queryParam: "filter",
                        pageSize: 50,
                        listConfig: {
                            width: 320,
                            loadingText: 'Searching....',
                            emptyText: '<p style="padding-left: 5px;">No match found.</p>'

                            // Custom rendering template for each item
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        anchor: '100%'
                    },{
                        xtype: 'combo',
                        fieldLabel: 'Body #',
                        labelAlign: 'top',
                        name: 'body',
                        hideTrigger: true,
                        allowBlank: true,
                        readOnly: true,
                        bind: {
                            //store: '{bodies}',
                            value: '{selected.user2}'
                        },
                        store: 'memBodies',
                        remoteStore: 'Bodies',
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'id',
                        editable: false,
                        selectOnFocus: false,
                        selectOnTab: false,
                        //typeAhead: true,
                        //forceSelection: true,
                        minChars: 1,
                        matchFieldWidth: true,
                        pageSize: 50,
                        listConfig: {
                            width: 340,
                            loadingText: 'Searching....',
                            emptyText: '<p style="padding-left: 5px;">No match found.</p>'

                            // Custom rendering template for each item

                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        anchor: '100%'
                    },{
                        xtype: "combo",
                        fieldLabel: 'Print #',
                        labelAlign: 'top',
                        name: 'print',
                        hideTrigger: true,
                        allowBlank: true,
                        readOnly: true,
                        store: 'memComponents',
                        remoteStore: 'Components',
                        bind: {
                            value: '{thePrint}'
                        },
                        valueField: 'label',
                        displayField: 'label',
                        //typeAhead: true,
                        editable: false,
                        selectOnFocus: false,
                        selectOnTab: false,
                        //forceSelection: true,
                        minChars: 1,
                        matchFieldWidth: true,
                        autoLoadOnValue: true,
                        queryMode: 'local',
                        pageSize: 50,
                        listConfig: {
                            width: 340,
                            loadingText: 'Searching....',
                            emptyText: 'No match found.'
                            // Custom rendering template for each item
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        anchor: '100%'
                    },{
                        xtype: 'textarea',
                        fieldLabel: 'Description',
                        labelAlign: 'top',
                        name: 'descript',
                        bind: {
                            value: '{components.selection.F_DESC1}'
                        },
                        anchor: '100% -180'
                    }]
                    //anchor: '100% 40%'
                },{
                    xtype: 'multiupload',
                    enableEdit: true,
                    flex: 2,

                    padding: 5,
                    features: [{
                        ftype: 'rowbody',
                        //bodyBefore: true,
                        getAdditionalData: function(data, idx, record, orig){

                            var tpl =  '<div class="thumbnail" style="padding-left: 1.8em; margin-right: 0.6em; float:left;">' +
                                '<img id="' + record.id + '" src="' + data.path + '" width="80" height="90" /></div>';

                            tpl += '<div style="padding: 1em;"><b>File Name: ' + data.name + " - Size: " + Ext.util.Format.fileSize(data.size) + '</b></div><div>' + '</div>';

                            //console.log('rowbody', data, idx)
                            //record.set('F_EXT', '.' + data.name.split('.').pop());

                            return {
                                rowBody: tpl,
                                rowBodyCls: 'my-body-class'
                            }
                        }
                    }],
                    columns: [{
                        dataIndex: 'RORDER', width: 30, align: 'center', sortable: false,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store){
                            return value;
                        }
                    },{
                        text: 'ID', dataIndex: 'id', menuDisabled: true, fixed: true, width: 50, hidden: true
                    },{
                        text: 'File Name', dataIndex: 'name', menuDisabled: true, flex: 1
                    },{
                        text: 'N41', dataIndex: 'F_BFLAG', menuDisabled: true, hidden: true
                    },{
                        text: 'F/B', dataIndex: 'F_MFLAG', menuDisabled: true, width: 105, hidden: false,
                        editor: {
                            xtype: 'combo',
                            name: 'F_MFLAG',
                            //fieldLabel: 'FACTORY',
                            hideLabel: true,
                            //editable: false,
                            forceSelection: true,
                            store: ['FRONT', 'BACK'],
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                render: function(c){
                                    var grid = c.ownerCt.editingPlugin.grid,
                                        rec = grid.getSelection()[0];

                                    if(!rec.data.F_BFLAG){
                                        //find better solution...
                                        c.triggerEl.elements[1].addCls('x-item-disabled');
                                    }
                                },
                                select: function(cb, selected){
                                    var grid = cb.ownerCt.editingPlugin.grid,
                                        rec = grid.getSelection()[0];

                                    //console.log(rec.data.F_BFLAG, rec.data.F_APPLICATION, rec.data.F_NAME)
                                    if(!rec.data.F_BFLAG && rec.data.F_APPLICATION == 'PROD' && rec.data.F_NAME){
                                        var name = rec.data.F_NAME.split('.')[0];
                                        rec.set('F_NAME', name.split('_')[0] + '_' + name.split('_')[1] + '_' + selected.data.field1.toLowerCase() + rec.data.F_EXT);
                                        console.log(rec)
                                    }
                                }
                            }
                            //triggerAction: 'all',
                        }
                    },{
                        text: 'Last Modified', dataIndex: 'lastmod', menuDisabled: true, xtype: 'datecolumn', format: 'MM-dd-yyyy', hidden: true
                    },{
                        text: 'File Type', dataIndex: 'type', menuDisabled: true, hidden: true
                    },{
                        text: 'File Size', dataIndex: 'size', menuDisabled: true, hidden: true,
                        renderer: Ext.util.Format.fileSize
                    },{
                        text: 'Description', dataIndex: 'F_DESC1', menuDisabled: true, hidden: true
                    },{
                        xtype: 'actioncolumn',
                        text: '<i class="x-fa fa-close"></i>',
                        //iconCls: 'x-fa fa-close red-txt',
                        width: 50,
                        align: 'center',
                        menuDisabled: true,
                        sortable: false,

                        items: [{
                            //icon: 'resources/images/shared/icon-error.png',
                            //glyph: 45,
                            //ui: 'default',
                            iconCls: 'x-fa fa-remove red-txt',
                            tooltip: 'Remove',
                            style: {
                                color: 'red'
                            },
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
                    }]

                    //anchor: '100% 60%'
                }],

                buttons: [{
                    action: 'save',
                    text: 'Save',
                    formBind: true,
                    //glyph: 86,
                    iconCls: 'x-fa fa-save',
                    handler: function(btn){
                        me.fireEvent('saveclick', btn, me);
                    }
                },{
                    action: 'close',
                    text: 'Close',
                    //glyph: 88,
                    iconCls: 'x-fa fa-close',
                    handler: function(btn){
                        me.close();
                    }
                }]
            }]
        });

        me.callParent(arguments);

    }
})



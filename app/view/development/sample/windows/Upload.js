/**
 * Created by tech on 10/9/2014.
 */
Ext.define('Vega.view.development.sample.windows.Upload', {
    extend: 'Ext.window.Window',

    requires: [
        'Vega.view.development.sample.windows.UploadController',
        'Vega.view.development.sample.windows.UploadModel'
    ],

    alias: 'widget.sample-windows-upload',

    controller: "sample-windows-upload",
    viewModel: {
        type: "sample-windows-upload"
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'Upload',
        iconCls: 'fa fa-upload',
        titlePosition: 0,
        titleAlign: 'left'
    },

    padding: '0 10 10 10',

    bind: {
        title: '{title}'
    },

    minHeight: 400,
    minWidth: 720,

    //modal: true,
    monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,

    tools: [
        {
            type: 'pin'
        }
    ],

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

        Ext.apply(remoteComponents.getProxy().extraParams, {
            type: 'PRINTS'
        });

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
                        xtype: 'memorycombo',
                        fieldLabel: 'Style #',
                        labelAlign: 'top',
                        name: 'style',
                        hideTrigger: true,
                        allowBlank: false,
                        readOnly: true,
                        bind: {
                            //store: '{styles}',
                            value: '{theSample.style}'
                        },
                        store: 'memStyles',
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
                        listeners: {
                            triggerClear: function(combo){

                            }
                        },
                        anchor: '100%'
                    },{
                        xtype: 'memorycombo',
                        fieldLabel: 'Body #',
                        labelAlign: 'top',
                        name: 'body',
                        hideTrigger: true,
                        allowBlank: true,
                        readOnly: true,
                        bind: {
                            //store: '{bodies}',
                            value: '{theSample.user2}'
                        },
                        store: 'memBodies',
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
                        xtype: "memorycombo",
                        fieldLabel: 'Print #',
                        labelAlign: 'top',
                        name: 'print',
                        hideTrigger: true,
                        allowBlank: true,
                        readOnly: true,
                        store: memComponents,
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
                    }],
                    anchor: '100% 40%'
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

                            tpl += '<div style="padding: 1em;"><b>File Name: ' + data.name + " - Size: " + Ext.util.Format.fileSize(data.size) + '</b></div><div>' + data.F_DESC1 + '</div>';

                            //console.log('rowbody', data, idx)
                            //record.set('F_EXT', '.' + data.name.split('.').pop());

                            return {
                                rowBody: tpl,
                                rowBodyCls: 'my-body-class'
                            }
                        }
                    }],
                    columns: [{
                        dataIndex: 'rowIndex', width: 30, align: 'center', sortable: false,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store){
                            return rowIndex + 1;
                        }
                    },{
                        text: 'ID', dataIndex: 'id', menuDisabled: true, fixed: true, width: 25, hidden: true
                    },{
                        text: 'File Name', dataIndex: 'name', menuDisabled: true, flex: 1
                    },{
                        text: 'Last Modified', dataIndex: 'lastmod', menuDisabled: true, xtype: 'datecolumn', format: 'MM-dd-yyyy', hidden: true
                    },{
                        text: 'File Type', dataIndex: 'type', menuDisabled: true, hidden: true
                    },{
                        text: 'File Size', dataIndex: 'size', menuDisabled: true,
                        renderer: Ext.util.Format.fileSize
                    },{
                        text: 'Description', dataIndex: 'F_DESC1', menuDisabled: true, hidden: true
                    },{
                        xtype: 'actioncolumn',
                        text: '',
                        iconCls: 'fa fa-close red-txt',
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
                    }],

                    anchor: '100% 60%'
                }]
            }]
        });

        me.callParent(arguments);

        /*
        var grid = this.lookupReference('components'),
            rowediting = grid.getPlugins()[0];
        rowediting.setConfig('clicksToEdit', 2);

        console.log('Upload', grid, rowediting)
        */
    }
})



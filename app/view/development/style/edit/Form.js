
Ext.define('Vega.view.development.style.edit.Form',{
    extend: 'Ext.form.Panel',

    requires: [
        'Vega.view.development.style.edit.FormController',
        'Vega.view.development.style.edit.FormModel',
        'Vega.view.development.style.edit.Cost',
        'Vega.view.development.style.edit.Detail',
        'Vega.view.development.style.edit.Request',
        'Vega.view.development.style.edit.RequestForm',
        'Vega.view.development.style.edit.TopBar',
        'Vega.view.development.style.edit.Toolbar',
        'Ext.data.proxy.Memory',
        'Ext.ux.form.field.Month',
        //'Ext.ux.toggleslide.ToggleSlide',
        'Ext.ux.view.Upload'
    ],

    alias: 'widget.style-edit-form',

    controller: 'style-edit-form',
    viewModel: {
        type: 'style-edit-form'
    },

    bind: {
        title: '{title}'
    },

    scrollable: false,
    session: true,

    style: {
        borderTop: '1px solid #cfcfcf'
    },

    layout: {
        type: 'fit'
    },

    dockedItems: [{
        xtype: 'style-edit-topbar',
        dock: 'top',
        reference: 'topbar'
    }],

    initComponent: function(){
        var me = this,
            padding = 0,
            fieldHeight = 17,
            remainingHeight = padding + fieldHeight * 3;

        Ext.applyIf(me, {
            items:[{
                //xtype: 'horizontalaccordion',
                xtype: 'tabpanel',
                //anchor: '100% 100%',
                //padding: '0 0 0 0',
                //previousTab: null,
                reference: 'editsampletabs',

                style: {
                    borderTop: '1px solid #cfcfcf'
                },

                tabPosition: 'left',
                //tabRotation: 2,
                //tabBarHeaderPosition: 0,
                //minTabWidth: 120,

                items: [{
                    tabConfig: {
                        title: 'Style Info'
                    },
                    //itemId: 'information',
                    reference: 'styleInfo',
                    scrollable: 'y',
                    layout: {
                        type: 'responsivecolumn',
                        states: {
                            /*
                            small: 800,
                            medium: 1200,
                            large: 0
                            */
                        }
                    },
                    defaultType: 'container',
                    items: [{
                        responsiveCls: 'small-100',
                        //width: '30%',
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {

                                }
                            }
                        },
                        defaultType: 'textfield',
                        defaults: {
                            constrain: true,
                            margin: '0 10 3 0',
                            labelWidth: 80
                            //selectOnTab: false
                            //minHeight: 720,
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            xtype: "combo",
                            name: 'style',
                            reference: 'style',
                            //itemId: "cboStyle",
                            fieldLabel: 'Style',
                            //fieldStyle: 'text-transform:uppercase',
                            fieldCls: 'required',
                            //labelWidth: 50,
                            //width: 160,
                            //autoSelect: false,
                            //hideTrigger: true,
                            //publishes: 'value',
                            valueField: 'id',
                            displayField: 'id',
                            bind: {
                                readOnly: '{isEdit}',
                                value: '{theSample.style}'
                            },
                            store: 'memStyles',
                            remoteStore: 'Styles',
                            matchFieldWidth: false,
                            autoLoadOnValue: true,
                            //allowBlank: false,
                            forceSelection: false,
                            selectOnFocus: true,
                            selectOnTab: false,
                            pageSize: 50,
                            //minChars: 0,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //queryDelay: 800,
                            //triggerAction: 'all',
                            lastQuery: '',
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
                            name: 'color',
                            reference: 'color',
                            fieldLabel: 'Color',
                            //fieldStyle: 'text-transform:uppercase',
                            fieldCls: 'required',
                            //hideTrigger: false,
                            //publishes: 'value',
                            valueField: 'id',
                            displayField: 'id',
                            bind: {
                                readOnly: '{isEdit}',
                                value: '{theSample.color}'
                            },
                            store: 'memColors',
                            remoteStore: 'Colors',
                            matchFieldWidth: false,
                            autoLoadOnValue: true,
                            allowBlank: false,
                            //forceSelection: true,
                            selectOnFocus: true,
                            pageSize: 50,
                            //minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //queryDelay: 800,
                            //triggerAction: 'all',
                            //lastQuery: '',
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 340
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'textfield',
                            name: 'descript',
                            fieldLabel: 'Description',
                            allowBlank: true,
                            colspan: 2,
                            width: 520,
                            //flex: 1,
                            bind: {
                                value: '{theSample.descript}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'status',
                            fieldLabel: 'Status',
                            displayField: 'id',
                            valueField: 'id',
                            editable: false,
                            //selectOnTab: true,
                            allowBlank: false,
                            forceSelection: true,
                            //msgTarget: 'side',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            store: ['ACTIVE', 'INACTIVE', 'REQUEST'],
                            bind: {
                                value: '{theSample.status}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'season',
                            fieldLabel: 'Season',
                            fieldCls: 'required',
                            displayField: 'id',
                            valueField: 'id',
                            //selectOnFocus: true,
                            editable: false,
                            allowBlank: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{seasons}',
                                value: '{theSample.season}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'division',
                            fieldLabel: 'Division',
                            fieldCls: 'required',
                            displayField: 'id',
                            valueField: 'id',
                            //selectOnFocus: false,
                            editable: false,
                            allowBlank: false,
                            forceSelection: true,
                            queryMode: 'local',
                            //triggerAction: 'all',
                            bind: {
                                store: '{divisions}',
                                value: '{theSample.division}'
                            }
                            //store: 'division'
                        },{
                            xtype: 'combo',
                            name: 'Category',
                            fieldLabel: 'Category',
                            displayField: 'text',
                            valueField: 'text',
                            editable: false,
                            //selectOnFocus: true,
                            allowBlank: true,
                            forceSelection: true,
                            //msgTarget: 'side',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{fabrictypes}',
                                value: '{theSample.category}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'subdivision',
                            fieldLabel: 'Sub. Div.',
                            displayField: 'text',
                            valueField: 'text',
                            //selectOnFocus: true,
                            editable: false,
                            allowBlank: true,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',

                            bind: {
                                store: '{subdivisions}',
                                value: '{theSample.subdivision}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'subcategory',
                            fieldLabel: 'Sub. Cat',
                            displayField: 'text',
                            valueField: 'text',
                            //selectOnFocus: true,
                            editable: false,
                            allowBlank: true,
                            forceSelection: true,
                            //minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{subcategories}',
                                value: '{theSample.subcategory}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'sizeCat',
                            fieldLabel: 'Size Cat.',
                            //fieldCls: 'required',
                            displayField: 'text',
                            valueField: 'text',
                            //selectOnFocus: true,
                            editable: false,
                            allowBlank: true,
                            forceSelection: true,
                            //minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{sizeCats}',
                                value: '{theSample.sizeCat}'
                            }
                        },{
                            xtype: 'monthfield',
                            fieldLabel: 'Market',
                            showButtons: true,
                            format: 'Ym',
                            bind: {
                                value: '{marketValue}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'fieldset',
                            title: 'Memo',
                            colspan: 2,
                            width: 520,
                            items:[{
                                xtype: 'htmleditor',
                                name: 'memo',
                                margin: '0 0 9 0',
                                bind: {
                                    value: '{theSample.memo}'
                                }
                                //fieldLabel: 'Memo'
                            }]
                        }]
                    },{
                        responsiveCls: 'small-100',
                        //width: '30%',
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {

                                }
                            }
                        },
                        defaultType: 'textfield',
                        defaults: {
                            constrain: true,
                            margin: '0 10 3 0',
                            labelWidth: 80
                            //minHeight: 720,
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            xtype: 'combo',
                            name: 'processtype',
                            fieldLabel: 'Proc. Type',
                            displayField: 'text',
                            valueField: 'text',
                            //selectOnFocus: true,
                            editable: false,
                            allowBlank: true,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{processtypes}',
                                value: '{theSample.processtype}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'grp',
                            fieldLabel: 'Group',
                            displayField: 'text',
                            valueField: 'text',
                            //selectOnFocus: true,
                            editable: false,
                            allowBlank: true,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{groups}',
                                value: '{theSample.grp}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'fabricType',
                            fieldLabel: 'Fab. Type',
                            fieldCls: 'required',
                            displayField: 'text',
                            valueField: 'text',
                            //selectOnFocus: true,
                            editable: false,
                            allowBlank: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{fabrictypes}',
                                value: '{theSample.fabricType}'
                            }
                            //store: 'type'
                        },{
                            xtype: 'combo',
                            name: 'fabcontent',
                            fieldLabel: 'Fab. Cont',
                            fieldCls: 'required',
                            displayField: 'text',
                            valueField: 'text',
                            selectOnFocus: true,
                            editable: true,
                            allowBlank: false,
                            forceSelection: true,
                            minChars: 1,
                            matchFieldWidth: false,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{fabriccontents}',
                                value: '{theSample.fabcontent}'
                            },
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 340
                            }
                        },{
                            xtype: 'combo',
                            name: 'designer',
                            fieldLabel: 'Designer',
                            displayField: 'text',
                            valueField: 'text',
                            selectOnFocus: true,
                            editable: true,
                            allowBlank: true,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{designers}',
                                value: '{theSample.designer}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'impcat',
                            fieldLabel: 'Product Cat',
                            displayField: 'text',
                            valueField: 'text',
                            //selectOnFocus: true,
                            editable: false,
                            allowBlank: true,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            store: ['Domestic', 'Import'],
                            bind: {
                                value: '{theSample.impcat}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'user1',
                            fieldLabel: 'Customer',
                            displayField: 'id',
                            valueField: 'id',
                            selectOnFocus: true,
                            editable: true,
                            allowBlank: true,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{customers}',
                                value: '{theSample.user1}'
                            }
                        },{
                            xtype: "combo",
                            name: 'user2',
                            //itemId: "Prints",
                            fieldLabel: 'Body Ref#',
                            fieldCls: 'required',
                            //publishes: 'value',
                            valueField: 'id',
                            displayField: 'id',
                            bind: {
                                value: '{theSample.user2}'
                            },
                            store: 'memBodies',
                            matchFieldWidth: false,
                            autoLoadOnValue: true,
                            allowBlank: true,
                            //forceSelection: false,
                            //selectOnFocus: true,
                            pageSize: 50,
                            //minChars: 0,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //queryDelay: 800,
                            //triggerAction: 'all',
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 340
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'warehouse',
                            fieldLabel: 'Warehouse',
                            displayField: 'id',
                            valueField: 'id',
                            //selectOnFocus: true,
                            editable: false,
                            allowBlank: true,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{warehouses}',
                                value: '{theSample.warehouse}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'textfield',
                            name: 'binlocation',
                            fieldLabel: 'Bin Location',
                            allowBlank: true,
                            //flex: 1,
                            bind: {
                                value: '{theSample.binlocation}'
                            }
                        },{
                            xtype: 'datefield',
                            name: 'availableDate',
                            format: 'Y-m-d',
                            fieldLabel: 'Avail. Date',
                            //editable: false,
                            bind: {
                                value: '{theSample.availableDate}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },{
                            xtype: 'numberfield',
                            name: 'leadTime',
                            fieldLabel: 'Lead Time',
                            allowBlank: true,
                            minValue: 0,
                            selectOnFocus: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            //flex: 1,
                            bind: {
                                value: '{theSample.leadTime}'
                            }
                        },{
                            xtype: 'fieldset',
                            title: 'PO Memo',
                            colspan: 2,
                            width: 520,

                            items:[{
                                xtype: 'htmleditor',
                                margin: '0 0 9 0',
                                name: 'po_memo',
                                bind: {
                                    value: '{theSample.po_memo}'
                                }
                                //fieldLabel: 'Memo'
                            }]
                        }]
                    },{
                        responsiveCls: 'small-100',
                        //width: '40%',
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {

                                }
                            }
                        },
                        defaultType: 'numberfield',
                        defaults: {
                            margin: '0 10 3 0',
                            labelWidth: 80,
                            minValue: 0,
                            selectOnFocus: true,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false
                            //minHeight: 720,
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            name: 'cost',
                            fieldLabel: 'Cost',
                            bind: {
                                value: '{theSample.cost}'
                            },
                            allowBlank: true
                        },{
                            name: 'sgtRetailPrice',
                            fieldLabel: 'MSRP',
                            bind: {
                                value: '{theSample.sgtRetailPrice}'
                            },
                            allowBlank: true
                        },{
                            name: 'BomCost1',
                            fieldLabel: 'Cost S. #1',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theSample.BomCost1}'
                            },
                            allowBlank: true
                        },{
                            name: 'price1',
                            fieldLabel: 'Price 1',

                            bind: {
                                value: '{theSample.price1}'
                            },
                            allowBlank: true
                        },{
                            name: 'bomcost2',
                            fieldLabel: 'Cost S. #2',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theSample.bomcost2}'
                            },
                            allowBlank: true
                        },{
                            name: 'price2',
                            fieldLabel: 'Price 2',
                            bind: {
                                value: '{theSample.price2}'
                            },
                            allowBlank: true
                        },{
                            name: 'bomcost3',
                            fieldLabel: 'Cost S. #3',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theSample.bomcost3}'
                            },
                            allowBlank: true
                        },{
                            name: 'price3',
                            fieldLabel: 'Price 3',
                            bind: {
                                value: '{theSample.price3}'
                            },
                            allowBlank: true
                        },{
                            name: 'bomcost4',
                            fieldLabel: 'Cost S. #4',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theSample.bomcost4}'
                            },
                            allowBlank: true
                        },{
                            name: 'price 4',
                            fieldLabel: 'Price4',
                            bind: {
                                value: '{theSample.price3}'
                            },
                            allowBlank: true
                        },{
                            name: 'bomcost5',
                            fieldLabel: 'Cost S. #5',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theSample.bomcost5}'
                            },
                            allowBlank: true
                        },{
                            name: 'price5',
                            fieldLabel: 'Price 5',

                            bind: {
                                value: '{theSample.price5}'
                            },
                            allowBlank: true
                        },{
                            name: 'defaultBomCost',
                            fieldLabel: 'Def. Cost',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theSample.defaultBomCost}'
                            },
                            allowBlank: true
                        },{
                            xtype: 'textfield',
                            name: 'userName',
                            fieldLabel: 'Created By',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theSample.userName}'
                            }
                        },{
                            name: 'avgCost',
                            fieldLabel: 'Avg. Cost',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theSample.avgCost}'
                            },
                            allowBlank: true
                        },{
                            xtype: 'datefield',
                            name: 'userTime',
                            fieldLabel: 'Created On',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theSample.userTime}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },{
                            xtype: 'label'
                        },{
                            xtype: 'textfield',
                            name: 'UpdateUser',
                            fieldLabel: 'Updated By',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theSample.UpdateUser}'
                            }
                        },{
                            xtype: 'label'
                        },{
                            xtype: 'datefield',
                            name: 'UpdateTime',
                            fieldLabel: 'Updated On',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theSample.UpdateTime}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        }]
                    }]
                },{
                    xtype: 'style-edit-cost',
                    title: 'Cost Sheets',
                    reference: 'costslist',
                    bind: {
                        selection: '{current.costSheet}',
                        store: '{theSample.bomhs}'
                    },

                    listeners: {
                        //afterrender: 'onAfterRender',
                        rowdblclick: 'onGridRowDblclick',
                        select: 'onGridRowSelect'
                    }
                },{
                    title: 'Sample Photos',
                    reference: 'photos',
                    layout: 'border',

                    items: [{
                        xtype: 'style-edit-upload-toolbar',
                        region: 'north',
                        border: '0 0 1 0',
                        listeners: {
                            actremoveall: function(tb, btn){
                                var detail = tb.nextSibling('container#photo-detail'),
                                    view = detail.nextSibling('viewupload');

                                view.fileUpload.filesQueue.length = 0;
                                view.getStore().removeAll();
                            },
                            acttoggle: function(tb, btn, pressed){
                                var detail = tb.nextSibling('container#photo-detail');

                                detail.setHidden(!pressed);
                            }
                        }
                    },{
                        xtype: 'container',
                        itemId: 'photo-detail',
                        //region: 'east',
                        plugins: "responsive",
                        responsiveConfig: {
                            "wide || width >= 960":{
                                region: "east",
                                width: '26%'
                            },
                            "tall || width < 960":{
                                region: "south",
                                height: '40%'
                            }
                        },

                        style: {
                            backgroundColor : '#f5f5f5',
                            borderLeft: '1px solid #fff'
                        },

                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },

                        hidden: true,
                        scrollable: true,
                        padding: 14,

                        split: {
                            size: 1
                        },

                        viewModel: {
                            data: {
                                thePhoto: null
                            }
                        }
                    },/*{
                        xtype: 'sample-edit-photos',
                        region: 'center',
                        scrollable: "y",
                        enableTextSelection: false,
                        bind: {
                            store: '{theSample.smphs}'
                        },
                        listeners: {
                            render: function(c){
                                var toolbar = c.previousSibling('toolbar');

                                toolbar.add(c.fileUpload);
                            },
                            itemdblclick: {
                                fn: 'onPhotoItemDblClick',
                                scope: this.controller
                            }
                        }
                    },*/{
                        xtype: 'viewupload',

                        selectionModel: {
                            mode: 'multi'
                        },

                        cls: 'sample-photo-view',
                        overItemCls: "x-item-over",
                        itemSelector: "div.thumb-wrap",

                        preserveScrollOnRefresh: true,
                        deferInitialRefresh: true,
                        enableTextSelection: false,

                        scrollable: true,
                        region: 'center',
                        padding: '7 0 0 7',
                        flex: 1,

                        bind: {
                            store: '{theSample.smphs}'
                        },

                        tpl: new Ext.XTemplate(
                            '<tpl for=".">',
                            '<div class="thumb-wrap x-unselectable">',
                            //'<a class="link" href="{linkUrl}">',
                            '<span class="{F_BFLAG}"></span>',
                            '<div class="thumb">',
                                '<img src="{[this.getSrcPath(values, xcount)]}" width="174" title="{F_NAME}" />',
                                '<tpl if="this.isNotEmpty(F_MFLAG)">',
                                    '<div class="side">{F_MFLAG}</div>',
                                '</tpl>',
                            '</div>',
                            //'<span>{Title:ellipsis(11)}</span>',
                            //'</a>',
                            '</div>',
                            '</tpl>',
                            '<div class="x-clear"></div>',
                            {
                                isNotEmpty: function(F_MFLAG){
                                    return !Ext.isEmpty(F_MFLAG);
                                },
                                getSrcPath: function(a,b){
                                    var str;
                                    if(a.path){
                                        str = a.path;
                                    }
                                    else {
                                        if(!Ext.isEmpty(a.F_NAME) && !Ext.isEmpty(a.F_TYPE)) {
                                            //str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME.replace(/(\.[^.]+)$/, "_medium$1");
                                            str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME + '?w=174&h=232';
                                            if(a.ID < 0){
                                                str = '../' + a.F_LINK + a.F_NAME + '?w=174&h=232';
                                            }

                                        }
                                        else {
                                            str = '../' + a.F_LINK + a.F_PATH + '/' + a.F_LOCATION + a.F_EXT + '?w=174&h=232';
                                        }
                                    }

                                    return str;
                                    //return a.replace(/(\.[^.]+)$/, "_medium$1");
                                }
                            }
                        ),
                        listeners: {
                            render: function(c){
                                var toolbar = c.previousSibling('toolbar'),
                                    view = c.up('form').ownerCt;

                                toolbar.add(c.fileUpload);
                                //console.log(c.up('form').ownerCt);
                                var txt = 'RFQ';
                                if(view.routeId != 'product'){
                                    c.contextmenu.add([{
                                        text: 'Toogle for ' + txt,
                                        iconCls: 'x-fa fa-check-square-o',
                                        handler: function(item, e){
                                            Ext.each(c.getSelection(), function(rec, idx, self){
                                                rec.set('F_BFLAG', !rec.data.F_BFLAG);
                                            });

                                        }
                                    }]);
                                }



                            },
                            dropped: {
                                fn: 'onPhotoDropped',
                                scope: this.controller
                            },
                            itemdblclick: {
                                fn: 'onPhotoItemDblClick',
                                scope: this.controller
                            },
                            selectionchange: {
                                fn: 'onPhotoSelectionChange',
                                scope: this.controller
                            }
                        }
                    }]

                    /*
                    items: [{
                        xtype: 'dataview',

                        scrollable: "y",
                        loadMask: true,
                        loadingHeight: 300,
                        //trackOver: false,
                        enableTextSelection: false,
                        cls: "sample-photo-view",
                        overItemCls: "x-item-over",
                        itemSelector: "div.thumb-wrap",

                        padding: '7 0 0 7',

                        style: {
                            //borderTop: '1px solid #cfcfcf',
                            borderBottom: '1px solid #cfcfcf'
                        },

                        bind: {
                            store: '{theSample.smphs}'
                        },

                        tpl: new Ext.XTemplate(
                            '<tpl for=".">',
                            '<div class="thumb-wrap" id="{ID}">',
                            //'<a class="link" href="{linkUrl}">',
                            '<div class="thumb">',
                            '<img class="{F_BFLAG}" src="{[this.getSrcPath(values, xcount)]}?w=174" title="{F_DESC1}" />',
                            //'<div class="{F_BFLAG}">Rejected</div>',
                            '</div>',
                            //'<span>{Title:ellipsis(11)}</span>',
                            //'</a>',
                            '</div>',
                            '</tpl>',
                            '<div class="x-clear"></div>',
                            {
                                getSrcPath: function(a,b){
                                    var str;

                                    if(!Ext.isEmpty(a.F_NAME) && !Ext.isEmpty(a.F_TYPE)) {
                                        //str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME.replace(/(\.[^.]+)$/, "_medium$1");
                                        str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME;
                                    }
                                    else {
                                        str = '../' + a.F_LINK + a.F_PATH + '/' + a.F_LOCATION + a.F_EXT;
                                    }

                                    return str;
                                    //return a.replace(/(\.[^.]+)$/, "_medium$1");
                                }
                            }
                        )
                    }]
                    */
                },{
                    title: 'Attachments',
                    reference: 'attachment',
                    layout: 'border',

                    items: [{
                        xtype: 'style-edit-upload-toolbar',
                        region: 'north',
                        border: '0 0 1 0',
                        listeners: {
                            actremoveall: function(tb, btn){
                                var detail = tb.nextSibling('container#attach-detail'),
                                    view = detail.nextSibling('viewupload');

                                view.fileUpload.filesQueue.length = 0;
                                view.getStore().removeAll();
                            },
                            acttoggle: function(tb, btn, pressed){
                                var detail = tb.nextSibling('container#attach-detail');

                                detail.setHidden(!pressed);
                            }
                        }
                    },{
                        xtype: 'container',
                        itemId: 'attach-detail',
                        //plain: true,
                        //region: 'east',
                        plugins: "responsive",
                        responsiveConfig: {
                            "wide || width >= 960":{
                                region: "east",
                                width: '26%'
                            },
                            "tall || width < 960":{
                                region: "south",
                                height: '40%'

                            }
                        },

                        style: {
                            backgroundColor : '#f5f5f5',
                            borderLeft: '1px solid #fff'
                        },

                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },

                        scrollable: true,
                        hidden: true,
                        padding: 14,
                        split: {
                            size: 1
                        },

                        viewModel: {
                            data: {
                                theFile: null
                            }
                        }
                    },{
                        xtype: 'viewupload',

                        selectionModel: {
                            mode: 'multi'
                        },

                        cls: 'sample-attach-view',
                        overItemCls: "x-item-over",
                        itemSelector: "div.thumb-wrap",

                        preserveScrollOnRefresh: true,
                        deferInitialRefresh: true,
                        enableTextSelection: false,

                        scrollable: true,
                        region: 'center',
                        padding: 10,
                        flex: 1,

                        bind: {
                            store: '{theSample.filesInProducts}'
                        },

                        tpl: new Ext.XTemplate(
                            '<tpl for=".">',
                                '<div class="thumb-wrap x-unselectable">',
                                //'<a class="link" href="{linkUrl}">',
                                    '<div class="thumb rfq-select-{active}">',
                                        //'<img class="{F_BFLAG}" src="resources/images/default.png?w=50" title="{name}" />',
                                        '<i class="fa fa-file-{type:this.getFileType}-o fa-5x" style="padding-top:20px;"></i>',
                                        //'<div class="{F_BFLAG}">Rejected</div>',
                                        '<div class="title">{name:ellipsis(38)}</div>',
                                    '</div>',
                                //'</a>',
                                '</div>',
                            '</tpl>',
                            '<div class="x-clear"></div>',
                            {
                                getFileType: function(v){
                                    var a = ['image', 'pdf', 'excel', 'word', 'powerpoint'];

                                    for(var i = 0; i < a.length; i++){
                                        if(v.indexOf(a[i]) != -1) {
                                            return a[i];
                                        }
                                    }

                                    return 'code';
                                }
                            }
                        ),
                        listeners: {
                            render: function(c){
                                var toolbar = c.previousSibling('toolbar');

                                toolbar.add(c.fileUpload);

                                c.contextmenu.add([{
                                    text: 'Toogle for RFQ',
                                    iconCls: 'x-fa fa-check-square-o',
                                    handler: function(item, e){
                                        Ext.each(c.getSelection(), function(rec, idx, self){
                                            rec.set('active', !rec.data.active);
                                        });

                                    }
                                }]);
                            },
                            itemdblclick: {
                                fn: 'onAttachItemDblClick',
                                scope: this.controller
                            },
                            selectionchange: {
                                fn: 'onItemSelectionChange',
                                scope: this.controller
                            }
                        }
                    }]
                },{
                    xtype: 'panel',
                    reference: "reqs",
                    title: 'Request For Quote',
                    cls: 'sample-request-view',

                    // Create a session for this view
                    session: true,
                    items: [{
                        xtype: 'style-edit-request',

                        bind: {
                            store: '{theSample.reqhs}',
                            selection: '{current.quote}'
                        },

                        listeners: {
                            itemdblclick: 'onItemDblClick'
                        }
                    }]

                }],

                listeners: {
                    tabchange: 'onTabChange'
                }
            }]
        });

        me.callParent(arguments);
    }
});

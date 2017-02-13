
Ext.define('Vega.view.development.sample.edit.Form',{
    extend: 'Ext.form.Panel',

    requires: [
        'Vega.view.development.sample.edit.FormController',
        'Vega.view.development.sample.edit.FormModel',
        'Vega.view.development.sample.edit.Detail',
        'Ext.container.ButtonGroup',
        'Ext.data.proxy.Memory',
        'Ext.ux.form.field.MemoryCombo'
    ],

    alias: 'widget.sample-edit-form',

    controller: 'sample-edit-form',
    viewModel: {
        type: 'sample-edit-form'
    },

    bind: {
        title: '{title}'
    },

    session: true,

    trackResetOnLoad: true,
    scrollable: 'y',

    layout: {
        type: 'fit'
    },

    minWidth: 1028,
    //bodyPadding: 5,

    listeners: {
        //afterrender: 'onAfterRender',
        //added: 'onAdded',
        //openwin: 'onEditStyleClick',
        //opentna: 'onGridWidgetClick'
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        //reference: 'topbar',
        defaults: {
            ui: 'default'
        },
        items: [{
            iconCls: 'fa fa-save',
            //reference: 'save',
            text: 'Save',
            nextStep: 'save',
            tooltip: 'Save the Data',
            bind: {

            },
            handler: 'onSave'
        },{
            iconCls: 'fa fa-close',
            text: 'Close',
            //glyph:'xf0c7@FontAwesome',
            tooltip: 'Close View',
            handler: 'onClose'
        },'-', {
            xtype: 'buttongroup',
            reference: 'groupCrud',
            margin: -8,
            padding: 0,
            hidden: true,
            items: [{
                text: 'New',
                iconCls: 'fa fa-plus-circle',
                //glyph:'xf0c7@FontAwesome',
                tooltip: 'Add Material',
                reference: 'add',
                //ui: 'default',
                handler: 'onAddMaterialClick'
            },{
                text: 'Copy',
                iconCls: 'fa fa-copy',
                tooltip: 'Duplicate Material',
                reference: 'copy',
                bind: {
                    disabled: '{!boms.selection}'
                },
                handler: 'onCopyMaterialClick'
            },{
                text: 'Edit',
                iconCls: 'fa fa-edit',
                tooltip: 'Edit Material',
                reference: 'edit',
                bind: {
                    disabled: '{!boms.selection}'
                },
                handler: 'onEditMaterialClick'
            },{
                text: 'Delete',
                iconCls: 'fa fa-remove',
                tooltip: 'Delete Material',
                reference: 'remove',
                bind: {
                    disabled: '{!boms.selection}'
                },
                handler: 'onDeleteMaterialClick'
            }]
        },'->',{
            xtype: "cycle",
            //ui: "default",
            ui: 'bootstrap-btn-default',
            //cls:"delete-focus-bg",
            prependText: "Header: ",
            iconCls: "fa fa-chevron-left",
            //iconAlign: 'right',
            showText: true,
            reference: "positionBtn",
            changeHandler: "onPositionChange",
            //scope: this.controller,
            menu: {
                items: [{
                    text: "Top",
                    iconCls: "fa fa-chevron-up",
                    //reference: 'top',
                    itemId: "top",
                    checked: false
                },{
                    text: "Right",
                    iconCls: "fa fa-chevron-right",
                    //reference: 'right',
                    itemId: "right",
                    checked: false
                },{
                    text: "Bottom",
                    iconCls: "fa fa-chevron-down",
                    //reference: 'bottom',
                    itemId: "bottom",
                    checked: false
                },{
                    text: "Left",
                    iconCls: "fa fa-chevron-left",
                    //reference: 'left',
                    itemId: "left",
                    checked: true
                }]
            }
        }]
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
                previousTab: null,
                reference: 'tabs',
                border: false,

                defaults: {
                    //bodyPadding: '10px',
                    margin: 10,
                    scrollable: true,
                    border: false
                },
                tabPosition: 'left',
                listeners: {
                    tabchange: 'onTabChange'
                },
                items: [{
                    title: 'Style Info',
                    //itemId: 'information',
                    reference: 'styleInfo',
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
                    defaults: {

                    },
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
                            //minHeight: 720,
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            xtype: "memorycombo",
                            name: 'style',
                            reference: 'style',
                            //itemId: "cboStyle",
                            readOnly: true,
                            fieldLabel: 'Style',
                            //fieldStyle: 'text-transform:uppercase',
                            fieldCls: 'required',
                            //labelWidth: 50,
                            //width: 160,
                            //autoSelect: false,
                            hideTrigger: true,
                            //publishes: 'value',
                            valueField: 'id',
                            displayField: 'id',
                            bind: {
                                value: '{theStyle.style}'
                            },
                            store: 'memStyles',
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
                            lastQuery: '',
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 340
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {

                            }
                        },{
                            xtype: "memorycombo",
                            name: 'color',
                            reference: 'color',
                            //itemId: "cboColor",
                            readOnly: true,
                            fieldLabel: 'Color',
                            //fieldStyle: 'text-transform:uppercase',
                            fieldCls: 'required',
                            //labelWidth: 50,
                            //width: 160,
                            //autoSelect: false,
                            hideTrigger: true,
                            //publishes: 'value',
                            valueField: 'id',
                            displayField: 'id',
                            bind: {
                                value: '{theStyle.color}'
                            },
                            store: 'memStColors',
                            matchFieldWidth: false,
                            autoLoadOnValue: true,
                            allowBlank: true,
                            //forceSelection: false,
                            //selectOnFocus: true,
                            pageSize: 50,
                            minChars: 1,
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
                            }],
                            listeners: {

                            }
                        },{
                            xtype: 'textfield',
                            name: 'descript',
                            fieldLabel: 'Description',
                            allowBlank: true,
                            colspan: 2,
                            width: 520,
                            //flex: 1,
                            bind: {
                                value: '{theStyle.descript}'
                            },
                            allowBlank: true
                        },{
                            xtype: 'combo',
                            name: 'status',
                            fieldLabel: 'Status',
                            displayField: 'id',
                            valueField: 'id',
                            editable: false,
                            //selectOnFocus: true,
                            allowBlank: false,
                            forceSelection: true,
                            //msgTarget: 'side',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            store: ['ACTIVE', 'INACTIVE', 'REQUEST'],
                            bind: {
                                value: '{theStyle.status}'
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
                                value: '{theStyle.season}'
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
                                value: '{theStyle.division}'
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
                                value: '{theStyle.category}'
                            }
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
                                value: '{theStyle.subcategory}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'subcategory',
                            fieldLabel: 'Sub. Cat',
                            //displayField: 'text',
                            //valueField: 'text',
                            selectOnFocus: true,
                            //editable: false,
                            allowBlank: true,
                            //forceSelection: true,
                            //minChars: 1,
                            //queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                value: '{theStyle.subcategory}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'sizeCat',
                            colspan: 2,
                            fieldLabel: 'Size Cat.',
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
                                store: '{sizeCats}',
                                value: '{theStyle.sizeCat}'
                            }
                        },{
                            xtype: 'fieldset',
                            title: 'Memo',
                            colspan: 2,
                            width: 520,
                            items:[{
                                xtype: 'htmleditor',
                                name: 'memo',
                                bind: {
                                    value: '{theStyle.memo}'
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
                                value: '{theStyle.processtype}'
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
                                value: '{theStyle.grp}'
                            }
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
                                value: '{theStyle.fabricType}'
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
                                value: '{theStyle.fabcontent}'
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
                                value: '{theStyle.designer}'
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
                                value: '{theStyle.impcat}'
                            }
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
                                value: '{theStyle.user1}'
                            }
                        },{
                            xtype: "memorycombo",
                            name: 'user2',
                            //itemId: "Prints",
                            fieldLabel: 'Body Ref#',
                            fieldCls: 'required',
                            //publishes: 'value',
                            valueField: 'id',
                            displayField: 'id',
                            bind: {
                                value: '{theStyle.user2}'
                            },
                            store: 'memBodies',
                            matchFieldWidth: false,
                            autoLoadOnValue: true,
                            allowBlank: false,
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
                                value: '{theStyle.warehouse}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'binlocation',
                            fieldLabel: 'Bin Location',
                            allowBlank: true,
                            //flex: 1,
                            bind: {
                                value: '{theStyle.binlocation}'
                            }
                        },{
                            xtype: 'datefield',
                            name: 'availableDate',
                            fieldLabel: 'Avail. Date',
                            //editable: false,
                            bind: {
                                value: '{theStyle.availableDate}'
                            }
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
                                value: '{theStyle.leadTime}'
                            }
                        },{
                            xtype: 'fieldset',
                            title: 'PO Memo',
                            colspan: 2,
                            width: 520,
                            items:[{
                                xtype: 'htmleditor',
                                name: 'po_memo',
                                bind: {
                                    value: '{theStyle.po_memo}'
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
                                value: '{theStyle.cost}'
                            },
                            allowBlank: true
                        },{
                            name: 'sgtRetailPrice',
                            fieldLabel: 'MSRP',
                            bind: {
                                value: '{theStyle.sgtRetailPrice}'
                            },
                            allowBlank: true
                        },{
                            name: 'defaultBomCost',
                            fieldLabel: 'Def. Cost',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theStyle.defaultBomCost}'
                            },
                            allowBlank: true
                        },{
                            name: 'price1',
                            fieldLabel: 'Price 1',

                            bind: {
                                value: '{theStyle.price1}'
                            },
                            allowBlank: true
                        },{
                            name: 'BomCost1',
                            fieldLabel: 'Cost S. #1',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theStyle.BomCost1}'
                            },
                            allowBlank: true
                        },{
                            name: 'price2',
                            fieldLabel: 'Price 2',

                            bind: {
                                value: '{theStyle.price2}'
                            },
                            allowBlank: true
                        },{
                            name: 'bomcost2',
                            fieldLabel: 'Cost S. #2',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theStyle.bomcost2}'
                            },
                            allowBlank: true
                        },{
                            name: 'price3',
                            fieldLabel: 'Price 3',

                            bind: {
                                value: '{theStyle.price3}'
                            },
                            allowBlank: true
                        },{
                            name: 'bomcost3',
                            fieldLabel: 'Cost S. #3',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theStyle.bomcost3}'
                            },
                            allowBlank: true
                        },{
                            name: 'price 4',
                            fieldLabel: 'Price4',

                            bind: {
                                value: '{theStyle.price3}'
                            },
                            allowBlank: true
                        },{
                            xtype: 'textfield',
                            name: 'userName',
                            fieldLabel: 'Created By',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theStyle.userName}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'UpdateUser',
                            fieldLabel: 'Updated By',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theStyle.UpdateUser}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            name: 'userTime',
                            fieldLabel: 'Created On',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theStyle.userTime}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },
                        {
                            xtype: 'datefield',
                            name: 'UpdateTime',
                            fieldLabel: 'Updated On',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theStyle.UpdateTime}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        }]
                    }]
                },{
                    xtype: 'sample-edit-detail',
                    reference: 'boms',
                    //session: true,
                    title: 'Materials',
                    bind: {
                        store: '{theStyle.boms}'
                    }
                }]
            }]
        });

        me.callParent(arguments);


        //var grid = me.lookupReference('details');
        //me.relayEvents(grid, ['openwin', 'opentna']);
    }
});

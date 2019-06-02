
Ext.define('Vega.view.development.style.edit.Detail',{
    extend: 'Ext.form.Panel',

    requires: [
        'Vega.view.development.style.edit.DetailController',
        'Vega.view.development.style.edit.DetailModel',
        'Vega.view.development.style.edit.Material',
        'Vega.view.development.style.edit.Labor'
    ],

    controller: 'style-edit-detail',
    viewModel: {
        type: 'style-edit-detail'
    },

    alias: 'widget.style-edit-detail',

    //minHeight: 320,
    //trackResetOnLoad: true,
    //scrollable: 'y',
    margin: 8,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                /*
                xtype: 'tabpanel',
                //height: '100%',
                flex: 1,

                layout: {
                    type: 'fit'
                },

                style: {
                    borderLeft: '1px solid #cfcfcf'
                },

                defaults: {
                    //bodyPadding: 10,
                    //scrollable: true,
                    border: false
                },

                tabBar: {
                    defaults: {
                        //flex: 1, // if you want them to stretch all the way
                        height: 28, // set the height,
                        //padding: 6, // set the padding
                        //margin: '0 4 0 0',
                        //textAlign: 'left',
                        border: true,
                        style: {
                            border: '2px solid #ccc'
                        }
                    }
                },
                */
                xtype: 'container',

                //scrollable: 'y',
                //margin: 8,
                layout: {
                    type: "vbox",
                    align: "stretch"
                },

                flex: 1,
                padding: '0 8 0 0',

                style: {
                    borderRight: '1px solid #cfcfcf'
                },

                items: [{
                    xtype: 'style-edit-material',
                    title: 'Materials',
                    reference: 'boms',
                    //session: true,
                    flex: 1,
                    margin: '0 0 10 0',
                    iconCls: 'x-fa fa-cubes',
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        //reference: 'topbar',
                        defaults: {
                            ui: 'default'
                        },
                        items: [{
                            xtype: 'buttongroup',
                            reference: 'bomCrud',
                            margin: -8,
                            hidden: false,
                            items: [{
                                text: 'New',
                                iconCls: 'x-fa fa-plus-circle',
                                //glyph:'xf0c7@FontAwesome',
                                tooltip: 'Add Material',
                                //reference: 'add',
                                //ui: 'default',
                                handler: 'onAddMaterialClick'
                            },
                            {
                                text: 'Copy',
                                iconCls: 'x-fa fa-copy',
                                tooltip: 'Duplicate Material',
                                //reference: 'copy',
                                handler: 'onCopyMaterialClick'
                            },
                            {
                                text: 'Edit',
                                iconCls: 'x-fa fa-edit',
                                tooltip: 'Edit Material',
                                //reference: 'edit',
                                handler: 'onEditMaterialClick'
                            },
                            {
                                text: 'Delete',
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Delete Material',
                                //reference: 'remove',
                                handler: 'onDeleteMaterialClick'
                            },{
                                xtype: 'tbspacer',
                                width: 3
                            }]
                        }, '-', {
                            xtype: 'button',
                            iconCls: 'x-fa fa-external-link-square',
                            text: 'Add Labels',
                            //handler: 'onExport',
                            //scope: this.controller
                            menu: {
                                items: []
                            }
                        }]
                    }],
                    bind: {
                        store: '{theCosting.boms}'
                    }
                },{
                    xtype: 'style-edit-labor',
                    title: 'Labor',
                    reference: 'bols',
                    //session: true,
                    flex: 1,
                    iconCls: 'x-fa fa-tasks',
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        //reference: 'topbar',
                        defaults: {
                            ui: 'default'
                        },
                        items: [{
                            xtype: 'buttongroup',
                            reference: 'bolCrud',
                            margin: -8,
                            hidden: false,
                            items: [{
                                text: 'New',
                                iconCls: 'x-fa fa-plus-circle',
                                //glyph:'xf0c7@FontAwesome',
                                tooltip: 'Create New Labor',
                                //reference: 'add',
                                //ui: 'default',
                                hidden: true,
                                handler: 'onNewLaborClick'
                            },{
                                text: 'Add',
                                iconCls: 'x-fa fa-plus',
                                //glyph:'xf0c7@FontAwesome',
                                tooltip: 'Add Labor',
                                //reference: 'add',
                                //ui: 'default',
                                bind: {
                                    disabled: '{!theProcessH}'
                                },
                                handler: 'onAddLaborClick'
                            },{
                                text: 'Copy',
                                iconCls: 'x-fa fa-copy',
                                tooltip: 'Duplicate Current Labor',
                                //reference: 'copy',
                                bind: {
                                    disabled: '{!theProcessH}'
                                },
                                handler: 'onCopyLaborClick'
                            },{
                                text: 'Edit',
                                iconCls: 'x-fa fa-edit',
                                tooltip: 'Edit Labor',
                                //reference: 'edit',
                                bind: {
                                    disabled: '{!theProcessH}'
                                },
                                handler: 'onEditLaborClick'
                            },{
                                text: 'Remove',
                                iconCls: 'x-fa fa-minus red-text',
                                tooltip: 'Remove Current Labor',
                                //reference: 'remove',
                                bind: {
                                    disabled: '{!theProcessH}'
                                },
                                handler: 'onRemoveLaborClick'
                            },{
                                text: 'Delete',
                                iconCls: 'x-fa fa-minus-circle red-text',
                                tooltip: 'Delete All Labor',
                                //reference: 'remove',
                                bind: {
                                    disabled: '{!theProcessH}'
                                },
                                handler: 'onDeleteLaborAllClick'
                            },{
                                xtype: 'combo',
                                reference: 'processSelect',
                                fieldLabel: 'Process Type',
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
                                    store: '{processtypes}',
                                    value: '{theProcessH.ProcessType}',
                                    readOnly: '{theProcessH}'
                                },
                                listeners: {
                                    select: 'onProcessSelect'
                                }
                            }]
                        }]
                    }],
                    bind: {
                        store: '{theProcessH.bols}'
                    }
                }]
            },{
                xtype: "container",
                reference: "cost-head",
                /*
                 layout: {
                 type: 'responsivecolumn',
                 states: {
                 small: 800,
                 medium: 1200,
                 large: 0
                 }
                 },
                 */
                //margin: 8,
                //bodyPadding: 5,
                padding: '0 0 0 8',
                //defaultType: 'container',
                defaults: {
                    //margin: "5 0 0 0"
                },
                fieldDefaults: {
                    labelAlign: "left",
                    margin: 0
                },
                items: [{
                    //responsiveCls: 'small-100',
                    //width: '30%',
                    layout: {
                        type: 'table',
                        columns: 1,
                        tableAttrs: {
                            style: {}
                        }
                    },
                    defaultType: 'textfield',
                    defaults: {
                        constrain: true,
                        margin: '0 0 3 0',
                        labelWidth: 80
                        //minHeight: 720,
                        //padding: '10 10 0 10'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'style',
                        fieldLabel: 'Style',
                        //allowBlank: false,
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theCosting.style}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'color',
                        fieldLabel: 'Color',
                        //allowBlank: false,
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theCosting.color}'
                        }
                    },{
                        xtype: 'combo',
                        name: 'bomno',
                        reference: 'costSelect',
                        fieldLabel: 'C.S #:',
                        displayField: 'label',
                        valueField: 'label',
                        //selectOnFocus: true,
                        editable: false,
                        allowBlank: false,
                        //forceSelection: true,
                        autoLoadOnValue: true,
                        queryMode: 'local',
                        //minChars: 1,
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        bind: {
                            store: '{costsheets}',
                            value: '{theCosting.bomno}'
                        },
                        listeners: {
                            select: 'onCostSelect'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'processtype',
                        fieldLabel: 'Proc. Type',
                        allowBlank: true,
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theProcessH.ProcessType}'
                        }
                    },{
                        xtype: 'checkbox',
                        name: 'confirm_yn',
                        fieldLabel: 'Confirm',
                        //flex: 1,
                        bind: {
                            value: '{theCosting.confirm_yn}'
                        },
                        inputValue: 'Y',
                        uncheckedValue: 'null',
                        allowBlank: true
                    },{
                        xtype: 'datefield',
                        name: 'EffStartDate',
                        fieldLabel: 'E. Start Date',
                        selectOnFocus: false,
                        //editable: false,
                        bind: {
                            value: '{theCosting.EffStartDate}'
                        }
                    },{
                        xtype: 'datefield',
                        name: 'EffEndDate',
                        fieldLabel: 'E. End Date',
                        selectOnFocus: false,
                        //editable: false,
                        bind: {
                            value: '{theCosting.EffEndDate}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'createUser',
                        fieldLabel: 'Created By',
                        readOnly: true,
                        selectOnFocus: false,
                        //editable: false,
                        bind: {
                            value: '{theCosting.createUser}'
                        }
                    },{
                        xtype: 'datefield',
                        name: 'createTime',
                        fieldLabel: 'Created On',
                        readOnly: true,
                        selectOnFocus: false,
                        //editable: false,
                        format: 'Y-m-d h:i a',
                        bind: {
                            value: '{theCosting.createTime}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'updateUser',
                        fieldLabel: 'Updated By',
                        readOnly: true,
                        selectOnFocus: false,
                        //editable: false,
                        bind: {
                            value: '{theCosting.updateUser}'
                        }
                    },{
                        xtype: 'datefield',
                        name: 'updateTime',
                        fieldLabel: 'Updated On',
                        readOnly: true,
                        selectOnFocus: false,
                        //editable: false,
                        format: 'Y-m-d h:i a',
                        bind: {
                            value: '{theCosting.updateTime}'
                        }
                    }]
                },{
                    //responsiveCls: 'small-100',
                    //width: '30%',
                    layout: {
                        type: 'table',
                        columns: 1,
                        tableAttrs: {
                            style: {}
                        }
                    },
                    defaultType: 'textfield',
                    defaults: {
                        constrain: true,
                        margin: '0 0 3 0',
                        labelWidth: 80
                        //minHeight: 720,
                        //padding: '10 10 0 10'
                    },
                    items: [{
                        xtype: 'numberfield',
                        reference: 'colorCompTotal',
                        fieldLabel: 'Mats. Total',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theCosting.colorCompTotal}'
                        }
                    },{
                        xtype: 'numberfield',
                        reference: 'processtotal',
                        fieldLabel: 'Labor Total',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theCosting.processtotal}'
                        }
                    },{
                        xtype: 'numberfield',
                        reference: 'subTotal',
                        fieldLabel: 'Sub Total',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theCosting.subTotal}'
                        }
                    },{
                        xtype: 'numberfield',
                        reference: 'assoctotal',
                        fieldLabel: 'Assoc. Total',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theCosting.assoctotal}'
                        }
                    },{
                        xtype: 'numberfield',
                        name: 'total',
                        reference: 'total',
                        fieldLabel: 'C.S Total',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theCosting.total}'
                        }
                    },{
                        xtype: 'textarea',
                        name: 'bommemo',
                        emptyText: 'C.S Memo:',
                        //colspan: 2,
                        width: 255,
                        bind: {
                            value: '{theCosting.bommemo}'
                        }
                        //fieldLabel: 'Memo'
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }
});

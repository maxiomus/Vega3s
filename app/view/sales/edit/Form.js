
Ext.define("Vega.view.sales.edit.Form",{
    extend: "Ext.form.Panel",

    requires: [
        "Vega.view.sales.edit.FormController",
        "Vega.view.sales.edit.FormModel",
        'Vega.view.sales.edit.LineItem',
        'Ext.ux.layout.ResponsiveColumn',
        'Ext.ux.panel.HAccordion',
        'Ext.ux.form.CheckboxStoreGroup',
        //'Ext.ux.form.ImageUploadField',
        'Ext.ux.form.DDFileUpload',
        'Ext.ux.form.MultiImageUpload'
    ],

    alias: 'widget.sales-edit-form',

    controller: "sales-edit-form",
    viewModel: {
        type: "sales-edit-form"
    },

    session: true,
    trackResetOnLoad: true,

    layout: {
        type: 'anchor'
    },

    bodyPadding: 5,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        reference: 'topbar',
        defaults: {
            ui: 'default'
        },
        items: [{
            iconCls: 'fa fa-save',
            reference: 'save',
            text: 'Save',
            handler: 'onSave'
        },{
            iconCls: 'fa fa-close',
            text: 'Close'
        },'-',{
            iconCls: 'fa fa-plus-circle',
            reference: 'add',
            text: 'Add',
            tooltip: 'Add Style',
            hidden: true,
            handler: 'onAddStyle'
        },{
            iconCls: 'fa fa-paperclip',
            reference: 'attach',
            text: 'Attach',
            hidden: true,
            tooltip: 'Attachment'
        },'->',{
            iconCls: 'fa fa-toggle-off',
            reference: 'toggleattach',
            ui: 'bootstrap-btn-default',
            cls:"delete-focus-bg",
            tooltip: 'Toggle Attachments',
            enableToggle: true,
            toggleHandler: 'onToogleAttach'
        }]
    }],

    initComponent: function(){
        var me = this,
            padding = 0,
            fieldHeight = 17,
            remainingHeight = padding + fieldHeight * 3;

        /*var s = Ext.create('Ext.data.Store', {
            fields: ['value', 'label'],
            proxy: {
                type: 'ajax',
                url: 'data/sales.json'
            },
            autoLoad: true
        });*/

        var vm = this.getViewModel();

        Ext.applyIf(me, {
            items:[{
                xtype: 'horizontalaccordion',
                anchor: '100% 100%',
                padding: '0 0 0 0',
                reference: 'panels',
                items: [{
                    title: 'Basic Information',
                    itemId: 'information',
                    reference: 'information',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'start'
                    },
                    defaultType: 'container',
                    defaults: {
                        //flex: 1,
                        minHeight: 400,
                        padding: '10 10 0 10'
                    },
                    padding: '0 10 0 0',
                    items: [{
                        //responsiveCls: 'big-50 small-100',
                        defaultType: 'textfield',
                        defaults: {
                            width: 340,
                            labelWidth: 140
                        },
                        items: [{
                            name: 'powno',
                            fieldLabel: 'P.O #',
                            bind: {
                                value: '{header.powno}'
                            },
                            hidden: true
                        },{
                            xtype: 'combo',
                            name: 'status',
                            bind: {
                                value: '{header.status}'
                            },
                            value: 'PRE-ADVISE',
                            fieldLabel: 'STATUS',
                            displayField: 'label',
                            valueField: 'label',
                            editable: false,
                            disabled: true,
                            allowBlank: false,
                            store: 'powStatus'
                        },{
                            xtype: 'combo',
                            name: 'customer',
                            fieldLabel: 'CUSTOMER NAME',
                            displayField: 'text',
                            valueField: 'text',
                            editable: false,
                            allowBlank: false,
                            //msgTarget: 'side',
                            queryMode: 'remote',
                            triggerAction: 'all',
                            bind: {
                                value: '{header.customer}'
                            },
                            store: 'customer'
                        },{
                            xtype: 'combo',
                            name: 'division',
                            fieldLabel: 'DIVISION',
                            displayField: 'text',
                            valueField: 'text',
                            editable: false,
                            allowBlank: false,
                            queryMode: 'remote',
                            triggerAction: 'all',
                            bind: {
                                value: '{header.division}'
                            },
                            store: 'division'
                        },{
                            xtype: 'combo',
                            name: 'ordertype',
                            fieldLabel: 'ORDER TYPE',
                            displayField: 'text',
                            valueField: 'text',
                            editable: false,
                            allowBlank: false,
                            queryMode: 'remote',
                            triggerAction: 'all',
                            bind: {
                                value: '{header.ordertype}'
                            },
                            store: 'type'
                        },{
                            name: 'label',
                            fieldLabel: 'LABEL',
                            bind: {
                                value: '{header.label}'
                            },
                            allowBlank: false
                        },{
                            name: 'dept',
                            fieldLabel: 'CUSTOMER DEPT #',
                            bind: {
                                value: '{header.custdept}'
                            },
                            allowBlank: false
                        },{
                            xtype: 'radiogroup',
                            fieldLabel: 'PRETICKET',
                            defaults: {
                                name: 'preticket'
                            },
                            bind: {
                                value: '{preticketValue}'
                            },
                            items: [{
                                boxLabel: 'YES',
                                checked: true,
                                inputValue: true
                            },{
                                boxLabel: 'NO',
                                inputValue: false
                            }]
                        },{
                            xtype: 'combo',
                            name: 'pack',
                            fieldLabel: 'PACK',
                            allowBlank: false,
                            value: 'HANGING',
                            editable: false,
                            bind: {
                                value: '{header.pack}'
                            },
                            store: ['HANGING', 'FOLDING']
                        },{
                            xtype: 'radiogroup',
                            fieldLabel: 'EDI',
                            defaults: {
                                name: 'edi'
                            },
                            bind: {
                                value: '{ediValue}'
                            },
                            items: [{
                                boxLabel: 'YES',
                                checked: true,
                                inputValue: true
                            },{
                                boxLabel: 'NO',
                                inputValue: false
                            }]
                        },{
                            name: 'terms',
                            fieldLabel: 'TERMS',
                            bind: {
                                value: '{header.terms}'
                            },
                            allowBlank: false
                        },{
                            name: 'buyer',
                            fieldLabel: 'BUYER',
                            bind: {
                                value: '{header.buyer}'
                            },
                            allowBlank: false
                        },{
                            name: 'totalqty',
                            fieldLabel: 'TOTAL QTY',
                            bind: {
                                value: '{header.totalqty}'
                            },
                            allowBlank: false
                        },{
                            name: 'mainfabric',
                            bind: {
                                value: '{header.mainfabric}'
                            },
                            fieldLabel: 'FABRIC'
                        },{
                            name: 'content',
                            bind: {
                                value: '{header.content}'
                            },
                            fieldLabel: 'CONTENT'
                        },{
                            xtype: 'combo',
                            name: 'sizes',
                            fieldLabel: 'SIZES',
                            displayField: 'text',
                            valueField: 'text',
                            queryMode: 'remote',
                            triggerAction: 'all',
                            bind: {
                                value: '{header.sizes}'
                            },
                            store: 'sizeCat'
                        },{
                            name: 'ratio',
                            bind: {
                                value: '{header.ratio}'
                            },
                            fieldLabel: 'RATIO'
                        },{
                            xtype: 'datefield',
                            name: 'cxldate',
                            bind: {
                                value: '{header.cxldate}'
                            },
                            fieldLabel: 'CXL DATE'
                        },{
                            xtype: 'datefield',
                            name: 'dcdate',
                            bind: {
                                value: '{header.dcdate}'
                            },
                            fieldLabel: 'In DC'
                        }]
                    },{
                        //responsiveCls: 'big-50 small-100',
                        defaultType: 'fieldset',
                        defaults: {
                            width: 440,
                            collapsible: false,
                            style: {borderColor:'#dedede', borderStyle:'solid', borderWidth:'1px'}
                        },
                        //minWidth: 400,
                        items:[{
                            title: 'SALES',
                            items:[{
                                xtype: 'checkboxstoregroup',
                                name: 'sales',
                                bind: {
                                    value: '{salesValue}'
                                },
                                hideLabel: true,
                                columns: 3,
                                padding: '0 0 0 8',
                                store: "sales",
                                listeners:
                                {
                                    change: function(field, newValue, oldValue, eOpts)
                                    {
                                        //console.log(newValue);
                                    }
                                }
                            }]
                        },{
                            title: 'SALES CONTACT',
                            items:[{
                                xtype: 'checkboxstoregroup',
                                name: 'salescontact',
                                bind: {
                                    value: '{contactValue}'
                                },
                                hideLabel: true,
                                columns: 3,
                                padding: '0 0 0 8',
                                store: "sales"
                            }]
                        },{
                            title: 'Required Submission',
                            layout: 'anchor',
                            items: [{
                                xtype: 'checkboxstoregroup',
                                name: 'submissions',
                                bind: {
                                    value: '{submissionValue}'
                                },
                                hideLabel: true,
                                columns: 2,
                                store: 'submissions'
                            }]
                        },{
                            xtype: 'box',
                            hidden: true
                        },{
                            title: 'Special Comment',
                            items: [{
                                xtype: 'htmleditor',
                                bind: {
                                    value: '{header.comments}'
                                },
                                name: 'comments'
                            }]
                        }]
                    }]
                },{
                    title: 'Merchandise',
                    itemId: 'merchandise',
                    reference: 'merchandise',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaultType: 'container',
                    defaults: {
                        //flex: 1,
                        //minHeight: 400,
                        margin: '0 5 5 0',
                        padding: '5 0 0 5'
                    },
                    padding: 5,
                    scrollable: true,
                    /*items: [{
                        xtype: 'edit-lineitem'
                    }],*/
                    collapsed: true,
                    listeners: {
                        expand: {
                            fn: 'onMerchandExpand'
                        },
                        collapse: {
                            fn: 'onMerchandCollapse'
                        }
                    }
                },{
                    title: 'Attachments',
                    itemId: 'attachments',
                    reference: 'attachments',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    hidden: true,
                    collapsed: true,
                    items:[{
                        xtype: 'ddfileupload',
                        flex: 1,
                        margin: 5
                    }],
                    listeners: {
                        expand: {
                            fn: 'onAttachExpand'
                        },
                        collapse: {
                            fn: 'onAttachCollapse'
                        }
                    }
                }]
            }]
        });

        me.callParent(arguments);
    }
});

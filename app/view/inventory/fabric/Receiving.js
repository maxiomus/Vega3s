/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.inventory.fabric.Receiving", {
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.inventory.fabric.ReceivingController',
        'Vega.view.inventory.fabric.ReceivingModel',
        'Vega.view.inventory.fabric.panel.OrderList',
        'Vega.view.inventory.fabric.panel.ReceivingList',
        'Ext.form.field.Display',
        "Ext.ux.form.plugin.ClearTrigger"
    ],

    alias: "widget.receiving",

    controller: "receiving",
    viewModel: {
        type: "receiving"
    },

    cls: "shadow-panel",
    header: false,
    margin: '0 0 0 4',

    listeners: {

    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                title: "Fabric Receiving",
                iconCls: "x-fa fa-exchange",

                layout: {
                    type: "vbox",
                    align: "stretch"
                },

                style: {
                    borderTop: '1px solid #cfcfcf'
                },

                defaults: {
                    //margin: "5 0 0 0"
                },

                //bodyPadding: 8,
                fieldDefaults: {
                    labelAlign: "left",
                    margin: 0
                },

                dockedItems: [{
                    xtype: "toolbar",
                    reference: "topbar",
                    dock: "top",
                    items: [{
                        xtype: "textfield",
                        reference: "search",
                        itemId: "search",
                        name: "pono",
                        fieldLabel: "P.O #",
                        width: 300,
                        labelWidth: 40,
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        triggers: {
                            search: {
                                weight: 1,
                                cls: "x-form-search-trigger",
                                tooltip: "Search",
                                handler: function(a){
                                    a.fireEvent("triggersearch", this);
                                }
                            }
                        }
                    },
                    {
                        xtype: "tbspacer",
                        width: 1
                    },
                    {
                        xtype: "button",
                        ui: "default",
                        text: "Search",
                        iconCls: "x-fa fa-refresh",
                        width: 90,
                        action: "refresh",
                        listeners: {
                            click: "onSearchClicked"
                        }
                    },
                    {
                        xtype: "button",
                        ui: "default",
                        text: "Save",
                        iconCls: "x-fa fa-save",
                        width: 90,
                        action: "save",
                        listeners: {

                        }
                    },
                    "->",
                    {
                        xtype: "button",
                        ui: "default",
                        text: "Print",
                        iconCls: "x-fa fa-print",
                        width: 90,
                        action: "print",
                        listeners: {

                        }
                    }]
                }],

                items: [{
                    xtype: "form",
                    reference: "poheader",
                    layout: "anchor",
                    style: {
                        borderTop: '1px solid #cfcfcf'
                    },
                    padding: "5 0 5 0",
                    defaults: {
                        layout: {
                            type: "hbox",
                            align: "stretch"
                        },
                        anchor: "100%",
                        defaultType: "displayfield",
                        defaults: {
                            width: 160,
                            editable: false,
                            labelAlign: "left",
                            labelWidth: 75,
                            margin: "-2 0 0 5",
                            fieldStyle: "background-color: #ddd;padding: 3px;vertical-align: middle;"
                        }
                    },
                    items: [{
                        xtype: "container",
                        items: [{
                            fieldLabel: "Selection",
                            name: "cut_po"
                        },
                        {
                            fieldLabel: "Status",
                            name: "status"
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: "Cancel",
                            readOnly: true,
                            name: "cancelDate"
                        },
                        {
                            fieldLabel: "Division",
                            name: "division"
                        },
                        {
                            fieldLabel: "Vendor",
                            name: "vendor"
                        },
                        {
                            fieldLabel: "Material",
                            name: "desc_material"
                        },
                        {
                            fieldLabel: "Cuttable",
                            name: "desc_cuttable"
                        },
                        {
                            fieldLabel: "Lining",
                            name: "desc_lining"
                        },
                        {
                            fieldLabel: "Cancel Rsn",
                            name: "cancelreason"
                        }]
                    },
                    {
                        xtype: "container",
                        items: [{
                            fieldLabel: "P.O #",
                            name: "pono"
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: "P.O Date",
                            readOnly: true,
                            name: "orderDate"
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: "ETA Date",
                            readOnly: true,
                            name: "etaDate"
                        },
                        {
                            fieldLabel: "Warehouse",
                            name: "warehouse"
                        },
                        {
                            fieldLabel: "House Only",
                            inputType: "check",
                            name: "house_only"
                        },
                        {
                            fieldLabel: "Face",
                            name: "desc_face"
                        },
                        {
                            fieldLabel: "Cut Ydge",
                            name: "desc_cutydge"
                        },
                        {
                            fieldLabel: "Fusing",
                            name: "fusing"
                        }]
                    },
                    {
                        xtype: "container",
                        items: [{
                            fieldLabel: "Proc. Type",
                            name: "processType"
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: "Start Date",
                            readOnly: true,
                            name: "startDate"
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: "Ship Date",
                            readOnly: true,
                            name: "shipdate"
                        },
                        {
                            fieldLabel: "Shipvia",
                            name: "shipvia"
                        },
                        {
                            fieldLabel: "Total Price",
                            name: "totalprice"
                        },
                        {
                            fieldLabel: "C. of Origin",
                            name: "countryorigin"
                        },
                        {
                            fieldLabel: "Mark Ydge",
                            name: "desc_markydge"
                        },
                        {
                            fieldLabel: "Marker #",
                            name: "marker_no"
                        }]
                    }]
                },
                {
                    xtype: "orders-list",
                    reference: "orders-list",
                    title: "Requires",
                    height: 260,
                    border: true,
                    listeners: {
                        select: "onOrderRowSelected",
                        deselect: "onOrderRowDeselected"
                    }
                },
                {
                    xtype: "receivings-grid",
                    reference: "receivings-grid",
                    title: "Receiving",
                    flex: 1,
                    border: true
                }]
            }]
        });

        me.callParent(arguments);
    }
});

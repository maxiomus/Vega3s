/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.inventory.fabric.Allocation", {
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.inventory.fabric.AllocationController',
        'Vega.view.inventory.fabric.AllocationModel',
        "Vega.view.inventory.fabric.panel.Requirements",
        "Vega.view.inventory.fabric.panel.Detail",
        'Vega.view.inventory.fabric.panel.RollList',
        "Ext.ux.form.plugin.ClearTrigger"
    ],

    alias: "widget.allocation",
    
    controller: "allocation",
    viewModel: {
        type: "allocation"
    },

    config: {
        //activeState: null,
        //defaultActiveState: "default"
    },

    cls: "shadow-panel",
    header: false,
    margin: '0 0 0 4',

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                //xtype: "form",
                //reference: "mainform",
                title: "Fabric Allocation",
                iconCls: "x-fa fa-exchange",

                style: {
                    borderTop: '1px solid #cfcfcf'
                },

                layout: {
                    type: "vbox",
                    align: "stretch"
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
                        name: "cutno",
                        fieldLabel: "Cut #",
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
                        scale: "small",
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
                        scale: "small",
                        width: 90,
                        action: "save",
                        listeners: {
                            click: "onSaveClicked"
                        }
                    },
                    "->",
                    {
                        xtype: "button",
                        ui: "default",
                        text: "Print",
                        iconCls: "x-fa fa-print",
                        scale: "small",
                        width: 90,
                        action: "print",
                        listeners: {
                            click: "onPrintClicked"
                        }
                    }]
                }],

                items: [{
                    xtype: "fabricrequirements",
                    reference: "requirements",
                    title: "Fabric Requirements",
                    height: 240,
                    //margin: "5 0 0 0",
                    border: true,
                    style: {
                        borderTop: '1px solid #cfcfcf'
                    },
                    listeners: {
                        select: "onRowSelected",
                        deselect: "onRowDeselected"
                    }
                },
                {
                    xtype: "fabricrolldetail",
                    reference: "details",
                    title: "Roll Detail",
                    bind: {
                        store: "{rolldetails}"
                    },
                    flex: 1
                }]
            }]
        });

        me.callParent(arguments);
    }
});


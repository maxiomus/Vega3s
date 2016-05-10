
Ext.define("Vega.view.production.Schedule",{
    extend: "Vega.view.Viewer",

    requires: [
        "Vega.view.production.ScheduleController",
        "Vega.view.production.ScheduleModel",
        "Vega.view.production.Grid"
    ],

    alias: 'widget.prod-schedule',

    controller: "prod-schedule",
    viewModel: {
        type: "prod-schedule"
    },

    cls: "shadow-panel",
    header: false,
    margin: 8,

    initComponent: function(){
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Production Schedule",
                iconCls: "fa fa-server",
                tbar: [{
                    xtype: "topbar",
                    reference: "topbar"
                }],
                mainItems: [{
                    xtype: "prod-grid",
                    reference: "grid",
                    scrollable: true,
                    flex: 2,
                    listeners: {
                        select: {
                            //fn: "onSelect",
                            //scope: this.controller
                        }
                    }
                }],
                displayItems: [{
                    xtype: "display",
                    reference: "display"
                }],
                bbar: [{
                    xtype: "pagingtoolbar",
                    bind: {
                        store: "{schedules}"
                    },
                    style: {borderWidth: "0px"},
                    dock: "bottom",
                    displayInfo: true
                }]
            }]
        });

        me.callParent(arguments);

        var multiview = me.lookupReference("multiview"),
            grid = multiview.lookupReference("grid"),
            display = multiview.lookupReference("display"),
            topbar = multiview.lookupReference("topbar");

        topbar.items.last().setHidden(true);
        topbar.insert(0,
            [{
                xtype: "combo",
                width: 112,
                hideLabel: true,
                valueField: "field",
                displayField: "label",
                value: "P.O.W #",
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: "{category}"
                },
                listeners: {
                    change: "onFilterItemChange",
                    scope: this
                }
            },
            {
                xtype: "gridsearchfield",
                width: 300,
                grid: "prod-grid",
                paramName: "POW"
            }]
        );
    },

    onFilterItemChange: function(combo, j, g, l){
        var topbar = combo.up("topbar"),
            search = topbar.down("gridsearchfield");

        search.paramName = combo.getValue();
    }
});

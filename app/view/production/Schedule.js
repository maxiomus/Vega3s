
Ext.define("Vega.view.production.Schedule",{
    extend: "Vega.view.Viewer",

    requires: [
        "Vega.view.production.ScheduleController",
        "Vega.view.production.ScheduleModel",
        "Vega.view.production.Grid",
        'Ext.tip.ToolTip'
    ],

    alias: 'widget.prod-schedule',

    controller: "prod-schedule",
    viewModel: {
        type: "prod-schedule"
    },

    cls: "shadow-panel",
    header: false,
    margin: 8,

    listeners: {
        actrefresh: "onActionRefresh",
        clearall: 'onClearFilters'
    },

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
                        render: {
                            fn: 'onGridRender',
                            scope: this.controller
                        },
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


        topbar.items.items[0].setHidden(false);
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
                    scope: this.controller
                }
            },
            {
                xtype: "searchcombo",
                reference: 'searchcombo',
                width: 300,
                hidden: true,
                listeners: {
                    triggerclear: "onClearClick",
                    triggersearch: "onSearchClick",
                    scope: this.controller
                }
            },
            {
                xtype: "gridsearchfield",
                reference: 'searchfield',
                width: 300,
                grid: "prod-grid",
                paramName: "POW"
            }]
        );

        topbar.insert(15, [{
            xtype: 'button',
            iconCls: 'fa fa-external-link-square',
            text: 'Export',
            handler: function(b){
                grid.saveDocumentAs({
                    type: 'excel',
                    title: 'Production Schedule Sheet',
                    fileName: 'pss ' + Ext.Date.format(new Date(), 'Y-m-d') + '.xml'
                })
            }
        }]);

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                topbar.actRefresh
            ]
        });

        this.relayEvents(topbar, ["actrefresh", "clearall"]);
    },

    onDestroy:function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    }
});

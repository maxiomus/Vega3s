
Ext.define("Vega.view.reports.transaction.Layout",{
    extend: "Ext.panel.Panel",

    requires: [
        "Vega.view.reports.transaction.LayoutController"
    ],

    alias: 'widget.halayout',

    controller: "reports-transaction-layout",

    cls: "shadow-panel",
    border: false,
    margin: 8,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    defaultType: 'panel',
    defaults: {
        flex: 1,
        collapseDirection: 'left',
        hideCollapeTool: true,
        animCollapse: false,
        headerPosition: 'left',

        listeners: {
            render: 'onRender'
        }
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                title: 'Panel 1'
            }, {
                title: 'Panel 2',
                collapsed: true
            }, {
                title: 'Panel 3',
                collapsed: true
            }]
        });

        me.callParent(arguments);
    }
});

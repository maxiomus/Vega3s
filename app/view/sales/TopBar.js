
Ext.define('Vega.view.sales.TopBar',{
    extend: 'Vega.view.TopBar',

    alias: 'widget.sales-topbar',

    requires: [
        'Vega.view.sales.TopBarController',
        'Vega.view.sales.TopBarModel'
    ],

    controller: 'sales-topbar',
    viewModel: {
        type: 'sales-topbar'
    },

    listeners: {
        clearall: 'onClearFilters'
    },

    initComponent: function(c){
        var me = this;

        me.items = this.buildItems();

        me.callParent(arguments);

        me.actClear.setHidden(false);

        me.insert(0, [{
            xtype: "combo",
            width: 112,
            hideLabel: true,
            displayField: "label",
            valueField: "field",
            value: "powno",
            editable: false,
            queryMode: 'local',
            reference: "filterSelection",
            bind: {
                store: "{categories}"
            },
            listeners: {
                change: {
                    fn: "onFilterItemChange",
                    scope: this.controller
                }
            }
        },
        {
            xtype: "searchcombo",
            reference: 'searchcombo',
            width: 300,
            hidden: true,
            searchAt: 'sales-grid'
        },
        {
            xtype: "gridsearchfield",
            reference: 'searchfield',
            width: 300,
            grid: "sales-grid",
            paramName: "powno"
        }]);
    }
});

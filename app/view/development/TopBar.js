
Ext.define('Vega.view.development.TopBar',{
    extend: 'Vega.view.TopBar',

    alias: 'widget.development-topbar',

    requires: [
        'Vega.view.development.TopBarController',
        'Vega.view.development.TopBarModel'
    ],

    controller: 'development-topbar',
    viewModel: {
        type: 'development-topbar'
    },

    listeners: {
        clearall: 'onClearFilters'
    },

    initComponent: function(c){
        var me = this;

        me.items = this.buildItems();

        me.callParent(arguments);

        me.actClear.setHidden(false);
        me.actNew.setHidden(false);

        me.actEdit.setHidden(false);
        me.actEdit.setDisabled(true);

        me.insert(0,
            [{
                xtype: "combo",
                width: 112,
                hideLabel: true,
                valueField: "field",
                displayField: "label",
                value: "Style #",
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: "{categories}"
                },
                queryMode: 'local',
                listeners: {
                    change: {
                        fn: "onFilterItemChange",
                        scope: 'controller'
                    }
                }
            },
            {
                xtype: "searchcombo",
                reference: 'searchcombo',
                width: 300,
                hidden: true,
                searchAt: 'grid'
            },
            {
                xtype: "gridsearchfield",
                reference: 'searchfield',
                width: 300,
                grid: "grid",
                paramName: "style"
            }]
        );
    }
});

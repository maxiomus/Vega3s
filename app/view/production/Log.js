
Ext.define('Vega.view.production.Log',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.production.LogController',
        'Vega.view.production.LogModel'
    ],

    alias: 'widget.prod-log',

    controller: 'prod-log',
    viewModel: {
        type: 'prod-log'
    }
});

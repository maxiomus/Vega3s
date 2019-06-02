
Ext.define('Vega.view.settings.product.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'Vega.view.settings.product.DefaultController',
        'Vega.view.settings.product.DefaultModel',
        'Vega.view.settings.Grid',
        'Vega.view.settings.TopBar',
        'Vega.view.settings.product.Category',
        'Vega.view.settings.product.Color',
        'Vega.view.settings.product.ComponentType',
        'Vega.view.settings.product.FabricContent',
        'Vega.view.settings.product.FabricType',
        'Vega.view.settings.product.Group',
        'Vega.view.settings.product.Size',
        'Vega.view.settings.product.UOM',
        'Vega.view.settings.product.SubCategory'
    ],

    alias: 'widget.product-default',

    controller: 'product-default',
    viewModel: {
        type: 'product-default'
    }
});

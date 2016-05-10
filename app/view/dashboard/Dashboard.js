Ext.define('Vega.view.dashboard.Dashboard', {
    extend: 'Ext.container.Container',

    requires: [
        'Vega.view.dashboard.DashboardController',
        'Vega.view.dashboard.DashboardModel',
        'Vega.view.dashboard.Network',
        'Vega.view.dashboard.HDDUsage',
        'Vega.view.dashboard.Earnings',
        'Vega.view.dashboard.Sales',
        'Vega.view.dashboard.TopMovie',
        'Vega.view.dashboard.Weather',
        'Vega.view.dashboard.Todos',
        'Vega.view.dashboard.Services',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.PolarChart',
        'Ext.chart.series.Area',
        'Ext.ux.layout.ResponsiveColumn'
    ],

    id: 'dashboard',

    controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
    },

    layout: 'responsivecolumn',
    
    listeners: {
        hide: 'onHideView'
    },

    items: [
        {
            xtype: 'dashboardnetworkpanel',

            // 60% width when viewport is big enough,
            // 100% when viewport is small
            responsiveCls: 'big-60 small-100'
        },
        {
            xtype: 'dashboardhddusagepanel',
            responsiveCls: 'big-20 small-50'
        },
        {
            xtype: 'dashboardearningspanel',
            responsiveCls: 'big-20 small-50'
        },
        {
            xtype: 'dashboardsalespanel',
            responsiveCls: 'big-20 small-50'
        },
        {
            xtype: 'dashboardtopmoviepanel',
            responsiveCls: 'big-20 small-50'
        },
        {
            xtype: 'dashboardweatherpanel',
            responsiveCls: 'big-40 small-100'
        },
        {
            xtype: 'dashboardtodospanel',
            responsiveCls: 'big-60 small-100'
        },
        {
            xtype: 'dashboardservicespanel',
            responsiveCls: 'big-40 small-100'
        }
    ]
});

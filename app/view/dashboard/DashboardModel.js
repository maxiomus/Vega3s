Ext.define('Vega.view.dashboard.DashboardModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.dashboard',

    requires: [
        'Vega.model.weather.Climate',
        'Vega.model.City',
        'Vega.model.UserOption'
    ]

});

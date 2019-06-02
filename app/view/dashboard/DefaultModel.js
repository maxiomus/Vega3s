Ext.define('Vega.view.dashboard.DefaultModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.dashboard-default',

    requires: [
        'Vega.model.weather.Climate',
        'Vega.model.City',
        'Vega.model.UserOption'
    ],

    data: {
        today: new Date()
    },

    formulas: {
        tzoffset: function(get){
            var d = get('today'),
                offset = d.getTimezoneOffset();

            return offset + 60;
        }
    }

});

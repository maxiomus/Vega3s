Ext.define('Vega.view.dashboard.WeatherModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.City',
        'Vega.model.weather.Climate',
        'Ext.data.proxy.JsonP'
    ],

    alias: 'viewmodel.dashboard-weather',

    stores: {
        cities: {
            model: 'City',
            storeId: 'cities',
            proxy: {
                type: 'ajax',
                url: '/api/Cities',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                listeners: {

                }
            }
        },
        climates: {
            //model: 'weather.Climate',
            storeId: 'climates',
            //autoLoad: true,
            proxy: {
                type: 'jsonp',
                url: 'http://api.openweathermap.org/data/2.5/group?units=imperial&appid=0ed3c4c0ed7a4a22b182e748757ffd11',
                //noCache: true,
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: 'json',
                    rootProperty: 'list'
                }
            },
            listeners: {
                beforeload: 'onBeforeLoad',
                load: 'onLoad'
            }
        }
    }
});

/**
 * Created by tech on 10/13/2015.
 */
Ext.define('Vega.model.weather.Climate', {
    extend: 'Vega.model.Base',

    fields: [
        {name: 'id'},
        {name: 'name'},
        {name: 'dt'}
    ],

    proxy: {
        type: 'jsonp',
        url: 'http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=0ed3c4c0ed7a4a22b182e748757ffd11',
        //appid=bd82977b86bf27fb59a04b61b657fb6f',
        //noCache: true,
        pageParam: '',
        startParam: '',
        limitParam: '',
        reader: {
            type: 'json'
        }
    }
});

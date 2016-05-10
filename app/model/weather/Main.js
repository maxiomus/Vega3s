/**
 * Created by tech on 10/13/2015.
 */
Ext.define('Vega.model.weather.Main', {
    extend: 'Vega.model.Base',

    fields: [
        {name: 'climateId', reference: 'Climate', type: 'int'},
        {name: 'temp'},
        {name: 'pressure'},
        {name: 'humidity'},
        {name: 'temp_min'},
        {name: 'temp_max'}
    ]
});

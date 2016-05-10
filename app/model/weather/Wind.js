/**
 * Created by tech on 10/13/2015.
 */
Ext.define('Vega.model.weather.Wind', {
    extend: 'Vega.model.Base',

    fields: [
        {name: 'climateId', reference: 'Climate', type: 'int'},
        {name: 'speed'},
        {name: 'deg'}
    ]

});

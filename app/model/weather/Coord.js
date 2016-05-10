/**
 * Created by tech on 10/13/2015.
 */

Ext.define('Vega.model.weather.Coord', {
    extend: 'Vega.model.Base',

    fields: [
        {name: 'climateId', reference: 'Climate', type: 'int'},
        {name: 'lon'},
        {name: 'lat'}
    ]
});

/**
 * Created by tech on 10/13/2015.
 */
Ext.define('Vega.model.weather.Sys', {
    extend: 'Vega.model.Base',

    fields: [
        {name: 'climateId', reference: 'Climate', type: 'int'},
        {name: 'id'},
        {name: 'type'},
        {name: 'message'},
        {name: 'country'},
        {name: 'sunrise'},
        {name: 'sunset'}
    ]
});

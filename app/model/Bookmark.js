/**
 * Created by tech on 10/16/2015.
 */
Ext.define('Vega.model.Bookmark', {
    extend: 'Vega.model.Base',

    fields: [
        {name: 'BID'},
        {name: 'UserName'},
        {name: 'Title'},
        {name: 'Module'},
        {name: 'Location'},
        {name: 'Link'},
        {name: 'Description'}
    ],

    idProperty: 'BID'
})

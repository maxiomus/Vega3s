/**
 * Created by tech on 2/17/2015.
 */
Ext.define('Vega.store.Bomnos', {
    extend: 'Ext.data.Store',

    fields: ['id', 'text'],

    autoLoad: false,
    pageSize: 0,

    proxy: {
        type: 'ajax',
        url: '/api/Combos/bomnos',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
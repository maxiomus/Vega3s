Ext.define('Vega.store.Months', {
    extend: 'Ext.data.Store',
    fields: ['month'],

    data: (function(){
        var month = ["January","February","March","April","May","June","August","September","October","November","December"];

        return month;
    })()
});

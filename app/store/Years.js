Ext.define('Vega.store.Years', {
    extend: 'Ext.data.Store',
    fields: ['year'],
    data: (function(){
        var data = [],
            date = new Date(),
            thisYear = date.getFullYear();

        for(var i = thisYear - 30; i <= thisYear+1; i++){
            data.push({
                year: i
            });
        }
        return data;
    })()
});
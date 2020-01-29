Ext.define('Vega.view.company.work.DefaultController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.work-default',

    mixins: [
        'Ext.app.route.Base'
    ],

    init: function (g) {
        Ext.Ajax.request({
            url: 'resources/data/company/stores.json',
            scope: g,
            success: function(response){
                var o = {};

                try {
                    o = Ext.decode(response.responseText);
                }
                catch(e){
                    alert(e.message);
                    return;
                }

                if(!o.success){

                    // @todo error handling
                    alert("Unknow error occurs!");
                    return;
                }

                Ext.Object.each(o.stores, function(key, value, itself){
                    var store = g.getViewModel().getStore(key);
                    //console.log(store, key, value)
                    if(store && value){
                        store.loadData(value);
                    }
                });
            },
            failure: function(response){

            }
        });
    }
    
});

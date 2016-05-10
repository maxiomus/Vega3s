Ext.define('Vega.view.sales.WindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sales-window',

    init: function(){

    },

    onResize: function(win, width, height, e) {
        //console.log('onResize', width, height);
        var task = new Ext.util.DelayedTask(function() {
            win.updateLayout({defer:true});
        });
        task.delay(100);

    }
    
});

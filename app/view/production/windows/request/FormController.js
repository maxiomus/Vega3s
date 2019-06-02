Ext.define('Vega.view.production.windows.request.FormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.windows-request-form',

    init: function(){

    },

    onPrintClick: function(btn, eOpts) {
        //console.log(Ext.getBody());

        if(this.getView())
        {
            var win = this.getView();
            window.frames['innerFrame'].focus();
            window.frames['innerFrame'].print();

            this.getView().close();
        }
    }
    
});

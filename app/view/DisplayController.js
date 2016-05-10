Ext.define('Vega.view.DisplayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.display',

    mixins: [
        'Ext.app.route.Base'
    ],

    init: function(view){
        //view.updateActiveState = this.updateActiveState.bind(this);
    },

    /*updateActiveState: function (activeState) {
        var viewModel = this.getViewModel();

        //viewModel.set('company', activeState);

        this.fireEvent('changeroute', this, 'display/' + activeState);
    }*/

    bookmarkTab: function(btn) {
        this.addBookmark(this.view.active, this.view);
    },

    printTab: function(btn){

        var iframe = this.view.getComponent('contentIframe');

        if(iframe){
            var cw = iframe.getEl().dom.contentWindow;

            //console.log(iframe, cw);
            cw.print();
        }
        else{
            var innerPnl = this.view.items.items[0].ownerCt;
            console.log('printTab', innerPnl);
            innerPnl.print();
        }
    }
});
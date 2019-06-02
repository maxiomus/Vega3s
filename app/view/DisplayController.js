Ext.define('Vega.view.DisplayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.display',

    mixins: [
        'Ext.app.route.Base'
    ],

    init: function(view){
        //view.updateActiveState = this.updateActiveState.bind(this);
        //console.log('DisplayController - init', view.id)
    },

    /*updateActiveState: function (activeState) {
        var viewModel = this.getViewModel();

        //viewModel.set('company', activeState);

        this.fireEvent('changeroute', this, 'display/' + activeState);
    }*/

    beforeRender: function(c){
        //console.log('Template - beforeRender', c.id)
    },

    onClose: function(btn, e){
        var me = this,
            view = me.getView(),
            viewer = view.ownerCt;

        viewer.remove(view);
    },

    bookmarkTab: function(btn,e) {
        this.addBookmark(this.view.active, this.view);
    },

    printTab: function(btn,e){

        var iframe = this.view.getComponent('contentIframe');

        if(iframe){
            var cw = iframe.getEl().dom.contentWindow;
            //console.log(iframe, cw.document);
            cw.print();
        }
        else{
            //var innerPnl = this.view.items.items[0].ownerCt;
            //var img = innerPnl.down('image');

            var innerPnl = this.view.getComponent('innerPnl');
            //console.log(innerPnl)
            innerPnl.print();
        }
    }
});

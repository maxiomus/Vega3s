Ext.define('Vega.view.settings.DefaultController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.settings-default',

    onBreadCrumbChange: function(bc, node, prev){
        //console.log('Default', this.getView(), this.getReferences())
        if(node){
            this.redirectTo('settings/' + node.data.routeId);
            //this.navigateSettings(this.getView(), node.data.routeId);
        }
    },

    setCardView: function(){

    },

    navigateSettings: function(view, id){
        if(!id){
            //id = 'base';
        }

        var vm = view.getViewModel(),
        //vc = view.getController(),
            store = vm.get('areas'),
            item = view.lookupReference('settings-'+id),
            center = view.lookupReference('center-base'),
            navi = view.lookupReference('navigate-menu');

        if(navi.getStore() == null){
            navi.setStore(store);
        }

        var nd = store.findNode('routeId', id);
        //Breadcrumb setSelection only accept Node not Record...
        navi.setSelection(nd);

        if (!item) {
            item = Ext.widget(id, {
                reference: 'settings-' + id,
                style: {
                    borderTop: '1px solid #cfcfcf',
                    borderBottom: '1px solid #cfcfcf'
                }
            });
        }

        center.getLayout().setActiveItem(item);
    }

});


Ext.define('Vega.view.development.TopBarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.development-topbar',

    init: function(){

    },

    onFilterItemChange: function(combo, h, g, l){

        var toolbar = combo.up("toolbar"),
            m = toolbar.down("gridsearchfield"),
            n = toolbar.down("searchcombo"),
            j = combo.getValue(),
            st = '';

        switch(j){
            case "grp":
                if (st === '') {
                    st = 'groups';
                }
            case "subcategory":
                if (st === '') {
                    st = 'subcategories';
                }
            case "stone":
                if(st === ''){
                    st = 'vendors';
                }
                n.paramName = j;
                n.show();
                m.hide();
                break;
            default:
                m.paramName = j;
                m.show();
                n.hide();
        }

        var view = this.getView(),
            k = view.getViewModel().getStore(st);

        if(k != null){
            k.load();
            n.bindStore(k);
        }
    },

    onClearFilters: function(b){
        var me = this,
            searchcombo = me.lookupReference('searchcombo'),
            searchfield = me.lookupReference('searchfield');

        searchcombo.setValue('');
        searchcombo.getTrigger('clear').hide();
        searchfield.setValue('');
        searchfield.getTrigger('clear').hide();
        searchfield.grid.filters.clearFilters();
    }

});

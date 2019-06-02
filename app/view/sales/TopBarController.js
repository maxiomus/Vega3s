
Ext.define('Vega.view.sales.TopBarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sales-topbar',

    init: function(){

    },

    onFilterItemChange: function(combo, q, r, o){
        var me = this,
            m = me.lookupReference('searchfield'),
            n = me.lookupReference('searchcombo'),
            j = combo.getValue();

        switch(j){
            case "powno":
            case "comments":
            case "userId":
                m.paramName = j;
                m.show();
                n.hide();
                break;
            default:
                n.paramName = j;
                n.show();
                m.hide();
        }

        var s = this.getViewModel().getStore(j.toLowerCase());

        //console.log(j,this.getViewModel().getParent())
        if(s != null){
            s.load();
            n.bindStore(s);
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

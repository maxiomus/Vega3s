Ext.define('Vega.view.production.ScheduleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-schedule',

    init: function(c){

    },

    onGridRender: function(grid){

    },

    onFilterItemChange: function(combo, q, r, o){

        var toolbar = combo.up("toolbar"),
            m = toolbar.down("gridsearchfield"),
            n = toolbar.down("searchcombo"),
            j = combo.getValue();

        switch(j){
            case "CUSTOMER":
                n.paramName = j;
                n.show();
                m.hide();
                break;
            default:
                m.paramName = j;
                m.show();
                n.hide();
        }

        var k = this.getViewModel().getStore(j.toLowerCase());

        if(k != null){
            k.load();
            n.bindStore(k);
        }
    },

    onActionRefresh: function(t, w){
        this.getStore("schedules").reload();
    },

    onClearFilters: function(b){
        var me = this,
            topbar = me.view.lookupReference("multiview").lookupReference("topbar"),
            searchcombo = topbar.lookupReference('searchcombo'),
            searchfield = topbar.lookupReference('searchfield'),
            grid = me.view.lookupReference("multiview").lookupReference("grid");

        searchcombo.setValue('');
        searchcombo.getTrigger('clear').hide();

        searchfield.setValue('');
        searchfield.getTrigger('clear').hide();

        grid.filters.clearFilters();
    },

    onClearClick: function(g){
        var f = this.getView().down("grid"),
            h = f.getColumns();

        if(g.hasSearch){
            var e;
            Ext.each(h, function(a){
                e = a.filter;
                if(a.dataIndex===g.paramName){
                    return false;
                }
            });
            g.setValue("");
            e.setValue("");
            e.setActive(false);
            g.hasSearch = false;
            g.getTrigger("clear").hide();
            g.updateLayout();
        }
    },

    onSearchClick: function(h){
        var g = this.getView().down("grid"),
            i = g.getColumns(),
            j = h.getValue();

        if(!Ext.isEmpty(j)){
            var f;
            Ext.each(i, function(a){
                if(a.dataIndex === h.paramName){
                    f = a.filter;
                    return false;
                }
            });
            //console.log("onSearchClick", f, h.paramName);
            f.setValue(j);
            f.setActive(true);
            h.hasSearch = true;
            h.getTrigger("clear").show();
            h.updateLayout();
        }
    }

});

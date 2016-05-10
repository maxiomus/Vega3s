Ext.define("Vega.view.dal.DalController", {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: "controller.dal",

    init: function(g){
        var h = g.lookupReference("multiview"),
        l = h.getReferences(),
        j = l.topbar.lookupReference("paneselection"),
        k = l.topbar.lookupReference("viewselection"),
        i = j.getActiveItem();

        l.center.getLayout().setActiveItem(k.getValue());
    },

    initViewModel: function(b){
        this.fireEvent("viewmodelready", this, b);
    },

    onBeforeLoad: function(d, e, f){

    },

    onLoad: function(d, e, f){

    },

    onTypesRefresh: function(store){

        var multiview = this.getView().lookupReference("multiview"),
            button = multiview.down("cycle[reference=filterButton]"),
            menu = button.getMenu();

        store.each(function(rec){
            var idx = 0;
            menu.add({
                xtype: 'menucheckitem',
                iconCls: Ext.baseCSSPrefix + 'menu-item-indent-right-icon fa fa-filter',
                group: button.id,
                //itemIndex: ++idx,
                type: rec.data.id,
                //checked: idx === 0,
                text: rec.data.text,
                itemId: rec.data.id,
                checkHandler: button.checkHandler,
                scope: button
            });
        })
    },

    onCategoryLoad: function(j, f, h){
        var i = this.getViewModel(),
        g = this.lookupReference("filterSelection")
    },

    onFilterItemChange: function(combo, j, h, g){
        var toolbar = combo.up("toolbar"),
            search = toolbar.down("gridsearchfield");

        search.paramName = combo.getValue()
    },

    onSortItemChange: function(i, j, h, g){
        var l = i.up("toolbar"),
            k = l.down("combo#sortButton").getValue();

        this.getStore("dals").sort(k);
    },

    onRowDblClick: function(g, i, j, h, f){
        this.onTabOpen(null, i);
    },

    onItemDblClick: function(g, h, j, f, i){
        this.onTabOpen(null, h);
    },

    onContextmenuOpenClick: function(d, c){
        this.onTabOpen(null, d);
    },

    onContextMenuRefreshClick: function(d, c){
        d.store.load();
    },

    onContextMenuDownloadClick: function(d, c){
        this.downloadItems(d);
    },

    onContextMenuBookmarkClick: function(d, c){
        this.addBookmark(d, this.getView());
    },

    onTabOpen: function(d, c){
        this.redirectTo("dal/tab/"+c.get("ID"));
    },

    onSelect: function(t, r, o, n){
        var p = this.getView().lookupReference("multiview"),
            l = p.getReferences(),
            s = l.topbar,
            m = l.display;

        m.setActive(r);

        var k = [],
            q = s.lookupReference("viewselection");

        k[0] = "dal";
        k[1] = q.value == 0 ? "default" : q.value == 1 ? "medium" : "tiles";
        k[2] = r.get("ID");

        this.redirectTo(k.join("/"))
    },

    onItemContextMenu: function(h, j, k, g, l){
        l.stopEvent();
        var i = h.getSelectionModel();

        if(!i.isSelected(g)){
            i.select(g);
        }

        this.view.contextmenu.showAt(l.getXY());
    },
    onRefreshClick: function(b){
        this.getStore("dals").load();
    },

    onTypeChange: function(u, t){
        var me = this,
        y,
        multiview = me.getView().lookupReference("multiview"),
        refs = multiview.getReferences(),
        grid = refs.grid,
        x = grid.getPlugin("gridfilters"),
        r = grid.getColumns(),
        topbar = refs.topbar,

        w = topbar.down("multisortbutton[name=body]"),
        p = topbar.down("multisortbutton[name=print]"),
        n = topbar.down("multisortbutton[name=photo]");

        w.setVisible(t.type == "Body");
        p.setVisible(t.type == "Prints");
        n.setVisible(t.type == "Photos");

        Ext.each(r, function(a){
            y = a.filter;
            if(a.dataIndex === "F_CATEGORY"){
                return false;
            }
        });

        if(t.type == null){
            x.clearFilters(false);
        }
        else{
            y.setValue(t.type);
            y.setActive(true);
        }
    }
});
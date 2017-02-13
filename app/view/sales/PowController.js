Ext.define("Vega.view.sales.PowController", {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: "controller.pow",

    control: {
        '#': {
            viewmodelready: function(a){
                console.log(a)
            }
        }
    },

    init: function(g){
        var multiview = g.lookupReference("multiview"),
            refs = multiview.getReferences(),
            j = refs.topbar.lookupReference("paneselection"),
            k = refs.topbar.lookupReference("viewselection"),
            i = j.getActiveItem();

        refs.center.getLayout().setActiveItem(k.getValue());
    },

    initViewModel: function(b){
        this.getView().fireEvent("viewmodelready", this, b);
    },

    onBeforeLoad: function(d, e, f){

    },

    onLoad: function(store, records, successful, operation){

    },

    onBeforeAdd: function(pow, tab, idx, e){
        //console.log('ReviewController - beforeadd', tab.isXType('display'))

        if(tab.isXType('display')){

            //this.getView().relayEvents(tab, ['revise', 'accept']);
            var topbar = tab.lookupReference('topbar'),
                tvm = tab.getViewModel(),
                rec = tvm.get('thePow'),
                btnRevise = Ext.widget('button', {
                    text: 'Revise',
                    iconCls: 'fa fa-edit',
                    hidden: false,
                    scope: this,
                    handler: function(btn){
                        this.redirectTo('pow/edit/' + rec.data.powhId)
                    }
                });

            console.log('PowController', rec.data.revision, rec.data.progress)

            if(rec.data.revision != -1 && rec.data.progress != 'posted'){
                if(Vega.user.inRole('cs') || Vega.user.inRole('revise') || Vega.user.inRole('administrators')){
                    topbar.add(btnRevise);
                }
            }

        }

        if(tab.isXType('sales-edit-form')){
            var buttons = tab.getDockedItems('toolbar[dock="top"] > button');

            buttons[0].setHidden(true);
            buttons[2].setHidden(false);

        }
    },

    onSelect: function(v, record, r, p){
        //console.log('onSelect PowController');
        var m = this.getView(),
            refs = m.lookupReference("multiview").getReferences(),
            u = refs.topbar,
            q = refs.preview,
            o = refs.display;
            o.setActive(record);

        //console.log(refs);
        if(!q.hidden){
            this.loadIframe(o);
        }

        var l = [],
            s = refs.topbar.lookupReference("viewselection");

        l[0] = "pow";
        l[1] = s.value != 2 ? "default" : "tiles";
        l[2] = record.get("powhId");

        this.redirectTo(l.join("/"))
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(g)){
            i.select(g)
        }
        this.view.contextmenu.showAt(l.getXY())
    },

    onNewClick: function(b){
        //console.log("PowController", this, b);
        /*var newWin = Ext.create('Vega.view.sales.Window', {
            constrain: true,
            renderTo: this.getView().getEl(),

            hideMode: 'offsets',
            routeId: 'sales.window'
        });

        newWin.show();
        newWin.header.el.on('click', function() {
            newWin.animate({
                to: {
                    width: (newWin.getWidth() == 500) ? 700 : 500,
                    height: (newWin.getHeight() == 300) ? 400 : 300
                }
            });
        });*/
        //this.redirectTo("pow/tab/review/0");
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

    /**
     *
     * @param topbar {Ext.toolbar.Toolbar}
     * @param widget {Ext.Component}
     */
    onActionView: function(topbar, widget){
        var m = this.lookupReference("multiview"),
            g = m.lookupReference("grid"),
            s = g.getSelection()[0];

        this.onTabOpen(null, s);
    },

    onActionRefresh: function(t,w){
        //console.log(t, w)
        this.getStore("pows").reload();
    },

    onContextMenuEditClick: function(d, c){

    },

    onContextMenuBookmarkClick: function(d, c){
        this.addBookmark(d, this.getView())
    },

    onTabOpen: function(i, h){
        var j = this,
            f = j.view.lookupReference("multiview").lookupReference("tiles"),
            g = Ext.fly(f.getNode(h)).query("i", false);

        localStorage.setItem("pow-seen-"+h.data.powhId, true);
        f.addItemCls(h, "visited");
        g[0].addCls("visited");

        this.redirectTo("pow/tab/"+h.data.powhId);
    },

    onRowDblClick: function(g, i, j, h, f){
        this.onTabOpen(null, i)
    },

    onItemDblClick: function(g, h, j, f, i){
        this.onTabOpen(null, h)
    },

    onFilterItemChange: function(combo, q, r, o){
        var toolbar = combo.up("toolbar"),
            m = toolbar.down("gridsearchfield"),
            n = toolbar.down("searchcombo"),
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
                m.hide()
        }

        var main = Vega.app.getMainView(),
            k = main.getViewModel().getStore(j.toLowerCase());

        if(k != null){
            k.load();
            n.bindStore(k)
        }
    },

    onClearClick: function(g){
        var f = this.getView().down("grid"),
            h = f.getColumns();

        if(g.hasSearch){
            var e;
            Ext.each(h, function(a){
                e = a.filter;
                if(a.dataIndex===g.paramName){
                    return false
                }
            });
            g.setValue("");
            e.setValue("");
            e.setActive(false);
            g.hasSearch = false;
            g.getTrigger("clear").hide();
            g.updateLayout()
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
                        return false
                    }
                });
                //console.log("onSearchClick", f, h.paramName);
                f.setValue(j);
                f.setActive(true);
                h.hasSearch = true;
                h.getTrigger("clear").show();
                h.updateLayout()
            }
    },

    loadIframe: function(c){
        var d = Ext.util.Format;
        c.removeAll();
        c.add({
            xtype: "component",
            itemId: "contentIframe",
            autoEl: {
                tag: "iframe",
                style: {height: "100%"},
                width: "100%",
                border: "none",
                src: d.format("../services/PDFHandler.ashx?index={0}&date={1}&file={2}", 2, d.date(c.active.data.createdon), c.active.data.link)
            }
        })
    }
});

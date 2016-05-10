Ext.define("Vega.view.sales.PowController", {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: "controller.pow",

    init: function(g){
        var multiview = g.lookupReference("multiview"),
            refs = multiview.getReferences(),
            j = refs.topbar.lookupReference("paneselection"),
            k = refs.topbar.lookupReference("viewselection"),
            i = j.getActiveItem();

        refs.center.getLayout().setActiveItem(k.getValue());
    },

    initViewModel: function(b){
        this.fireEvent("viewmodelready", this, b)
    },

    onBeforeLoad: function(d, e, f){

    },

    onLoad: function(store, records, successful, operation){
        var me = this;


    },

    onSelect: function(v, record, r, p){

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
        l[1] = s.value != 1 ? "default" : "medium";
        l[2] = record.get("PID");

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
        this.redirectTo("pow/tab/new");
    },

    onRefreshClick: function(){
        this.getStore("pows").reload();
    },

    onContextMenuOpenClick: function(d, c){
        this.onTabOpen(null, d);
    },

    onContextMenuRefreshClick: function(d, c){
        this.getStore("pows").load()
    },

    onContextMenuEditClick: function(d, c){

    },

    onContextMenuBookmarkClick: function(d, c){
        this.addBookmark(d, this.getView())
    },

    onTabOpen: function(i, h){
        var j = this,
            f = j.view.lookupReference("multiview").lookupReference("icons"),
            g = Ext.fly(f.getNode(h)).query("i", false);

        localStorage.setItem("pow-seen-"+h.data.PID, true);
        f.addItemCls(h, "visited");
        g[0].addCls("visited");

        this.redirectTo("pow/tab/"+h.data.PID)
    },

    onRowDblClick: function(g, i, j, h, f){
        this.onTabOpen(null, i)
    },

    onItemDblClick: function(g, h, j, f, i){
        this.onTabOpen(null, h)
    },

    onFilterItemChange: function(p, q, r, o){
        var l = p.up("toolbar"),
            m = l.down("gridsearchfield"),
            n = l.down("searchcombo"),
            j = p.getValue();

        switch(j){
            case "PowNo":
            case "Descript":
            case "UserID":
                m.paramName = j;
                m.show();
                n.hide();
                break;
            default:
                n.paramName = j;
                n.show();
                m.hide()
        }

        var k = this.getViewModel().getStore(j.toLowerCase());

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
                console.log("onSearchClick", f, h.paramName);
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
                src: d.format("PDFHandler.ashx?index={0}&date={1}&file={2}", 2, d.date(c.active.data.CreateOn, "m/d/Y"), c.active.data.Link)
            }
        })
    }
});

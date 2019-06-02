Ext.define("Vega.view.sales.PowController", {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: "controller.pow",

    control: {
        '#': {
            viewmodelready: function(a,b){
                //console.log(a,b)
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

        //console.log(Vega.app.getMainView().getViewModel().getStore('salesCategories'))
    },

    initViewModel: function(b){
        this.getView().fireEvent("viewmodelready", this, b);
    },

    /*
    onBeforeLoad: function(d, e, f){

    },

    onLoad: function(store, records, successful, operation){

    },
    */

    onBeforeAdd: function(pow, tab, idx, e){
        //console.log('ReviewController - beforeadd', tab.isXType('display'))

        if(tab.isXType('display')){

            //this.getView().relayEvents(tab, ['revise', 'accept']);
            //console.log('PowController', rec.data.revision, rec.data.progress)
            var topbar = tab.lookupReference('topbar'),
                tvm = tab.getViewModel(),
                rec = tvm.get('thePow');

            if(rec.data.revision != -1 && rec.data.progress != 'posted'){
                var btnRevise = Ext.widget('button', {
                    text: 'Revise',
                    iconCls: 'x-fa fa-edit',
                    hidden: false,
                    scope: this,
                    handler: function(btn){
                        this.redirectTo('pow/edit/' + rec.data.powhId);
                    }
                });

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
            //u = refs.topbar,
            q = refs.preview,
            o = refs.display;
            o.setActive(record);

        if(q.hidden){
            o.removeAll();
        }
        else {
            o.loadIframe();
        }

        var l = [],
            s = refs.topbar.lookupReference("viewselection");

        l[0] = "pow";
        l[1] = s.value != 2 ? "default" : "tiles";
        l[2] = record.get("powhId");

        this.redirectTo(l.join("/"));
    },

    /**
     *
     * @param h this - Ext.view.View
     * @param j record - Ext.data.Model
     * @param k item - HTMLElement
     * @param g index - Number
     * @param l e - Ext.event.Event
     */
    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(j)){
            i.select(j);
        }

        this.view.contextmenu.items.items[1].setHidden(j.data.progress == 'posted');

        this.view.contextmenu.showAt(l.getXY());
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

    onActionCopy: function(topbar, a){
        var h = Ext.util.History.getToken(),
            g = h ? h.split("/") : [];
        //console.log(h, g.pop());

        var path = 'review/copy/';

        if(Vega.user.inRole('sales')){
            path = 'request/copy/';
        }

        this.redirectTo(path + g.pop());
    },

    onContextMenuEditClick: function(d, c){

    },

    onContextMenuBookmarkClick: function(d, c){
        this.addBookmark(d, this.getView());
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
        this.onTabOpen(null, i);
    },

    onItemDblClick: function(g, h, j, f, i){
        this.onTabOpen(null, h);
    }
});

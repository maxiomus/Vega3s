/**
 * Created by tech on 3/8/2016.
 */
Ext.define("Vega.view.main.MainController", {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.main',

    init: function(){
        this.listen({
            controller:{
                "#": {

                }
            }
        });

        //Ext.app.ViewController.prototype.init.call(this);
    },

    onHdrUserRender: function(b){
        b.setText(Vega.user.Username);
    },

    onLogout:function(e,g,f){
        var h=this;
        Ext.Ajax.request({
            url: "/security/logout.ashx",
            method: "GET",
            scope: h,
            success: h.onLogoutSuccess,
            failure: h.onLogoutFailure
        })
    },

    onLogoutSuccess:function(h,f,j){
        var me = this,
            result = Ext.decode(h.responseText);

        console.log("onLogoutSuccess", me, h, f);

        if(result.success){
            me.getView().destroy();
            window.location.reload(true)
        }
        else{
            Vega.util.Util.showErrorMsg(result.msg)
        }
    },

    onLogoutFailure:function(g,e,h){
        var result = Ext.decode(g.responseText);

        Vega.util.Util.showErrorMsg(result.msg)
    },

    onNavigationTreeSelectionChange:function(o,z){
        if(z && z.get("view")){
            var me = this,
                refs = me.getReferences(),
                mainCard = refs.mainCardPanel,
                view = mainCard.child("component[routeId="+z.get("routeId")+"]"),
                route = [];
            route[0] = z.get("routeId");

            if(view && view.lookupReference("multiview")){
                var tab = view.activeTab,
                    grid = tab.lookupReference("grid"),
                    store = view.getViewModel().getStore(view.routeId+"s"),
                    field = store.first().getIdProperty();

                if(grid){
                    var mode,
                        v = tab.lookupReference("center").getLayout().getActiveIndex();

                    switch(v){
                        case 0:
                            mode = "default";
                            break;
                        case 1:
                            mode = "medium";
                            break;
                        case 2:
                            mode = "tiles";
                            break
                    }

                    route[1] = mode
                }

                if(grid && grid.getSelectionModel().getSelection().length > 0){
                    var x = grid.getSelectionModel().getSelection();
                    route[2] = x[0].get(field);
                }

                if(tab.inTab){
                    route[1] = "tab";
                    if(tab.active){
                        route[2] = tab.active.get(field);
                    }
                    else {
                        route[2] = 'new';
                    }
                }
            }

            this.redirectTo(route.join("/"))
        }
    },

    onToggleNavigationSize:function(){
        var me = this,
            refs = me.getReferences(),
            nav = refs.navigationTreeList,
            main = refs.mainContainerWrap,
            h = !nav.getMicro(),
            g = h ? 64 : 250;

        if(Ext.isIE9m||!Ext.os.is.Desktop){
            Ext.suspendLayouts();
            refs.vegaLogo.setWidth(g);
            nav.setWidth(g);
            nav.setMicro(h);
            Ext.resumeLayouts();
            main.layout.animatePolicy = main.layout.animate = null;
            main.updateLayout();
        }
        else{
            if(!h){
                nav.setMicro(false);
            }

            refs.vegaLogo.animate({
                dynamic: true,
                to: {
                    width: g
                }
            });

            nav.setWidth(g);

            main.updateLayout({isRoot:true});

            if(h){
                nav.on({
                    afterlayoutanimation:function(){
                        nav.setMicro(true);
                    },
                    single:true
                });
            }
        }
    },

    onMainViewRender:function(){
        if(!window.location.hash){
            this.redirectTo("dashboard")
        }
    },

    onUnmatchedRoute:function(){

    }
});

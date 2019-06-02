/**
 * Created by tech on 3/8/2016.
 */
Ext.define("Vega.view.main.MainController", {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.main',

    init: function(g){
        this.listen({
            controller:{
                "#": {

                }
            },
            component: {
                'grid': {
                    afterrender: function(e) {
                        //e.getView().setLoading(true);
                    },
                    reconfigure: function(e){
                        //e.getView().setLoading(true);
                    }
                },
                'form': {

                }
            }

        });

        //Ext.app.ViewController.prototype.init.call(this);
        //console.log('Main Controller', this.getReferences())
    },

    initViewModel: function(b){
        //console.log('initViewModel', b.getStore('Settings'));
    },

    onLogout: function(e,g,f){
        var h=this;
        Ext.Ajax.request({
            //url: "/security/logout.ashx",
            url: '/api/Sessions/logout',
            method: "GET",
            scope: h,
            success: h.onLogoutSuccess,
            failure: h.onLogoutFailure
        });
    },

    onLogoutSuccess: function(h,f,j){
        var me = this,
            result = Ext.decode(h.responseText);

        console.log("onLogoutSuccess", me, h, f);

        if(result.success){
            me.getView().destroy();
            window.location.reload(true);
        }
        else{
            Vega.util.Utils.showErrorMsg(result.msg);
        }
    },

    onLogoutFailure: function(g,e,h){
        var result = Ext.decode(g.responseText);

        Vega.util.Utils.showErrorMsg(result.msg);
    },

    onNavigationTreeSelectionChange: function(o,z){
        if(z && z.get("view")){
            var me = this,
                refs = me.getReferences(),
                mainCard = refs.mainCardPanel,
                view = mainCard.child("component[routeId="+z.get("routeId")+"]"),
                route = [];
            route[0] = z.get("routeId");

            if(view && view.lookupReference("multiview")){
                //console.log(view, view.getActiveTab(), view.lookupReference("multiview"))
                var tab = view.getActiveTab() || view.lookupReference("multiview"),
                    grid = tab.lookupReference("grid");
                    //store = view.getViewModel().getStore(view.routeId+"s"),
                    //field = store.first().getIdProperty();

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
                            break;
                    }

                    route[1] = mode;

                    if(grid.getSelectionModel().getSelection().length > 0){
                        var x = grid.getSelectionModel().getSelection();
                        route[2] = x[0].id;
                        //route[2] = x[0].get(field);
                    }
                }

                if(tab.isEdit){
                    route[1] = tab.opMode;

                    var vm = tab.getViewModel();
                    if(tab.isXType("style-edit-form")){
                        if(vm.get('theSample').id > 0) {
                            route[2] = vm.get('theSample').id;
                        }
                    }

                    if(tab.isXType("sales-edit-form")){
                        if(vm.get('srcPowhId') != null){
                            route[2] = vm.get('srcPowhId');
                        }
                    }

                    if(tab.isXType("pi-form")){
                        if(vm.get('thePhysical').id > 0) {
                            route[2] = vm.get('thePhysical').id;
                        }
                    }
                }
                else if(tab.inTab){
                    route[1] = "tab";
                    if(tab.active){
                        route[2] = tab.active.id;
                        //route[2] = tab.active.get(field);
                    }
                    else {
                        route[2] = tab.reference;
                    }
                }
            }
            //console.log('MainController', route.join('/'))
            this.redirectTo(route.join("/"));
        }
    },

    onToggleNavigationSize:function(b){
        var me = this,
            refs = me.getReferences(),
            nav = refs.navigationTreeList,
            wrap = refs.mainContainerWrap,
            collapsing = !nav.getMicro(),
            newWidth = collapsing ? 64 : 250;

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
            if(!collapsing){
                nav.setMicro(false);
            }

            refs.vegaLogo.animate({
                dynamic: true,
                to: {
                    width: newWidth
                }
            });

            nav.width = newWidth;
            wrap.updateLayout({isRoot:true});
            nav.el.addCls('nav-tree-animating');

            if(collapsing){
                nav.on({
                    afterlayoutanimation:function(){
                        nav.setMicro(true);
                        nav.el.removeCls('nav-tree-animating');
                    },
                    single:true
                });
            }
        }
    },

    onMainViewRender:function(){
        if(!window.location.hash){
            this.redirectTo("dashboard");
        }
    }
});

Ext.define("Vega.view.main.Main", {
    extend: 'Ext.container.Container',

    requires: [
        'Vega.view.main.MainController',
        'Vega.view.main.MainModel',
        'Vega.view.main.MainContainerWrap',
        'Vega.view.dashboard.Dashboard',
        'Vega.view.notice.Notice',
        'Vega.view.sales.Pow',
        'Vega.view.sales.Window',
        'Vega.view.dal.Dal',
        'Vega.view.development.sample.Sample',
        'Vega.view.production.Schedule',
        'Vega.view.inventory.fabric.Receiving',
        'Vega.view.inventory.fabric.Allocation',
        'Vega.view.inventory.fabric.Rolls',
        'Vega.view.reports.inventory.LotActivity',
        'Vega.view.reports.inventory.InventoryByLot',
        'Vega.view.reports.transaction.Layout',
        'Ext.container.Viewport',
        'Ext.list.Tree'
    ],

    xtype: 'mainviewport',

    controller: "main",
    viewModel: {
        type:"main"
    },

    plugins:[{
        ptype:"viewport"
    }],

    cls:"vega-viewport",

    layout:{
        type:"vbox",
        align:"stretch"
    },

    listeners:{
        render:"onMainViewRender"
    },

    items:[{
        xtype: "toolbar",
        //region:"north",
        cls: "vega-headerbar toolbar-btn-shadow",
        height: 64,
        itemId: "headerBar",
        items:[{
            xtype: "component",
            reference: "vegaLogo",
            cls: "vega-logo",
            html: '<div class="main-logo"><img src="resources/images/vega-logo.png" height="26px">Vega III</div>',
            width: 250
        },{
            margin:"0 0 0 8",
            cls:"delete-focus-bg",
            iconCls:"x-fa fa-navicon",
            id:"main-navigation-btn",
            handler:"onToggleNavigationSize"
        },{
            xtype:"tbspacer",
            flex:1
        },{
            cls:"delete-focus-bg",
            iconCls:"x-fa fa-search",
            href:"#search",
            hrefTarget:"_self",
            tooltip:"See latest search"
        },{
            cls:"delete-focus-bg",
            iconCls:"x-fa fa-envelope",
            href:"#email",
            hrefTarget:"_self",
            tooltip:"Check your email"
        },{
            cls:"delete-focus-bg",
            iconCls:"x-fa fa-bell"
        },{
            cls:"delete-focus-bg",
            iconCls:"x-fa fa-th-large",
            href:"#profile",
            hrefTarget:"_self",
            tooltip:"See your profile"
        },{
            xtype:"tbtext",
            text:"Login User",
            cls:"top-user-name"
        },{
            xtype:"image",
            cls:"header-right-profile-image",
            height: 35,
            width: 35,
            alt: "current user image",
            src: "resources/images/icon_user.png"
        },{
            xtype:"button",
            id:"logout",
            text:"Logout",
            //ui: 'bootstrap-default-btn',
            reference:"logout",
            cls:"delete-focus-bg",
            iconCls:"fa fa-sign-out fa-lg",
            listeners:{
                click:"onLogout"
            }
        }]
    },
    {
        xtype:"maincontainerwrap",
        reference:"mainContainerWrap",
        flex:1,
        items:[{
            xtype:"treelist",
            region:"west",
            reference:"navigationTreeList",
            itemId:"navigationTreeList",
            ui:"navigation",
            store:"NavigationTree",
            width:250,
            expanderFirst:false,
            expanderOnly:false,
            singleExpand:true,
            listeners:{
                selectionchange:"onNavigationTreeSelectionChange"
            }
        },{
            xtype:"container",
            region:"center",
            flex:1,
            reference:"mainCardPanel",
            itemId:"contentPanel",
            layout:{
                type:"card",
                anchor:"100%"
            }
        }]
    }]
});

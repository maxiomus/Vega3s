Ext.define("Vega.view.main.Main", {
    extend: 'Ext.container.Container',

    requires: [
        'Vega.view.main.MainController',
        'Vega.view.main.MainModel',
        'Vega.view.main.MainContainerWrap',
        'Vega.view.dashboard.Dashboard',
        'Vega.view.notice.Notice',
        'Vega.view.sales.Pow',
        'Vega.view.sales.Request',
        'Vega.view.sales.Review',
        'Vega.view.sales.Pending',
        'Vega.view.dal.Dal',
        'Vega.view.development.sample.Sample',
        'Vega.view.development.sample.windows.Upload',
        'Vega.view.development.sample.windows.Labeltag',
        'Vega.view.development.request.Fabric',
        'Vega.view.development.request.edit.Fabric',
        'Vega.view.development.request.Work',
        'Vega.view.development.request.edit.Work',
        'Vega.view.production.Schedule',
        'Vega.view.inventory.pi.Physical',
        'Vega.view.inventory.pi.Form',
        'Vega.view.inventory.pi.View',
        'Vega.view.inventory.fabric.Receiving',
        'Vega.view.inventory.fabric.Allocation',
        'Vega.view.inventory.fabric.Rolls',
        'Vega.view.reports.inventory.LotActivity',
        'Vega.view.reports.inventory.InventoryByLot',
        'Vega.view.reports.transaction.Layout',
        'Vega.view.settings.Default',
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

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
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
                    html: '<div class="main-logo"><img src="resources/images/vega-logo.png" height="26px">Vega 3s</div>',
                    width: 64
                },{
                    margin: "0 0 0 8",
                    cls: "delete-focus-bg",
                    iconCls: "x-fa fa-navicon",
                    id: "main-navigation-btn",
                    handler: "onToggleNavigationSize"
                },{
                    xtype: "tbspacer",
                    flex: 1
                },{
                    cls: "delete-focus-bg",
                    iconCls: "x-fa fa-search",
                    href: "#search",
                    hrefTarget: "_self",
                    tooltip: "See latest search"
                },{
                    cls: "delete-focus-bg",
                    iconCls: "x-fa fa-envelope",
                    href: "#email",
                    hrefTarget: "_self",
                    tooltip: "Check your email"
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
                    xtype: "tbtext",
                    bind: '{currentUser.FirstName} {currentUser.LastName}',
                    cls: "top-user-name"
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
                    width: 64,
                    micro: true,
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
                    deferredRender: true,
                    layout:{
                        type:"card",
                        anchor:"100%"
                    }
                }]
            }]
        });

        me.callParent(arguments);

        var memStyles = Ext.create('Ext.data.Store', {
            storeId: 'memStyles',
            pageSize: 50,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        var remoteStyles = Ext.create('Vega.store.Styles', {
            autoLoad: true,

            listeners: {
                load: function(s){
                    memStyles.getProxy().setData(s.getRange());
                    memStyles.load();
                }
            }
        });

        var memStColors = Ext.create('Ext.data.Store', {
            storeId: 'memStColors',
            pageSize: 50,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        var remoteColors = Ext.create('Vega.store.StyleColors', {
            autoLoad: true,

            listeners: {
                load: function(s){
                    memStColors.getProxy().setData(s.getRange());
                    memStColors.load();
                }
            }
        });

        var memBodies = Ext.create('Ext.data.Store', {
            storeId: 'memBodies',
            pageSize: 50,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        var remoteBodies = Ext.create('Ext.data.Store', {
            fields: [{
                name: 'id',
                sortType: 'asUCString'
            },{
                name: 'text',
                sortType: 'asUCString'
            }],

            pageSize: 0,
            remoteFilter: true,
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/bodies',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                load: function(s){
                    memBodies.getProxy().setData(s.getRange());
                    memBodies.load();
                }
            }
        });

        var memComponents = Ext.create('Ext.data.Store', {
            storeId: 'memComponents',
            pageSize: 50,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        var remoteComponents = Ext.create('Vega.store.Components', {
            storeId: 'remoteComponents',
            autoLoad: true,

            listeners: {
                load: function(s){
                    memComponents.getProxy().setData(s.getRange());
                    memComponents.load();
                }
            }
        });

        var memColors = Ext.create('Ext.data.Store', {
            storeId: 'memColors',
            pageSize: 50,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        var remoteColors = Ext.create('Ext.data.Store', {
            storeId: 'remoteColors',
            autoLoad: true,
            remoteFilter: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/rawcolors',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                load: function(s){
                    memColors.getProxy().setData(s.getRange());
                    memColors.load();
                }
            }
        });

        var memLotnos = Ext.create('Ext.data.Store', {
            storeId: 'memLotnos',
            pageSize: 50,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        var remoteLotnos = Ext.create('Ext.data.Store', {
            storeId: 'remoteLotnos',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/lotnos',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },

            listeners: {
                load: function(s){
                    memLotnos.getProxy().setData(s.getRange());
                    memLotnos.load();
                }
            }
        });

    }
});


Ext.define("Vega.view.sales.Request",{
    extend: "Vega.view.Viewer",

    requires: [
        "Vega.view.sales.RequestController",
        "Vega.view.sales.RequestModel",
        'Vega.view.sales.edit.Form',
        'Vega.view.Display'
    ],

    alias: 'widget.request',

    config: {
        //activeState: null,
        //defaultActiveState: "default"
    },

    controller: "request",
    viewModel: {
        type: "request"
    },

    //session: true,
    cls: "shadow-panel",
    header: false,
    margin: 8,

    listeners: {
        beforeadd: 'onBeforeAdd',
        tabopen: "onTabOpen",
        tabrevise: 'onReviseTab',
        rowdblclick: "onRowDblClick",
        itemdblclick: "onItemDblClick",
        itemcontextmenu: 'onItemContextMenu',
        actcopy: 'onActionCopy',
        actedit: 'onActionEdit',
        actnew: 'onActionNew',
        actview: 'onActionView',
        actrefresh: 'onActionRefresh',
        actdelete: 'onActionDelete',
        clearall: 'onClearFilters',
        //ctxmnuopenclick: "onContextMenuOpenClick",
        //ctxmnurefreshclick: "onContextMenuRefreshClick",
        ctxmnueditclick: "onContextMenuEditClick",
        ctxmnubookmarkclick: "onContextMenuBookmarkClick"
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            items:[{
                xtype: "multiview",
                reference: "multiview",
                title: "REQUESTS",
                iconCls: "fa fa-file-text-o",
                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },
                mainItems:[{
                    xtype: "sales-grid",
                    reference: "grid",
                    cls: 'request-grid',
                    scrollable: true,
                    stateful:true,
                    stateId: "request-grid",
                    stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],
                    bind: {
                        store: '{requests}',
                        selection: '{selectedRequest}'
                    },
                    viewConfig: {
                        //height: 55,
                        loadMask: true,
                        //loadingHeight: 100,
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh: true,
                        deferInitialRefresh: true,
                        emptyText: '<h1 style="margin:20px">No matching results</h1>',
                        getRowClass: function(rec, idx, rowParams, store){
                            var cls = 'custom-row-style';

                            if(rec.data.progress == 'accepted'){
                                cls = cls + ' grid-row-accepted'
                            }

                            return cls;
                        }
                    },
                    plugins: [{
                        ptype: "gridfilters"
                    }],
                    listeners: {
                        reconfigure: function(grid, store, columns, oldStore, oldColumns){

                        },
                        afterrender: function(grid){

                        }
                    }
                    /*
                    columns: [{
                        text: "ID",
                        dataIndex: "powhId",
                        locked: false,
                        hidden: true,
                        filter: {
                            type: "number"
                        }
                    },
                    {
                        text: "Date",
                        width: 140,
                        dataIndex: "createdon",
                        filter: {
                            type: "date"
                        },
                        renderer: this.formatDate
                    },
                    {
                        text: "P.O.W #",
                        dataIndex: "powno",
                        width: 140,
                        filter: {
                            type: "string"
                        },
                        renderer: function(g,e,f){
                            var h = "";
                            if(localStorage.getItem("pow-seen-" + f.data.powhId)){
                                e.tdCls += "visited";
                                h = ' <i class="fa fa-check-square-o fa-lg"></i>'
                            }
                            return g + h;
                        }
                    },
                    {
                        text: "Status",
                        dataIndex: "status",
                        width: 140,
                        hidden: false,
                        filter: {
                            type: "string"
                        }
                    },
                    {
                        text: "Customer",
                        dataIndex: "customer",
                        width: 140,
                        filter: {
                            type: "string"
                        },
                        renderer: function(c, d){
                            return Ext.util.Format.uppercase(c)
                        }
                    },
                    {
                        text: "Type",
                        dataIndex: "ordertype",
                        width: 140,
                        hidden: false,
                        filter: {
                            type: "string"
                        }
                    },
                    {
                        text: "Division",
                        dataIndex: "division",
                        width: 140,
                        filter: {
                            type: "string"
                        }
                    },
                    {
                        text: "CXL Date",
                        dataIndex: "cancelon",
                        filter: {
                            type: "date"
                        }
                    },
                    {
                        text: "User ID",
                        dataIndex: "userId",
                        width:140,
                        hidden:false,
                        filter: {
                            type: "string"
                        }
                    },
                    {
                        text: "Progress",
                        dataIndex: "progress",
                        hidden: false,
                        filter: {
                            type: "string"
                        }
                    },
                    {
                        text: "Comments",
                        dataIndex: "comments",
                        flex:1,
                        hidden:false,
                        filter: {
                            type: "string"
                        }
                    }]
                    */
                },{
                    /*
                    xtype: "sales-view",
                    reference: "icons"
                    */
                },{
                    xtype: "sales-view",
                    reference: "tiles",
                    bind: {
                        store: "{requests}",
                        selection: '{selectedRequest}'
                    },
                    tpl: new Ext.XTemplate('<tpl for=".">',
                        '<div class="thumb-wrap {viewStatus} {progress}" id="mView-{powhId}">',
                        '<div class="thumb">',
                            //'<img src="{linkImage}" title="{Title}" />',
                        "</div>",
                        '<div class="post-data">',
                        '<div class="post-title">POW # {powno} <i class="fa fa-check-square-o fa-lg viewIcon {viewStatus}"></i>  <i class="fa fa-thumbs-o-up fa-lg viewIcon {progress}"></i></div>',
                        '<div class="post-date">{createdon:date("M j,Y,g:i a")}</div>',
                        '<div class="post-author">Registered by {userId:capitalize}</div>',
                        "</div>",
                        "<div>",
                        "<span>{customer:uppercase}</span>",
                        "<span>{status}</span>",
                        "<span>{ordertype}</span>",
                        "<span>{division}</span>",
                        '<div style="font-size:11px;padding:4px;">{comments:this.formatComment}</div>',
                        "</div>",
                        "</div>",
                        "</tpl>",
                        '<div class="x-clear"></div>',
                        {
                            formatComment: function(v){
                                var ev = Ext.util.Format.stripTags(v);
                                return Ext.String.ellipsis(ev,30);
                            }
                        }),
                    listeners: {
                        select: {
                            fn: 'onSelect',
                            scope: this.controller
                        }
                    }
                }],

                displayItems: [{
                    xtype: "display",
                    reference: "display"
                }],

                bbar:[{
                    xtype: "pagingtoolbar",
                    bind: {
                        store: "{requests}"
                    },
                    style: {borderWidth: "0px"},
                    dock: "bottom",
                    displayInfo: true
                }]
            }]
        });

        me.callParent(arguments);

        var multi = this.lookupReference("multiview"),
            refs = multi.getReferences(),
            grid = refs.grid,
            //icons = refs.icons,
            tiles = refs.tiles,
            display = refs.display,
            topbar = refs.topbar;

        //New Button
        if(Vega.user.inRole('sales') || Vega.user.inRole('administrators')){
            topbar.actNew.setHidden(false);
            topbar.actEdit.setHidden(false);
            topbar.actEdit.setDisabled(true);
            topbar.actCopy.setHidden(false);
            topbar.actCopy.setDisabled(true);
            //topbar.actDelete.setHidden(false);
        }

        //me.contextmenu.items.items[2].setHidden(false);

        // Search Filter ClearAll
        topbar.items.items[0].setHidden(false);

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                topbar.actCopy,
                topbar.actEdit,
                topbar.actView,
                topbar.actRefresh,
                topbar.actDelete
            ]
        });

        topbar.insert(0,
            [{
                xtype: "combo",
                width: 112,
                hideLabel: true,
                displayField: "label",
                valueField: "field",
                value: "powno",
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: "{salesCategories}"
                },
                listeners: {
                    change: {
                        fn: "onFilterItemChange",
                        scope: this.controller
                    }
                }
            },
            {
                xtype: "searchcombo",
                reference: 'searchcombo',
                width: 300,
                searchAt: 'sales-grid',
                hidden: true,
                listeners: {
                    /*
                    render: function(c){
                        c.on('focus', function () {
                            c.expand();
                        });
                    },
                    triggerclear: "onClearClick",
                    triggersearch: "onSearchClick",
                    scope: this.controller
                    */
                }
            },
            {
                xtype: "gridsearchfield",
                reference: 'searchfield',
                width: 300,
                grid: "sales-grid",
                paramName: "powno"
            }]
        );

        topbar.insert(12, [
            {
                xtype: "cycle",
                ui: "default",
                prependText: "Show:  ",
                iconCls: "fa fa-filter",
                showText: true,
                reference: "filterButton",
                changeHandler: "onTypeChange",
                scope: this.controller,
                menu: {
                    items: [{
                        text: "All",
                        iconCls: "fa fa-filter",
                        type: null,
                        itemId: "all",
                        checked: false
                    },{
                        text: "Request",
                        iconCls: "fa fa-filter",
                        type: 'request',
                        //itemId: "request",
                        checked: true
                    },{
                        text: "Accepted",
                        iconCls: "fa fa-filter",
                        type: 'accepted',
                        //itemId: "accept",
                        checked: false
                    }]
                }
            }, '->'
        ]);

        topbar.insert(15, [
            {
                xtype: "cycle",
                //ui: "default",
                prependText: "User:  ",
                iconCls: "fa fa-filter",
                showText: true,
                reference: 'salesFilter',
                changeHandler: 'onSalesChange',
                scope: this.controller,
                menu: {
                    items: [{
                        text: "All",
                        iconCls: "fa fa-filter",
                        type: null,
                        itemId: "all",
                        checked: true
                    }]
                }
            }
        ]);

        var segmented = topbar.lookupReference('viewselection'),
            ctn = multi.lookupReference('center');

        segmented.items.items[1].setHidden(true);
        segmented.setValue(2);

        this.relayEvents(topbar, ["actnew", "actrefresh", 'actcopy', 'actedit', "actview", "actdelete", 'clearall']);
        this.relayEvents(display, ['open', 'revise', 'accept'], 'tab');
        this.relayEvents(grid, ["rowdblclick", "itemcontextmenu"]);
        this.relayEvents(tiles, ["itemdblclick", "itemcontextmenu"]);
    }
})

Ext.define("Vega.view.sales.Pending",{
    extend: "Vega.view.Viewer",

    requires: [
        "Vega.view.sales.PendingController",
        "Vega.view.sales.PendingModel",
        'Vega.view.sales.Grid',
        'Vega.view.sales.View',
        'Vega.view.sales.edit.TaggingWindow'
    ],

    alias: 'widget.pending',

    controller: "pending",
    viewModel: {
        type: "pending"
    },

    //session: true,
    cls: "shadow-panel",
    header: false,
    margin: '0 0 0 4',

    listeners: {
        add: 'onBeforeAdd',
        tabopen: "onTabOpen",
        rowdblclick: "onRowDblClick",
        itemdblclick: "onItemDblClick",
        itemcontextmenu: "onItemContextMenu",
        actnew: "onActionNew",
        actrefresh: "onActionRefresh",
        actview: 'onActionView',
        actdelete: 'onActionDelete',
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
                title: "PENDINGS",
                iconCls: "x-fa fa-file-text-o",

                tbar: {
                    xtype: "sales-topbar",
                    reference: "topbar"
                },

                mainItems:[{
                    xtype: "sales-grid",
                    reference: "grid",
                    cls: 'pending-grid',
                    scrollable: true,
                    //stateful:true,
                    //stateId: "pending-grid",
                    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],
                    bind: {
                        store: '{pendings}',
                        selection: "{selectedPending}"
                    },
                    viewConfig: {
                        loadMask: true,
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh: true,
                        deferInitialRefresh: true,
                        emptyText: '<h1 style="margin:20px">No matching results</h1>',
                        getRowClass: function(rec, idx, rowParams, store){
                            var cls = 'custom-row-style';
                            if(rec.data.progress == 'pending'){
                                cls = cls + ' grid-row-pending';
                            }

                            return cls;
                        }
                    }
                },{

                },{
                    xtype: "sales-view",
                    reference: "tiles",
                    //publishes: ['selectedPending'],
                    bind: {
                        store: "{pendings}",
                        selection: "{selectedPending}"
                    },
                    tpl: new Ext.XTemplate('<tpl for=".">',
                        '<div class="thumb-wrap {viewStatus} {progress}" id="mView-{powhId}">',
                        '<div class="thumb">',
                        //'<img src="{linkImage}" title="{Title}" />',
                        '</div>',
                        '<tpl if="attachs &gt; 0">',
                            '<div class="post-attach"></div>',
                        '</tpl>',
                        '<div class="post-data">',
                        '<div class="post-title">POW # {powno} <i class="x-fa fa-check-square-o fa-lg viewIcon {viewStatus}"></i>  <i class="x-fa fa-exclamation-circle fa-lg viewIcon {progress}"></i></div>',
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
                        }
                    ),
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

                bbar: {
                    xtype: "pagingtoolbar",
                    bind: {
                        store: "{pendings}"
                    },
                    style: {borderWidth: "0px"},
                    dock: "bottom",
                    displayInfo: true
                }
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

        if(Vega.user.inRole('administrators')){

        }

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                topbar.actView,
                topbar.actRefresh,
                topbar.actDelete
            ]
        });

        topbar.insert(9, [{
            xtype: "cycle",
            ui: "default",
            prependText: "Show:  ",
            iconCls: "x-fa fa-filter",
            showText: true,
            reference: "filterButton",
            changeHandler: "onTypeChange",
            scope: this.controller,
            menu: {
                items: [{
                    text: "All",
                    iconCls: "x-fa fa-filter",
                    type: null,
                    itemId: "all",
                    checked: false
                },{
                    text: "Pending",
                    iconCls: "x-fa fa-filter",
                    type: 'pending',
                    itemId: "pending",
                    checked: true
                },{
                    text: "Approved",
                    iconCls: "x-fa fa-filter",
                    type: 'approved',
                    itemId: "approve",
                    checked: false
                }]
            }
        }]);

        var segmented = topbar.lookupReference('viewselection');

        segmented.items.items[1].setHidden(true);
        segmented.setValue(2);

        this.relayEvents(topbar, ["actnew", "actrefresh", 'actview', 'actdelete']);
        this.relayEvents(display, ['open', 'revise', 'accept'], 'tab');
        this.relayEvents(grid, ["rowdblclick", "itemcontextmenu"]);
        this.relayEvents(tiles, ["itemdblclick", "itemcontextmenu"]);
    },

    onDestroy:function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    }
});

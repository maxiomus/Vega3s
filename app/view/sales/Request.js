
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

    session: true,
    cls: "shadow-panel",
    header: false,
    margin: '0 0 0 4',

    listeners: {
        beforeadd: 'onBeforeAdd',
        tabopen: "onTabOpen",
        tabrevise: 'onReviseTab',
        clearall: 'onClearFilters',
        rowdblclick: "onRowDblClick",
        itemdblclick: "onItemDblClick",
        itemcontextmenu: 'onItemContextMenu',
        actnew: 'onActionNew',
        actedit: 'onActionEdit',
        actcopy: 'onActionCopy',
        actdelete: 'onActionDelete',
        actview: 'onActionView',
        actrefresh: 'onActionRefresh',
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
                iconCls: "x-fa far-file-alt",
                tbar: {
                    xtype: "sales-topbar",
                    reference: "topbar"
                },

                mainItems:[{
                    xtype: "sales-grid",
                    reference: "grid",
                    cls: 'request-grid',
                    scrollable: true,
                    stateful:true,
                    //stateId: "request-grid",
                    //stateEvents: ["columnmove", "columnresize", "columnshow", "columnhide"],
                    bind: {
                        store: '{requests}',
                        selection: '{selectedRequest}'
                    },
                    viewConfig: {
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh: true,
                        deferInitialRefresh: true,
                        emptyText: '<h1 style="margin:20px">No matching results</h1>',
                        getRowClass: function(rec, idx, rowParams, store){
                            var cls = 'custom-row-style';

                            if(rec.data.progress == 'accepted'){
                                cls = cls + ' grid-row-accepted';
                            }

                            return cls;
                        }
                    },
                    plugins: [{
                        ptype: "gridfilters"
                    }]
                },{

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
                            '</div>',
                            '<tpl if="attachs &gt; 0">',
                                '<div class="post-attach"></div>',
                            '</tpl>',
                            '<div class="post-data">',
                                '<div class="post-title">POW # {powno} <i class="x-fa fa-check-square-o fa-lg viewIcon {viewStatus}"></i>  <i class="x-fa fa-thumbs-o-up fa-lg viewIcon {progress}"></i></div>',
                                '<div class="post-date">{[this.showDate(values)]}</div>',
                                '<div class="post-author">Registered by {userId:capitalize}</div>',
                            '</div>',
                            '<div>',
                                '<span>{customer:uppercase}</span>',
                                '<span>{status}</span>',
                                '<span>{ordertype}</span>',
                                '<span>{division}</span>',
                                '<div style="font-size:11px;padding:4px;">{comments:this.formatComment}</div>',
                            '</div>',
                        '</div>',
                        '</tpl>',
                        '<div class="x-clear"></div>',
                        {
                            formatComment: function(v){
                                var ev = Ext.util.Format.stripTags(v);
                                return Ext.String.ellipsis(ev,30);
                            },
                            showDate: function(a){
                                var d = a.createdon;
                                if(a.powno == 'TBD' && !Ext.isEmpty(a.updatedon)) {
                                    d = a.updatedon;
                                }

                                return Ext.util.Format.date(d, "M j,Y,g:i a");
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

                bbar:{
                    xtype: "pagingtoolbar",
                    bind: {
                        store: "{requests}"
                    },
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

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                topbar.actView,
                topbar.actCopy,
                topbar.actEdit,
                topbar.actRefresh,
                topbar.actDelete
            ]
        });

        topbar.insert(12, [
            {
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
                        //itemId: "all",
                        checked: false
                    },{
                        text: "Request",
                        iconCls: "x-fa fa-filter",
                        type: 'request',
                        //itemId: "request",
                        checked: true
                    },{
                        text: "Accepted",
                        iconCls: "x-fa fa-filter",
                        type: 'accepted',
                        //itemId: "accept",
                        checked: false
                    }]
                }
            }
        ]);

        topbar.insert(14, [
            {
                xtype: "cycle",
                //ui: "default",
                prependText: "User:  ",
                iconCls: "x-fa fa-filter",
                showText: true,
                reference: 'salesFilter',
                changeHandler: 'onSalesChange',
                scope: this.controller,
                menu: {
                    items: [{
                        text: "All",
                        iconCls: "x-fa fa-filter",
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
});

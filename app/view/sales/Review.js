
Ext.define("Vega.view.sales.Review",{
    extend: "Vega.view.Viewer",

    requires: [
        "Vega.view.sales.ReviewController",
        "Vega.view.sales.ReviewModel",
        'Vega.view.sales.edit.Form',
        'Vega.view.Display'
    ],

    alias: 'widget.review',

    controller: "review",
    viewModel: {
        type: "review"
    },

    //session: true,
    cls: "shadow-panel",
    header: false,
    margin: '0 0 0 4',

    listeners: {
        beforeadd: 'onBeforeAdd',
        tabopen: "onTabOpen",
        tabrevise: 'onReviseTab',
        rowdblclick: "onRowDblClick",
        itemdblclick: "onItemDblClick",
        itemcontextmenu: 'onItemContextMenu',
        actcopy: 'onActionCopy',
        actedit: 'onActionEdit',
        actview: 'onActionView',
        actnew: 'onActionNew',
        actrefresh: "onActionRefresh",
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
                title: "REVIEWS",
                iconCls: "x-fa fa-file-text-o",

                tbar: {
                    xtype: "sales-topbar",
                    reference: "topbar"
                },

                mainItems:[{
                    xtype: "sales-grid",
                    reference: "grid",
                    cls: 'review-grid',
                    scrollable: true,

                    //stateful:true,
                    //stateId: "review-grid",
                    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

                    publishes: ['selectedReview'],

                    bind: {
                        store: '{reviews}',
                        selection: "{selectedReview}"
                    },

                    viewConfig: {
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh: true,
                        deferInitialRefresh: true,
                        emptyText: '<h1 style="margin:20px">No matching results</h1>',
                        getRowClass: function(rec, idx, rowParams, store){
                            var cls = 'custom-row-style';

                            if(rec.data.progress == 'posted'){
                                cls = cls + ' grid-row-accepted';
                            }

                            if(rec.data.status == 'PENDING'){
                                cls = cls + ' grid-row-pending';
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
                        store: "{reviews}",
                        selection: "{selectedReview}"
                    },
                    tpl: new Ext.XTemplate('<tpl for=".">',
                        '<div class="thumb-wrap {viewStatus} {progress} {status}" id="mView-{powhId}">',
                            '<div class="thumb">',
                                //'<img src="{linkImage}" title="{Title}" />',
                            '</div>',
                            '<tpl if="attachs &gt; 0">',
                            '<div class="post-attach"></div>',
                            '</tpl>',
                                '<div class="post-data">',
                                '<div class="post-title">POW # {powno} <i class="x-fa fa-check-square-o fa-lg viewIcon {viewStatus}"></i>  <i class="x-fa fa-thumbs-o-up fa-lg viewIcon {progress}"></i></div>',
                                '<div class="post-date">{createdon:date("M j,Y,g:i a")}</div>',
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
                        store: "{reviews}"
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

        if(Vega.user.inRole('cs') || Vega.user.inRole('revise') || Vega.user.inRole('administrators')){
            topbar.actNew.setHidden(false);
            topbar.actEdit.setHidden(false);
            topbar.actEdit.setDisabled(true);
            topbar.actCopy.setHidden(false);
            topbar.actCopy.setDisabled(true);
        }

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                topbar.actView,
                topbar.actCopy,
                topbar.actEdit,
                topbar.actRefresh,
                topbar.actDelete
            ]
        });

        topbar.insert(11, [
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
                        itemId: "all",
                        checked: false
                    },{
                        text: "In-Review",
                        iconCls: "x-fa fa-filter",
                        type: 'review',
                        itemId: "review",
                        checked: true
                    },{
                        text: "Posted",
                        iconCls: "x-fa fa-filter",
                        type: 'posted',
                        itemId: "posted",
                        checked: false
                    }]
                }
            }
        ]);

        var segmented = topbar.lookupReference('viewselection'),
            ctn = multi.lookupReference('center');

        segmented.items.items[1].setHidden(true);
        segmented.setValue(2);

        this.relayEvents(topbar, ["actnew", "actrefresh", 'actview', 'actcopy', 'actedit', 'actdelete', 'clearall']);
        this.relayEvents(display, ['open', 'revise', 'accept'], 'tab');
        this.relayEvents(grid, ["rowdblclick", "itemcontextmenu"]);
        this.relayEvents(tiles, ["itemdblclick", "itemcontextmenu"]);
    }
});

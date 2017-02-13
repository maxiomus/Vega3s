
Ext.define("Vega.view.sales.Pow", {
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.sales.PowController',
        'Vega.view.sales.PowModel',
        //'Vega.view.sales.Grid',
        //'Vega.view.sales.View',
        'Vega.view.sales.edit.Form',
        'Vega.view.Display',
        'Ext.ux.form.SearchComboBox'
    ],

    alias: "widget.pow",

    config: {
        activeState: null,
        defaultActiveState: null
    },

    controller: "pow",
    viewModel: {
        type: "pow"
    },

    cls: "shadow-panel",
    header: false,
    margin: 8,

    session: true,

    listeners: {
        add: 'onBeforeAdd',
        tabopen: "onTabOpen",
        clearall: 'onClearFilters',
        rowdblclick: "onRowDblClick",
        itemdblclick: "onItemDblClick",
        itemcontextmenu: "onItemContextMenu",
        actview: "onActionView",
        actrefresh: "onActionRefresh",
        ctxmnueditclick: "onContextMenuEditClick",
        ctxmnubookmarkclick: "onContextMenuBookmarkClick"
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            items:[{
                xtype: "multiview",
                reference: "multiview",
                title: "P.O.W List",
                iconCls: "fa fa-file-text-o",
                tbar:{
                    xtype:"topbar",
                    reference:"topbar"
                },
                mainItems:[{
                    xtype: "sales-grid",
                    reference: "grid",
                    cls: 'pow-grid',
                    scrollable: true,
                    stateful:true,
                    stateId: "pow-grid",
                    stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],
                    publishes: ["selectedPows"],
                    bind: {
                        store: "{pows}",
                        selection: "{selectedPows}"
                    },
                    viewConfig: {
                        loadMask:true,
                        stripeRows:true,
                        trackOver:true,
                        preserveScrollOnRefresh:true,
                        deferInitialRefresh:true,
                        emptyText:'<h1 style="margin:20px">No matching results</h1>',
                        getRowClass: function(rec, idx, rowParams, store){
                            return "custom-row-style"
                        }
                    },
                    listeners: {
                        select: {
                            fn: "onSelect",
                            scope: this.controller
                        }
                    }
                },
                {
                    /*
                    xtype: "sales-view",
                    reference: "icons"
                    */
                },
                {
                    xtype: "sales-view",
                    reference: "tiles",
                    publishes: ["selectedPows"],
                    bind: {
                        store: "{pows}",
                        selection: "{selectedPows}"
                    },
                    tpl: new Ext.XTemplate('<tpl for=".">',
                    '<div class="thumb-wrap {viewStatus}" id="mView-{powhId}">',
                    '<div class="thumb">',
                    //'<img src="{linkImage}" title="{title}" />',
                    '</div>',
                    '<div class="post-data">',
                    '<div class="post-title">POW # {powno} <i class="fa fa-check-square-o fa-lg viewIcon {viewStatus}"></i></div>',
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
                    })
                }],

                displayItems: [{
                    xtype: "display",
                    reference: "display"
                }],

                bbar:[{
                    xtype: "pagingtoolbar",
                    bind:{
                        store: "{pows}"
                    },
                    style: {borderWidth:"0px"},
                    dock: "bottom",
                    displayInfo: true
                }]
            }]
        });

        me.callParent(arguments);

        var j = this.lookupReference("multiview"),
            o = j.getReferences(),
            m = o.grid,
            n = o.icons,
            p = o.tiles,
            k = o.display,
            i = o.topbar;

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                i.actView,
                i.actRefresh
            ]
        });

        var segmented = i.lookupReference('viewselection');
        segmented.items.items[1].setHidden(true);
        segmented.setValue(2);

        i.items.items[0].setHidden(false);
        i.insert(0,
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
                hidden: true,
                searchAt: 'sales-grid',
                listeners: {
                    //triggerclear: "onClearClick",
                    //triggersearch: "onSearchClick"
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

        this.relayEvents(i, ["actview", "actrefresh", "clearall"]);
        this.relayEvents(k, ["open"], 'tab');
        this.relayEvents(m, ["rowdblclick", "itemcontextmenu"]);
        this.relayEvents(p, ["itemdblclick", "itemcontextmenu"])
    },

    onDestroy:function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    }
});


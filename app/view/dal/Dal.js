
Ext.define("Vega.view.dal.Dal", {
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.dal.DalController',
        'Vega.view.dal.DalModel',
        'Vega.view.dal.Grid',
        'Vega.view.dal.View',
        'Ext.ux.BoxReorderer'
    ],

    alias: "widget.dal",

    config: {
        activeState: null,
        defaultActiveState: null
    },

    controller: "dal",
    viewModel: {
        type: "dal"
    },

    cls: "shadow-panel",
    header: false,
    margin: 8,

    listeners: {
        newclick: "onNewClick",
        refreshclick: "onRefreshClick",
        opentab: "onTabOpen",
        rowdblclick: "onRowDblClick",
        itemdblclick: "onItemDblClick",
        itemcontextmenu: "onItemContextMenu",
        ctxmnuopenclick: "onContextmenuOpenClick",
        ctxmnurefreshclick: "onContextMenuRefreshClick",
        ctxmnudownloadclick: "onContextMenuDownloadClick",
        ctxmnueditclick: "onContextMenuEditClick",
        ctxmnubookmarkclick: "onContextMenuBookmarkClick"
    },

    initComponent: function(){
        var me = this;
        this.contextmenu = this.buildContextMenu();
        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "D.A.L",
                iconCls: "fa fa-th-large",
                tbar: [{
                    xtype: "topbar",
                    reference: "topbar"
                }],
                mainItems: [{
                    xtype: "dal-grid",
                    reference: "grid",
                    scrollable: true,
                    flex: 2,
                    listeners: {
                        select: {
                            fn: "onSelect",
                            scope: this.controller
                        }
                    }
                },
                {
                    xtype: "dal-view",
                    reference: "icons",
                    cls: "images-medium-view",
                    tpl: [
                        '<tpl for=".">',
                        // Break every four quarters
                        '<div class="thumb-wrap" id="{ID}">',
                        '<div class="thumb">',
                        '<img class="{F_BFLAG}" src="../{F_LINK}thumbs/{F_LOCATION}_thumb{F_EXT}" />',
                        '<div class="{F_BFLAG}">Rejected</div>',
                        '<div class="thumb-icon"></div>',
                        '<div class="thumb-title-container">',
                        '<div class="thumb-title">{Title}</div>' +
                        '<div class="thumb-small">' +
                        '<span>{F_CATEGORY}</span>' +
                        '<div>' +
                        '<i class="fa fa-calendar"></i> <i class="fa fa-clock-o"></i> {F_CREATED_ON:date("m-d-Y g:i A")}' +
                            //'by <span>{F_USERID}</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>',
                        '<div class="thumb-download"></div>',
                        '</div>',
                        '</div>',
                        '</tpl>'
                    ],
                    listeners: {
                        select: {
                            fn: "onSelect",
                            scope: this.controller
                        }
                    }
                },
                {
                    xtype: "dal-view",
                    reference: "tiles",
                    cls: "images-tile-view",
                    tpl: new Ext.XTemplate(
                        '<tpl for=".">',
                        '<div class="thumb-wrap" id="{ID}">',
                        //'<a class="link" href="{linkUrl}">',
                        '<div class="thumb">',
                        '<img class="{F_BFLAG}" src="../{F_LINK}thumbs/{F_LOCATION}_thumb{F_EXT}" title="{F_DESC1}" />',
                        '<div class="{F_BFLAG}">Rejected</div>',
                        '</div>',
                        '<span>{Title:ellipsis(11)}</span>',
                        //'</a>',
                        '</div>',
                        '</tpl>',
                        '<div class="x-clear"></div>'
                    ),
                    listeners: {
                        select: {
                            fn: "onSelect",
                            scope: this.controller
                        }
                    }
                }],
                displayItems: [{
                    xtype: "display",
                    reference: "display",
                    scrollable: true,
                    cls: "display-preview",
                    tpl: new Ext.XTemplate('<div class="display-data">',
                        '<span class="display-date">{F_CREATED_ON: this.formatDate}</span>',
                        '<div class="display-title">{F_CATEGORY} # - {Title}</div>',
                        '<div class="display-author">by {F_USERID}</div>',
                        '</div>',
                        '<div class="details">',
                        '<img src="../{F_LINK}thumbs/{F_LOCATION}_medium{F_EXT}" height="320" width="320" />',
                        '<div class="details-info">',
                        "<span><b>Description:  </b>{F_DESC1}</span>",
                        "<span><b>Style #:  </b>{F_NAME}</span>",
                        "<span><b>Theme:  </b>{F_DESC9}</span>",
                        "<span><b>Body #:  </b>{F_DESC5}</span>",
                        "<span><b>Code #:  </b>{F_DESC6}</span>",
                        "<span><b>Color:  </b>{F_DESC3}</span>",
                        "<span><b>Account:  </b>{F_DESC8}</span>",
                        "<span><b>Side:  </b>{F_MFLAG}</span>",
                        "<span><b>Type:  </b>{F_DESC2}</span>",
                        "<span><b>Vendor:  </b>{F_DESC4}</span>",
                        "<span><b>Price:  </b>{F_DESC7: usMoney}</span>",
                        "<span><b>Original:  </b>{F_OWNER}</span>",
                        "<span><b>Modified By:  </b>{F_MOD_USER_ID: capitalize}</span>",
                        "<span><b>Last Modified:  </b>{F_UPDATED_ON: this.formatDate}</span>",
                        "</div>",
                        {
                            getBody: function(a, b){
                                return Ext.util.Format.stripScripts(a);
                            },
                            defaultValue: function(a){
                                return a?a: "Unknown";
                            },
                            formatDate: function(a){
                                if(!a){
                                    return "";
                                }
                                return Ext.Date.format(a, "M j,Y,g: i A");
                            }
                        })
                }],
                bbar: this.buildBottomBar()
            }]
        });

        me.callParent(arguments);

        var j = this.lookupReference("multiview"),
            o = j.getReferences(),
            m = o.grid,
            n = o.icons,
            p = o.tiles,
            k = o.display,
            topbar = o.topbar;

        topbar.insert(0,
            [{
                xtype: "combo",
                width: 112,
                hideLabel: true,
                valueField: "field",
                displayField: "label",
                value: "Body #",
                editable: false,
                reference: "filterSelection",
                bind: {store: "{category}"},
                listeners: {
                    change: "onFilterItemChange",
                    scope: this.controller
                }
            },
            {
                xtype: "gridsearchfield",
                width: 300,
                grid: "dal-grid",
                paramName: "F_DESC5"
            }]);

        topbar.insert(10,
            [{
                xtype: "toolbar",
                border: false,
                padding: 0,
                margin: 0,
                plugins: {
                    xclass: "Ext.ux.BoxReorderer",
                    listeners: {
                        scope: this,
                        drop: this.updateStoreSorters
                    }
                },
                defaults: {
                    listeners: {
                        scope: this,
                        changeDirection: this.updateStoreSorters
                    }
                },
                items: [{
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
                            checked: true
                        }]
                    }
                }, "-", {
                    xtype: "tbtext",
                    text: "Sort by:  ",
                    reorderable: false
                },
                {
                    xtype: "multisortbutton",
                    text: "Date",
                    //ui: "default",
                    ui: 'bootstrap-btn-default',
                    hidden: false,
                    dataIndex: "F_CREATED_ON"
                },
                {
                    xtype: "multisortbutton",
                    text: "User",
                    //ui: "default",
                    ui: 'bootstrap-btn-default',
                    hidden: false,
                    direction: "ASC",
                    dataIndex: "F_USERID"
                },
                {
                    xtype: "multisortbutton",
                    text: "Body",
                    //ui: "default",
                    ui: 'bootstrap-btn-default',
                    name: "body",
                    hidden: true,
                    dataIndex: "F_DESC5"
                },
                {
                    xtype: "multisortbutton",
                    text: "Print",
                    //ui: "default",
                    ui: 'bootstrap-btn-default',
                    name: "print",
                    hidden: true,
                    dataIndex: "F_DESC6"
                },
                {
                    xtype: "multisortbutton",
                    text: "Photo",
                    //ui: "default",
                    ui: 'bootstrap-btn-default',
                    name: "photo",
                    hidden: true,
                    dataIndex: "F_NAME"
                }, "-"]
            }]);

        this.updateStoreSorters();

        this.relayEvents(topbar, ["newclick", "refreshclick"]);
        this.relayEvents(k, ["opentab"]);
        this.relayEvents(m, ["rowdblclick", "itemcontextmenu"]);
        this.relayEvents(n, ["itemdblclick", "itemcontextmenu"]);
        this.relayEvents(p, ["itemdblclick", "itemcontextmenu"])
    },

    buildTopBar: function(){

    },

    buildBottomBar: function(){
        var b = Ext.create("widget.combo", {
            name: "perpage",
            width: 76,
            store: new Ext.data.ArrayStore({
                fields: ["id"],
                data: [["15"], ["25"], ["50"], ["100"], ["300"], ["500"]]
            }),
            mode: "local",
            value: "50",
            matchFieldWidth: true,
            triggerAction: "all",
            displayField: "id",
            valueField: "id",
            editable: false,
            forceSelection: true
        });

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("dals");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return[{
            xtype: "pagingtoolbar",
            dock: "bottom",
            itemId: "pagingtb",
            displayInfo: true,
            bind: {store: "{dals}"},
            style: {borderWidth: "0px"},
            items: ["-", b, "Per Page:  "]
        }]
    },

    buildContextMenu: function(){
        return Ext.create("Ext.menu.Menu", {
            items: [{
                text: "View",
                iconCls: "fa fa-file-o",
                handler: this.onCtxMnuOpenClick,
                scope: this
            },
            {
                text: "Refresh",
                iconCls: "fa fa-refresh",
                handler: this.onCtxMnuRefreshClick,
                scope: this
            },
            {
                text: "Download",
                iconCls: "fa fa-download",
                handler: this.onCtxMnuDownloadClick,
                scope: this
            },
            {
                text: "Edit",
                iconCls: "fa fa-edit",
                disabled: true,
                handler: this.onCtxMnuEditClick,
                scope: this
            }]
        })
    },

    onDestroy: function(){
        this.contextmenu.destroy();
        this.callParent(arguments)
    },

    onCtxMnuOpenClick: function(i, h){
        var g=this.lookupReference("multiview"),
        j=g.lookupReference("grid"),
        e=j.getSelectionModel().selected.items[0];

        this.fireEvent("ctxmnuopenclick", e, i);
    },

    onCtxMnuRefreshClick: function(i, h){
        var g=this.lookupReference("multiview"),
        j=g.lookupReference("grid"),
        e=j.getSelectionModel().selected.items[0];
        this.fireEvent("ctxmnurefreshclick", e, i)
    },

    onCtxMnuDownloadClick: function(i, h){
        var g=this.lookupReference("multiview"),
        j=g.lookupReference("grid"),
        e=j.getSelectionModel().selected.items;
        this.fireEvent("ctxmnudownloadclick", e, i);
    },

    onCtxMnuEditClick: function(i, h){
        var g=this.lookupReference("multiview"),
        j=g.lookupReference("grid"),
        e=j.getSelectionModel().selected.items[0];
        this.fireEvent("ctxmnueditclick", e, i);
    },

    onCtxMnuBookmarkClick: function(i, h){
        var g=this.lookupReference("multiview"),
        j=g.lookupReference("grid"),
        e=j.getSelectionModel().selected.items[0];
        this.fireEvent("ctxmnubookmarkclick", e, i);
    },

    getSorters: function(){
        var h=[],
        f=this.lookupReference("multiview"),
        g=f.getReferences().topbar;
        if(g.items.length>0){
            var e=g.query("toolbar multisortbutton[hidden=false]");
            Ext.Array.each(e, function(a){
                h.push({
                    property: a.getDataIndex(),
                    direction: a.getDirection()
                })
            })
        }
        return h;
    },

    updateStoreSorters: function(){
        var c=this.getSorters(),
        d=this.getViewModel();
        if(c.length>0){
            d.getStore("dals").sort(c)
        }
    }
});

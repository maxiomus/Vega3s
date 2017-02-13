
Ext.define("Vega.view.dal.Dal", {
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.dal.DalController',
        'Vega.view.dal.DalModel',
        'Vega.view.dal.Grid',
        'Vega.view.dal.View',
        'Vega.view.dal.edit.Window',
        'Vega.view.dal.edit.Body',
        'Vega.view.dal.edit.Component',
        'Vega.view.dal.edit.Photo',
        'Ext.ux.form.MultiUpload',
        'Ext.ux.form.ImageUpload',
        'Ext.ux.BoxReorderer'
    ],

    alias: "widget.dal",

    config: {
        //activeState: null,
        //defaultActiveState: null
    },

    controller: "dal",
    viewModel: {
        type: "dal"
    },

    cls: "shadow-panel",
    header: false,
    margin: 8,

    session: true,

    listeners: {
        //newclick: "onNewClick",
        //refreshclick: "onRefreshClick",
        tabopen: "onTabOpen",
        rowdblclick: "onRowDblClick",
        viewready: 'onViewReady',
        itemdblclick: "onItemDblClick",
        itemcontextmenu: "onItemContextMenu",
        actview: "onActionView",
        actrefresh: "onActionRefresh",
        actsave: 'onActionSave',
        clearall: 'onClearFilters',
        //ctxmnuopenclick: "onContextmenuOpenClick",
        //ctxmnurefreshclick: "onContextMenuRefreshClick",
        ctxmnudownloadclick: "onContextMenuDownloadClick",
        ctxmnueditclick: "onContextMenuEditClick",
        ctxmnudeleteclick: "onContextMenuDeleteClick",
        ctxmnubookmarkclick: "onContextMenuBookmarkClick"
    },

    initComponent: function(){
        var me = this;

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
                    //flex: 2,
                    //publishes: ["selectedImage"],
                    bind: {
                        store: "{dals}"
                        //selection: "{selectedImage}"
                    },
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
                    //mode: 'MULTI',
                    bind: {
                        store: '{dals}'
                    },
                    cls: "images-medium-view",
                    tpl: new Ext.XTemplate(
                        '<tpl for=".">',
                        // Break every four quarters
                        '<div class="thumb-wrap" id="{ID}">',
                            '<div class="thumb">',
                                '<img class="{F_BFLAG}" src="{[this.getSrcPath(values,xcount)]}" />',
                                '<div class="{F_BFLAG}">Rejected</div>',
                        //'<div class="thumb-icon"></div>',
                                '<div class="thumb-title-container">',
                                    '<div>' +
                                    '<span class="thumb-title">{Title}</span>' +
                                    '<span class="{[this.isSold(values)]}">&nbsp;&nbsp;<i class="fa fa-tag fa-lg blue-txt"></i><span style="font-size: 10px; color: #878ea2;"> {F_DESC8}</span></span>' +
                                    '</div>' +
                                    '<div class="thumb-small">' +
                                        '<span>{F_CATEGORY}</span>' +
                                        '<div class="{[this.isBody(values)]}">' +
                                            '<div>Body: {F_DESC5:ellipsis(30)}</div>' +
                                            '<div>Print #: {F_DESC6:ellipsis(30)}</div>' +
                                        '</div>' +
                                        '<div class="{[this.isPrint(values)]}">' +
                                            '<div>Colorway: {F_DESC9:ellipsis(30)}</div>' +
                                            '<div>Theme: {F_DESC10:ellipsis(30)}</div>' +
                                        '</div>' +
                                        '<div>' +
                                            '<i class="fa fa-calendar"></i> <i class="fa fa-clock-o"></i> {F_CREATED_ON:date("m-d-Y g:i A")}' +
                                            //'by <span>{F_USERID}</span>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>',
                            //'<div class="thumb-download"></div>',
                            '</div>',
                        '</div>',
                        '</tpl>',
                    {
                        isBody: function(a){
                            var str = 'HIDDEN';
                            if(a.F_CATEGORY.toLowerCase() == 'photos'){
                                str = '';
                            }
                            return str;
                        },
                        isPrint: function(a){
                            var str = 'HIDDEN';
                            if(a.F_CATEGORY.toLowerCase() == 'prints'){
                                str = '';
                            }
                            return str;
                        },
                        isSold: function(a){
                            var str = 'HIDDEN';
                            if(!Ext.isEmpty(a.F_DESC8)){
                                str = '';
                            }
                            return str;
                        },
                        getSrcPath: function(a,b){
                            var str,
                                store = me.getViewModel().getStore("dals");

                            if(!Ext.isEmpty(a.F_NAME) && !Ext.isEmpty(a.F_TYPE)) {
                                 //str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME.replace(/(\.[^.]+)$/, "_medium$1");
                                str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME;
                            }
                            else {
                                str = '../' + a.F_LINK + a.F_PATH + '/' + a.F_LOCATION + a.F_EXT;
                            }

                            if(store.getPageSize() > 15){
                                str += "?w=98&h=98";
                            }

                            return str;
                            //return a.replace(/(\.[^.]+)$/, "_medium$1");
                        }
                    }),
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
                    //mode: 'MULTI',
                    bind: {
                        store: '{dals}'
                    },
                    cls: "images-tile-view",
                    tpl: new Ext.XTemplate(
                        '<tpl for=".">',
                        '<div class="thumb-wrap" id="{ID}">',
                        //'<a class="link" href="{linkUrl}">',
                        '<div class="thumb">',
                        '<img class="{F_BFLAG}" src="{[this.getSrcPath(values, xcount)]}" title="{F_DESC1}" />',
                        '<div class="{F_BFLAG}">Rejected</div>',
                        '</div>',
                        '<span>{Title:ellipsis(11)}</span>',
                        //'</a>',
                        '</div>',
                        '</tpl>',
                        '<div class="x-clear"></div>',
                        {
                            getSrcPath: function(a,b){
                                var str,
                                    store = me.getViewModel().getStore("dals");

                                if(!Ext.isEmpty(a.F_NAME) && !Ext.isEmpty(a.F_TYPE)) {
                                    //str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME.replace(/(\.[^.]+)$/, "_medium$1");
                                    str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME;
                                }
                                else {
                                    str = '../' + a.F_LINK + a.F_PATH + '/' + a.F_LOCATION + a.F_EXT;
                                }

                                if(store.getPageSize() > 15){
                                    str += "?w=98&h=98";
                                }
                                return str;
                                //return a.replace(/(\.[^.]+)$/, "_medium$1");
                            }
                        }),
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
                        '<span class="display-date">{F_CREATED_ON:this.formatDate}</span>',
                        '<div class="display-title">{F_CATEGORY} # - {Title}</div>',
                        '<div class="display-author">by {F_USERID}</div>',
                        '</div>',
                        '<div class="details">',
                        '<img src="{[this.getSrcPath(values)]}?w=264&h=288" height="264" width="288" />',
                        '<div class="details-info">',
                        "<span><b>Description:  </b>{F_DESC1}</span>",
                        "<span><b>Style #:  </b>{F_STYLE}</span>",
                        "<span><b>Theme:  </b>{F_DESC9}</span>",
                        "<span><b>Colorway:  </b>{F_DESC10}</span>",
                        "<span><b>Body #:  </b>{F_DESC5}</span>",
                        "<span><b>Code #:  </b>{F_DESC6}</span>",
                        "<span><b>Color:  </b>{F_DESC3}</span>",
                        "<span><b>Account:  </b>{F_DESC8}</span>",
                        "<span><b>Side:  </b>{F_MFLAG}</span>",
                        "<span><b>Type:  </b>{F_DESC2}</span>",
                        "<span><b>Vendor:  </b>{F_DESC4}</span>",
                        "<span><b>Price:  </b>{F_DESC7:usMoney}</span>",
                        "<span><b>Original:  </b>{F_OWNER}</span>",
                        "<span><b>Modified By:  </b>{F_MOD_USER_ID:capitalize}</span>",
                        "<span><b>Last Modified:  </b>{F_UPDATED_ON:this.formatDate}</span>",
                        "</div>",
                        {
                            getStyle: function(a, b){
                                return a.F_TYPE != null && a.F_SIZE != null ? a.F_STYLE : (a.F_OWNER ? a.F_OWNER + ' ' : '') + a.F_STYLE;
                            },
                            getBody: function(a, b){
                                return Ext.util.Format.stripScripts(a);
                            },
                            defaultValue: function(a){
                                return a?a: "Unknown";
                            },
                            getSrcPath: function(a){
                                var str;
                                if(!Ext.isEmpty(a.F_NAME) && !Ext.isEmpty(a.F_TYPE)) {
                                    //str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME.replace(/(\.[^.]+)$/, "_medium$1");
                                    str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME;
                                }
                                else {
                                    str = '../' + a.F_LINK + a.F_PATH + '/' + a.F_LOCATION + a.F_EXT;
                                }

                                return str;
                                //return a.replace(/(\.[^.]+)$/, "_medium$1");
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

        //Clear all Button...
        topbar.items.items[0].setHidden(false);
        //Save Button...
        topbar.items.items[3].setHidden(false);

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: [
                topbar.actView,
                topbar.actRefresh,
            {
                text: "Download",
                iconCls: "fa fa-download",
                handler: this.onCtxMnuDownloadClick,
                scope: this
            },
            {
                text: "Edit",
                iconCls: "fa fa-edit",
                disabled: false,
                handler: this.onCtxMnuEditClick,
                scope: this
            },
            {
                text: "Delete",
                iconCls: "fa fa-edit",
                disabled: false,
                handler: this.onCtxMnuDeleteClick,
                scope: this
            }]
        });

        topbar.insert(0,
            [{
                xtype: "combo",
                width: 112,
                hideLabel: true,
                valueField: "id",
                displayField: "text",
                value: "Body #",
                editable: false,
                reference: "filterSelection",
                bind: {store: "{categories}"},
                listeners: {
                    change: "onFilterItemChange",
                    scope: this.controller
                }
            },
            {
                xtype: "searchcombo",
                reference: 'searchcombo',
                width: 300,
                hidden: true,
                searchAt: 'dal-grid',
                listeners: {
                    //triggerclear: "onClearClick",
                    //triggersearch: "onSearchClick"
                }
            },
            {
                xtype: "gridsearchfield",
                reference: 'searchfield',
                width: 300,
                grid: "dal-grid",
                paramName: "F_DESC5"
            }]);

        topbar.insert(11,
            [{
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
                border: false,
                text: "Sort by:  ",
                reorderable: false
            },{
                xtype: "toolbar",
                border: false,
                padding: 0,
                margin: 0,
                plugins: {
                    xclass: "Ext.ux.BoxReorderer",
                    listeners: {
                        drop: this.updateStoreSorters,
                        scope: this
                    }
                },
                defaults: {
                    listeners: {
                        changeDirection: this.updateStoreSorters,
                        scope: this
                    }
                },
                items: [{
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
                }]
            },"-", {
                xtype: 'button',
                tooltip: 'Body Illustration Image Upload',
                ui: 'bootstrap-btn-default',
                iconCls: 'fa fa-pencil',
                handler: 'onOpenBodyClick',
                scope: this.controller
            },{
                xtype: 'button',
                tooltip: 'Components Image Upload',
                ui: 'bootstrap-btn-default',
                iconCls: 'fa fa-flickr',
                handler: 'onOpenComponentClick',
                scope: this.controller
            },{
                xtype: 'button',
                tooltip: 'Photo Upload',
                ui: 'bootstrap-btn-default',
                iconCls: 'fa fa-camera',
                handler: 'onOpenPhotoClick',
                scope: this.controller
            }]);

        //this.updateStoreSorters();

        this.relayEvents(topbar, ['actview', 'actrefresh', 'actsave', 'clearall']);
        this.relayEvents(k, ["open"], 'tab');
        this.relayEvents(m, ["rowdblclick", "itemcontextmenu"]);
        this.relayEvents(n, ["itemdblclick", "itemcontextmenu", 'viewready']);
        this.relayEvents(p, ["itemdblclick", "itemcontextmenu"]);


    },

    buildBottomBar: function(){
        var me = this,
            arr = [[25], [50], [100], [300], [500]],
            b = Ext.create("widget.combo", {
            name: "perpage",
            reference: 'pageSizer',
            width: 76,
            store: new Ext.data.ArrayStore({
                fields: ["id"],
                data: arr
            }),
            mode: "local",
            //value: "15",
            matchFieldWidth: true,
            triggerAction: "all",
            displayField: "id",
            valueField: "id",
            editable: false,
            forceSelection: true
        });

        b.on('render', function(c, e){
            var store = me.getViewModel().getStore("dals");
            c.setValue(store.getPageSize())
        }, this);

        b.on("select", function(e, a){
            var store = me.getViewModel().getStore("dals");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return[{
            xtype: "pagingtoolbar",
            dock: "bottom",
            name: "pagingtb",
            displayInfo: true,
            bind: {
                store: "{dals}"
            },
            style: {borderWidth: "0px"},
            items: ["-", b, "Per Page"]
        },'-',{
            xtype: 'button',
            iconCls: 'fa fa-search-plus',
            text: 'Original',
            enableToggle: true,
            toggleHandler: function(btn, pressed){

                var r = pressed ? arr.unshift([15]) : arr.shift();
                //console.log(arr,r);
                b.setDisabled(pressed);
                b.getStore().setData(arr);
                b.setValue(pressed ? [15] : [50]);
                b.fireEvent('select', b);
            }
        },{
            xtype: 'button',
            text: 'Cust. Info',
            name: 'btnCustInfo',
            iconCls: 'fa fa-info-circle',
            hidden: true,
            enableToggle: true,
            disabled: true,
            toggleHandler: function(btn, pressed){
                var store = me.getViewModel().getStore("dals"),
                    strUrl = pressed ? '/api/Dals/acct' : '/api/Dals'

                //console.log(store)
                //store.getProxy().setUrl(strUrl);
                //store.load();
            }
        }]
    },

    onDestroy: function(){
        this.contextmenu.destroy();
        this.callParent(arguments)
    },

    onCtxMnuOpenClick: function(i, h){
        var g=this.lookupReference("multiview"),
            ctn = g.lookupReference('center'),
            j = ctn.getLayout().getActiveItem(),

        //j=g.lookupReference("grid"),
            e=j.getSelectionModel().getSelection()[0];

        this.fireEvent("ctxmnuopenclick", e, i);
    },

    onCtxMnuRefreshClick: function(i, h){
        var g=this.lookupReference("multiview"),
            ctn = g.lookupReference('center'),
            j = ctn.getLayout().getActiveItem(),

        //j=g.lookupReference("grid"),
            e=j.getSelectionModel().getSelection()[0];

        this.fireEvent("ctxmnurefreshclick", e, i)
    },

    onCtxMnuDownloadClick: function(i, h){
        var g=this.lookupReference("multiview"),
            ctn = g.lookupReference('center'),
            j = ctn.getLayout().getActiveItem(),

        //j=g.lookupReference("grid"),
            e=j.getSelectionModel().getSelection()[0];

        this.fireEvent("ctxmnudownloadclick", e, i);
    },

    onCtxMnuEditClick: function(i, h){
        var g=this.lookupReference("multiview"),
            ctn = g.lookupReference('center'),
            j = ctn.getLayout().getActiveItem(),

        //j=g.lookupReference("grid"),
        e=j.getSelectionModel().getSelection()[0];

        this.fireEvent("ctxmnueditclick", e, i);
    },

    onCtxMnuDeleteClick: function(i, h){
        var g=this.lookupReference("multiview"),
            ctn = g.lookupReference('center'),
            j = ctn.getLayout().getActiveItem(),

        //j=g.lookupReference("grid"),
            e=j.getSelectionModel().getSelection()[0];

        this.fireEvent("ctxmnudeleteclick", e, i);
    },

    onCtxMnuBookmarkClick: function(i, h){
        var g=this.lookupReference("multiview"),
            ctn = g.lookupReference('center'),
            j = ctn.getLayout().getActiveItem(),

        //j=g.lookupReference("grid"),
            e=j.getSelectionModel().getSelection()[0];

        this.fireEvent("ctxmnubookmarkclick", e, i);
    },

    getSorters: function(){
        var h=[],
        f = this.lookupReference("multiview"),
        g = f.getReferences().topbar;
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
        var c = this.getSorters(),
        d = this.getViewModel();
        if(c.length > 0){
            d.getStore("dals").sort(c)
        }
    }
});


Ext.define("Vega.view.sales.Pow", {
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.sales.PowController',
        'Vega.view.sales.PowModel',
        'Vega.view.sales.Grid',
        'Vega.view.sales.View',
        'Vega.view.sales.edit.Form',
        'Vega.view.Display',
        'Ext.ux.form.SearchComboBox'
    ],

    alias: "widget.pow",

    config: {
        activeState: null,
        defaultActiveState: "default"
    },

    controller: "pow",
    viewModel: {
        type: "pow"
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
        ctxmnuopenclick: "onContextMenuOpenClick",
        ctxmnurefreshclick: "onContextMenuRefreshClick",
        ctxmnueditclick: "onContextMenuEditClick",
        ctxmnubookmarkclick: "onContextMenuBookmarkClick"
    },

    initComponent: function(){
        var me = this;

        me.contextmenu = this.buildContextMenu();

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
                    xtype: "pow-grid",
                    reference: "grid",
                    scrollable: true,
                    listeners: {
                        select: {
                            fn: "onSelect",
                            scope: this.controller
                        }
                    },
                    flex:2
                },
                {
                    xtype: "pow-view",
                    reference: "icons",
                    listeners: {
                        select: {
                            fn: "onSelect",
                            scope: this.controller
                        }
                    }
                },
                {
                    xtype: "pow-view",
                    reference: "tiles",
                    listeners: {
                        select: {
                            fn: "onSelect",
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
                    bind:{
                        store: "{pows}"
                    },
                    style: {borderWidth:"0px"},
                    dock: "bottom",
                    displayInfo: true
                }]
            },{
                title: "PRE-ADVISE",
                iconCls: "fa fa-file-text-o",
                reference: "preview",
                inTab: true,
                tbar:[{
                    text: 'New',
                    iconCls: 'fa fa-plus-circle',
                    ui: 'default',
                    handler: 'onNewClick'
                },{
                    text: 'Refresh',
                    iconCls: 'fa fa-refresh',
                    ui: 'default',
                    handler: function(){

                    }
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

        i.items.items[0].setHidden(true);

        i.insert(0,
            [{
                xtype: "combo",
                width: 112,
                hideLabel: true,
                valueField: "field",
                displayField: "label",
                value: "P.O.W #",
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: "{category}"
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
                width: 300,
                hidden: true,
                listeners: {
                    triggerclear: "onClearClick",
                    triggersearch: "onSearchClick",
                    scope: this.controller
                }
            },
            {
                xtype: "gridsearchfield",
                width: 300,
                grid: "pow-grid",
                paramName: "PowNo"
            }]
        );

        this.relayEvents(i, ["newclick", "refreshclick"]);
        this.relayEvents(k, ["opentab"]);
        this.relayEvents(m, ["rowdblclick", "itemcontextmenu"]);
        this.relayEvents(n, ["itemdblclick", "itemcontextmenu"])
    },

    buildContextMenu:function(){
        return Ext.create("Ext.menu.Menu", {
            items:[{
                text:"View",
                iconCls:"fa fa-file-o",
                handler:"onCtxMnuOpenClick",
                scope:this
            },
            {
                text:"Refresh",
                iconCls:"fa fa-refresh",
                handler:"onCtxMnuRefreshClick",
                scope:this
            },
            {
                text:"Edit",
                iconCls:"fa fa-edit",
                disabled:true,
                handler:"onCtxMnuEditClick",
                scope:this
            }]
        })
    },

    onDestroy:function(){
        this.contextmenu.destroy();
        me.callParent(arguments)
    },

    onCtxMnuOpenClick:function(i, h){
        var g=this.lookupReference("multiview"),
        j=g.lookupReference("grid"),
        e=j.getSelection()[0];
        this.fireEvent("ctxmnuopenclick", e, i)
    },

    onCtxMnuRefreshClick:function(i, h){
        var g=this.lookupReference("multiview"),
        j=g.lookupReference("grid"),
        e=j.getSelection()[0];
        this.fireEvent("ctxmnurefreshclick", e, i)
    },

    onCtxMnuEditClick:function(i, h){
        var g=this.lookupReference("multiview"),
        j=g.lookupReference("grid"),
        e=j.getSelectionModel().selected.items[0];
        this.fireEvent("ctxmnueditclick", e, i)
    },

    onCtxMnuBookmarkClick:function(i, h){
        var g=this.lookupReference("multiview"),
        j=g.lookupReference("grid"),
        e=j.getSelectionModel().selected.items[0];
        this.fireEvent("ctxmnubookmarkclick", e, i)
    }
});


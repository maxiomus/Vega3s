
Ext.define("Vega.view.notice.Grid", {
    extend: 'Ext.grid.Panel',

    requires: [
        "Vega.view.notice.GridController",
        "Vega.view.notice.GridModel",
        'Ext.ux.PreviewPlugin',
        'Ext.overrides.ux.PreviewPlugin',
        //'Ext.grid.feature.RowBody',
        'Ext.grid.plugin.BufferedRenderer'
    ],

    alias: 'widget.notice-grid',

    controller: "notice-grid",
    viewModel: {
        type: "notice-grid"
    },

    cls: "notice-grid",
    stateful: true,
    stateId: "notice-grid",
    stateEvents: ["columnmove","columnresize","groupchange","bodyresize"],
    columnLines: false,
    border: false,

    bind:{
        store:"{notices}"
    },

    config: {

    },

    listeners: {
        select:{
            fn: "onSelect",
            scope: this.controller
        },
        itemcontextmenu:"onItemContextMenu"
    },

    initComponent: function(){
        var me = this;
        me.columns = me.buildColumns();
        me.menu = me.buildContextMenu();

        Ext.applyIf(me, {
            selModel:{
                pruneRemoved:false
            },
            viewConfig:{
                itemId:"view",
                loadMask:true,
                stripeRows:true,
                trackOver:true,
                preserveScrollOnRefresh:true,
                deferInitialRefresh:true,
                emptyText:'<h1 style="margin:20px">No matching results</h1>',
                plugins:[{
                    pluginId:"preview",
                    ptype:"preview",
                    bodyField:"Description",
                    previewExpanded:true
                }],
                listeners:{
                    refresh:"onRefreshView"
                }
            },

            plugins:[{
                pluginId:"gridfilters",
                ptype:"gridfilters"
            }]
        });

        me.callParent(arguments);

        me.relayEvents(me.getStore(),["beforeload"]);
    },

    buildColumns:function(){
        return[{
            text:"Title",
            dataIndex:"Title",
            flex:1,
            renderer:this.formatTitle,
            filter:{type:"string"}
        },{
            text:"Author",
            dataIndex:"Author",
            hidden:true,
            width:200
        },{
            text:"Date",
            dataIndex:"CreatedOn",
            renderer:this.formatDate,
            width:200,
            filter:{
                type:"date"
            }
        }]
    },

    buildContextMenu:function(){
        return Ext.create("Ext.menu.Menu",{
            items:[{
                text:"Add to Bookmark",
                iconCls:"fa fa-bookmark",
                scope:this,
                handler:"onCtxMnuBookmarkClick"
            },{
                text:"Edit",
                iconCls:"fa fa-edit",
                scope:this,
                handler:"onCtxMnuEditClick"
            },{
                text:"Refresh",
                iconCls:"fa fa-refresh",
                scope:this,
                handler:"onCtxMnuRefreshClick"
            }]
        });
    },

    onDestroy:function(){
        this.menu.destroy();
        this.callParent(arguments)
    },

    onCtxMnuPrintClick:function(d,f){
        var e = this.getSelectionModel().selected.items[0];
        this.fireEvent("ctxmnuprintclick",e,d);
    },

    onCtxMnuRefreshClick:function(d,f){
        console.log("CtxMnuRefreshClick",this);
        var e = this.getSelectionModel().selected.items[0];
        this.fireEvent("ctxmnurefreshclick",e,d)
    },

    onCtxMnuEditClick:function(d,f){
        var e = this.getSelectionModel().selected.items[0];
        this.fireEvent("ctxmnueditclick",e,d)
    },

    onCtxMnuBookmarkClick:function(d,f){
        var e = this.getSelectionModel().selected.items[0];
        this.fireEvent("ctxmnubookmarkclick",e,d);
    },

    loadStore:function(){
        this.getStore().load()
    },

    formatTitle:function(d,f,e){
        return Ext.String.format('<div class="topic"><b>{0}</b><span class="author">{1}</span></div>',d,e.get("Author")||"Unknown");
    }
});

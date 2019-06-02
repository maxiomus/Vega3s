
Ext.define("Vega.view.dashboard.Favorite",{
    extend: "Ext.view.View",

    alias: 'widget.dashboard-favorite',

    requires: [
        "Vega.view.dashboard.FavoriteController",
        "Vega.view.dashboard.FavoriteModel"
    ],

    controller: "dashboard-favorite",
    viewModel: {
        type: "dashboard-favorite"
    },

    config: {
        myBookmarks: null
    },

    bind: {
        store: '{bookmarks}'
    },

    cls: 'my-bookmark',

    scrollable: 'y',
    trackOver: true,
    overItemCls: 'x-item-over',
    itemSelector: 'div.icon-wrap',

    style: {
        margin: '8px 8px 0 8px',
        padding: '0px 0 0 0px'
    },

    initComponent: function(){
        var me = this,
            store = me.store;

        this.tpl = this.buildTpl();
        this.contextmenu = this.buildContextMenu();

        Ext.applyIf(me, {

        });

        me.callParent(arguments);
    },

    listeners: {
        afterrender: 'onAfterRender',
        itemclick: 'onItemClick',
        itemcontextmenu: 'onItemContextMenu',
        ctxmnuopenclick: 'onContextMenuAddClick',
        ctxmnurefreshclick: 'onContextMenuRefreshClick',
        ctxmnuremoveclick: 'onContextMenuRemoveClick'
    },

    buildTpl: function(){
        return ['<tpl for=".">',
            //'<a href="#{Link}" style="text-decoration: none;">',
            '<div class="icon-wrap">',
                '<i style="vertical-align: middle" class="x-fa fa-arrow-circle-o-right fa-2x"></i>',
                '<span>{Module} - {Title}</span>',
            '</div>',
            //'</a>',
            '</tpl>',
            {
                formatDate: function(value){
                    var d = new Date(value * 1000);
                    return Ext.Date.format(d, 'F j, Y, g:i a');
                }
            }]
    },

    buildContextMenu: function(){
        return Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Refresh',
                //glyph: 79,
                iconCls: 'x-fa fa-refresh',
                handler: this.onCtxMnuRefreshClick,
                scope: this
            },{
                text: 'Remove Bookmark',
                //glyph: 88,
                iconCls: 'x-fa fa-remove',
                disabled: false,
                handler: this.onCtxMnuRemoveClick,
                scope: this
            }]
        });
    },

    onDestroy: function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    },

    onCtxMnuAddClick: function(item, e) {
        var record = this.getSelection()[0];
        this.fireEvent('ctxmnuaddclick', record, item);
    },

    onCtxMnuRefreshClick: function(item, e){
        //this.loadStore();
        var record = this.getSelection()[0];
        this.fireEvent('ctxmnurefreshclick', record, item);
    },

    onCtxMnuRemoveClick: function(item, e){
        //console.log(this.getSelectionModel().selected.items[0]);
        var record = this.getSelectionModel().selected.items[0];
        this.fireEvent('ctxmnuremoveclick', record, item);
    }
});

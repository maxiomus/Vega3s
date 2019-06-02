
Ext.define("Vega.view.dashboard.Pows",{
    extend: "Ext.view.View",

    alias: 'widget.dashboard-pows',

    requires: [
        "Vega.view.dashboard.PowsController",
        "Vega.view.dashboard.PowsModel"
    ],

    controller: "dashboard-pows",
    viewModel: {
        type: "dashboard-pows"
    },

    cls: 'dashboard-pow',

    scrollable: 'y',
    trackOver: true,
    overItemCls: 'x-item-over',
    itemSelector: 'div.thumb-wrap',

    style: {
        margin: '8px 8px 0 8px',
        padding: '0px 0 0 0px'
    },

    bind: {
        store: '{Pows}'
    },

    initComponent: function(){
        var me = this;

        this.tpl = this.buildTpl();
        this.contextmenu = this.buildContextMenu();

        me.callParent(arguments);
    },

    listeners: {
        //afterrender: 'onAfterRender',
        itemclick: 'onItemClick',
        itemcontextmenu: 'onItemContextMenu',
        ctxmnurefreshclick: 'onContextMenuRefreshClick'
    },

    buildTpl: function(){
        return ['<tpl for=".">',
            //'<a href="#{Link}" style="text-decoration: none;">',
            '<div class="thumb-wrap">',
                '<i style="vertical-align: middle" class="x-fa fa-dot-circle-o fa-2x"></i>',
                '<span>POW # {powno} {status} ({customer:uppercase}) - {createdon:date("M j,Y,g:i a")}</span>',
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
                //handler: this.onCtxMnuRefreshClick,
                scope: this
            }]
        });
    },

    onDestroy: function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    },

    onCtxMnuRefreshClick: function(item, e){
        //this.loadStore();
        var record = this.getSelection()[0];
        this.fireEvent('ctxmnurefreshclick', record, item);
    }

});


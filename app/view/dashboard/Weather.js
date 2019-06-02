
Ext.define("Vega.view.dashboard.Weather",{
    extend: "Ext.view.View",

    alias: 'widget.dashboard-weather',

    requires: [
        "Vega.view.dashboard.WeatherController",
        "Vega.view.dashboard.WeatherModel"
    ],

    controller: "dashboard-weather",
    viewModel: {
        type: "dashboard-weather"
    },

    config: {
        myClimates: null
    },

    bind: {
        store: '{climates}'
    },

    cls: 'city-climate',

    trackOver: true,
    scrollable: 'y',
    overItemCls: 'x-item-over',
    itemSelector: 'div.thumb-wrap',

    style: {
        //margin: '10px'
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
        itemcontextmenu: 'onItemContextMenu',
        ctxmnuopenclick: 'onContextMenuAddClick',
        ctxmnurefreshclick: 'onContextMenuRefreshClick',
        ctxmnuremoveclick: 'onContextMenuRemoveClick',
        tooladdclick: 'onToolAddClick',
        toolrefreshclick: 'onToolRefreshClick'
    },

    buildTpl: function(){
        return ['<tpl for=".">',
                    '<div class="thumb-wrap">',
                        '<div class="location">{name}, {sys.country}</div>',
                        '<tpl for="weather">',
                            '<tpl if="xindex === 1">',
                            '<div class="thumb">',
                                '<img src="http://openweathermap.org/img/w/{icon}.png" alt="{description}">',
                            '</div>',
                            '</tpl>',
                        '</tpl>',
                        '<h2>{main.temp:round} &#8457</h2>',
                        '<tpl for="weather">',
                            '<tpl if="xindex === 1">',
                                '<div class="description">{description}</div>',
                            '</tpl>',
                        '</tpl>',
                        '<span> @ {dt:this.formatDate}</span>',
                    '</div>',
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
                text: 'Remove City',
                //glyph: 88,
                iconCls: 'x-fa fa-remove',
                disabled: false,
                handler: this.onCtxMnuRemoveClick,
                scope: this
            }]
        });
    },

    onDestroy: function(){
        console.log('Weather - onDestroy');
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
        record.store.load();
        //this.fireEvent('ctxmnurefreshclick', record, item);
    },

    onCtxMnuRemoveClick: function(item, e){
        //console.log(this.getSelectionModel().selected.items[0]);
        var record = this.getSelectionModel().selected.items[0];
        this.fireEvent('ctxmnuremoveclick', record, item);
    }
});

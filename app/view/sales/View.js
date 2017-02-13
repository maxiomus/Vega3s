
Ext.define("Vega.view.sales.View", {
    extend: 'Ext.view.View',

    requires: [
        'Vega.view.sales.ViewController',
        'Vega.view.sales.ViewModel'
    ],

    alias: "widget.sales-view",

    scrollable: "y",
    //loadMask: true,
    //loadingHeight: 300,
    //trackOver: false,
    cls: "multi-view",
    loadMask: true,
    overItemCls: "x-item-over",
    itemSelector: "div.thumb-wrap",
    preserveScrollOnRefresh: true,
    deferInitialRefresh: true,

    prepareData: function(f, d, e){
        Ext.apply(f, {
            viewStatus: localStorage.getItem("pow-seen-" + f.powhId) == "true" ? "visited" : ""
        });
        return f
    },

    listeners: {
        beforecontainerclick: function(){
            return false
        }
    },

    initComponent:function(){
        var me = this;
        //this.tpl = this.buildTemplate();

        me.callParent(arguments)
    },

    buildTemplate: function(){
        var b = new Ext.XTemplate('<tpl for=".">',
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
                    '<span style="font-size:11px;padding:4px;">{comments:ellipsis(30)}</span>',
                '</div>',
            '</div>',
            '</tpl>',
            '<div class="x-clear"></div>');

        return b
    }
});
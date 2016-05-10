
Ext.define("Vega.view.sales.View", {
    extend: 'Ext.view.View',

    requires: [
        'Vega.view.sales.ViewController',
        'Vega.view.sales.ViewModel'
    ],

    alias: "widget.pow-view",

    controller: "pow-view",
    viewModel: {
        type: "pow-view"
    },

    publishes: ["selectedPows"],

    bind:{
        store: "{pows}",
        selection: "{selectedPows}"
    },

    config:{

    },

    scrollable: "y",
    trackOver: false,
    loadMask: true,
    loadingHeight: 300,
    overItemCls: "x-item-over",
    itemSelector: "div.thumb-wrap",
    preserveScrollOnRefresh: true,
    deferInitialRefresh: true,

    cls: "multi-view",

    prepareData: function(f, d, e){
        Ext.apply(f, {
            viewStatus: localStorage.getItem("pow-seen-"+f.PID)=="true"?"visited":""
        });
        return f
    },

    listeners: {
        select: {
            fn: "onSelect",
            scope: this.controller
        },
        beforecontainerclick: function(){
            return false
        }
    },

    initComponent:function(){
        var me = this;
        this.tpl = this.buildTemplate();
        Ext.applyIf(me, {

        });

        me.callParent(arguments)
    },

    buildTemplate: function(){
        var b = new Ext.XTemplate('<tpl for=".">',
            '<div class="thumb-wrap {viewStatus}" id="mView-{PID}">',
            '<div class="thumb">',
            '<img src="{linkImage}" title="{Title}" />',
            "</div>",
            '<div class="post-data">',
            '<div class="post-title">POW # {PowNo} <i class="fa fa-check-square-o fa-lg viewIcon {viewStatus}"></i></div>',
            '<div class="post-date">{CreateOn:date("M j,Y,g:i a")}</div>',
            '<div class="post-author">Registered by {UserID:capitalize}</div>',
            "</div>",
            "<div>",
            "<span>{Customer:uppercase}</span>",
            "<span>{Status}</span>",
            "<span>{Type}</span>",
            "<span>{Division}</span>",
            '<div style="font-size:11px;padding:4px;">{Descript:ellipsis(30)}</div>',
            "</div>",
            "</div>",
            "</tpl>",
            '<div class="x-clear"></div>');

        return b
    },

    onSelect: function(g, f, e, h){

    }
});
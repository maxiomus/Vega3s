
Ext.define("Vega.view.dal.View", {
    extend: 'Ext.view.View',

    requires: [
        'Vega.view.dal.ViewController',
        'Vega.view.dal.ViewModel',
        "Ext.ux.button.MultiSortButton"
    ],

    alias: "widget.dal-view",

    controller: "dal-view",
    viewModel: {
        type: "dal-view"
    },

    /*
    publishes: ["selectedImage"],

    bind: {
        store: "{dals}",
        selection: "{selectedImage}"
    },
    */

    padding: '3 0 0 4',

    config: {

    },

    style: {
        borderTop: '1px solid #cfcfcf',
        borderBottom: '1px solid #cfcfcf'
    },

    scrollable: "y",
    trackOver: false,
    overItemCls: "x-item-over",
    itemSelector: "div.thumb-wrap",
    preserveScrollOnRefresh: true,
    deferInitialRefresh: true,
    enableTextSelection: false,
    //emptyText: '<h1 style="margin: 20px">No matching results</h1>',
    selectionModel: {
        mode: "MULTI"
    },

    prepareData: function(d){
        /*
        var c;
        switch(d.F_CATEGORY.toLowerCase()){
            case"body":
                c=d.F_DESC5;
                break;
            case"photos":
                c=(d.F_OWNER!=null?d.F_OWNER: "")+" "+d.F_NAME;
                break;
            default:
                c=d.F_DESC6;
                break
        }

        var b = d.F_CREATED_ON.getFullYear() + '/' + (d.F_CREATED_ON.getMonth() + 1) + '/' + d.F_CREATED_ON.getDate();

        Ext.apply(d, {Title: c, F_PATH: b});
        */
        return d;
    },

    listeners: {
        select: {fn: "onSelect"},
        beforecontainerclick: function(){return false;}
    },

    initComponent: function(){
        var b=this;
        Ext.applyIf(b, {

        });

        this.callParent(arguments);
    },

    onDestroy: function(){
        this.callParent(arguments);
    },

    onSelect: function(g, h, f, e){}

});

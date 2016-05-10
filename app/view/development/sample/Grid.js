/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.development.sample.Grid", {
    extend: 'Ext.grid.Panel',
    
    requires: [
        'Vega.view.development.sample.GridController',
        'Vega.view.development.sample.GridModel'
    ],

    alias: "widget.sample-grid",

    controller: "sample-grid",
    viewModel: {
        type: "sample-grid"
    },

    publishes: ["selectedSamples"],

    bind: {
        store: "{samples}",
        selection: "{selectedSamples}"
    },

    listeners: {
        select: "onSelect"
    },

    initComponent: function(){
        var b = this;
        Ext.applyIf(b, {
            columns: [{
                text: "Style",
                dataIndex: "style",
                width: 140,
                locked: false,
                filter: {type: "string"},
                renderer: function(f, e, a){
                    return f;
                }
            },
                {
                    text: "Body #",
                    dataIndex: "user2",
                    width: 140,
                    filter: {type: "string"},
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    text: "Fabric",
                    dataIndex: "fabrics",
                    width: 140,
                    hidden: false,
                    filter: {type: "string"},
                    renderer: function(i, h, a){
                        var k=Ext.util.Format;
                        if(!Ext.isEmpty(i)){
                            var l=i.split("(#)"),
                            j=k.capitalize(l[0]+" / "+l[1]);
                            h.tdAttr='data-qtip="'+j+'"';
                            return j;
                        }
                    }
                },
                {
                    text: "Print",
                    dataIndex: "prints",
                    width: 140,
                    filter: {type: "string"},
                    renderer: function(i, h, a){
                        var k=Ext.util.Format;
                        if(!Ext.isEmpty(i)){
                            var l=i.split("(#)"),
                            j=k.capitalize(l[0]+" / "+l[1]);
                            h.tdAttr='data-qtip="'+j+'"';
                            return j;
                        }
                    }
                },
                {
                    text: "Print Vendor",
                    dataIndex: "printVendor",
                    width: 140,
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    text: "Stone",
                    dataIndex: "stone",
                    width: 120,
                    hidden: false,
                    filter: {type: "string"},
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    text: "Designer",
                    dataIndex: "designer",
                    width: 120,
                    hidden: false,
                    filter: {type: "string"},
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    text: "Fab. Content",
                    dataIndex: "fabcontent",
                    width: 120,
                    hidden: true,
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    text: "Memo",
                    dataIndex: "memo",
                    filter: {type: "string"},
                    flex: 1,
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    text: "Created On",
                    dataIndex: "userTime",
                    filter: {type: "date"},
                    renderer: function(k, i, a){
                        if(k!=undefined){
                            var d=new Date(k);
                            function j(c){
                                return c<10 ? "0"+c : c;
                            }
                            var l = j(d.getUTCMonth()+1)+"-"+j(d.getUTCDate())+"-"+d.getUTCFullYear();
                            i.tdAttr='data-qtip="'+l+'"';
                            return l;
                        }
                    }
                }],

                selModel: {
                    pruneRemoved: false
                },

                viewConfig: {
                    loadMask: true,
                    stripeRows: true,
                    trackOver: true,
                    preserveScrollOnRefresh: true,
                    deferInitialRefresh: true,
                    emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                    getRowClass: function(a, g, f, h){
                        return"custom-row-style"
                    },
                    listeners: {

                    }
                },
                plugins: [{
                    ptype: "gridfilters"
                }]
        });

        this.callParent(arguments);

        b.contextmenu = Ext.create("Ext.menu.Menu", {
            items: [{
                text: "Refresh",
                iconCls: "icon-spinner6",
                action: "refresh"
            },
                {
                    text: "Print Tag",
                    iconCls: "icon-tag",
                    action: "printlabel",
                    handler: function(){

                    }
                },
                {
                    text: "Upload",
                    iconCls: "icon-upload",
                    action: "upload",
                    handler: function(){

                    }
                }]
        });
    }
});


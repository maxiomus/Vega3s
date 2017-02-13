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
        var me = this;
        Ext.applyIf(me, {
            columns: [{
                text: "Style",
                dataIndex: "style",
                width: 140,
                locked: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                text: "Body #",
                dataIndex: "user2",
                width: 140,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                text: "Fabric",
                dataIndex: "fabrics",
                width: 200,
                hidden: false,
                filter: {type: "string"},
                renderer: function(i, h, a){
                    var k=Ext.util.Format;
                    if(!Ext.isEmpty(i)){
                        var l=i.split("(#)"),
                        j=k.capitalize(l[0]+" / "+l[1]);
                        //h.tdAttr='data-qtip="'+j+'"';
                        return j;
                    }
                }
            },
            {
                text: "Print",
                dataIndex: "prints",
                width: 200,
                filter: {type: "string"},
                renderer: function(i, h, a){
                    var k=Ext.util.Format;
                    if(!Ext.isEmpty(i)){
                        var l=i.split("(#)"),
                        j=k.capitalize(l[0]+" / "+l[1]);
                        //h.tdAttr='data-qtip="'+j+'"';
                        return j;
                    }
                }
            },
            {
                text: "Print Vendor",
                dataIndex: "prints",
                filter: {
                    type: "string"
                },
                width: 140,
                renderer: function(i, h, a){
                    var k=Ext.util.Format;
                    if(!Ext.isEmpty(i)){
                        var l=i.split("(#)");
                        //h.tdAttr='data-qtip="'+j+'"';
                        return l[2];
                    }
                }
            },
            {
                text: "Stone",
                dataIndex: "stone",
                width: 120,
                hidden: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                text: "Designer",
                dataIndex: "designer",
                width: 120,
                hidden: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
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
                text: '<i class="fa fa-paperclip fa-lg"></i>',
                dataIndex: 'Photos',
                width: 45,
                align: 'center',
                renderer: function(value, metaData, rec, rowIndex, colIndex, store, view){
                    metaData.tdStyle = 'font-weight:bold;color:' + (value > 0 ? 'green' : 'transparent');
                    if(value > 0){
                        return '<i class="fa fa-check-circle-o fa-lg"></i>';
                    }
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
                preserveScrollOnReload: true,
                deferInitialRefresh: true,
                emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                getRowClass: function(a, g, f, h){
                    return "custom-row-style";
                },
                listeners: {
                    render: function(view){
                        //var view = grid.getView();
                        view.tip = Ext.create('Ext.tip.ToolTip', {
                            // The overall target element.
                            target: view.el,
                            // Each grid row causes its own separate show and hide.
                            //delegate: view.itemSelector,
                            delegate: view.cellSelector,
                            // Moving within the row should not hide the tip.
                            trackMouse: true,
                            // Render immediately so that tip.body can be referenced prior to the first show.
                            renderTo: Ext.getBody(),
                            listeners: {
                                // Change content dynamically depending on which element triggered the show.
                                beforeshow: function updateTipBody(tip) {
                                    var trigger = tip.triggerElement,
                                        parent = tip.triggerElement.parentElement,
                                        columnTitle = view.getHeaderByCell(trigger).text,
                                        columnDataIndex = view.getHeaderByCell(trigger).dataIndex,
                                        columnText = view.getRecord(parent).get(columnDataIndex);

                                    if(!Ext.isEmpty(columnText)){
                                        var xf = Ext.util.Format;

                                        if(columnDataIndex == 'fabrics'){
                                            var l = columnText.split("(#)"),
                                                columnText = xf.capitalize(l[0]+" / "+l[1]);
                                        }

                                        if(columnDataIndex == 'prints'){
                                            var l = columnText.split("(#)"),
                                                columnText = xf.capitalize(l[0]+" / "+l[1]);

                                        }
                                        //tip.update(view.getRecord(tip.triggerElement).get('BODYIMG'));
                                        tip.update(columnText);
                                    }
                                    else {
                                        return false;
                                    }

                                }
                            }
                        });
                    }
                }
            },
            plugins: [{
                ptype: "gridfilters"
            }]
        });

        this.callParent(arguments);
    }
});


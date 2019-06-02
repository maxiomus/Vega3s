/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.development.style.Grid", {
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.development.style.GridController',
        'Vega.view.development.style.GridModel',
        'Ext.grid.plugin.Exporter'
    ],

    alias: "widget.style-grid",

    controller: "style-grid",
    viewModel: {
        type: "style-grid"
    },

    style: {
        borderTop: '1px solid #cfcfcf',
        borderBottom: '1px solid #cfcfcf'
    },

    selModel: {
        mode: 'MULTI',
        pruneRemoved: false
    },

    viewConfig: {
        //loadingHeight: 100,
        stripeRows: true,
        trackOver: true,
        //enableTextSelection: false,

        preserveScrollOnRefresh: true,
        //preserveScrollOnReload: true,
        //deferInitialRefresh: true,
        deferEmptyText: true,
        //emptyText: '<h1 style="margin: 20px">No matching results</h1>',
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
                                    var l = columnText.split("(#)");
                                    columnText = xf.capitalize(l[0]+" / "+l[1]);
                                }

                                if(columnDataIndex == 'prints'){
                                    var m = columnText.split("(#)");
                                    columnText = xf.capitalize(m[0]+" / "+m[1]);

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
    },{
        ptype: 'gridexporter'
    }],

    listeners: {
        //select: "onSelect"
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            columns: [{
                text: "Style",
                dataIndex: "style",
                width: 140,
                //locked: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                text: "Color",
                dataIndex: "color",
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
                text: "Description",
                dataIndex: "descript",
                width: 200,
                hidden: true,
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
                text: "Fabric",
                dataIndex: "fabrics",
                width: 200,
                hidden: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
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
                text: "Fab. Content",
                dataIndex: "fabcontent",
                width: 200,
                hidden: true,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                text: "Print",
                dataIndex: "prints",
                width: 200,
                filter: {
                    operator: 'st',
                    type: "string"
                },
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
                //dataIndex: "prints",
                hidden: false,
                filter: {
                    operator: 'st',
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
                width: 80,
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
                text: "Division",
                dataIndex: "division",
                hidden: true,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                text: "Size Cat.",
                dataIndex: "sizeCat",
                hidden: true,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                text: "Proc. Type",
                dataIndex: "processtype",
                hidden: true,
                filter: {
                    type: "list"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                text: "Group",
                dataIndex: "grp",
                width: 120,
                hidden: true,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                text: "Sub. Cat",
                dataIndex: "subcategory",
                width: 120,
                hidden: true,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                text: "Cost",
                dataIndex: "cost",
                width: 80,
                hidden: true,
                renderer: function(v, meta, rec){
                    var xf = Ext.util.Format;

                    return v ? xf.usMoney(v) : '';
                }
            },
            {
                text: "C. Cost",
                dataIndex: "confirmCost",
                width: 80,
                align: 'center',
                hidden: false,
                renderer: function(v, meta, rec){
                    var xf = Ext.util.Format;

                    return v ? (v % 1 !== 0 ? xf.usMoney(v) : v) : '';
                }
            },
            {
                text: "Cost",
                dataIndex: "cost",
                width: 80,
                align: 'center',
                hidden: true,
                renderer: function(v, meta, rec){
                    var xf = Ext.util.Format;

                    return v ? xf.usMoney(v) : '';
                }
            },
            {
                text: '<i style="text-align: center;" class="x-fa fa-paperclip fa-lg"></i>',
                dataIndex: 'photos',
                width: 45,
                align: 'center',
                renderer: function(value, metaData, rec, rowIndex, colIndex, store, view){
                    var strValue = value != 0 ? value : '',
                        icon = '<i class="x-fa fa-check-circle-o fa-lg fa-fw green-txt"></i>';
                    //metaData.tdStyle = 'font-weight:bold;color:' + (rec.data.mp ? 'green' : 'transparent');

                    if(rec.data.name){
                        strValue = icon+'<div>'+value+'</div>';
                    }

                    return strValue;
                }
            },
            {
                text: 'Market',
                dataIndex: 'user3',
                hidden: true,
                filter: {
                    operator: 'eq',
                    type: 'string'
                }
            },
            {
                text: "Memo",
                dataIndex: "memo",
                hidden: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                flex: 1
            },
            {
                text: "Created On",
                dataIndex: "userTime",
                filter: {type: "date"},
                renderer: function(k, i, a){
                    if(k!=undefined){
                        var d=new Date(k),
                        j = function(c){
                            return c<10 ? "0"+c : c;
                        };
                        var l = j(d.getUTCMonth()+1)+"-"+j(d.getUTCDate())+"-"+d.getUTCFullYear();
                        i.tdAttr='data-qtip="'+l+'"';
                        return l;
                    }
                }
            }]
        });

        this.callParent(arguments);
    }
});

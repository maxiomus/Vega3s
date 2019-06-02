
Ext.define("Vega.view.production.WIP", {
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.production.WIPController',
        'Vega.view.production.WIPModel',
        'Vega.view.production.windows.request.Form',
        'Ext.grid.plugin.Exporter'
    ],

    alias: 'widget.prod-wip',

    controller: "prod-wip",
    viewModel: {
        type: "prod-wip"
    },

    cls: "shadow-panel",

    header: false,
    margin: '0 0 0 4',

    session: {},

    listeners: {
        actrefresh: "onActionRefresh",
        clearall: 'onClearFilters',
        itemcontextmenu: 'onItemContextMenu'
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Production W.I.P",
                iconCls: "x-fa fa-server",
                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },
                mainItems: [{
                    xtype: "grid",
                    reference: "grid",
                    scrollable: true,

                    flex: 2,

                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    },
                    /*
                    split: {
                        size: 5
                    },
                    layout: {
                        type: 'border'
                    },
                    lockedGridConfig: {
                        header: false,
                        collapsible: true,
                        //width: 325,
                        //minWidth: 290,
                        forceFit: true
                    },
                    */
                    bind: {
                        store: "{wips}"
                    },

                    columns: this.buildColumns(),

                    cls: "wip-grid",
                    stateful: true,
                    stateId: "wip-grid",
                    //stateEvents: ["columnmove","columnresize","columnshow","columnhide"],
                    //loadMask: true,
                    //columnLines: true,
                    multiColumnSort: true,
                    // We do not need automatic height synching.
                    syncRowHeight: false,

                    selModel: {
                        pruneRemoved: false
                    },
                    viewConfig: {
                        //loadingHeight: 400,
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh:true,
                        //deferInitialRefresh:true,
                        trailingBufferZone: 20,
                        leadingBufferZone: 40,

                        emptyText: '<h1 style="margin:20px">No matching results</h1>',
                        getRowClass: function(rec, rowIndex, rowParams, store){
                            var acts = me.lookupViewModel().getStore('activities'),
                            // Regex Pattern xx-xx-xxxxC
                                re = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9]{2}[DSC]{1}/g,
                                yellow = false, red = false;

                            acts.each(function(a){
                                var col = a.data.id,
                                    value = rec.get(col),
                                    rs, due, sent, comp;

                                if(!Ext.isEmpty(value)){
                                    while((rs = re.exec(value)) != null){
                                        //console.log(rowIndex, col, rs)
                                        switch ((rs[0]).slice(-1)){
                                            case 'D':
                                                due = rs[0].slice(0,-1);
                                                break;
                                            case 'S':
                                                sent = rs[0].slice(0,-1);
                                                break;
                                            case 'C':
                                                comp = rs[0].slice(0,-1);
                                                break;
                                        }
                                    }

                                    //console.log(rec.data.powdId, due, sent, comp)
                                    if(!Ext.isEmpty(due) && Ext.isEmpty(sent) && Ext.isEmpty(comp)){
                                        var dd = new Date(due),
                                            bd = new Date(due),
                                            b7 = bd.setDate(bd.getDate()-5),
                                            today = (new Date()).setHours(0,0,0,0);

                                        //console.log(b7, today, b7 < today);
                                        if(b7 < today){
                                            yellow = true;
                                        }

                                        if(dd < today){
                                            red = true;
                                        }
                                    }
                                }
                            });

                            if(red){
                                return 'overdue-row';
                            }

                            if(yellow){
                                return 'neardue-row';
                            }
                        }
                    },
                    plugins: [{
                        ptype: "gridfilters"
                    },{
                        ptype: 'gridexporter'
                    }],
                    listeners: {
                        render: {
                            //fn: 'onGridRender',
                            //scope: this.controller
                        },
                        select: {
                            fn: "onSelect",
                            scope: this.controller
                        }
                    }
                }],
                displayItems: [{
                    xtype: "tabpanel",
                    minTabWidth: 140,
                    tabBar: {
                        defaults: {
                            textAlign: 'left',
                            border: true,
                            style: {
                                //border: '1px solid #ccc'
                            }
                        }
                    },
                    items: [{
                        xtype: 'prod-task',
                        title: 'Tasks',
                        iconCls: "x-fa fa-tasks",
                        reference: 'taskgrid',
                        scrollable: true,
                        border: false,
                        bind: {
                            store: '{grid.selection.tasks}'
                        }
                    },{
                        xtype: 'prod-childpo',
                        title: 'Child POs',
                        iconCls: 'x-fa fa-th-list',
                        reference: 'cpogrid',
                        scrollable: true,
                        border: false,
                        bind: {
                            store: '{cpos}'
                        }
                    },{
                        xtype: 'panel',
                        title: 'Events',
                        iconCls: 'x-fa fa-calendar-check-o',
                        scrollable: true
                    }]
                }],
                bbar: [{
                    xtype: "pagingtoolbar",
                    bind: {
                        store: "{wips}"
                    },
                    style: {borderWidth: "0px"},
                    dock: "bottom",
                    displayInfo: true
                }]
            }]
        });

        me.callParent(arguments);

        var multiview = me.lookupReference("multiview"),
            grid = multiview.lookupReference("grid"),
            display = multiview.lookupReference("display"),
            topbar = multiview.lookupReference("topbar");

        topbar.items.items[0].setHidden(false);
        topbar.items.last().setHidden(true);
        topbar.insert(0,
            [{
                xtype: "combo",
                width: 112,
                hideLabel: true,
                valueField: "field",
                displayField: "label",
                value: "P.O.W #",
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: "{categories}"
                },
                listeners: {
                    change: "onFilterItemChange",
                    scope: this.controller
                }
            },
            {
                xtype: "searchcombo",
                reference: 'searchcombo',
                width: 300,
                hidden: true,
                listeners: {
                    triggerclear: "onClearClick",
                    triggersearch: "onSearchClick",
                    scope: this.controller
                }
            },
            {
                xtype: "gridsearchfield",
                reference: 'searchfield',
                width: 300,
                grid: "grid",
                paramName: "powno"
            }]
        );

        topbar.insert(11,
            {
                xtype: "cycle",
                ui: "default",
                prependText: "Show: ",
                iconCls: "x-fa fa-filter",
                showText: true,
                reference: "statusSelect",
                changeHandler: "onStatusChange",
                scope: this.controller,
                menu: {
                    items: [{
                        text: "All",
                        iconCls: "x-fa fa-filter",
                        type: 'all',
                        checked: false
                    },{
                        text: "WIP",
                        iconCls: "x-fa fa-filter",
                        type: 'wip',
                        checked: true
                    },{
                        text: "Shipped",
                        iconCls: "x-fa fa-filter",
                        type: 'ship',
                        checked: false
                    }]
                }
            }
        );

        topbar.insert(15, {
            xtype: 'button',
            iconCls: 'x-fa fa-external-link-square',
            text: 'Export',
            //handler: 'onExport',
            //scope: this.controller

            menu: {
                items: [{
                    text: 'With Image',
                    iconCls: 'x-fa fa-file-image-o',
                    handler: 'onExport',
                    scope: this.controller
                },{
                    text: 'Data Only',
                    iconCls: 'x-fa fa-file-excel-o',
                    handler: function(b){
                        grid.saveDocumentAs({
                            type: 'excel',
                            title: 'Production W.I.P',
                            fileName: 'wip as of ' + Ext.Date.format(new Date(), 'Y-m-d') + '.xlsx'
                        });
                    }
                }]
            }

        });

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [topbar.actRefresh,
                {
                    text: "Production Request",
                    iconCls: "x-fa fa-tag",
                    action: "prod-request",
                    handler: 'onOpenPreviewRequestClick',
                    scope: this.controller
                },
                {
                    text: "Copy T&A",
                    iconCls: "x-fa fa-copy",
                    //action: "printlabel",
                    handler: 'onCopyTNAClick',
                    scope: this.controller
                }
            ]
        });

        this.relayEvents(grid, ["itemcontextmenu"]);
        this.relayEvents(topbar, ["actrefresh", "clearall"]);
    },

    onDestroy: function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    },

    buildColumns: function(){
        var ddRenderer = function(val, meta, rec, rIdx, cIdx, store){
            var ns = "",
                ds = val.split(","),
                ca = {D:'blue', S:'orange', C:'green'},
                color, due, sent, comp;

            Ext.Array.each(ds, function(d, i, a){
                switch (d.slice(-1)) {
                    case 'D':
                        due = d.slice(0,-1);
                        break;
                    case 'S':
                        sent = d.slice(0,-1);
                        break;
                    case 'C':
                        comp = d.slice(0,-1);
                        break;
                }
            });

            Ext.Array.each(ds, function(d, i, a){
                color = ca[d.slice(-1)];

                if(!Ext.isEmpty(due) && Ext.isEmpty(sent) && Ext.isEmpty(comp)){
                    var dd = new Date(due),
                        bd = new Date(due),
                        b7 = bd.setDate(bd.getDate()-5),
                        today = (new Date()).setHours(0,0,0,0);

                    if(b7 < today){
                        color = 'red';
                    }

                    if(dd < today){
                        color = 'red';
                    }
                }

                ns += Ext.String.format('<div style="color:{0}">{1}</div>', color, d);
            });

            return ns;
        };

        return [
            {
                text: 'Body', dataIndex: 'bodyimgsrc', width:88, locked: false, hidden: false, draggable: false, ignoreExport: true,
                renderer: function (value, metadata, record) {
                    var tpl = '<span class="file"><img style="vertical-align: middle;width:64px;margin:0 2px 0 0;" src="../{0}{1}" alt="{2}" /></span>';

                    //var xf = Ext.util.Format;
                    if (!Ext.isEmpty(value)) {
                        //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tpl, value, "?w=264&h=288", record.data.BODYIMG) + '"';
                        //var tmp = '<img src="../DLIB/BLU-ILLUSTRATIONS/{0}.jpg?w=264&h=288" />';
                        //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tmp, value) + '"';

                        return Ext.String.format(tpl, value, "?w=64&h=64", value);
                    }

                    return value;
                }
            },
            {
                text: 'Print', dataIndex: 'printimgsrc', width:88, locked: false, hidden: false, draggable: false, ignoreExport: true,
                renderer: function (value, p, record) {
                    var tpl = '<span class="file"><img style="vertical-align: middle;width:64px;margin:0 2px 0 0;" src="../{0}{1}" alt="{2}" /></span>';

                    //var xf = Ext.util.Format;
                    if (!Ext.isEmpty(value)) {
                        //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tpl, value, "?w=264&h=288", record.data.BODYIMG) + '"';
                        //var tmp = '<img src="../DLIB/BLU-ILLUSTRATIONS/{0}.jpg?w=264&h=288" />';
                        //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tmp, value) + '"';

                        return Ext.String.format(tpl, encodeURIComponent(value), "?w=64&h=64", value);
                    }
                    return value;
                }
            },
            {
                text: 'POW #', dataIndex: 'powno', width:74, locked: false,
                filter: {
                    type: 'string'
                },
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var tpl = '<a href="#pow/tab/{0}">{1}</a>';

                    return Ext.String.format(tpl, rec.data.powhId, val);
                }
            },
            {
                text: 'Customer', dataIndex: 'customer', width:94, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Division', dataIndex: 'division', width:94, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'CUST PO #', dataIndex: 'custpo', width:94, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Label', dataIndex: 'label', width:94, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Sizes', dataIndex: 'sizes', width:94, locked: false
            },
            {
                xtype: 'datecolumn', text: 'CXL', dataIndex: 'cxldate', width:88, locked: false, format: 'm-d-Y',
                exportStyle: {
                    format: 'Short Date',
                    alignment: {
                        horizontal: 'Right'
                    }
                },
                filter: {
                    type: 'date'
                }
            },
            {
                xtype: 'datecolumn', text: 'DC', dataIndex: 'dcdate', width:88, locked: false, format: 'm-d-Y',
                exportStyle: {
                    format: 'Short Date',
                    alignment: {
                        horizontal: 'Right'
                    }
                },
                filter: {
                    type: 'date'
                }
            },
            {
                text: 'Style', dataIndex: 'style', width:94, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Color', dataIndex: 'color', width:94, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Body Ref #', dataIndex: 'bodyref', width:88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Body Desc', dataIndex: 'bodydesc', width:88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Stitch Desc', dataIndex: 'stitchdesc', width:88, locked: false,
                hidden: true
            },
            {
                text: 'Cost', dataIndex: 'cost', width:88, locked: false,
                renderer: Ext.util.Format.usMoney
            },
            {
                text: 'Selling Price', dataIndex: 'price', width:88, locked: false,
                renderer: Ext.util.Format.usMoney
            },
            {
                text: 'MSRP', dataIndex: 'msrp', width:88, locked: false,
                hidden: true
            },
            {
                text: 'Order Qty', dataIndex: 'units', width:88, locked: false,
                renderer: Ext.util.Format.numberRenderer('0,000')
            },
            {
                text: 'Factory', dataIndex: 'factory', width:88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Remarks', dataIndex: 'remarks', width:88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            //{   text: 'CUT/PO', dataIndex: 'cut_po', width: 88, locked: false  },
            {   xtype: 'datecolumn', text: 'Cut Created', dataIndex: 'orderDate', format: 'm-d-Y', width: 88, locked: false,
                exportStyle: {
                    format: 'Short Date',
                    alignment: {
                        horizontal: 'Right'
                    }
                },
                filter: {
                    type: 'date'
                }
            },
            {   text: 'Process Type', dataIndex: 'processType', width: 88, locked: false,
                filter: {
                    type: 'list',
                    dataIndex: 'processType'
                }
            },
            {   text: 'Cut Status', dataIndex: 'poh_status', width: 88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            //{   text: 'Division', dataIndex: 'poh_division', width: 88, locked: false  },
            //{   text: 'Customer', dataIndex: 'poh_customer', width: 88, locked: false  },
            {   text: 'Order Type', dataIndex: 'ordertype', width: 88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            //{   text: 'P.O.W #', dataIndex: 'poh_powno', width: 88, locked: false  },
            {   text: 'Cut MEMO', dataIndex: 'poh_memo', width: 88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {   text: 'Cut #', dataIndex: 'pono', width: 88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            //{   text: 'Status', dataIndex: 'pod_status', width: 88, locked: false  },
            //{   text: 'Memo', dataIndex: 'pod_memo', width: 88, locked: false  },
            {   xtype: 'numbercolumn', text: 'Total Unit', dataIndex: 'unitSum', width: 88, locked: false, format: '0,000',
                filter: {
                    type: 'number'
                }
            },
            //{   text: 'Price', dataIndex: 'pod_price', width: 88, locked: false  },
            {
                xtype: 'datecolumn', text: 'Ship Date', dataIndex: 'invDate', width:88, locked: false, format: 'm-d-Y',
                exportStyle: {
                    format: 'Short Date',
                    alignment: {
                        horizontal: 'Right'
                    }
                },
                filter: {
                    type: 'date'
                }
            },
            {
                xtype: 'numbercolumn', text: 'Ship Qty', dataIndex: 'invQty', width:88, locked: false, format: '0,000',
                filter: {
                    type: 'number'
                }
            },
            {   text: 'S.O #', dataIndex: 'sono', width: 88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            //{   text: 'Category', dataIndex: 'matcategory', width: 88, locked: false  },
            //{   text: 'Type', dataIndex: 'mattype', width: 88, locked: false  },
            {   text: 'Fabric', dataIndex: 'fab_code', width: 88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {   text: 'Fab. Color', dataIndex: 'fab_color', width: 88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {   text: 'Description', dataIndex: 'fab_desc', width: 88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {   text: 'Content', dataIndex: 'fabcontent', width: 88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {   text: 'Prints', dataIndex: 'prints', width: 88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {   text: 'Trims', dataIndex: 'trims', width: 88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {   text: 'Stone', dataIndex: 'stns', width: 88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'T&A REMARKS', dataIndex: 'tna_memo', width: 94, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'CAD', dataIndex: 'cad', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'COMMIT', dataIndex: 'com', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'CONCEPT', dataIndex: 'concept', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'CUT DUE', dataIndex: 'cut', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'CXL DUE', dataIndex: 'cxl', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'ECOMM', dataIndex: 'ecomm', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'EXIT FAC', dataIndex: 'ex', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'FABRIC DUE', dataIndex: 'fab', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'FIT APP', dataIndex: 'fit', width: 94, locked: false,
                renderer: ddRenderer
            },
            /*
            {
                text: 'IH', dataIndex: 'ih', width: 88, locked: false,
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var ns = "",
                        ds = val.split(",");

                    Ext.Array.each(ds, function(d, i, a){
                        ns += Ext.String.format('<div>{0}</div>', d);
                    })

                    return ns;
                }
            },
            */
            {
                text: 'INSPECTION', dataIndex: 'inspect', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'LAB TEST', dataIndex: 'lab', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'LABELS', dataIndex: 'labels', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'MARKER', dataIndex: 'marker', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'NDC', dataIndex: 'ndc', width: 94, locked: false,
                renderer: ddRenderer
            },
            /*
            {
                text: 'PACK', dataIndex: 'packing', width: 88, locked: false,
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var ns = "",
                        ds = val.split(",");

                    Ext.Array.each(ds, function(d, i, a){
                        ns += Ext.String.format('<div>{0}</div>', d);
                    })

                    return ns;
                }
            },
            */
            {
                text: 'PAPER DUE', dataIndex: 'paper', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'PP APP', dataIndex: 'pp', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'STONE', dataIndex: 'stone', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'TECH PACK', dataIndex: 'tech', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'TOP APP', dataIndex: 'topp', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'TRIM', dataIndex: 'trim', width: 94, locked: false,
                renderer: ddRenderer
            },
            {
                text: 'VISUAL', dataIndex: 'visual', width: 94, locked: false,
                renderer: ddRenderer
            },
            //{   text: 'CUT #', dataIndex: 'cutno', width: 88, locked: false  },
            {
                text: 'FABRIC S/R', dataIndex: 'fabsent', width: 94, locked: false,
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var ns = "",
                        ds = val.split(",");

                    if(!Ext.isEmpty(val)){
                        Ext.Array.each(ds, function(d, i, a){
                            ns += Ext.String.format('<div>{0}</div>', d);
                        });
                    }

                    return ns;
                }
            },
            {
                text: 'PRINT S/R', dataIndex: 'prtsent', width: 94, locked: false,
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var ns = "",
                        ds = val.split(",");

                    Ext.Array.each(ds, function(d, i, a){
                        ns += Ext.String.format('<div>{0}</div>', d);
                    });

                    return ns;
                }
            },
            {
                text: 'TRIM S/R', dataIndex: 'trmsent', width: 94, locked: false,
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var ns = "",
                        ds = val.split(",");

                    Ext.Array.each(ds, function(d, i, a){
                        ns += Ext.String.format('<div>{0}</div>', d);
                    });

                    return ns;
                }
            },
            {
                text: 'MAIN S/R', dataIndex: 'lblmainsent', width: 94, locked: false,
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var ns = "",
                        ds = val.split(",");

                    Ext.Array.each(ds, function(d, i, a){
                        ns += Ext.String.format('<div>{0}</div>', d);
                    });

                    return ns;
                }
            },
            {
                text: 'CARE S/R', dataIndex: 'lblcaresent', width: 94, locked: false,
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var ns = "",
                        ds = val.split(",");

                    Ext.Array.each(ds, function(d, i, a){
                        ns += Ext.String.format('<div>{0}</div>', d);
                    });

                    return ns;
                }
            },
            {
                text: 'SIZE S/R', dataIndex: 'lblsizesent', width: 94, locked: false,
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var ns = "",
                        ds = val.split(",");

                    Ext.Array.each(ds, function(d, i, a){
                        ns += Ext.String.format('<div>{0}</div>', d);
                    });

                    return ns;
                }
            },
            {
                text: 'PRICE S/R', dataIndex: 'pricesent', width: 94, locked: false,
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var ns = "",
                        ds = val.split(",");

                    Ext.Array.each(ds, function(d, i, a){
                        ns += Ext.String.format('<div>{0}</div>', d);
                    });

                    return ns;
                }
            },
            {
                text: 'TAG S/R', dataIndex: 'tagsent', width: 94, locked: false,
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var ns = "",
                        ds = val.split(",");

                    Ext.Array.each(ds, function(d, i, a){
                        ns += Ext.String.format('<div>{0}</div>', d);
                    });

                    return ns;
                }
            },
            {
                text: 'BAG S/R', dataIndex: 'bagsent', width: 94, locked: false,
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var ns = "",
                        ds = val.split(",");

                    Ext.Array.each(ds, function(d, i, a){
                        ns += Ext.String.format('<div>{0}</div>', d);
                    });

                    return ns;
                }
            }
        ];
    }
});

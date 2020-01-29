
Ext.define("Vega.view.production.Schedule",{
    extend: "Vega.view.Viewer",

    requires: [
        "Vega.view.production.ScheduleController",
        "Vega.view.production.ScheduleModel",
        'Ext.tip.ToolTip'
    ],

    alias: 'widget.prod-schedule',

    controller: "prod-schedule",
    viewModel: {
        type: "prod-schedule"
    },

    cls: "shadow-panel",
    header: false,
    margin: '0 0 0 4',

    listeners: {
        actrefresh: "onActionRefresh",
        clearall: 'onClearFilters'
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Production Schedule",
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
                        //borderTop: '1px solid #cfcfcf',
                        //borderBottom: '1px solid #cfcfcf'
                    },
                    bind: {
                        store: "{schedules}",
                        selection: "{selectedSchedules}"
                    },
                    columns: this.buildColumns(),
                    cls: "schedule-grid",
                    //stateful: true,
                    //stateId: "schedule-grid",
                    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

                    selModel: {
                        pruneRemoved: false
                    },
                    viewConfig: {
                        loadMask: true,
                        //loadingHeight: 100,
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh:true,
                        //deferInitialRefresh:true,
                        //emptyText: '<h1 style="margin:20px">No matching results</h1>',
                        getRowClass: function(a, g, f, h){
                            return "";
                        },
                        listeners: {
                            render: function (view) {
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

                                                if(columnDataIndex == 'BODYIMG' || columnDataIndex == 'PRINTIMG'){
                                                    var tpl = '<img src="../DLIB/BLU-ILLUSTRATIONS/{0}?w=264&h=288" height="264" width="288" />';
                                                    //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tmp, value) + '"';
                                                    columnText = Ext.String.format(tpl, columnText);
                                                }

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
                        render: {
                            fn: 'onGridRender',
                            scope: this.controller
                        },
                        select: {
                            //fn: "onSelect",
                            //scope: this.controller
                        }
                    }
                }],
                displayItems: [{
                    xtype: "display",
                    reference: "display"
                }],
                bbar: [{
                    xtype: "pagingtoolbar",
                    bind: {
                        store: "{schedules}"
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
                    store: "{category}"
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
                paramName: "POW"
            }]
        );

        topbar.insert(15, [{
            xtype: 'button',
            iconCls: 'x-fa fa-external-link-square',
            text: 'Export',
            handler: function(b){
                grid.saveDocumentAs({
                    type: 'excel',
                    title: 'Production Schedule Sheet',
                    fileName: 'pss ' + Ext.Date.format(new Date(), 'Y-m-d') + '.xlsx'
                });
            }
        }]);

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                topbar.actRefresh
            ]
        });

        this.relayEvents(topbar, ["actrefresh", "clearall"]);
    },

    onDestroy:function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    },

    buildColumns: function(){
        return [
            {
                text: 'BODY', dataIndex: 'BODYIMG', width:88, locked: false,
                renderer: function (value, metadata, rec) {
                    var tpl = '<span class="file"><img style="vertical-align: middle;width:64px;margin:0 2px 0 0;" src="../DLIB/BLU-ILLUSTRATIONS/{0}{1}" alt="{2}" /></span>';

                    //var xf = Ext.util.Format;
                    if (!Ext.isEmpty(value)) {
                        //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tpl, value, "?w=264&h=288", record.data.BODYIMG) + '"';
                        //var tmp = '<img src="../DLIB/BLU-ILLUSTRATIONS/{0}.jpg?w=264&h=288" />';
                        //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tmp, value) + '"';
                        return Ext.String.format(tpl, value, "?w=64&h=64", rec.data.BODYIMG);
                    }
                    return value;
                },
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'PRINT', dataIndex: 'PRINTIMG', width:88, locked: false,
                renderer: function (value, p, record) {
                    var tpl = "";

                    //var xf = Ext.util.Format;
                    if (!Ext.isEmpty(value)) {
                        var arr = value.split(",");

                        for (var i = 0; i < arr.length; i++) {
                            tpl = tpl + '<span class="file"><img style="vertical-align: middle;width:64px;margin:0 2px 0 0;" src="../DLIB/BLU-PRINTCAD/' + arr[i] + '.jpg?w=64&h=64" alt="' + arr[i] + '" /></span>';
                        }

                        return tpl;
                    }

                    return value;
                } ,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'POW', dataIndex: 'POW', width:74, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'CUSTOMER', dataIndex: 'CUSTOMER', width:94, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                xtype: 'datecolumn', text: 'CXL', dataIndex: 'CXL', width:88, locked: false, format: 'm-d-Y',
                filter: {
                    type: 'date'
                }
            },
            {
                xtype: 'datecolumn', text: 'PCXL', dataIndex: 'PCXL', width:88, locked: false, format: 'm-d-Y',
                filter: {
                    type: 'date'
                }
            },
            {
                text: 'PAT', dataIndex: 'PAT', width:88, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'NR', dataIndex: 'NR', width:94,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'FABRICS', dataIndex: 'FABRICS', width:134,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'COLOR', dataIndex: 'COLOR', width:94,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'STYLE', dataIndex: 'STYLE', width:94,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'CUTNO', dataIndex: 'CUTNO', width:88,
                filter: {
                    type: 'string'
                }
            },
            {
                xtype: 'datecolumn', text: 'Cut Issued', dataIndex: 'PDATE', width:88, format: 'm-d-Y',
                filter: {
                    type: 'date'
                }
            },
            { text: '1st Fabric', dataIndex: 'fab1', width:114 },
            { xtype: 'datecolumn', text: '1st Due', dataIndex: 'fdue1', width:88, format: 'm-d-Y'},
            { xtype: 'datecolumn', text: '1st Rcpt', dataIndex: 'frec1', width:88, format: 'm-d-Y' },
            { text: '2nd Fabric', dataIndex: 'fab2', width:114 },
            { xtype: 'datecolumn', text: '2nd Due', dataIndex: 'fdue2', width:88, format: 'm-d-Y'},
            { xtype: 'datecolumn', text: '2nd Rcpt', dataIndex: 'frec2', width:88, format: 'm-d-Y' },
            { text: '3rd Fabric', dataIndex: 'fab3', width:114 },
            { xtype: 'datecolumn', text: '3rd Due', dataIndex: 'fdue3', width:88, format: 'm-d-Y'},
            { xtype: 'datecolumn', text: '3rd Rcpt', dataIndex: 'frec3', width:88, format: 'm-d-Y' },
            { text: 'FaMemo', dataIndex: 'FaMemo', width:134 },
            { xtype: 'datecolumn', text: 'Cut Received', dataIndex: 'RouteDate', width:88, format: 'm-d-Y' },
            { xtype: 'datecolumn', text: 'Pat ETA', dataIndex: 'ETSDate', width:88, format: 'm-d-Y' },
            { xtype: 'datecolumn', text: 'Pat Rcpt', dataIndex: 'ShippedDate', width:88, format: 'm-d-Y' },
            { text: 'Pattern Memo', dataIndex: 'PaMemo', width:134 },
            { xtype: 'numbercolumn', text: 'QTY', dataIndex: 'QTY', width:88, format: '0,000' },
            { xtype: 'numbercolumn', text: 'C.QTY', dataIndex: 'CUTQTY', width:88, format: '0,000' },
            { text: 'CUT', dataIndex: 'CUT', width:94},
            { xtype: 'datecolumn',text: 'CUTOUT', dataIndex: 'CUTOUT', width:88, format: 'm-d-Y'},
            { xtype: 'datecolumn',text: 'CUTDUE', dataIndex: 'CUTDUE', width:88, format: 'm-d-Y'},
            { xtype: 'datecolumn',text: 'CUTIN', dataIndex: 'CUTIN', width:88, format: 'm-d-Y'},
            { text: 'SEWING', dataIndex: 'SEWING', width:94},
            { xtype: 'datecolumn',text: 'SEWOUT', dataIndex: 'SEWOUT', width:88, format: 'm-d-Y'},
            { xtype: 'datecolumn',text: 'SEWDUE', dataIndex: 'SEWDUE', width:88, format: 'm-d-Y'},
            { xtype: 'datecolumn',text: 'SEWIN', dataIndex: 'SEWIN', width:88, format: 'm-d-Y'},
            { text: 'PRINTNAME', dataIndex: 'PRINTNAME', width:94},
            { text: 'PRINT', dataIndex: 'PRINT', width:114},
            { xtype: 'datecolumn',text: 'PRTOUT', dataIndex: 'PRTOUT', width:88, format: 'm-d-Y'},
            { xtype: 'datecolumn',text: 'PRTDUE', dataIndex: 'PRTDUE', width:88, format: 'm-d-Y'},
            { xtype: 'datecolumn',text: 'PRTIN', dataIndex: 'PRTIN', width:88, format: 'm-d-Y'},
            { text: 'STONE', dataIndex: 'STONE', width:94},
            { xtype: 'datecolumn',text: 'STNOUT', dataIndex: 'STNOUT', width:88, format: 'm-d-Y'},
            { xtype: 'datecolumn',text: 'STNDUE', dataIndex: 'STNDUE', width:88, format: 'm-d-Y'},
            { xtype: 'datecolumn',text: 'STNIN', dataIndex: 'STNIN', width:88, format: 'm-d-Y'},
            //{ xtype: 'datecolumn', text: 'SODate', dataIndex: 'SODate', width:88, format: 'm-d-Y' },
            { text: 'FINISH', dataIndex: 'FINISH', width:94},
            { xtype: 'datecolumn',text: 'FINOUT', dataIndex: 'FINOUT', width:88, format: 'm-d-Y' },
            { xtype: 'datecolumn',text: 'FINDUE', dataIndex: 'FINDUE', width:88, format: 'm-d-Y' },
            { xtype: 'datecolumn',text: 'FININ', dataIndex: 'FININ', width:88, format: 'm-d-Y' },
            { xtype: 'datecolumn', text: 'TOPOUT', dataIndex: 'TOPOUT', width:88, format: 'm-d-Y', hidden:true },
            { xtype: 'datecolumn', text: 'TOPDUE', dataIndex: 'TOPDUE', width:88, format: 'm-d-Y', hidden:true },
            { xtype: 'datecolumn', text: 'TOPIN', dataIndex: 'TOPIN', width:88, format: 'm-d-Y' },
            { text: 'CUSTPO', dataIndex: 'CUSTPO', width:94 },
            { text: 'status', dataIndex: 'status', width:88, hidden:true },
            { text: 'processType', dataIndex: 'processType', width:94, hidden:true }
        ];
    }
});

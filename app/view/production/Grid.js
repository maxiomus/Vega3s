
Ext.define("Vega.view.production.Grid", {
    extend: 'Ext.grid.Panel',

    requires: [
        "Vega.view.production.GridController",
        "Vega.view.production.GridModel",
        'Ext.grid.column.Date',
        'Ext.grid.column.Number'
        //'Ext.grid.plugin.BufferedRenderer',
        //'Ext.toolbar.TextItem',
        //'Ext.form.field.Checkbox',
        //'Ext.form.field.Text'
    ],

    alias: 'widget.prod-grid',

    controller: "prod-grid",
    viewModel: {
        type: "prod-grid"
    },

    bind: {
        store: "{schedules}",
        selection: "{selectedSchedules}"
    },

    cls: "prod-grid",
    stateful: true,
    stateId: "prod-grid",
    stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    text: 'BODY', dataIndex: 'BODYIMG', width:88, locked: false,
                    renderer: function (value, metadata, record) {
                        var tpl = '<span class="file"><img style="vertical-align: middle;width:64px;margin:0 2px 0 0;" src="../DLIB/BLU-ILLUSTRATIONS/{0}.jpg{1}" alt="{2}" /></span>';

                        //var xf = Ext.util.Format;
                        if (!Ext.isEmpty(value)) {
                            //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tpl, value, "?w=264&h=288", record.data.BODYIMG) + '"';
                            //var tmp = '<img src="../DLIB/BLU-ILLUSTRATIONS/{0}.jpg?w=264&h=288" />';
                            //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tmp, value) + '"';

                            return Ext.String.format(tpl, value, "?w=64&h=64", record.data.BODYIMG);
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
                            };

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
            ],
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
                    return "custom-row-style";
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
                                            var tpl = '<img src="../DLIB/BLU-ILLUSTRATIONS/{0}.jpg?w=264&h=288" height="264" width="288" />';
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
            }]
        });

        this.callParent(arguments);
        // setup the state provider, all state information will be saved to a cookie
        //Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
    }
});

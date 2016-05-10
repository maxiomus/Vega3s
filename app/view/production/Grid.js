
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

    //stateful: true,
    //stateId: "prod-grid",
    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    text: 'POW', dataIndex: 'POW', width: 60,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    text: 'CUSTOMER', dataIndex: 'CUSTOMER', width:80,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'datecolumn', text: 'CXL', dataIndex: 'CXL', width:70, format: 'm-d-Y',
                    filter: {
                        type: 'date'
                    }
                },
                {
                    xtype: 'datecolumn', text: 'PCXL', dataIndex: 'PCXL', width:70, format: 'm-d-Y',
                    filter: {
                        type: 'date'
                    }
                },
                {
                    text: 'PAT', dataIndex: 'PAT', width:80,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    text: 'NR', dataIndex: 'NR', width:80,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    text: 'FABRICS', dataIndex: 'FABRICS', width:120,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    text: 'COLOR', dataIndex: 'COLOR', width:80,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    text: 'STYLE', dataIndex: 'STYLE', width:80,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    text: 'CUTNO', dataIndex: 'CUTNO', width:60,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'datecolumn', text: 'PDATE', dataIndex: 'PDATE', width:70, format: 'm-d-Y',
                    filter: {
                        type: 'date'
                    }
                },
                { xtype: 'datecolumn', text: 'OrderDate', dataIndex: 'OrderDate', width:70, format: 'm-d-Y',
                    filter: {
                        type: 'date'
                    }
                },
                { xtype: 'datecolumn', text: 'DueDate', dataIndex: 'DueDate', width:70, format: 'm-d-Y',
                    filter: {
                        type: 'date'
                    }
                },
                { xtype: 'datecolumn', text: 'InDate', dataIndex: 'InDate', width:70, format: 'm-d-Y' },
                { text: 'FaMemo', dataIndex: 'FaMemo', width:120 },
                { xtype: 'datecolumn', text: 'RouteDate', dataIndex: 'RouteDate', width:70, format: 'm-d-Y' },
                { xtype: 'datecolumn', text: 'ETSDate', dataIndex: 'ETSDate', width:70, format: 'm-d-Y' },
                { xtype: 'datecolumn', text: 'ShippedDate', dataIndex: 'ShippedDate', width:70, format: 'm-d-Y' },
                { text: 'PaMemo', dataIndex: 'PaMemo', width:120 },
                { xtype: 'numbercolumn', text: 'QTY', dataIndex: 'QTY', width:60, format: '0,000' },
                { xtype: 'numbercolumn', text: 'CUTQTY', dataIndex: 'CUTQTY', width:60, format: '0,000' },
                { text: 'CUT', dataIndex: 'CUT', width:80},
                { xtype: 'datecolumn',text: 'CUTOUT', dataIndex: 'CUTOUT', width:60, format: 'm-d-Y'},
                { xtype: 'datecolumn',text: 'CUTDUE', dataIndex: 'CUTDUE', width:60, format: 'm-d-Y'},
                { xtype: 'datecolumn',text: 'CUTIN', dataIndex: 'CUTIN', width:60, format: 'm-d-Y'},
                { text: 'SEWING', dataIndex: 'SEWING', width:80},
                { xtype: 'datecolumn',text: 'SEWOUT', dataIndex: 'SEWOUT', width:60, format: 'm-d-Y'},
                { xtype: 'datecolumn',text: 'SEWDUE', dataIndex: 'SEWDUE', width:60, format: 'm-d-Y'},
                { xtype: 'datecolumn',text: 'SEWIN', dataIndex: 'SEWIN', width:60, format: 'm-d-Y'},
                { text: 'PRINTNAME', dataIndex: 'PRINTNAME', width:80},
                { text: 'PRINT', dataIndex: 'PRINT', width:100},
                { xtype: 'datecolumn',text: 'PRTOUT', dataIndex: 'PRTOUT', width:60, format: 'm-d-Y'},
                { xtype: 'datecolumn',text: 'PRTDUE', dataIndex: 'PRTDUE', width:60, format: 'm-d-Y'},
                { xtype: 'datecolumn',text: 'PRTIN', dataIndex: 'PRTIN', width:60, format: 'm-d-Y'},
                { text: 'STONE', dataIndex: 'STONE', width:80},
                { xtype: 'datecolumn',text: 'STNOUT', dataIndex: 'STNOUT', width:60, format: 'm-d-Y'},
                { xtype: 'datecolumn',text: 'STNDUE', dataIndex: 'STNDUE', width:60, format: 'm-d-Y'},
                { xtype: 'datecolumn',text: 'STNIN', dataIndex: 'STNIN', width:60, format: 'm-d-Y'},
                { xtype: 'datecolumn', text: 'SODate', dataIndex: 'SODate', width:60, format: 'm-d-Y' },
                { text: 'FINISH', dataIndex: 'FINISH', width:80},
                { xtype: 'datecolumn',text: 'FINOUT', dataIndex: 'FINOUT', width:60, format: 'm-d-Y' },
                { xtype: 'datecolumn',text: 'FINDUE', dataIndex: 'FINDUE', width:60, format: 'm-d-Y' },
                { xtype: 'datecolumn',text: 'FININ', dataIndex: 'FININ', width:60, format: 'm-d-Y' },
                { xtype: 'datecolumn', text: 'TOPOUT', dataIndex: 'TOPOUT', width:60, format: 'm-d-Y', hidden:true },
                { xtype: 'datecolumn', text: 'TOPDUE', dataIndex: 'TOPDUE', width:60, format: 'm-d-Y', hidden:true },
                { text: 'CUSTPO', dataIndex: 'CUSTPO', width:80 },
                { text: 'status', dataIndex: 'status', width:60, hidden:true },
                { text: 'processType', dataIndex: 'processType', width:80, hidden:true }
            ],
            selModel: {
                pruneRemoved: false
            },
            viewConfig: {
                loadMask: true,
                loadingHeight: 100,
                stripeRows: true,
                trackOver: true,
                //preserveScrollOnRefresh:true,
                //deferInitialRefresh:true,
                //emptyText: '<h1 style="margin:20px">No matching results</h1>',
                getRowClass: function(a, g, f, h){
                    return "custom-row-style";
                },
                listeners: {

                }
            },
            plugins: [{
                ptype: "gridfilters"
            }]
        });

        this.callParent(arguments);
        // setup the state provider, all state information will be saved to a cookie
        //Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
    }
});

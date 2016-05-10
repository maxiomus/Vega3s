/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.inventory.fabric.panel.RollList", {
    extend: 'Ext.grid.Panel',
    
    alias: "widget.rolls-grid",

    bind: {
        store: "{rolls}"
    },

    initComponent: function(){
        var b=this;
        Ext.applyIf(b, {
            selModel: {
                pruneRemoved: false
            },
            viewConfig: {
                trackOver: false,
                preserveScrollOnRefresh: true,
                deferInitialRefresh: true
            },

            features: [{
                id: "groupSummary1",
                ftype: "groupingsummary",
                groupHeaderTpl: '{columnName}:  {name} ({rows.length} Roll{[values.rows.length > 1 ? "s" :  ""]})',
                hideGroupedHeader: true,
                startCollapsed: false,
                enableGroupMenu: true
            },
            {
                ftype: "summary",
                dock: "bottom"
            }],

            plugins: [{
                ptype: "cellediting",
                clicksToEdit: 2
            }],

            columns: [{
                text: "Style",
                dataIndex: "style",
                width: 120,
                summaryRenderer: function(f, a, e){
                    return"Total: "
                }
            },
                {
                    text: "Color",
                    dataIndex: "color",
                    width: 120,
                    hidden: false
                },
                {
                    text: "Lot #",
                    dataIndex: "lotno",
                    width: 120
                },
                {
                    text: "Roll #",
                    dataIndex: "rollno",
                    width: 100,
                    align: "center",
                    sortable: true,
                    summaryType: "count",
                    summaryRenderer: function(f, a, e){
                        return Ext.String.format("{0} Roll{1}", f, f!==1?"s": "")
                    }
                },
                {
                    text: "On-Hand",
                    dataIndex: "unit1",
                    width: 120,
                    align: "center",
                    renderer: Ext.util.Format.numberRenderer("0,0.00"),
                    summaryType: "sum",
                    summaryRenderer: function(e, a, f){
                        return Ext.util.Format.number(e, "0,0.00")
                    }
                },
                {
                    text: "Date",
                    dataIndex: "logdate",
                    width: 100,
                    align: "center",
                    renderer: function(a){
                        if(a!=null){
                            var d=new Date(a);
                            function f(c){
                                return c<10?"0"+c: c;
                            }

                            return f(d.getUTCMonth()+1)+"-"+f(d.getUTCDate())+"-"+d.getUTCFullYear();
                        }
                    }
                },
                {
                    text: "Cuttable",
                    dataIndex: "cuttable",
                    width: 100,
                    align: "center",
                    editor: {
                        xtype: "textfield",
                        allowBlank: true
                    }
                },
                {
                    text: "Prelim L",
                    dataIndex: "prelimL",
                    width: 100,
                    align: "center",
                    hidden: true
                },
                {
                    text: "Prelim L %",
                    dataIndex: "prelimL_per",
                    width: 100,
                    align: "center",
                    hidden: true
                },
                {
                    text: "Prelim W",
                    dataIndex: "prelimW",
                    width: 100,
                    align: "center",
                    hidden: true
                },
                {
                    text: "Prelim W %",
                    dataIndex: "prelimW_per",
                    width: 100,
                    align: "center",
                    hidden: true
                },
                {
                    text: "Wash L",
                    dataIndex: "washL",
                    width: 100,
                    align: "center",
                    hidden: true
                },
                {
                    text: "Wash L",
                    dataIndex: "washL_per",
                    width: 100,
                    align: "center",
                    hidden: true
                },
                {
                    text: "Wash W",
                    dataIndex: "washW",
                    width: 100,
                    align: "center",
                    hidden: true
                },
                {
                    text: "Wash W",
                    dataIndex: "washW_per",
                    width: 100,
                    align: "center",
                    hidden: true
                },
                {
                    text: "Shrink L",
                    dataIndex: "shrinkL",
                    width: 100,
                    align: "center"
                },
                {
                    text: "Shrink W",
                    dataIndex: "shrinkW",
                    width: 100,
                    align: "center"
                },
                {
                    text: "Wash Name",
                    dataIndex: "washname",
                    width: 100,
                    align: "center",
                    hidden: true
                },
                {
                    text: "Barcode",
                    dataIndex: "barcode",
                    width: 240,
                    align: "left",
                    editor: {
                        xtype: "textfield",
                        allowBlank: true
                    }
                },
                {
                    text: "Mark #",
                    dataIndex: "markno",
                    width: 100,
                    align: "center"
                },
                {
                    text: "Memo",
                    dataIndex: "memo",
                    flex: 1,
                    align: "left"
                }]
        });

        this.callParent(arguments);
    }
});


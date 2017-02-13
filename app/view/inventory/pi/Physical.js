
Ext.define('Vega.view.inventory.pi.Physical',{
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.inventory.pi.PhysicalController',
        'Vega.view.inventory.pi.PhysicalModel',
        'Vega.view.inventory.pi.Form',
        'Ext.ux.CTemplate'
    ],

    alias: "widget.physical",

    controller: 'physical',
    viewModel: {
        type: 'physical'
    },

    cls: "physical shadow-panel",

    header: false,
    margin: 8,

    listeners: {
        actnew: 'onActionNew',
        actedit: 'onActionEdit',
        actdelete: 'onActionDelete',
        actrefresh: 'onActionRefresh',
        clearall: 'onClearFilters',
        gridafterrender: 'onAfterGridRender',
        gridrowdblclick: 'onActionEdit',
        griditemcontextmenu: "onItemContextMenu"
    },

    initComponent: function(){
        var me = this;

        //me.dockedItems = me.buildDockedItems();

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Physical Inventory",
                iconCls: "fa fa-calculator",
                tbar: [{
                    xtype: "topbar",
                    reference: "topbar"
                }],

                mainItems: [{
                    xtype: "grid",
                    reference: "pi-grid",
                    scrollable: true,
                    flex: 2,
                    bind: {
                        store: '{physicals}'
                    },

                    listeners: {
                        select: {
                            fn: 'onSelect',
                            scope: this.controller
                        }
                    },

                    columns: me.buildGridColumns(),

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
                    }
                }],

                displayItems: [{
                    xtype: "display",
                    reference: "display"
                }],

                bbar: me.buildBottomBar()
            }]
        });

        me.callParent(arguments);

        var g=this.lookupReference("multiview"),
            j=g.lookupReference("pi-grid"),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        f.actEdit.setHidden(false);
        f.actEdit.setDisabled(true);

        var mnuItems = [f.actEdit, f.actDelete, f.actRefresh,
            {
                text: "Print",
                iconCls: "fa fa-print",
                action: "printlabel",
                //handler: 'onOpenLabeltagClick',
                scope: this.controller
            }];

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: mnuItems
        });

        f.items.items[0].setHidden(false);
        f.items.items[1].setHidden(false);
        f.items.last().setHidden(true);

        f.insert(0,
            [{
                xtype: "gridsearchfield",
                width: 300,
                grid: "pi-grid",
                paramName: "pino"
            }]
        );

        this.relayEvents(j, ["itemcontextmenu", "afterrender", "rowdblclick"], 'grid');
        this.relayEvents(f, ["actnew", 'actedit', "actrefresh", 'actdelete', "actcomplete", "actactive", "clearall"]);
    },

    buildGridColumns: function(){
        return [{
            text: "P.I #",
            dataIndex: "pino",
            locked: false,
            filter: {
                type: "int"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'datecolumn',
            text: "P.I Date",
            dataIndex: "pidate",
            format: 'm-d-Y',
            filter: {
                type: "date"
            }
        },
        {
            text: "Last Style",
            dataIndex: "style",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Total Unit",
            dataIndex: "totalunit",
            hidden: false,
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Memo",
            dataIndex: "memo",
            flex: 1,
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
            text: "Create User",
            dataIndex: "createUser",
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
            xtype: 'datecolumn',
            text: "Create Time",
            width: 150,
            dataIndex: "createTime",
            filter: {type: "date"},
            format: 'Y-m-d H:i a'
        },
        {
            text: "Update User",
            dataIndex: "updateUser",
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
            xtype: 'datecolumn',
            text: "Update Time",
            width: 150,
            dataIndex: "updateTime",
            filter: {type: "date"},
            format: 'Y-m-d H:i a'
        },
        {
            text: "Status",
            dataIndex: "status",
            filter: {
                operator: 'st',
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "P.I Reason",
            dataIndex: "pireason",
            width: 140,
            filter: {type: "string"},
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Tag #",
            dataIndex: "tagNumber",
            width: 140,
            filter: {type: "string"},
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "WH",
            dataIndex: "warehouse",
            width: 60,
            filter: {
                operator: 'st',
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        }]
    },

    buildBottomBar: function(){
        var b = Ext.create("widget.combo", {
            name: "perpage",
            reference: 'pageSizer',
            width: 76,
            store: new Ext.data.ArrayStore({
                fields: ["id"],
                data: [["15"], ["25"], ["50"], ["100"], ["300"], ["500"]]
            }),
            //value: "50",
            displayField: "id",
            valueField: "id",
            editable: false,
            forceSelection: true,
            matchFieldWidth: true,
            queryMode: "local"
            //triggerAction: "all",
        });

        b.on('render', function(c, e){
            var store = this.getViewModel().getStore("physicals");
            c.setValue(store.getPageSize())
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("physicals");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return [{
            xtype: "pagingtoolbar",
            dock: "bottom",
            //itemId: "pagingtb",
            displayInfo: true,
            bind: {
                store: "{physicals}"
            },
            style: {borderWidth: "0px"},
            items: ["-", b, "Per Page"]
        }];
    }
});

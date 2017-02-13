
Ext.define('Vega.view.development.request.Fabric',{
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.development.request.FabricController',
        'Vega.view.development.request.FabricModel',
        'Ext.grid.plugin.Exporter'
    ],

    alias: 'widget.request-fabric',

    controller: 'request-fabric',
    viewModel: {
        type: 'request-fabric'
    },

    cls: 'request-fabric shadow-panel',
    header: false,
    margin: 8,

    session: true,

    listeners: {
        actnew: 'onActionNew',
        actedit: 'onActionEdit',
        actdelete: 'onActionDelete',
        actrefresh: 'onActionRefresh',
        actcomplete: 'onActionMarkComplete',
        actactive: 'onActionMarkActive',
        clearall: 'onClearFilters',
        itemcontextmenu: 'onItemContextMenu'
    },

    initComponent: function(c){

        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Fabric Request",
                iconCls: "fa fa-database",
                tbar: [{
                    xtype: "topbar",
                    reference: "topbar"
                }],

                mainItems: [{
                    xtype: "grid",
                    reference: "fabric-grid",
                    scrollable: true,
                    flex: 2,
                    //loadMask: true,
                    bind: {
                        store: '{requestfabrics}'
                    },

                    columns: this.buildColumns(),

                    selModel: {
                        pruneRemoved: false
                    },

                    viewConfig: {
                        //loadMask: true,
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh: true,
                        preserveScrollOnReload: true,
                        deferInitialRefresh: true,
                        emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                        getRowClass: function(rec, rowIndex, rowParams, store){
                            if(rec.get('Status') == 'Complete'){
                                return "complete-row";
                            }

                            if(rec.get('Due') != null && rec.get('Due') <= new Date()){
                                return 'due-row';
                            }
                        }
                    },

                    /*
                     lockedViewConfig: {
                     loadMask: true
                     },
                     */

                    plugins: [{
                        ptype: "gridfilters"
                    },{
                        ptype: 'gridexporter'
                    }],

                    listeners: {
                        select: {
                            fn: 'onSelect',
                            scope: this.controller
                        },
                        rowdblclick: {
                            fn: 'onRowDblClick',
                            scope: this.controller
                        },
                        itemcontextmenu: {
                            fn: "onItemContextMenu",
                            scope: this.controller
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
                        store: "{requestfabrics}"
                    },
                    style: {borderWidth: "0px"},
                    dock: "bottom",
                    displayInfo: true
                }]
            }]
        });

        me.callParent(arguments);

        var g=this.lookupReference("multiview"),
            j=g.lookupReference("fabric-grid"),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        f.actEdit.setHidden(false);
        f.actEdit.setDisabled(true);

        var mnuItems = [f.actEdit, f.actRefresh];

        var setting = Vega.app.getMainView().getViewModel().getStore('setting'),
            su = setting.findRecord('Property', me.getXType()).data.Value;

        //console.log('fabric', setting.first().data.Value)
        if(Vega.user.data.Userid == su || Vega.user.inRole('administrators')){

            f.actDelete.setHidden(false);
            f.actComplete.setHidden(false);

            mnuItems.push(f.actDelete, f.actComplete, f.actActive);
        }

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: mnuItems
        });

        f.items.items[0].setHidden(false);
        f.items.items[1].setHidden(false);
        f.items.last().setHidden(true);

        f.insert(0,
            [{
                xtype: 'combo',
                width: 112,
                hideLabel: true,
                valueField: 'field',
                displayField: 'label',
                value: 'PoNo',
                editable: false,
                queryMode: 'local', // read data from local json file...
                reference: 'filterSelection',
                bind: {
                    store: '{categories}'
                },
                listeners: {
                    change: {
                        fn: 'onFilterItemChange',
                        scope: this.controller
                    }
                }
            },
            {
                xtype: "searchcombo",
                reference: 'searchcombo',
                width: 300,
                searchAt: 'fabric-grid',
                hidden: true,
                listeners: {
                    //triggerclear: "onClearClick",
                    //triggersearch: "onSearchClick"
                }
            },
            {
                xtype: 'gridsearchfield',
                width: 300,
                grid: 'fabric-grid',
                paramName: 'PoNo'
            }]
        );

        f.insert(15, [{
            xtype: 'button',
            iconCls: 'fa fa-external-link-square',
            text: 'Export',
            handler: function(b){
                j.saveDocumentAs({
                    type: 'excel',
                    title: 'Fabric Request List',
                    fileName: 'fabric request ' + Ext.Date.format(new Date(), 'Y-m-d') + '.xml'
                })
            }
        },
        {
            xtype: "cycle",
            //ui: "default",
            prependText: "Show:  ",
            iconCls: "fa fa-filter",
            showText: true,
            reference: "filterButton",
            changeHandler: "onTypeChange",
            scope: this.controller,
            menu: {
                items: [{
                    text: "All",
                    iconCls: "fa fa-filter",
                    type: null,
                    itemId: "all",
                    checked: false
                },{
                    text: "WIP",
                    iconCls: "fa fa-filter",
                    type: 'In Progress',
                    //itemId: "request",
                    checked: true
                },{
                    text: "Complete",
                    iconCls: "fa fa-filter",
                    type: 'Complete',
                    //itemId: "accept",
                    checked: false
                }]
            }
        }]);

        this.relayEvents(f, ["actnew", 'actedit', "actrefresh", 'actdelete', "actcomplete", "actactive", "clearall"]);
    },

    buildColumns: function(){
        return [{
            text: "ID",
            dataIndex: "ID",
            width: 60,
            locked: false,
            lockable: true,
            filter: {type: "string"},
            renderer: 'renderRequestId',
            scope: this.controller
        },
        {
            text: "RowNo",
            dataIndex: "Row No.",
            width: 60,
            hidden: true,
            locked: false,
            lockable: true,
            filter: {type: "string"},
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "ETA Date",
            dataIndex: "ETA",
            width: 95,
            locked: false,
            lockable: true,
            filter: {type: "date"},
            editor: {
                xtype: 'datefield'
            },
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
        },
        {
            text: "Due Date",
            dataIndex: "Due",
            width: 95,
            locked: false,
            lockable: true,
            filter: {type: "date"},
            editor: {
                xtype: 'datefield',
                allowBlank: false
            },
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
        },
        {
            text: "Date Issued",
            dataIndex: "Issued",
            width: 95,
            locked: false,
            lockable: true,
            filter: {type: "date"},
            editor: {
                xtype: 'datefield'
            },
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
        },
        {
            text: "Received",
            dataIndex: "Received",
            width: 95,
            locked: false,
            lockable: true,
            filter: {type: "date"},
            editor: {
                xtype: 'datefield'
            },
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
        },
        {
            text: "Fabric Code",
            dataIndex: "Fabric",
            width: 120,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Description",
            dataIndex: "Descript",
            width: 200,
            lockable: true,
            hidden: false,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Fabric Color",
            dataIndex: "Color",
            width: 120,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Vendor",
            dataIndex: "Vendor",
            width: 120,
            lockable: true,
            hidden: false,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Active",
            dataIndex: "Active",
            hidden: true,
            filter: {type: "string"},
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Priority",
            dataIndex: "Priority",
            width: 90,
            hidden: true,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(value, e, a){
                return f;
            }
        },
        {
            text: "Req. Qty",
            dataIndex: "RequestQty",
            width: 55,
            filter: {type: "string"},
            editor: {
                xtype: 'numberfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "P.O.W #",
            dataIndex: "PoNo",
            hidden: false,
            lockable: true,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Account",
            dataIndex: "Dept",
            width: 140,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            hidden: true,
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Coordinator",
            dataIndex: "Coordinator",
            width: 140,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Status",
            dataIndex: "Status",
            filter: {
                type: 'string'
            },
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Memo",
            dataIndex: "Memo",
            filter: {type: "string"},
            width: 300,
            //flex: 1,
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Complete",
            dataIndex: "% Complete",
            hidden: true,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Lot #",
            dataIndex: "LotNo",
            width: 160,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "User ID",
            dataIndex: "CUser",
            hidden: true,
            filter: {type: "string"}
        },
        {
            text: "Created On",
            dataIndex: "CDate",
            hidden: false,
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
        },
        {
            text: "Modified By",
            dataIndex: "MUser",
            hidden: true,
            filter: {type: "string"}
        },
        {
            text: "Updated On",
            dataIndex: "UDate",
            hidden: true,
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
        }]
    }
});


Ext.define('Vega.view.development.request.Work',{
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.development.request.WorkController',
        'Vega.view.development.request.WorkModel'
    ],

    alias: 'widget.request-work',

    controller: 'request-work',
    viewModel: {
        type: 'request-work'
    },

    cls: "request-work shadow-panel",
    header: false,
    margin: 8,

    session: true,

    listeners: {
        actnew: 'onActionNew',
        actedit: 'onActionEdit',
        actdelete: 'onActionDelete',
        actrefresh: "onActionRefresh",
        actcomplete: 'onActionMarkComplete',
        actactive: 'onActionMarkActive',
        clearall: 'onClearFilters'
    },

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Work Request",
                iconCls: "fa fa-scissors",
                tbar: [{
                    xtype: "topbar",
                    reference: "topbar"
                }],

                mainItems: [{
                    xtype: "grid",
                    reference: "work-grid",
                    scrollable: true,
                    flex: 2,
                    //loadMask: true,
                    bind: {
                        store: '{requestworks}'
                    },

                    columns: this.buildColumns(),

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
                        getRowClass: function(rec, rowIndex, rowParams, store){
                            if(rec.get('Status') == 'Complete'){
                                return "complete-row";
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
                    }],

                    listeners: {
                        select: {
                            fn: 'onRowSelect',
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
                        store: "{requestworks}"
                    },
                    style: {borderWidth: "0px"},
                    dock: "bottom",
                    displayInfo: true
                }]
            }]
        });

        me.callParent(arguments);

        var g=this.lookupReference("multiview"),
            j=g.lookupReference("work-grid"),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        f.actEdit.setHidden(false);
        f.actEdit.setDisabled(true);
        //f.actComplete.setHidden(false);

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
                value: 'Pow',
                editable: false,
                queryMode: 'local', // read data from local json file...
                reference: 'filterSelection',
                bind: {
                    store: '{categories}'
                },
                listeners: {
                    render: function(c){
                        //var rec = c.getStore().first();
                        //console.log(c.getStore())
                        //c.setValue(rec.data.field);
                    },
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
                hidden: true,
                listeners: {
                    //triggerclear: "onClearClick",
                    //triggersearch: "onSearchClick"
                }
            },
            {
                xtype: 'gridsearchfield',
                width: 300,
                grid: 'work-grid',
                paramName: 'Pow'
            }]
        );

        f.insert(15, [
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
                        text: "In Progress",
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
            }
        ]);

        this.relayEvents(f, ["actnew", "actedit", "actrefresh", "actdelete", "actcomplete", "actactive", "clearall"]);
    },

    buildColumns: function () {
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
            text: "P.L.M No.",
            dataIndex: "DSID",
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
            text: "Due",
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
            text: "ETA",
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
            text: "P.O.W #",
            dataIndex: "Pow",
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
            text: "Customer",
            dataIndex: "Customer",
            width: 140,
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
            text: "Style No.",
            dataIndex: "Style",
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Body No.",
            dataIndex: "Body",
            width: 80,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Fabric",
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
            text: "Color",
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
            text: "Dept",
            dataIndex: "Dept",
            //width: 120,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            hidden: false,
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
            text: "Cutter",
            dataIndex: "Maker",
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
            text: "Sewer",
            dataIndex: "Worker",
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
            text: "Work Type",
            dataIndex: "Type",
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
            text: "Proto Type",
            dataIndex: "Priority",
            width: 90,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(value, e, a){
                if (!Ext.isEmpty(value)) {
                    var str;

                    switch (value) {
                        case '0': str = 'Line'; break;
                        case '1': str = 'Concept'; break;
                        case '2': str = 'Visual'; break;
                        case '3': str = 'Marketing'; break;
                        case '4': str = 'Fit'; break;
                        case '5': str = 'PP/Bulk'; break;
                        case '6': str = 'Top'; break;
                        case '7': str = 'Ecom'; break;
                        case '8': str = 'Sew By'; break;
                    }

                    return str;
                }
                else {
                    return "";
                }
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
            text: "User ID",
            dataIndex: "UserID",
            hidden: true,
            filter: {type: "string"}
        },
        {
            text: "Updated",
            dataIndex: "UpdatedOn",
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
        },
        {
            text: "Notes",
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
        }]
    }
});


Ext.define('Vega.view.development.request.Graphic',{
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.development.request.GraphicController',
        'Vega.view.development.request.GraphicModel',
        'Ext.grid.plugin.Exporter'
    ],

    alias: 'widget.request-graphic',

    controller: 'request-graphic',
    viewModel: {
        type: 'request-graphic'
    },

    cls: "request-graphic shadow-panel",
    header: false,
    margin: '0 0 0 4',

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
                title: "Graphic Request",
                iconCls: "x-fa fa-file-picture-o",

                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },

                mainItems: [{
                    xtype: "grid",
                    reference: "graphic-grid",
                    scrollable: true,
                    flex: 2,
                    //loadMask: true,
                    bind: {
                        store: '{requestgraphics}'
                    },

                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    },

                    columns: this.buildColumns(),

                    selModel: {
                        pruneRemoved: false
                    },

                    viewConfig: {
                        loadMask: true,
                        loadingHeight: 100,
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
                    },{
                        ptype: 'gridexporter'
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

                bbar: {
                    xtype: "pagingtoolbar",
                    bind: {
                        store: "{requestgraphics}"
                    },
                    //dock: "bottom",
                    displayInfo: true
                }
            }]
        });

        me.callParent(arguments);

        var g=this.lookupReference("multiview"),
            j=g.lookupReference("graphic-grid"),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        var mnuItems = [f.actEdit, f.actRefresh, f.actDelete, f.actComplete, f.actActive];

        f.actEdit.setHidden(false);
        f.actEdit.setDisabled(true);
        f.actComplete.setHidden(false);
        //f.actActive.setHidden(false);

        /*
        var setting = Ext.getStore('Settings'),
            su = setting.findRecord('Property', me.getXType()).data.Value;

        if(Vega.user.data.Userid == su || Vega.user.inRole('administrators')){
            f.actDelete.setHidden(false);
            //f.actComplete.setHidden(false);
        }
        */

        //mnuItems.push();

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
                value: 'PrintNo',
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
                grid: 'graphic-grid',
                paramName: 'PrintNo'
            }]
        );

        f.insert(15, [{
            xtype: 'button',
            iconCls: 'x-fa fa-external-link-square',
            text: 'Export',
            handler: function(b){
                j.saveDocumentAs({
                    type: 'excel',
                    title: 'Graphic Request List',
                    fileName: 'graphic request ' + Ext.Date.format(new Date(), 'Y-m-d') + '.xlsx'
                });
            }
        },
        {
            xtype: "cycle",
            //ui: "default",
            prependText: "Show:  ",
            iconCls: "x-fa fa-filter",
            showText: true,
            reference: "filterButton",
            changeHandler: "onTypeChange",
            scope: this.controller,
            menu: {
                items: [{
                    text: "All",
                    iconCls: "x-fa fa-filter",
                    type: null,
                    itemId: "all",
                    checked: false
                },{
                    text: "WIP",
                    iconCls: "x-fa fa-filter",
                    type: 'In Progress',
                    //itemId: "request",
                    checked: true
                },{
                    text: "Complete",
                    iconCls: "x-fa fa-filter",
                    type: 'Complete',
                    //itemId: "accept",
                    checked: false
                }]
            }
        }]);

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
            xtype: 'datecolumn',
            text: "Date Issued",
            dataIndex: "Issued",
            width: 95,
            locked: false,
            lockable: true,
            format: 'Y-m-d',
            filter: {type: "date"},
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
            /*
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
            */
        },
        {
            xtype: 'datecolumn',
            text: "Due",
            dataIndex: "Due",
            width: 95,
            locked: false,
            lockable: true,
            format: 'Y-m-d',
            filter: {type: "date"},
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d',
                allowBlank: false
            }
        },
        {
            xtype: 'datecolumn',
            text: "ETA",
            dataIndex: "ETA",
            width: 95,
            locked: false,
            lockable: true,
            format: 'Y-m-d',
            filter: {type: "date"},
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
        },
        {
            xtype: 'datecolumn',
            text: "Completed",
            dataIndex: "Received",
            width: 95,
            locked: false,
            lockable: true,
            format: 'Y-m-d',
            filter: {type: "date"},
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
        },
        {
            text: "Print #",
            dataIndex: "PrintNo",
            width: 140,
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
            text: "Name",
            dataIndex: "Name",
            width: 180,
            filter: {type: "string"},
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Designer",
            dataIndex: "Designer",
            width: 140,
            filter: {type: "string"},
            editor: {

            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Account",
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
            text: "Type",
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
            text: "% Complete",
            dataIndex: "Complete",
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
            width: 60,
            align: 'center',
            filter: {type: "string"},
            editor: {
                xtype: 'numberfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Created By",
            dataIndex: "CUser",
            hidden: true,
            filter: {type: "string"}
        },
        {
            xtype: 'datecolumn',
            text: "Created",
            dataIndex: "CDate",
            hidden: true,
            filter: {type: "date"}
        },
        {
            text: "Updated By",
            dataIndex: "MUser",
            hidden: true,
            filter: {type: "string"}
        },
        {
            xtype: 'datecolumn',
            text: "Updated",
            dataIndex: "UDate",
            hidden: true,
            filter: {type: "date"}
        },
        {
            text: "Memo",
            dataIndex: "Memo",
            filter: {type: "string"},
            width: 300,
            flex: 1,
            editor: {
                xtype: 'textfield'
            },
            renderer: function(f, e, a){
                return f;
            }
        }];
    }
});


/**
 * Created by tech on 3/9/2016.
 */
Ext.define('Vega.view.development.style.Product',{
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.development.style.ProductController',
        'Vega.view.development.style.ProductModel',
        'Vega.view.development.style.Grid',
        'Vega.view.development.style.View',
        'Vega.view.development.style.edit.Form'
        /*
        'Vega.view.development.product.windows.Upload',
        'Vega.view.development.product.windows.Labeltag',
        'Vega.view.development.product.windows.StyleCopy'
        */
    ],

    alias: "widget.product",

    controller: "product",
    viewModel: {
        type: "product"
    },

    cls: "product shadow-panel",

    header: false,
    margin: '0 0 0 4',

    //session: true,

    listeners: {
        actnew: 'onActNewClick',
        actedit: 'onActEditClick',
        actcopy: 'onActCopyClick',
        actdelete: 'onActDeleteClick',
        actrefresh: 'onActRefreshClick',
        clearall: 'onClearFilters',
        rowdblclick: 'onActEditClick',
        itemdblclick: "onActEditClick",
        itemcontextmenu: "onItemContextMenu"
    },

    initComponent: function(){
        var me = this;

        //me.dockedItems = me.buildDockedItems();

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Product Style",
                iconCls: "x-fa fa-cube",

                tbar: {
                    xtype: "development-topbar",
                    reference: "topbar"
                },

                mainItems: [{
                    xtype: "style-grid",
                    reference: "grid",
                    //scrollable: 'y',
                    stateful:true,
                    stateId: "product-grid",
                    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],
                    //publishes: ["selectedProducts"],

                    bind: {
                        store: "{products}",
                        selection: "{selectedProduct}"
                    },

                    listeners: {
                        select: {
                            fn: 'onSelect',
                            scope: this.controller
                        }
                    }
                },{

                },{
                    xtype: 'style-view',
                    reference: "tiles",
                    //cls: '',
                    region: 'center',
                    flex: 1,
                    /*
                    selectionModel: {
                        mode: 'MULTI'
                    },
                    */
                    bind: {
                        store: "{products}",
                        selection: "{selectedProduct}"
                    },

                    listeners: {
                        select: {
                            fn: 'onSelect',
                            scope: this.controller
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
            j=g.lookupReference("grid"),
            k=g.lookupReference('tiles'),
        //m=g.lookupReference('list'),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        var segmented = f.lookupReference('viewselection');
        segmented.items.items[1].setHidden(true);
        segmented.setValue(0);

        f.actCopy.setHidden(false);
        f.actCopy.setDisabled(true);
        f.insert(5,
            [f.actCopy]
        );

        f.insert(12,
            {
                xtype: "cycle",
                ui: "default",
                prependText: "Show: ",
                iconCls: "x-fa fa-filter",
                showText: true,
                reference: "processSelect",
                changeHandler: "onProcessChange",
                scope: this.controller,
                menu: {
                    items: [{
                        text: "All",
                        iconCls: "x-fa fa-filter",
                        type: null,
                        //itemId: "all",
                        checked: true
                    }]
                }
            }
        );

        f.insert(15,
            {
                xtype: 'button',
                iconCls: 'x-fa fa-external-link-square',
                text: 'Export',
                handler: function(b){
                    j.saveDocumentAs({
                        type: 'excel',
                        title: 'Product Style List',
                        fileName: 'Product style ' + Ext.Date.format(new Date(), 'Y-m-d') + '.xlsx'
                    });
                }
            }
        );

        var mnuItems = [f.actEdit, f.actCopy, f.actDelete, f.actRefresh,
            {
                text: "Upload for N41",
                iconCls: "x-fa fa-upload",
                action: "upload",
                handler: 'onOpenUploadClick',
                scope: this.controller
            }];

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: mnuItems
        });

        this.relayEvents(f, ["actnew", 'actedit', "actcopy", "actrefresh", 'actdelete', "actcomplete", "actactive", "clearall"]);
        this.relayEvents(j, ["itemcontextmenu", "rowdblclick"]);
        this.relayEvents(k, ["itemcontextmenu", "itemdblclick"]);
    },

    buildBottomBar: function(){
        var b = Ext.widget("combo", {
            name: "perpage",
            //reference: 'pageSizer',
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

        b.on('afterrender', function(c, e){
            var store = this.getViewModel().getStore("products");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("products");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{products}"
            },
            //dock: 'bottom',
            displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }
});


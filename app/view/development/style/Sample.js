/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.development.style.Sample", {
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.development.style.SampleController',
        'Vega.view.development.style.SampleModel',
        'Vega.view.development.style.Grid',
        'Vega.view.development.style.View',
        'Vega.view.development.TopBar',
        'Vega.view.development.style.edit.Form',
        'Vega.view.development.windows.sample.Upload',
        'Vega.view.development.windows.sample.Labeltag',
        'Vega.view.development.windows.sample.StyleCopy'
        //'Vega.view.development.sample.LineSheet',
        //'Vega.store.StyleColors'
    ],

    alias: "widget.sample",

    controller: "sample",
    viewModel: {
        type: "sample"
    },

    cls: "sample shadow-panel",

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
                title: "Sample Style",
                iconCls: "x-fa fa-question",

                closable: false,

                tbar: {
                    xtype: "development-topbar",
                    reference: "topbar"
                },

                mainItems: [{
                    xtype: "style-grid",
                    reference: "grid",
                    //scrollable: 'y',
                    stateful:true,
                    stateId: "sample-grid",
                    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

                    //publishes: ["selectedSamples"],

                    bind: {
                        store: "{samples}",
                        selection: "{selectedSample}"
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

                    region: 'center',
                    flex: 1,
                    /*
                    selectionModel: {
                        mode: 'MULTI'
                    },
                    */
                    bind: {
                        store: "{samples}",
                        selection: "{selectedSample}"
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

        f.insert(5, [
            f.actCopy
        ]);
        f.actCopy.setHidden(false);
        f.actCopy.setDisabled(true);

        f.insert(14,
            [{
                xtype: 'button',
                iconCls: 'x-fa fa-external-link-square',
                text: 'Export',
                handler: function(b){
                    j.saveDocumentAs({
                        type: 'excel',
                        title: 'Sample Style List',
                        fileName: 'sample style ' + Ext.Date.format(new Date(), 'Y-m-d') + '.xlsx'
                    });
                }
            }]
        );

        var mnuItems = [f.actEdit, f.actCopy, f.actDelete, f.actRefresh,
            {
                text: "Print Tag",
                iconCls: "x-fa fa-tag",
                action: "printlabel",
                handler: 'onOpenLabeltagClick',
                scope: this.controller
            },
            {
                text: "Upload",
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
            var store = this.getViewModel().getStore("samples");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("samples");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{samples}"
            },
            //dock: 'bottom',
            displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }
});

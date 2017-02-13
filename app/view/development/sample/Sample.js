/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.development.sample.Sample", {
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.development.sample.SampleController',
        'Vega.view.development.sample.SampleModel',
        'Vega.view.development.sample.Grid',
        'Vega.view.development.sample.edit.Form',
        'Vega.store.StyleColors'
    ],

    alias: "widget.sample",

    controller: "sample",
    viewModel: {
        type: "sample"
    },

    cls: "sample shadow-panel",

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
                title: "Sample Style",
                iconCls: "fa fa-question",
                tbar: [{
                    xtype: "topbar",
                    reference: "topbar"
                }],

                mainItems: [{
                    xtype: "sample-grid",
                    reference: "sample-grid",
                    scrollable: true,
                    flex: 2,
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
            j=g.lookupReference("sample-grid"),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        f.actEdit.setHidden(false);
        f.actEdit.setDisabled(true);

        var mnuItems = [f.actEdit, f.actDelete, f.actRefresh,
            {
                text: "Print Tag",
                iconCls: "fa fa-tag",
                action: "printlabel",
                handler: 'onOpenLabeltagClick',
                scope: this.controller
            },
            {
                text: "Upload",
                iconCls: "fa fa-upload",
                action: "upload",
                handler: 'onOpenUploadClick',
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
                xtype: "combo",
                width: 112,
                hideLabel: true,
                valueField: "field",
                displayField: "label",
                value: "Style #",
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: "{categories}"
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
                searchAt: 'sample-grid'
            },
            {
                xtype: "gridsearchfield",
                width: 300,
                grid: "sample-grid",
                paramName: "style"
            }]
        );

        /*
        f.insert(10,
            ['-', {
                xtype: 'button',
                text: 'Print Label',
                tooltip: 'Print label tag',
                ui: 'bootstrap-btn-default',
                iconCls: 'fa fa-print',
                disabled: true,
                action: 'save',
                handler: 'onOpenLabeltagClick',
                scope: this.controller
            },{
                xtype: 'button',
                text: 'Upload',
                tooltip: 'Images Upload',
                ui: 'bootstrap-btn-default',
                iconCls: 'fa fa-upload',
                disabled: true,
                action: 'upload',
                handler: 'onOpenUploadClick',
                scope: this.controller
            }]
        )
        */
        this.relayEvents(j, ["itemcontextmenu", "afterrender", "rowdblclick"], 'grid');
        this.relayEvents(f, ["actnew", 'actedit', "actrefresh", 'actdelete', "actcomplete", "actactive", "clearall"]);
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
            var store = this.getViewModel().getStore("samples");
            c.setValue(store.getPageSize())
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("samples");
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
                store: "{samples}"
            },
            style: {borderWidth: "0px"},
            items: ["-", b, "Per Page"]
        }];
    }
});


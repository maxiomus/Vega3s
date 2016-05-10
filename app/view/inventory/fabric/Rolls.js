/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.inventory.fabric.Rolls", {
    extend: 'Vega.view.Viewer',
    
    requires: [
        'Vega.view.inventory.fabric.RollsController',
        'Vega.view.inventory.fabric.RollsModel'
    ],

    alias: "wdiget.fabricrolls",

    controller: "fabricrolls",
    viewModel: {
        type: "fabricrolls"
    },

    config: {
        activeState: null,
        defaultActiveState: "default"
    },

    cls: "shadow-panel",
    header: false,
    margin: 10,

    listeners: {

    },

    initComponent: function(){
        var b=this;
        Ext.applyIf(b, {
            items: [{
                xtype: "rolls-grid",
                title: "Fabric Rolls",
                reference: "grid",
                iconCls: "fa fa-dot-circle-o",
                dockedItems: [{
                    xtype: "toolbar",
                    dock: "top",
                    items: [{
                        xtype: "combo",
                        itemId: "cboFabric",
                        labelAlign: "left",
                        fieldLabel: "Fabric",
                        labelWidth: 50,
                        width: 200,
                        store: "Components",
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        minChars: 1,
                        listConfig: {
                            loadindText: "Searching...",
                            emptyText: "No matching items found.",
                            width: 385
                        },
                        triggers: {
                            clear: {
                                weight: -1,
                                cls: "x-form-clear-trigger",
                                tooltip: "Clear",
                                hidden: true,
                                handler: function(a){
                                    this.clearValue();
                                    this.collapse();
                                    this.focus(10);
                                }
                            }
                        }
                    },
                    {xtype: "tbspacer"},
                    {
                        xtype: "combo",
                        itemId: "cboColor",
                        labelAlign: "left",
                        fieldLabel: "Color",
                        labelWidth: 50,
                        width: 200,
                        store: "Colors",
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        minChars: 1,
                        listConfig: {
                            loadindText: "Searching...",
                            emptyText: "No matching items found.",
                            width: 385
                        },
                        triggers: {
                            clear: {
                                weight: -1,
                                cls: "x-form-clear-trigger",
                                tooltip: "Clear",
                                hidden: true,
                                handler: function(a){
                                    this.clearValue();
                                    this.collapse();
                                    this.focus(10);
                                }
                            }
                        }
                    },
                    {xtype: "tbspacer"},
                    {
                        xtype: "combo",
                        itemId: "cboLotno",
                        labelAlign: "left",
                        fieldLabel: "Lot #",
                        labelWidth: 50,
                        width: 200,
                        bind: {
                            store: "{lotnos}"
                        },
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        minChars: 1,
                        listConfig: {
                            loadindText: "Searching...",
                            emptyText: "No matching items found.",
                            width: 385
                        },
                        triggers: {
                            clear: {
                                weight: -1,
                                cls: "x-form-clear-trigger",
                                tooltip: "Clear",
                                hidden: true,
                                handler: function(a){
                                    this.clearValue();
                                    this.collapse();
                                    this.focus(10);
                                }
                            }
                        },
                        tpl: '<tpl for="."><tpl if="[xindex] == 1"><table class="cbo-list"><tr><th width="60%">Lot #</th><th width="40%">On Hand</th></tr></tpl><tr class="x-boundlist-item"><td>{id}</td><td>{text}</td></tr><tpl if="[xcount-xindex]==0"></table></tpl></tpl>'},
                    {
                        xtype: "tbspacer"
                    },
                    {
                        xtype: "button",
                        ui: "default",
                        width: 90,
                        text: "Search",
                        iconCls: "fa fa-refresh",
                        action: "refresh",
                        tooltip: "Refresh Current View"
                    },
                    {
                        xtype: "button",
                        ui: "default",
                        width: 90,
                        text: "Save",
                        iconCls: "fa fa-save",
                        action: "save",
                        tooltip: "Save Current Changes"
                    },
                    {
                        xtype: "button",
                        ui: "default",
                        width: 90,
                        text: "Hide",
                        enableToggle: true,
                        pressed: true,
                        action: "showsummary",
                        tooltip: "Show Summary",
                        glyph: "xf021@FontAwesome",
                        toggleHandler: function(a, d){
                            if(d){
                                this.setText("Hide");
                            }
                            else{
                                this.setText("Show");
                            }
                        }
                    },
                    {
                        xtype: "button",
                        ui: "default",
                        width: 90,
                        text: "Sync",
                        action: "syncbarcode",
                        tooltip: "Sync Barcodes",
                        glyph: "xf021@FontAwesome",
                        handler: "onSyncClicked"
                    },
                    "->",
                    {
                        xtype: "button",
                        ui: "default",
                        width: 120,
                        text: "Print Barcode",
                        iconCls: "fa fa-print",
                        action: "printbarcode",
                        tooltip: "Print Barcodes",
                        handler: "onPrintBarcodeClicked"
                    },
                    {
                        xtype: "button",
                        ui: "default",
                        width: 120,
                        text: "Auto Save",
                        action: "autosave",
                        tooltip: "Auto Save",
                        enableToggle: true,
                        pressed: true,
                        glyph: "xf021@FontAwesome",
                        scope: this,
                        toggleHandler: function(a, d){
                            this.down("rolls-grid").store.autoSync=d
                        }
                    }]
                },
                {
                    xtype: "toolbar",
                    dock: "bottom",
                    items: [{
                        xtype: "pagingtoolbar",
                        bind: {
                            store: "{rolls}"
                        },
                        ui: "default",
                        displayInfo: true
                    }]
                }]
            }]
        });

        this.callParent(arguments);
    }
});


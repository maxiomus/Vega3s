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
        //activeState: null,
        //defaultActiveState: "default"
    },

    cls: "shadow-panel",
    header: false,
    margin: '0 0 0 4',

    initComponent: function(){
        var b = this;

        Ext.getStore('memComponents').clearFilter();

        Ext.applyIf(b, {
            items: [{
                title: "Fabric Rolls",
                iconCls: "x-fa fa-dot-circle-o",

                layout: {
                    type: "fit"
                },

                style: {
                    borderTop: '1px solid #cfcfcf'
                },

                defaults: {
                    //margin: "5 0 0 0"
                },

                //bodyPadding: 8,
                fieldDefaults: {

                },

                dockedItems: [{
                    xtype: "toolbar",
                    dock: "top",
                    items: [{
                        xtype: "combo",
                        itemId: "cboFabric",
                        //labelAlign: "left",
                        fieldLabel: "Fabric",
                        labelWidth: 50,
                        width: 200,
                        store: "memComponents",
                        remoteStore: 'Components',
                        valueField: "label",
                        displayField: "label",
                        forceSelection: false,
                        selectOnFocus: true,
                        autoLoadOnValue: true,
                        pageSize: 50,
                        matchFieldWidth: false,
                        queryMode: "local",
                        //queryParam: "filter",
                        //minChars: 1,
                        listConfig: {
                            loadindText: "Searching...",
                            emptyText: "No matching items found.",
                            width: 385
                        },
                        plugins:[{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            triggerClear: function(combo){

                                var cboColor = combo.ownerCt.query('combo[itemId="cboColor"]')[0];
                                cboColor.getStore().clearFilter();
                                cboColor.setValue('');
                            },
                            beforequery: {
                                fn: function(qe){
                                    /*
                                    var store = qe.combo.getStore();
                                    console.log('FABRIC COMBO', qe.combo.getStore(), qe.combo.getValue())
                                    store.clearFilter();
                                    store.filter([{
                                        property: 'text',
                                        value: 'FABRICS',
                                        operator: '='
                                    }]);
                                    */
                                }
                            }
                        }
                    },
                    {xtype: "tbspacer"},
                    {
                        xtype: "combo",
                        itemId: "cboColor",
                        //labelAlign: "left",
                        fieldLabel: "Color",
                        labelWidth: 50,
                        width: 200,
                        store: "memRawColors",
                        remoteStore: 'rawColors',
                        valueField: "label",
                        displayField: "label",
                        forceSelection: false,
                        selectOnFocus: true,
                        pageSize: 50,
                        matchFieldWidth: false,
                        queryMode: "local",
                        //queryParam: "filter",
                        //minChars: 1,
                        listConfig: {
                            loadindText: "Searching...",
                            emptyText: "No matching items found.",
                            width: 385
                        },
                        plugins:[{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            triggerClear: function(combo){

                            },
                            beforequery: {
                                fn: function(qe){
                                    var cboStyle = qe.combo.ownerCt.query('combo[itemId="cboFabric"]')[0],
                                        store = qe.combo.getStore();

                                    //console.log(cboStyle, cboStyle.getValue())
                                    store.clearFilter();

                                    if(!Ext.isEmpty(cboStyle.getValue())){

                                        store.filter([{
                                            property: 'text',
                                            value: cboStyle.getValue().toUpperCase(),
                                            operator: '='
                                        }]);
                                    }
                                    //delete qe.combo.lastQuery;
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
                        store: 'memLotnos',
                        remoteStore: 'Lotnos',
                        valueField: "label",
                        displayField: "label",
                        forceSelection: false,
                        selectOnFocus: true,
                        pageSize: 50,
                        matchFieldWidth: false,
                        queryMode: "local",
                        //queryParam: "filter",
                        //minChars: 1,
                        listConfig: {
                            loadindText: "Searching...",
                            emptyText: "No matching items found.",
                            width: 385
                        },
                        plugins:[{
                            ptype: "cleartrigger"
                        }],
                        tpl: '<tpl for="."><tpl if="[xindex] == 1"><table class="cbo-list"><tr><th width="60%">Lot #</th><th width="40%">On Hand</th></tr></tpl><tr class="x-boundlist-item"><td>{label}</td><td>{text}</td></tr><tpl if="[xcount-xindex]==0"></table></tpl></tpl>'},
                    {
                        xtype: "tbspacer"
                    },
                    {
                        xtype: "button",
                        ui: "default",
                        width: 90,
                        text: "Search",
                        iconCls: "x-fa fa-refresh",
                        action: "refresh",
                        tooltip: "Refresh Current View"
                    },
                    {
                        xtype: "button",
                        ui: "default",
                        width: 90,
                        text: "Save",
                        iconCls: "x-fa fa-save",
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
                        iconCls: "x-fa fa-print",
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
                            this.down("rolls-grid").store.autoSync=d;
                        }
                    }]
                },
                {
                    xtype: "pagingtoolbar",
                    bind: {
                        store: "{rolls}"
                    },
                    ui: "default",
                    dock: 'bottom',
                    displayInfo: true
                }],

                items: [{
                    xtype: "rolls-grid",
                    reference: "rolls-grid",
                    flex: 1,
                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    }
                }]
            }]
        });

        this.callParent(arguments);
    }
});

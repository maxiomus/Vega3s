/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.development.sample.Sample", {
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.development.sample.SampleController',
        'Vega.view.development.sample.SampleModel',
        'Vega.view.development.sample.Grid'
    ],

    alias: "widget.sample",

    controller: "sample",
    viewModel: {
        type: "sample"
    },

    cls: "shadow-panel",
    header: false,
    margin: 8,

    initComponent: function(){
        var i=this;
        Ext.applyIf(i, {
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
                    reference: "grid",
                    scrollable: true,
                    flex: 2,
                    listeners: {
                        select: {
                            fn: "onSelect",
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
                        store: "{samples}"
                    },
                    style: {borderWidth: "0px"},
                    dock: "bottom",
                    displayInfo: true
                }]
            }]
        });

        this.callParent(arguments);

        var g=this.lookupReference("multiview"),
            j=g.lookupReference("grid"),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

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
                    store: "{category}"
                },
                listeners: {
                    change: "onFilterItemChange",
                    scope: this
                }
            },
            {
                xtype: "gridsearchfield",
                width: 300,
                grid: "sample-grid",
                paramName: "style"
            }]
        );
    },

    onFilterItemChange: function(i, j, g, l){
        var h=i.up("topbar"),
        k=h.down("gridsearchfield");
        k.paramName=i.getValue()
    }
});


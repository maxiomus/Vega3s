
Ext.define("Vega.view.sales.Request",{
    extend: "Ext.grid.Panel",

    requires: [
        "Vega.view.sales.RequestController",
        "Vega.view.sales.RequestModel"
    ],

    alias: 'widget.pow-request',

    controller: "pow-request",
    viewModel: {
        type: "pow-request"
    },

    publishes: ["selectedPows"],

    bind: {
        store: "{pows}",
        selection: "{selectedPows}"
    },

    config: {

    },

    initComponent: function(){

    }
});

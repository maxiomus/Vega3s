
Ext.define('Vega.model.production.WIP', {
    extend:  'Vega.model.Base',

    fields:  [
        {name: 'powhId', type: 'int'},
        {name: 'powno', type: 'string'},
        {name: 'ordertype', type: 'string'},
        {name: 'customer', type: 'string'},
        {name: 'custdept', type: 'string'},
        {name: 'division', type: 'string'},
        {name: 'custpo', type: 'string'},
        {name: 'label', type: 'string'},
        {name: 'totalqty', type: 'string'},
        {name: 'size', type: 'string'},
        {name: 'ratio', type: 'string'},
        {name: 'cxldate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d'},
        {name: 'dcdate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d'},
        {name: 'routing', type: 'string'},
        {name: 'powdId', type: 'int'},
        {name: 'style', type: 'string'},
        {name: 'color', type: 'string'},
        //{name: 'descript', type: 'string'},
        {name: 'bodyref', type: 'string'},
        {name: 'bodydesc', type: 'string'},
        {name: 'stitchdesc', type: 'string'},
        {name: 'cost', type: 'number'},
        {name: 'price', type: 'number'},
        {name: 'msrp', type: 'number'},
        {name: 'units', type: 'int'},
        {name: 'bodyimgsrc', type: 'string'},
        {name: 'printimgsrc', type: 'string'},
        {name: 'factory', type: 'string'},
        {name: 'remarks', type: 'string'},
        {name: 'approved', type: 'string'},
        {name: 'cut_po', type: 'string'},
        {name: 'orderDate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d'},
        {name: 'processType', type: 'string'},
        {name: 'poh_status', type: 'string'},
        //{name: 'poh_division', type: 'string'},
        //{name: 'poh_customer', type: 'string'},
        {name: 'ordertype', type: 'string'},
        {name: 'poh_powno', type: 'string'},
        {name: 'poh_memo', type: 'string'},
        {name: 'pono', type: 'int'},
        {name: 'pod_status', type: 'string'},
        {name: 'pod_memo', type: 'string'},
        /*
        {name: 'unit1', type: 'int'},
        {name: 'unit2', type: 'int'},
        {name: 'unit3', type: 'int'},
        {name: 'unit4', type: 'int'},
        {name: 'unit5', type: 'int'},
        {name: 'unit6', type: 'int'},
        {name: 'unit7', type: 'int'},
        {name: 'unit8', type: 'int'},
        {name: 'unit9', type: 'int'},
        {name: 'unit10', type: 'int'},
        */
        {name: 'unitSum', type: 'number'},
        {name: 'pod_price', type: 'number'},
        {name: 'sono', type: 'string'},
        {name: 'matcategory', type: 'string'},
        {name: 'mattype', type: 'string'},
        {name: 'fab_code', type: 'string'},
        {name: 'fab_color', type: 'string'},
        {name: 'fab_desc', type: 'string'},
        {name: 'fabcontent', type: 'string'},
        {name: 'prints', type: 'string'},
        {name: 'trims', type: 'string'},
        {name: 'stns', type: 'string'},
        {name: 'tna_memo', type: 'string'},
        {name: 'cad', type: 'string'},
        {name: 'com', type: 'string'},
        {name: 'concept', type: 'string'},
        {name: 'cut', type: 'string'},
        {name: 'cxl', type: 'string'},
        {name: 'ecomm', type: 'string'},
        {name: 'ex', type: 'string'},
        {name: 'fab', type: 'string'},
        {name: 'fit', type: 'string'},
        //{name: 'ih', type: 'string'},
        {name: 'inspect', type: 'string'},
        {name: 'lab', type: 'string'},
        {name: 'labels', type: 'string'},
        {name: 'marker', type: 'string'},
        {name: 'ndc', type: 'string'},
        //{name: 'packing', type: 'string'},
        {name: 'paper', type: 'string'},
        {name: 'pp', type: 'string'},
        {name: 'stone', type: 'string'},
        {name: 'tech', type: 'string'},
        {name: 'topp', type: 'string'},
        {name: 'trim', type: 'string'},
        {name: 'visual', type: 'string'},
        {name: 'fabsent', type: 'string'},
        {name: 'prtsent', type: 'string'},
        {name: 'trmsent', type: 'string'},
        {name: 'lblmainsent', type: 'string'},
        {name: 'lblcaresent', type: 'string'},
        {name: 'lblsizesent', type: 'string'},
        {name: 'pricesent', type: 'string'},
        {name: 'tagsent', type: 'string'},
        {name: 'bagsent', type: 'string'},
        {name: 'invno', type: 'int'},
        {name: 'invDate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d'},
        {name: 'invQty', type: 'number'}
    ],

    idProperty:  'powdId',
    identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/api/Wips/",

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: "json",
            rootProperty: "data",
            totalProperty: "total"
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('WIP - Model', response, operation);
            }
        }},

    listeners: {
        //beforeload: "onBeforeLoad",
        //load: "onLoad"
    }
});

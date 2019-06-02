Ext.define('Vega.model.sample.Sil', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'sid', type: 'int' },
        //{ name: 'sample_style_v', persist: false },
        { name: 'style', type: 'string', persist: false},
        { name: 'color', type: 'string', persist: false},
        { name: 'descript', type: 'string', persist: false },
        { name: 'season', type: 'string', persist: false},
        { name: 'category', type: 'string', persist: false},
        { name: 'fabricType', type: 'string', persist: false},
        { name: 'grp', type: 'string', persist: false},
        { name: 'subcategory', type: 'string', persist: false},
        { name: 'processtype', type: 'string', persist: false},
        { name: 'fabcontent', type: 'string', persist: false},
        { name: 'leadTime', type: 'string', persist: false},
        { name: 'sizeCat', type: 'string', persist: false},
        { name: 'memo', type: 'string', persist: false},
        { name: 'impCat', type: 'string', persist: false},
        { name: 'designer', type: 'string', persist: false},
        { name: 'user1', type: 'string', persist: false},
        { name: 'user2', type: 'string', persist: false},
        { name: 'user3', type: 'string', persist: false},
        { name: 'user4', type: 'string', persist: false},
        { name: 'cost', type: 'float', persist: false},
        { name: 'confirmCost', type: 'float', persist: false},
        { name: 'defaultBomCost', type: 'float', persist: false},
        { name: 'bomCost1', type: 'float', persist: false},
        { name: 'bomCost2', type: 'float', persist: false},
        { name: 'bomCost3', type: 'float', persist: false},
        { name: 'bomCost4', type: 'float', persist: false},
        { name: 'bomCost5', type: 'float', persist: false},
        { name: 'avgCost', type: 'float', persist: false},
        { name: 'mp', persist: false},
        { name: 'name', type: 'string', mapping: 'mp.name', persist: false},
        { name: 'photos', type: 'string', persist: false},
        { name: 'fabrics', type: 'string', persist: false},
        { name: 'prints', type: 'string', persist: false},
        { name: 'stone', type: 'string', persist: false},
        {
            name: 'lineId',
            type: 'int',
            reference: {
                parent: 'sample.Linesheet',

                //type: 'sales.Powd',
                //association: 'MaterialsByStyle',
                //role: 'linesheet',
                field: 'lineId',
                inverse: 'samplesInLines'
            }
        }
    ],

    idProperty: 'id',
    //clientIdProperty: 'sid',
    identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/api/Sils",
        batchActions: true, // default false when rest proxy.

        reader: {
            type: "json",
            rootProperty: "data"
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});

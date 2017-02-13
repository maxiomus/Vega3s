Ext.define('Vega.model.Bom', {
    extend: 'Vega.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'id', type: 'int'},
        //{ name: 'bomId', type: 'int', mapping: 'id', persist: false },
        { name: 'style', type: 'string', convert: tr},
        { name: 'color', type: 'string', convert: tr},
        { name: 'rawMatType', type: 'string', convert: tr},
        { name: 'rawStyle', type: 'string', convert: tr},
        { name: 'rawColor', type: 'string', convert: tr},
        { name: 'descript', type: 'string', convert: tr},
        { name: 'qty', type: 'number'},
        { name: 'cost', type: 'number'},
        { name: 'extcost', type: 'number', persist: false,
            calculate: function(data){
                return data.qty * data.cost;
            }
        },
        { name: 'allowance', type: 'number'},
        { name: 'perqty', type: 'int'},
        { name: 'defaultFabric', type: 'string', convert: tr},
        { name: 'bomno', type: 'int', defaultValue: 1 },
        { name: 'compLevel', type: 'string', defaultValue: 'Color', convert: tr },
        { name: 'memo', allowNull: true, convert: tr},
        { name: 'uom', type: 'string', convert: tr},
        { name: 'RSUnit1', type: 'number', defaultValue: 1 },
        { name: 'RSUnit2', type: 'number'},
        { name: 'RSUnit3', type: 'number'},
        { name: 'RSUnit4', type: 'number'},
        { name: 'RSUnit5', type: 'number'},
        { name: 'RSUnit6', type: 'number'},
        { name: 'RSUnit7', type: 'number'},
        { name: 'RSUnit8', type: 'number'},
        { name: 'RSUnit9', type: 'number'},
        { name: 'RSUnit10', type: 'number'},
        { name: 'RSUnit11', type: 'number'},
        { name: 'RSUnit12', type: 'number'},
        { name: 'RSUnit13', type: 'number'},
        { name: 'RSUnit14', type: 'number'},
        { name: 'RSUnit15', type: 'number'},
        { name: 'StyleUnit1', type: 'number'},
        { name: 'StyleUnit2', type: 'number'},
        { name: 'StyleUnit3', type: 'number'},
        { name: 'StyleUnit4', type: 'number'},
        { name: 'StyleUnit5', type: 'number'},
        { name: 'StyleUnit6', type: 'number'},
        { name: 'StyleUnit7', type: 'number'},
        { name: 'StyleUnit8', type: 'number'},
        { name: 'StyleUnit9', type: 'number'},
        { name: 'StyleUnit10', type: 'number'},
        { name: 'StyleUnit11', type: 'number'},
        { name: 'StyleUnit12', type: 'number'},
        { name: 'StyleUnit13', type: 'number'},
        { name: 'StyleUnit14', type: 'number'},
        { name: 'StyleUnit15', type: 'number'},
        { name: 'sizeDependent', type: 'auto', defaultValue: 'N'},
        { name: 'location', type: 'string', convert: tr},
        { name: 'po_autocreate', type: 'auto',  defaultValue: 'Y'},
        { name: 'autocopy', type: 'auto' },
        { name: 'line', type: 'int'},
        { name: 'orderno', type: 'int'},
        { name: 'line_seq', type: 'int'},
        { name: 'allow_rate', type: 'number'},
        { name: 'sizeCat', type: 'string', persist: false },
        {
            name: 'productId',
            reference: {
                parent: 'Product',
                //
                //type: 'Product',
                //association: 'bomsByProduct',
                //role: 'product',
                inverse: 'boms'
            }
        }
    ],

    //idProperty: 'bomId',
    identifier: 'negative',

    validators: {
        style: 'presence',
        color: 'presence',
        rawMatType: 'presence',
        rawStyle: 'presence',
        rawColor: 'presence'
    },

    proxy: {
        type: 'rest',
        url: '/api/Boms',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('Bom - Model', response, operation);
            }
        }
    }
});

function tr(value, record){
    if(!Ext.isEmpty(value)){
        return Ext.String.trim(value);
    }
    return value;
};
Ext.define('Vega.model.sample.Bom', {
    extend: 'Vega.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'id'},
        //{ name: 'bomId', type: 'int', mapping: 'id', persist: false },
        { name: 'style', type: 'string', allowBlank: false},
        { name: 'color', type: 'string', allowBlank: false},
        { name: 'rawMatType', type: 'string', allowBlank: false},
        { name: 'rawStyle', type: 'string', allowBlank: false},
        { name: 'rawColor', type: 'string', allowBlank: false},
        { name: 'descript', type: 'string', convert: tr},
        { name: 'fabcontent', type: 'string'},
        { name: 'grp', type: 'string'},
        { name: 'qty', type: 'number'},
        { name: 'cost', type: 'number'},
        { name: 'extcost', type: 'number', persist: false,
            calculate: function(data){
                return data.qty * data.cost;
            }
        },
        { name: 'allowance', type: 'number', allowNull: true },
        { name: 'perqty', type: 'int', allowNull: true},
        { name: 'defaultFabric'},
        { name: 'bomno', type: 'int', defaultValue: 1 },
        { name: 'compLevel', type: 'string', defaultValue: 'Color', convert: tr },
        { name: 'memo', type: 'string', allowNull: true, convert: tr},
        { name: 'uom', type: 'string', convert: tr},
        { name: 'po_autocreate', defaultValue: 'Y'},
        { name: 'autocopy', allowNull: true },
        { name: 'line', type: 'int', allowNull: true },
        { name: 'orderno', type: 'int', allowNull: true},
        { name: 'line_seq', type: 'int', allowNull: true},
        { name: 'allow_rate', type: 'number', allowNull: true},
        { name: 'sizeDependent', defaultValue: 'N'},
        { name: 'location', type: 'string', persist: false, convert: tr},
        /*
        { name: 'RSUnit1', type: 'number' },
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
        */
        { name: 'oh1', type: 'number', persist: false},
        { name: 'oh2', type: 'number', persist: false},
        { name: 'oh3', type: 'number', persist: false},
        { name: 'oh4', type: 'number', persist: false},
        { name: 'oh5', type: 'number', persist: false},
        { name: 'oh6', type: 'number', persist: false},
        { name: 'oh7', type: 'number', persist: false},
        { name: 'oh8', type: 'number', persist: false},
        { name: 'oh9', type: 'number', persist: false},
        { name: 'oh10', type: 'number', persist: false},
        { name: 'oh11', type: 'number', persist: false},
        { name: 'oh12', type: 'number', persist: false},
        { name: 'oh13', type: 'number', persist: false},
        { name: 'oh14', type: 'number', persist: false},
        { name: 'oh15', type: 'number', persist: false},
        { name: 'ohs', type: 'number', persist: false},
        { name: 'sizeCat', type: 'string', persist: false },
        { name: 'lowestno', type: 'int', persist: false },
        { name: 'width', type: 'number'},
        { name: 'actualWidth', type: 'number'},
        { name: 'weight', type: 'number'},
        {
            name: 'bomhId',
            //If the association isn't given data,
            // it will attempt to retrieve the data.
            // Only way to stop it currently is to override the association or give it dummy data.
            reference: {
                parent: 'sample.Bomh',
                //type: 'Product',
                //association: 'bomsByProduct',
                field: 'id',
                //role: 'bomh',
                inverse: 'boms'
            }
        }
    ],

    //idProperty: 'bomId',
    //identifier: 'negative',

    autoLoad: false,

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
    },

    listeners: {
        update: function(store, record, op, mod, dt){
            var bomtotal = 0;
            store.each(function(rec, idx){
                //bomtotal += (rec.data.cost * rec.data.qty);
            });
        }
    }
});

function tr(value, record){
    if(!Ext.isEmpty(value)){
        return Ext.String.trim(value);
    }
    return value;
}

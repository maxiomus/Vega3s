Ext.define('Vega.model.Powd', {
    extend: 'Vega.model.Base',

    requires: [
        'Ext.data.validator.Presence',
        'Ext.data.validator.Range'
    ],

    fields: [
        { name: 'powdId'},
        { name: 'powno', type: 'string'},
        { name: 'revision', type: 'int'},
        { name: 'style', type: 'string', allowNull: true },
        { name: 'color', type: 'string', allowNull: true },
        { name: 'descript', type: 'string', allowNull: true },
        { name: 'prevbody', type: 'string', allowNull: true },
        { name: 'bodyref', type: 'string', allowNull: true },
        { name: 'bodydesc', type: 'string', allowNull: true },
        { name: 'stitchdesc', type: 'string', allowNull: true },
        { name: 'status', allowNull: true },
        { name: 'cost', type: 'float', allowNull: true },
        { name: 'price', type: 'float', allowNull: true },
        { name: 'msrp', type: 'float', allowNull: true },
        { name: 'units', type: 'float', allowNull: true },
        { name: 'bodyimgsrc', type: 'string', allowNull: true },
        { name: 'printimgsrc', type: 'string', allowNull: true },
        { name: 'factory', type: 'string', allowNull: true },
        { name: 'userId', type: 'string'},
        { name: 'createdon', type: 'date', dateFormat: 'c'},
        { name: 'updatedby', type: 'string', allowNull: true },
        { name: 'updatedon', type: 'date', dateFormat: 'c'},
        { name: 'fabricby', type: 'date', dateFormat: 'c'},
        { name: 'markerby', type: 'date', dateFormat: 'c'},
        { name: 'pnsby', type: 'date', dateFormat: 'c'},
        { name: 'remarks', type: 'string', allowNull: true },
        { name: 'bodyimg', type: 'string' },
        { name: 'printimg', type: 'string' },
        { name: 'mats', type: 'auto', persist: false },
        {
            name: 'powhId',
            reference: {
                parent: 'Powh',
                //
                //type: 'sales.Powh',
                //association: 'stylesByHeader',
                //role: 'powh',
                inverse: 'powds'
            }
        }
    ],
    convertOnSet: false,

    validators: {
        bodyref: 'presence',
        //cost: { type: 'range', min: 1 },
        units: { type: 'range', min: 1 }
    },

    idProperty: 'powdId',
    identifier: 'negative',
    //convertOnSet: false

    proxy: {
        type: 'rest',
        url: '/api/Powd/',

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
                console.log('Powd - Model', response, operation);
            }
        }
    }
});
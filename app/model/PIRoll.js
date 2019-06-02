Ext.define('Vega.model.PIRoll', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'rollno', type: 'string' },
        { name: 'logdate', type: 'date', dateFormat: 'c' },
        { name: 'unit1', type: 'number' },
        { name: 'unit2', type: 'number' },
        { name: 'unit3', type: 'number' },
        { name: 'unit4', type: 'number' },
        { name: 'unit5', type: 'number' },
        { name: 'unit6', type: 'number' },
        { name: 'unit7', type: 'number' },
        { name: 'unit8', type: 'number' },
        { name: 'unit9', type: 'number' },
        { name: 'unit10', type: 'number' },
        /*
        { name: 'unit11', type: 'number' },
        { name: 'unit12', type: 'number' },
        { name: 'unit13', type: 'number' },
        { name: 'unit14', type: 'number' },
        { name: 'unit15', type: 'number' },
        { name: 'unit16', type: 'number' },
        { name: 'unit17', type: 'number' },
        { name: 'unit18', type: 'number' },
        { name: 'unit19', type: 'number' },
        { name: 'unit20', type: 'number' },
        { name: 'unit21', type: 'number' },
        { name: 'unit22', type: 'number' },
        { name: 'unit23', type: 'number' },
        { name: 'unit24', type: 'number' },
        { name: 'unit25', type: 'number' },
        { name: 'unit26', type: 'number' },
        { name: 'unit27', type: 'number' },
        { name: 'unit28', type: 'number' },
        { name: 'unit29', type: 'number' },
        { name: 'unit30', type: 'number' },
        */
        { name: 'totalUnit', type: 'number' },
        { name: 'memo', type: 'string' },
        { name: 'actual_yn', type: 'auto' },
        { name: 'cuttable', type: 'int' },
        { name: 'prelimL', type: 'string' },
        { name: 'prelimL_per', type: 'number' },
        { name: 'prelimW', type: 'string' },
        { name: 'prelimW_per', type: 'number' },
        { name: 'washL', type: 'string' },
        { name: 'washL_per', type: 'number' },
        { name: 'washW', type: 'string' },
        { name: 'washW_per', type: 'number' },
        { name: 'shrinkL', type: 'string' },
        { name: 'shrinkW', type: 'string' },
        { name: 'washname', type: 'string' },
        { name: 'barcode', type: 'string' },
        { name: 'markno', type: 'string' },
        { name: 'VRollNo', type: 'string' },
        {
            /*
             When associate models,
             model name with Id prefixed.
             ex. pihId
             or using field...
             */
            name: 'inventoryId',
            reference: {
                parent: 'PI',

                field: 'inventoryId',
                inverse: 'pirolls'
            }
        }
    ],

    //idProperty: 'id',
    //identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/api/PIRolls',

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
                console.log('PIRolls - Model', response, operation);
            }
        }
    }
});

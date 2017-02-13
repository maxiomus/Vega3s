Ext.define('Vega.model.Powdtag', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'name', type: 'string'},
        { name: 'value', type: 'string'},
        { name: 'note', type: 'string'},
        {
            name: 'powdId',
            reference: {
                parent: 'Powd',

                //type: 'Powd',
                //role: 'powdId',
                inverse: 'powdtags'
            }

        }
    ],

    //idProperty: 'id',
    identifier: 'negative',

    proxy: {
        //$configStrict: false,
        type: 'rest',
        url: '/api/Powdtag/',

        //pageParam: '',
        //startParam: '',
        //limitParam: '',

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

        //extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});
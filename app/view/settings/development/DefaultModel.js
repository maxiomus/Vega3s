Ext.define('Vega.view.settings.development.DefaultModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.development-default',

    requires: [
        'Vega.model.settings.Options'
    ],

    stores: {
        supervises: {
            model: 'settings.Options',
            autoLoad: true,

            proxy: {
                type: "rest",
                url: "/api/Settings/development/supervise",

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: "json",
                    rootProperty: "data"
                },

                writer: {
                    type: 'json',
                    //clientIdProperty: 'clientId',
                    //writeAllFields: true,
                    allowSingle: false // set false to send a single record in array
                },

                listeners: {
                    exception: function (proxy, response, operation) {
                        console.log(response, operation);
                    }
                }
            }
        }
    }

});

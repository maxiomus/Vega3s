Ext.define('Vega.view.notice.edit.FormModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.notice-edit-form'

    /*
    stores: {
        fileStore: {
            model: 'Vega.model.File',
            //autoLoad: true,
            proxy: {
                type: "rest",
                url: "/api/Files/",

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
    */
});

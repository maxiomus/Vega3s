Ext.define('Vega.model.company.TopicFile', {
    extend: 'Vega.model.Base',

    fields: ['fileId',
        //'name', 'size', 'created', 'lastmod',
        {
            name: 'file',
            type: 'auto',
            persist: false
        },
        {   name: 'name', mapping: 'file.name'},
        {   name: 'type', mapping: 'file.type'},
        {   name: 'size', mapping: 'file.size'},
        {   name: 'created', mapping: 'file.created'},
        {   name: 'lastmod', mapping: 'file.lastmod'},
        {
            name: 'topicId',
            reference: {
                parent: 'company.Topic',
                //type: 'company.Topic',
                //association: 'MaterialsByStyle',
                inverse: 'filesIns'
            }
        }
    ],

    idProperty: 'fileId',
    identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/api/Files/Topic",

        isUpload: true,

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
});

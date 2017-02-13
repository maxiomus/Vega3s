Ext.define('Vega.model.Post', {
    extend: 'Vega.model.Base',
    
    fields: [
        { name: 'ArticleID', type: 'int' },
        { name: 'BoardID', type: 'int' },
        { name: 'Title', type: 'string' },
        { name: 'Description', type: 'string' },
        { name: 'Link', type: 'string' },
        { name: 'Author', type: 'string' },
        { name: 'UpdatedOn', type: 'date', dateFormat: 'c' },
        { name: 'CreatedOn', type: 'date', dateFormat: 'c' },
        { name: 'ParentID', type: 'int' },
        { name: 'Status', type: 'string' },
        { name: 'Sticky', type: 'int', allowNull: true },
        { name: 'hasAttach', type: 'boolean', persist: false,
            calculate: function(data){

                return !Ext.isEmpty(data.Link);
            }
        }
    ],

    idProperty: 'ArticleID',
    identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/api/Notices/",

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

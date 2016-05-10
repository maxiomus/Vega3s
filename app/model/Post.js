Ext.define('Vega.model.Post', {
    extend: 'Vega.model.Base',
    
    fields: [
        { name: 'ArticleID', type: 'int' },
        { name: 'BoardID', type: 'int' },
        { name: 'Title', type: 'string' },
        { name: 'Description', type: 'string' },
        { name: 'Link', type: 'string' },
        { name: 'Author', type: 'string' },
        { name: 'UpdatedOn', type: 'date' },
        { name: 'CreatedOn', type: 'date' },
        { name: 'ParentID', type: 'int' },
        { name: 'Status', type: 'string' },
        { name: 'Sticky', type: 'int' }
    ],

    idProperty: 'ArticleID'
});

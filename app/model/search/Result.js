Ext.define('Vega.model.search.Result', {
    extend: 'Vega.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'title'
        },
        {
            type: 'string',
            name: 'thumbnail'
        },
        {
            type: 'string',
            name: 'url'
        },
        {
            type: 'string',
            name: 'content'
        }
    ]
});

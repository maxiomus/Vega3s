Ext.define('Vega.model.sales.Powh', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'powhId', type: 'int'},
        { name: 'powno', type: 'string'},
        { name: 'revision', type: 'int'},
        { name: 'ordertype', type: 'string'},
        { name: 'customer', type: 'string'},
        { name: 'division', type: 'string'},
        { name: 'status', type: 'string'},
        { name: 'label', type: 'string'},
        { name: 'custdept', type: 'string'},
        { name: 'preticket', type: 'boolean'},
        { name: 'pack', type: 'string'},
        { name: 'edi', type: 'boolean'},
        { name: 'terms', type: 'string'},
        { name: 'sales', type: 'string'},
        { name: 'salescontact', type: 'string'},
        { name: 'totalqty', type: 'float'},
        { name: 'mainfabric', type: 'string'},
        { name: 'content', type: 'string'},
        { name: 'sizes', type: 'string'},
        { name: 'ratio', type: 'string'},
        { name: 'cxldate', type: 'date'},
        { name: 'dcdate', type: 'date'},
        { name: 'userId', type: 'string'},
        { name: 'createdon', type: 'date'},
        { name: 'updatedby', type: 'string'},
        { name: 'updatedon', type: 'date'},
        { name: 'comments', type: 'string'},
        { name: 'buyer', type: 'string'},
        { name: 'routing', type: 'date'},
        { name: 'factory', type: 'string'},
        { name: 'link', type: 'string'},
        { name: 'remarks', type: 'string'},
        { name: 'submissions', type: 'string'}
    ],

    idProperty: 'powhId',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/api/Powh',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
})
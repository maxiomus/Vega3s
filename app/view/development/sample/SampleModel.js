Ext.define('Vega.view.development.sample.SampleModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sample',

    requires: [
        'Vega.model.Sample'
    ],

    data: {

    },

    stores: {
        samples: {
            model: 'Sample',

            storeId: 'samples',
            autoLoad: false,

            remoteFilter: true,
            remoteSort: true,
            pageSize: 99,

            proxy: {
                type: 'rest',
                url: '/api/Samples/',
                //url: '../Services/Samples.ashx',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }

                //simpleSortMode: true,
                // Parameter name to send  filtering information in
                //startParam: undefined
                //filterParam: 'cutno',

                //encodeFilters: function(filters) {
                //    return filters[0].value;
                //}
            }


        },

        category: {
            fields: [
                'label', 'field'
            ],
            data: [
                {label: 'Style #', field: 'style'},
                {label: 'Body #', field: 'user2'},
                {label: 'Fabric', field: 'fabrics'},
                {label: 'Print', field: 'prints'},
                {label: 'Designer', field: 'designer'},
                {label: 'Stone Vendor', field: 'stone'},
                {label: 'Memo', field: 'memo'}
            ],

            listeners: {

            }
        }
    }

});

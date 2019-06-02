Ext.define('Vega.view.development.windows.sample.UploadModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.File'
    ],

    alias: 'viewmodel.windows-sample-upload',

    stores: {
        /*
        fileStore: {
            model: 'Vega.model.File'
        }
        */
    }

});
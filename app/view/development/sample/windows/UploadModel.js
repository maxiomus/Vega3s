Ext.define('Vega.view.development.sample.windows.UploadModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.File'
    ],

    alias: 'viewmodel.sample-windows-upload',

    stores: {
        fileStore: {
            model: 'Vega.model.File'
        }
    }

});
Ext.define('Vega.view.notice.edit.UploadModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.notice-edit-upload',

    stores: {
        fileStore: {
            model: 'Vega.model.File'
        }
    }

});

Ext.define('Vega.view.development.sample.windows.UploadController', {
    extend: 'Ext.app.ViewController',

    requires: [

    ],

    alias: 'controller.sample-windows-upload',

    init: function() {
        console.log('INIT from Uploads Controller...');
        /*
        this.control({
            '[xtype=windows.upload] button[action=save]': {
                click: this.onSaveClick
            },
            '[xtype=windows.upload] button[action=close]': {
                click: this.onCloseClick
            },
            '[xtype=windows.upload] filefield[name=fileselect]': {
                render: this.onFileInputRender,
                change: this.onChanged
            },
            '[xtype=windows.upload] gridview': {
                itemadd: this.onGridViewItemAdded,
                itemremove: this.onGridViewItemRemoved,
                drop: this.onGridViewDrop
            },
            '[xtype=windows.upload] form > grid > toolbar[dock=top] > button[action=removeall]': {
                click: this.onRemoveAllClick
            },
            '[xtype=windows.upload] form > grid': {
                render: this.onRender
            }
        })
        */
    }
});

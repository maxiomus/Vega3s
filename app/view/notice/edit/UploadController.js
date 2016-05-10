Ext.define('Vega.view.notice.edit.UploadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.notice-edit-upload',

    onFileFieldRender: function(field){
        field.fileInputEl.set({ multiple: 'multiple' });

        if (Ext.isIE) {
            Ext.Msg.alert('Warning', 'IE does not support multiple file upload, to  use this feature use Firefox or Chrome');
        }
    },

    onFileFieldChange: function(field, value, eOpts) {
        //console.log(field.up('grid').getStore());

        if (Ext.isIE) {
            return;
        }

        var el = field.fileInputEl.dom;
        //var size = 0;
        //var names = '';
        for (var i = 0; i < el.files.length; i++) {
            var file = el.files[i],
                store = field.up('grid').getStore();

            store.insert(i, {
                name: file.name,
                size: file.size
            });
            //names += file.name + '\r\n';
            //size += file.size;
        }
    },

    onRemoveAllClick: function(btn, eOpts) {
        //console.log('removeall');
        //btn.up('grid').getStore().removeAll();
        //this.updateStatus();
    },

    onGridViewDrop: function(node, data, overModel, dropPosition, eOpts) {
        //console.log(data.view, dropPosition);

        data.view.refresh();
    },

    onGridViewItemAdded: function(recrods, index, node, eOpts) {
        var grid = this.getViewModel().getView();
        this.updateStatus(grid);
    },

    onGridViewItemRemoved: function(record, index, item, view, eOpts) {
        var grid = this.getViewModel().getView();
        this.updateStatus(grid);
    },

    updateStatus: function(grid) {
        var size, count,
            form = grid.up('form'),
            tbar = grid.down('toolbar'),
            bbar = grid.down('statusbar');

        size = grid.store.sum('size');
        bbar.down('tbtext[name=count]').setText('Files: ' + grid.store.getCount());
        bbar.down('tbtext[name=size]').setText('Total Size: ' + Ext.util.Format.fileSize(size));

        if (form.down('button[action=save]') != null) {
            form.down('button[action=save]').setDisabled(grid.store.getCount() <= 0);
        }
    }
});

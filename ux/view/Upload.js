Ext.define('Ext.ux.view.Upload', {
    extend: 'Ext.view.View',

    requires: [
        'Ext.ux.form.field.UploadFile'
    ],

    alias: 'widget.viewupload',

    /**
     * Alternate Drop Zone...
     */
    config: {
        dropZone: null
    },

    selectionModel: {
        mode: 'multi'
    },

    preserveScrollOnRefresh: true,
    deferInitialRefresh: true,
    enableTextSelection: false,

    initComponent: function(c){
        var me = this;

        me.callParent(arguments);

        if(!me.dropZone){
            me.dropZone = me;
        }

        me.fileUpload = Ext.widget('uploadfiles', {
            //xtype: 'uploadfiles',
            name: 'fileselected',
            width: 88,
            hideLabel: true,
            buttonOnly: true,
            buttonConfig: {
                //text: 'Add files...',
                iconCls: 'x-fa fa-plus'
            },
            multiselect: true,
            //url: '/api/Files/notice/upload',
            //method: 'POST',
            listeners: {
                render: function(field){
                    if (Ext.isIE) {
                        Ext.Msg.alert('Warning', 'IE does not support multiple file upload, to  use this feature use Firefox or Chrome');
                    }
                },
                change: function(field, path, eOpts) {
                    if (Ext.isIE) {
                        return;
                    }

                    if(path){
                        var el = field.fileInputEl.dom,
                            store = me.store;

                        window.URL = window.URL || window.webkitURL;

                        for (var i = 0; i < el.files.length; i++) {
                            var file = el.files[i];
                            //store = me.store;

                            var rec = store.add({
                                name: file.name,
                                type: file.type,
                                size: file.size,
                                path: window.URL.createObjectURL(file)
                            });
                        }

                        field.addFilesToQueue(el.files);
                        //field.fireEvent('fileselected', this, files);
                        //field.reset();
                        if (field.multiselect) {
                            field.fileInputEl.dom.setAttribute('multiple', '1');
                        }
                    }
                }
            }
        });

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Refresh',
                iconCls: 'x-fa fa-refresh',
                handler: function(item, e){
                    me.getStore().reload();
                }
            },{
                text: "Remove",
                iconCls: "x-fa fa-remove",
                handler: function(item, e){
                    Ext.each(me.getSelection(), function(rec, idx, self){
                        rec.drop();
                        if(rec.phantom){
                            me.fileUpload.removeFileFromQueue(rec.id * -1 - 1)
                        }
                    });
                }
            }]
        });

        me.on({
            itemadd: me.onItemAdd,
            itemremove: me.onItemRemove,
            itemcontextmenu: me.onItemContextMenu,
            drop: me.onDrop,
            scope: this
        });
    },

    applyDropZone: function(target){
        var comp;

        if(Ext.isObject(target)){
            comp = target;
        }
        else {
            comp = Ext.getCmp(target);
        }

        return comp;
    },

    onRender: function(ctn, idx){
        var me = this;

        me.callParent(arguments);

        me.dropZone.getEl().on({
            drop: { fn: me.drop, scope: this },
            dragstart: { fn: me.addDropZone, scope: this },
            dragenter: {fn: me.addDropZone, scope: this },
            dragover: {fn: me.addDropZone, scope: this },
            dragleave: {fn: me.removeDropZone, scope: this },
            dragexit: {fn: me.removeDropZone, scope: this }
        });
    },

    addDropZone: function(e) {
        //console.log('add', this);
        var me = this;

        if (!e.browserEvent.dataTransfer || Ext.Array.from(e.browserEvent.dataTransfer.types).indexOf('Files') === -1) {
            return;
        }

        e.stopEvent();

        me.dropZone.addCls('drag-over');
    },

    removeDropZone: function(e) {

        var me = this,
            el = e.getTarget(),
            thisEl = me.dropZone.getEl();

        e.stopEvent();

        if (el === thisEl.dom) {
            me.dropZone.removeCls('drag-over');
            return;
        }

        while (el !== thisEl.dom && el && el.parentNode) {
            el = el.parentNode;
        }

        if (el !== thisEl.dom) {
            me.dropZone.removeCls('drag-over');
        }

    },

    drop: function(e) {
        var me = this,
            files = e.browserEvent.dataTransfer.files,
            records = [],
            store = me.store;

        window.URL = window.URL || window.webkitURL;

        e.stopEvent();

        for (var i = 0; i < files.length; i++) {
            var file = files[i],
                fname = file.name,
                dot =  fname.lastIndexOf('.'),
                ext = fname.substring(dot, fname.length);

            var rec = store.add({
                name: file.name,
                type: file.type,
                size: file.size,
                path: window.URL.createObjectURL(file)
            });

            records.push(rec[0]);
        }

        me.fileUpload.addFilesToQueue(files);

        me.fireEvent('dropped', me, records);

        me.dropZone.removeCls('drag-over');
    },

    onItemAdd: function(records, index, node, view, eOpts){

    },

    onItemRemove: function(records, index, item, view, eOpts){

    },

    onItemContextMenu: function(rec, item, index, e){
        var me = this;
        e.stopEvent();

        if(!me.isSelected(item)){
            me.getSelectionModel().select([rec]);
        }

        me.contextmenu.showAt(e.getXY());
        // cancel default action...
        return false;
    },

    onDrop: function(node, data, overModel, dropPosition, eOpts){
        //console.log('Ext.ux.view.Upload - onDrop', node);
        data.view.refresh();
    }

    /*
    updateStatus: function() {
        var me = this,
            size, count,
            store = me.store;
        //store = me.down('grid').getStore();

        size = store.sum('size');
        me.bbar.down('tbtext[name=count]').setText('Files: ' + store.getCount());
        me.bbar.down('tbtext[name=size]').setText('Total Size: ' + Ext.util.Format.fileSize(size));
    }
    */
})
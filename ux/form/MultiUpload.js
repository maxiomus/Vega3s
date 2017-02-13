
Ext.define("Ext.ux.form.MultiUpload",{
    extend: "Ext.form.Panel",

    alias: 'widget.multiupload',

    requires: [
        'Ext.util.Format',
        'Ext.ux.form.field.UploadFile'
    ],

    /*
    mixins: [
        'Ext.util.StoreHolder'
    ],

    controller: "dal-edit-upload",
    viewModel: {
        type: "dal-edit-upload"
    },
    */

    config: {
        enableEdit: false,
        columns: [],
        fields: [],
        features: []
    },

    scrollable: 'vertical',

    layout: {
        type: 'border'
    },

    //bodyPadding: 5,
    defaults: {
        style: {
            borderTop: '1px solid #cfcfcf',
            borderBottom: '1px solid #cfcfcf'
        }
    },

    initComponent: function(){
        var me = this;

        //me.bindStore(me.store || 'empty-ext-store', true);
        me.fileUpload = Ext.widget('uploadfiles', {
            name: 'fileselected',
            width: 88,
            hideLabel: true,
            buttonOnly: true,
            //buttonText: 'Add files...',
            buttonConfig: {
                iconCls: 'fa fa-plus'
            },
            multiselect: true,
            //url: '/api/Files/upload',
            method: 'POST',
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
                            store = me.down('grid').getStore();
                        //var size = 0;
                        //var names = '';
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

                            //this.fileQueue.push(file);
                            //names += file.name + '\r\n';
                            //size += file.size;
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

        me.tbar = [{
            text: 'Remove All',
            action: 'removeall',
            //ui: 'default',
            //reference: 'btnRemoveAll',
            //glyph: 43,
            iconCls: 'fa fa-cog',
            handler: function(btn){
                //me.store.removeAll();
                me.down('grid').getStore().removeAll();
                me.fileUpload.filesQueue.length = 0;
                //btn.up('grid').getStore().removeAll();
            }
        },'->', me.fileUpload],

        me.statusbar = Ext.widget('statusbar', {
            //xtype: 'statusbar',
            dock: 'bottom',
            defaultText: 'Ready',
            items: [{
                xtype: 'tbfill'
            },{
                xtype: 'tbtext',
                name: 'count',
                text: 'Files: 0'
            },{
                xtype: 'tbseparator'
            },{
                xtype: 'tbtext',
                name: 'size',
                text: 'Total Size: 0'
            }]
        });

        me.bbar = me.statusbar,

        Ext.applyIf(me, {
            items: [{
                xtype: 'grid',
                //flex: 5,
                region: 'center',
                reference: 'components',
                columns: me.columns,
                bind: {
                    store: '{fileStore}'
                },
                //bodyBorder: true,
                features: me.features,

                selModel: {
                    type: 'rowmodel',
                    pruneRemoved: true
                },

                plugins: [{
                    ptype: 'rowediting',
                    clicksToEdit: 1,
                    listeners: {
                        beforeedit: function(editor, context){
                            context.cancel = !me.enableEdit;
                        }
                    }
                }],

                viewConfig: {
                    stripeRows: true,
                    trackOver: true,
                    emptyText: 'Drop Files Here',
                    plugins: [{
                        ddGroup: 'file-group',
                        ptype: 'gridviewdragdrop',
                        enableDrop: true,
                        dragText: 'Drag and drop to reorganize'
                    }],
                    prepareData: function(data, idx, record){
                        return data;
                    },
                    listeners: {
                        itemadd: function(recrods, index, node, eOpts){
                            me.updateStatus();
                        },
                        itemremove: function(record, index, item, view, eOpts){
                            me.updateStatus();
                        },
                        drop: function(node, data, overModel, dropPosition, eOpts){
                            data.view.refresh();
                        }
                    }
                },

                listeners: {
                    afterrender: function(grid){

                    }
                }
            },{
                xtype: 'panel',
                reference: 'fields',
                region: 'east',
                width: '35%',
                scrollable: 'y',
                split: {
                    size: 3,
                    style: {

                    }
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    margin: '5 5 0 5'
                },
                //reference: 'fields',
                //flex: 2,
                hidden: Ext.isEmpty(me.fields),
                items: me.fields
            }]

        });

        me.callParent(arguments);
    },

    listeners: {
        drop: {
            element: 'el',
            fn: 'drop',
            scope: 'this'
        },

        dragstart: {
            element: 'el',
            fn: 'addDropZone',
            scope: 'this'
        },

        dragenter: {
            element: 'el',
            fn: 'addDropZone',
            scope: 'this'
        },

        dragover: {
            element: 'el',
            fn: 'addDropZone',
            scope: 'this'
        },

        dragleave: {
            element: 'el',
            fn: 'removeDropZone',
            scope: 'this'
        },

        dragexit: {
            element: 'el',
            fn: 'removeDropZone',
            scope: 'this'
        }
    },

    noop: function(e) {
        e.stopEvent();
    },

    addDropZone: function(e) {
        //console.log('add', this);
        if (!e.browserEvent.dataTransfer || Ext.Array.from(e.browserEvent.dataTransfer.types).indexOf('Files') === -1) {
            return;
        }

        e.stopEvent();

        this.addCls('drag-over');
    },

    removeDropZone: function(e) {

        var el = e.getTarget(),
            thisEl = this.getEl();

        e.stopEvent();

        if (el === thisEl.dom) {
            this.removeCls('drag-over');
            return;
        }

        while (el !== thisEl.dom && el && el.parentNode) {
            el = el.parentNode;
        }

        if (el !== thisEl.dom) {
            this.removeCls('drag-over');
        }

    },

    drop: function(e) {
        window.URL = window.URL || window.webkitURL;
        e.stopEvent();

        var me = this,
            files = e.browserEvent.dataTransfer.files,
            //store = me.store;
            store = me.down('grid').getStore();

        me.fileUpload.addFilesToQueue(files);

        Ext.Array.forEach(Ext.Array.from(files), function(file) {
            var rec = store.add({
                name: file.name,
                type: file.type,
                size: file.size,
                path: window.URL.createObjectURL(file)
            });

            //me.showThumbnail(file, rec[0].id);
            //console.log('drop', file);
            me.statusbar.down('tbtext[name=count]').update('Files: ' + store.getCount());
            me.statusbar.down('tbtext[name=size]').update('Total Size: ' + Ext.util.Format.fileSize(store.sum('size')));
        });

        this.removeCls('drag-over');
    },

    showThumbnail: function(file, id){
        var imageType = /^image\//;

        if(imageType.test(file.type)){
            var img = document.getElementById(id);
            //img.classList.add("obj");
            //img.file = file;

            img.src = window.URL.createObjectURL(file);
            img.onload = function(){
                //window.URL.revokeObjectURL(this.src);
            }
        }
    },

    updateStatus: function() {
        var me = this,
            size, count,
            //store = me.store;
            store = me.down('grid').getStore();

        size = store.sum('size');
        me.statusbar.down('tbtext[name=count]').setText('Files: ' + store.getCount());
        me.statusbar.down('tbtext[name=size]').setText('Total Size: ' + Ext.util.Format.fileSize(size));
    }
});

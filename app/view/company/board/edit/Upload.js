
Ext.define("Vega.view.company.board.edit.Upload",{
    extend: "Ext.grid.Panel",

    alias: 'widget.board-edit-upload',

    requires: [
        'Ext.ux.statusbar.StatusBar',
        'Ext.ux.form.field.UploadFile'
    ],

    listeners: {
        //storeadd: 'onStoreAdd',
        //storeremove: 'onStoreRemove',

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

    initComponent: function(){
        var me = this;

        /*Ext.define('File', {
            extend: 'Ext.data.Model',
            fields: [ 'id', 'name', 'size', 'lastmod' ],
            idProperty: 'id'
        });

        var fileStore = Ext.create('Ext.data.Store', {
            model: 'File'
        });*/

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
                            store = field.up('grid').getStore();
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
            xtype: 'button',
            action: 'removeall',
            //reference: 'btnRemoveAll',
            text: 'Remove All',
            //glyph: 43,
            iconCls: 'x-fa fa-cog',
            handler: function(btn){
                btn.up('grid').getStore().removeAll();
                me.fileUpload.filesQueue.length = 0;
            }
        }, '->', me.fileUpload];

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
        me.bbar = me.statusbar;

        Ext.applyIf(me, {
            //store: fileStore,
            columns: me.buildColumns(),
            viewConfig: {
                stripeRows: true,
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragText: 'Drag and drop to reorganize'
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
            }
        });

        me.callParent(arguments);

        this.relayEvents(this.getStore(), ['add', 'remove'], 'store');
    },

    buildColumns: function(){
        return [{
            width: 30,
            menuDisabled: true,
            align: 'center',
            sortable: false,
            renderer: function(value, metaData, record, rowIndex, colIndex, store){
                return rowIndex + 1;
            }
        },{
            text: 'ID',
            dataIndex: 'id',
            menuDisabled: true,
            fixed: true,
            width: 25,
            hidden: true
        },{
            text: 'File Name',
            dataIndex: 'name',
            menuDisabled: true,
            flex: 1
        },{
            text: 'Created',
            dataIndex: 'created',
            menuDisabled: true,
            xtype: 'datecolumn',
            format: 'MM-dd-yyyy',
            hidden: true
        },{
            text: 'Last Modified',
            dataIndex: 'lastmod',
            menuDisabled: true,
            xtype: 'datecolumn',
            format: 'MM-dd-yyyy',
            hidden: true
        },{
            text: 'Size',
            dataIndex: 'size',
            menuDisabled: true,
            formatter: 'fileSize'
        },{
            text: 'Remove',
            xtype: 'actioncolumn',
            width: 60,
            align: 'center',
            menuDisabled: true,
            items: [{
                //icon: 'resources/images/shared/icon-error.png',
                //glyph: 45,
                //ui: 'default',
                iconCls: 'x-fa fa-remove red-txt',
                tooltip: 'Remove',
                handler: function(gridview, rowIndex, colIndex) {
                    //var store = grid.getStore();
                    //store.removeAt(rowIndex);
                    var field = gridview.grid.getDockedItems('toolbar[dock="top"] > uploadfiles')[0],
                        rec = gridview.getStore().getAt(rowIndex);
                    rec.drop();
                    //console.log(gridview, rec.id * -1 - 1)
                    if(rec.phantom){
                        field.removeFileFromQueue(rec.id * -1 - 1);
                    }
                }
            }]
        }];
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
            store = me.store;
            //store = me.down('grid').getStore();

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

    updateStatus: function() {
        var me = this,
            size, count,
            store = me.store;
            //store = me.down('grid').getStore();

        size = store.sum('size');
        me.statusbar.down('tbtext[name=count]').setText('Files: ' + store.getCount());
        me.statusbar.down('tbtext[name=size]').setText('Total Size: ' + Ext.util.Format.fileSize(size));
    }
});

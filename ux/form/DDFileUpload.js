/**
 * This componet handles icon upload along with preview and drag drop.
 * Usage: include it as xtype: 'imageuploadfield', including this field in a form requires us to submit it via a method submitWithImage instead of submit.
 */

Ext.define('Ext.ux.form.DDFileUpload', {
    extend: 'Ext.container.Container',

    alias: 'widget.ddfileupload',

    /**
     * @cfg {String} text of the button, which is one of the ways to choose image
     */
    buttonText: 'Browse',

    /**
     * @cfg {String} name of the params which contained the image. This is will be used to process the image in the server side
     */
    name: 'file',

    layout: {
        type: 'fit'
    },

    initComponent: function () {
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            fields: ['name', 'size', 'file', 'status']
        });

        var statusBar = Ext.create('Ext.ux.statusbar.StatusBar', {
            xtype: 'statusbar',
            dock: 'bottom',
            defaultText: 'Ready',
            text: 'Ready',

            items: [{
                xtype: 'tbfill'
            },{
                xtype: 'tbtext',
                name: 'count',
                html: 'Files: 0'
            },{
                xtype: 'tbseparator'
            },{
                xtype: 'tbtext',
                name: 'size',
                html: 'Total Size: 0 bytes'
            }]
        });

        var upLoadButton = {
            xtype: 'filefield',
            name: 'imageupload',
            //iconCls: 'fa fa-paperclip',
            hideLabel: true,
            /*border: 0,
             style: {
             borderColor: 'black',
             borderStyle: 'solid'
             },*/
            inputId: 'fileuploadfield_' + me.id,
            //layout: me.layout,
            allowBlank: me.allowBlank,
            buttonConfig: {
                //width: me.imageWidth - 10,
                //iconCls: 'fa fa-paperclip',
                text: me.buttonText
            },
            //buttonText: me.buttonText,
            buttonOnly: true,
            listeners: {
                change: function (input, value, opts) {
                    var el = input.getEl().down('input[type=file]').dom;

                    for (var i = 0; i < el.files.length; i++)
                    {
                        var file = el.files[i];
                        store.add({
                            file: file,
                            name: file.name,
                            size: file.size,
                            status: 'Ready'
                        });

                        statusBar.down('tbtext[name=count]').update('Files: ' + store.getCount());
                        statusBar.down('tbtext[name=size]').update('Total Size: ' + Ext.util.Format.fileSize(store.sum('size')));
                    }
                }
            }
        };

        var grid = {
            xtype: 'grid',
            store: store,

            tbar: [{
                text: "Delete All",
                ui: 'default',
                handler: function() {
                    store.reload();
                }
            },'->', upLoadButton],

            columns: [{
                header: 'File Name',
                dataIndex: 'name',
                flex: 4
            },{
                header: 'Size',
                dataIndex: 'size',
                flex: 1,
                renderer: Ext.util.Format.fileSize
            },{
                header: 'Status',
                dataIndex: 'status',
                flex: 1,
                renderer: this.rendererStatus
            },{
                xtype: 'widgetcolumn',
                header: 'Delete ?',
                flex: 1,
                menuDisabled: true,
                widget: {
                    xtype: 'button',
                    width: 25,
                    ui: 'soft-red',
                    iconCls: 'fa fa-close',
                    hideLabel: true,
                    handler: function(btn, e){
                        var rowIndex = btn.up('gridview').indexOf(btn.el.up('table'));

                        store.removeAt(rowIndex);

                        statusBar.down('tbtext[name=count]').update('Files: ' + store.getCount());
                        statusBar.down('tbtext[name=size]').update('Total Size: ' + Ext.util.Format.fileSize(store.sum('size')));
                    }
                }
            }],

            viewConfig: {
                stripeRows: true,
                emptyText: 'Drop Files Here',
                deferEmptyText: false,
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragText: 'Drag and drop to reorganize'
                },

                listeners: {
                    drop: this.onGridViewDrop
                }
            },

            bbar: statusBar
        };

        me.items = [grid];
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
        e.stopEvent();

        var grid = this.down('grid'),
            store = grid.getStore(),
            statusbar = grid.down('statusbar');

        Ext.Array.forEach(Ext.Array.from(e.browserEvent.dataTransfer.files), function(file) {
            store.add({
                file: file,
                name: file.name,
                size: file.size,
                status: 'Ready'
            });
            //console.log('drop', file);
            statusbar.down('tbtext[name=count]').update('Files: ' + store.getCount());
            statusbar.down('tbtext[name=size]').update('Total Size: ' + Ext.util.Format.fileSize(store.sum('size')));
        });

        this.removeCls('drag-over');
    },

    rendererStatus: function(value, metaData, record, rowIndex, colIndex, store) {
        var color = "grey";
        if (value === "Ready") {
            color = "blue";
        } else if (value === "Uploading") {
            color = "orange";
        } else if (value === "Uploaded") {
            color = "green";
        } else if (value === "Error") {
            color = "red";
        }
        metaData.tdStyle = 'color:' + color + ";";
        return value;
    },

    onGridViewDrop: function(node, data, overModel, dropPosition, eOpts) {
        //console.log(data.view, dropPosition);

    },

    postDocument: function(url, store, i) {
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        fd.append("serverTimeDiff", 0);
        xhr.open("POST", url, true);
        fd.append('index', i);
        fd.append('file', store.getData().getAt(i).data.file);
        //xhr.setRequestHeader("Content-Type","multipart/form-data");
        xhr.setRequestHeader("serverTimeDiff", 0);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //handle the answer, in order to detect any server side error
                if (Ext.decode(xhr.responseText).success) {
                    store.getData().getAt(i).data.status = "Uploaded";
                } else {
                    store.getData().getAt(i).data.status = "Error";
                }
                store.getData().getAt(i).commit();
            } else if (xhr.readyState == 4 && xhr.status == 404) {
                store.getData().getAt(i).data.status = "Error";
                store.getData().getAt(i).commit();
            }
        };
        // Initiate a multipart/form-data upload
        xhr.send(fd);
    }
});


/**
 * include a method submitWithImage for form. This method should be used when a form as xtype: 'imageuploadfield'.
 * it accepts params in the same as submit method, form.submitWithImage({
                                                                          url: 'some url',
                                                                          method: 'POST',
                                                                          params: {
                                                                            param_1: 'some value',
                                                                            param_2: 'some value'
                                                                            },
                                                                            success: onSuccess
                                                                            failure: onFailure
                                                                       });
 */

Ext.override(Ext.FormPanel, {
    submitWithImage: function (options) {
        var url = options.url,
            success = options.success,
            failure = options.failure,
            params = Ext.merge(this.getValues(), options.params),
            waitMsg = options.waitMsg,
            formData = new FormData(this);

        for (var attr in params) {
            formData.append(attr, params[attr]);
        }

        Ext.each(this.uploadableImages, function (uploadableImage) {
            formData.append(uploadableImage['imageKey'], uploadableImage['imageFile']);
        });

        // this is to send the authentication_token, change it according to your need
        formData.append('authenticity_token', App.AuthentictyToken);

        var xhr = new XMLHttpRequest(),
            method = options.method || 'POST';
        xhr.open(method, options.url);

        xhr.addEventListener('loadstart', function (e) {
            Ext.MessageBox.show({
                msg: waitMsg,
                progressText: 'Saving...',
                width: 300,
                wait: true,
                waitConfig: {
                    interval: 200
                }
            });
        }, false);

        xhr.addEventListener('loadend', function (evt) {
            if (evt.target.status === 200) {
                Ext.MessageBox.hide();
                var obj = Ext.decode(evt.target.responseText);
                if (obj.success) {
                    success(obj);
                } else {
                    failure(obj);
                }
            } else {
                Ext.MessageBox.hide();
                failure(obj);
            }

        }, false);

        xhr.send(formData);


    }

});
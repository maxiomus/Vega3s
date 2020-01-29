Ext.define('Ext.ux.form.ImageUpload', {
    extend: 'Ext.form.Panel',

    alias: 'widget.imageupload',

    /**
     * @cfg {Array} Array of upload files
     */
    filesQueue: [],

    /**
     * @cfg {Array} Array of preview images object
     */
    previewImages: [],

    fields: [],

    config: {
        /**
         * @cfg {Boolean} width of image
         */
        imageWidth: 128,

        /**
         * @cfg {Boolean} height of image
         */
        imageHeight: 140,

        /**
         * @cfg {Boolean} Enable image multiple selection
         */
        multiSelect: false,

        /**
         * @cfg {String} src of preview image
         */
        previewImageSrc: ''
    },

    layout: {
        type: 'hbox'
    },

    initComponent: function(){
        var me = this;

        var uploadButton = Ext.widget('uploadfiles', {
            name: 'fileselected',
            //width: me.imageWidth,
            width: 88,
            margin: '5 0 0 0',
            /*border: 0,
             style: {
             borderColor: 'black',
             borderStyle: 'solid'
             },*/
            inputId: 'fileuploadfield_' + me.id,
            //layout: me.layout,
            //allowBlank: me.allowBlank,
            //url: '/api/Files/dal/upload',
            //method: 'POST',
            hideLabel: true,
            buttonOnly: true,
            buttonConfig: {
                //text: 'Browse...',
                iconCls: 'fa fa-plus'
            },
            listeners: {
                render: function(field){
                    if (Ext.isIE) {
                        Ext.Msg.alert('Warning', 'IE does not support multiple file upload, to  use this feature use Firefox or Chrome');
                    }
                },

                /**
                 *
                 * @param field {Ext.form.field.File}
                 * @param value {String} The file value returned by the underlying file input field
                 * @param eOpts
                 */
                change: function(field, value, e) {
                    if (Ext.isIE) {
                        return;
                    }

                    if(value){
                        var el = field.fileInputEl.dom;

                        if (me.multiSelect) {
                            field.fileInputEl.dom.setAttribute('multiple', '1');
                        }

                        field.addFilesToQueue(el.files);
                        me.attachImage(el.files);
                    }
                }
            }
        });

        me.tbar = [uploadButton, '->'];

        var previewImage = {
            xtype: 'image',
            frame: true,
            autoEl: 'div',
            //canvas: 'Canvas-' + me.id,
            width: me.imageWidth,
            height: me.imageHeight,
            animate: 2000,
            bind: {
                //hidden: '{!previewImageSrc}'
                src: '{previewImageSrc}'
            },
            flex: 1
        };

        me.previewImages.length = 0;
        me.previewImages.push(previewImage);

        if (!Ext.isEmpty(me.previewImageSrc)) {
            previewImage.src = me.previewImageSrc;
            //previewImage.hidden = false;
        }

        me.items = [{
            xtype: 'fieldset',
            title: 'Preview',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            //padding: '18 10 0 10',
            width: me.imageWidth * me.previewImages.length + 22,
            height: me.imageHeight + 28,
            items: me.previewImages
        },{
            xtype: 'container',
            reference: 'fields',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            margin: '10, 10, 0, 20',
            flex: 1,
            defaultType: 'textfield',
            items: me.fields
        }];

        me.callParent();
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
            field = me.down('uploadfiles'),
            files = e.browserEvent.dataTransfer.files;

        field.addFilesToQueue(files);
        me.attachImage(files);

        this.removeCls('drag-over');

        this.fireEvent('dropped', me, field);
    },

    attachImage: function (files) {
        var me = this,
            imageType = /^image\//;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            if (!imageType.test(file.type)) {
                continue;
            }

            /*
             else {
             Ext.Msg.alert('Error', 'Only images please, supported files are jpeg,jpg,png,gif,ico');
             }
             */

            var previewImage = {
                xtype: 'image',
                frame: true,
                //autoEl: 'div',
                //canvas: uploadButton.inputId,
                width: me.imageWidth,
                height: me.imageHeight,

                animate: 1000,
                flex: 1,
                listeners: {
                    render: function (c) {
                        c.getEl().on('click', function (e) {
                            //console.log('image click', me.query('label[targetId="' + me.id + '-droptarget-' + name.toLowerCase() + '"]')[0]);
                            //var dropTarget = me.query('label[targetId="' + me.id + '-droptarget-' + name.toLowerCase() + '"]')[0];
                            //dropTarget.show();
                            //c.hide();
                        }, c);
                    }
                },
                scope: this
            };

            // reset previewImage
            me.down('fieldset').removeAll();

            var hiddens = me.query('container > hidden');
            hiddens.forEach(function(hidden){
                if(hidden.name == 'name'){
                    hidden.setValue(file.name);
                }
                if(hidden.name == 'type'){
                    hidden.setValue(file.type);
                }
                if(hidden.name == 'size'){
                    hidden.setValue(file.size)
                }
            });

            var image = me.down('fieldset').add(previewImage);

            var reader = new FileReader();
            reader.onload = function (e) {
                image.setStyle({
                    width: me.imageWidth,
                    height: me.imageHeight
                });
                image.setSrc(window.URL.createObjectURL(files[0]));
            };

            reader.readAsDataURL(files[0]);
            image.show();

            window.URL.revokeObjectURL(files[0]);

            /*
            var reader = new FileReader(),
                image = me.down('fieldset').add(previewImage);

            reader.onload = function (e) {
                image.setSrc(e.target.result);
            };

            reader.readAsDataURL(file);
            //image.show();
            */
        }
    },

    /**
     * add files to queue
     */
    addFilesToQueue: function(files) {
        if(files && this.filesQueue && this.filesQueue instanceof Array) {
            if(!files.length) {
                return;
            }

            if(!this.multiSelect) {
                this.filesQueue = new Array();
                this.filesQueue.push(files[0]);
            }
            else {
                for(var i=0;i<files.length;i++) {
                    this.filesQueue.push(this.setIdToFile(files[i]));
                }
            }
        }
    },

    /**
     * remove file from queue by provided id or File
     */
    removeFileFromQueue: function(file) {
        if(file instanceof File) {
            var id = file.id;
        }
        else {
            id = file;
        }

        for(var i=0;i<this.filesQueue.length;i++) {
            if(this.filesQueue[i].id == id) {
                this.filesQueue.splice(i,1);
            }
        }
    },

    /**
     * Set id to file to be uniquely identified
     */
    setIdToFile: function(file) {
        file.id = this.generateUniqueId();
        return file;
    },

    /**
     * Generates unique id for file
     */
    generateUniqueId: function() {
        var id = 0;
        var length = this.filesQueue.length;
        if(length > 0) {
            for(var i=0;i<length;i++) {
                var element = this.filesQueue[i];
                if(id <= element.id) {
                    id = element.id + 1;
                }
            }
        }
        return id;
    },

    /**
     * Returns a queue of files
     */
    getFilesQueue: function() {
        return this.filesQueue;
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

Ext.override(Ext.form.Panel, {
    submitWithImage: function (options) {
        var url = options.url,
            success = options.success,
            failure = options.failure,
            params = Ext.merge(this.getValues(), options.params),
            waitMsg = options.waitMsg,
            formData = new FormData();

        for (var attr in params) {
            formData.append(attr, params[attr]);
        }

        Ext.each(this.filesQueue, function (image) {
            formData.append('fileselected', image);
        });

        // this is to send the authentication_token, change it according to your need
        //formData.append('authenticity_token', App.AuthentictyToken);

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

        this.filesQueue.length = 0;
    }
});
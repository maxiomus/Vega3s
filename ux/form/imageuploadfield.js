/**
 * This componet handles icon upload along with preview and drag drop.
 * Usage: include it as xtype: 'imageuploadfield', including this field in a form requires us to submit it via a method submitWithImage instead of submit.
 */

Ext.define('Ext.ux.form.ImageUploadField', {
    extend: 'Ext.form.FieldContainer',

    alias: 'widget.imageuploadfield',

    /**
     * @cfg {Sting} title of the fieldset which includes this field
     */

    title: 'Choose an image',

    /**
     * @cfg {String} text of the button, which is one of the ways to choose image
     */
    buttonText: 'Choose image',

    /**
     * @cfg {String} name of the params which contained the image. This is will be used to process the image in the server side
     */
    name: 'image',

    /**
     * @cfg {String} src of preview image
     */
    previewImageSrc: null,

    /**
     * @cfg {Boolean} width of image
     */
    imageWidth: 128,

    /**
     * @cfg {Boolean} height of image
     */
    imageHeight: 160,

    /**
     * text to be displayed in the drag area
     */
    dragAreaText: 'Drop an image here',

    initComponent: function () {
        var me = this;

        var upLoadButton = {
            xtype: 'fileuploadfield',
            name: 'imageupload',
            //ui: 'button-red',
            width: me.imageWidth,
            margin: '5 0 0 0',
            /*border: 0,
            style: {
                borderColor: 'black',
                borderStyle: 'solid'
            },*/
            inputId: 'fileuploadfield_' + me.id,
            layout: me.layout,
            allowBlank: me.allowBlank,
            buttonConfig: {
                width: me.imageWidth - 10,
                text: me.buttonText
            },
            //buttonText: me.buttonText,
            buttonOnly: true,
            listeners: {
                change: function (input, value, opts) {
                    var canvas = Ext.ComponentQuery.query('image[canvas="' + input.inputId + '"]')[0],
                        file = input.getEl().down('input[type=file]').dom.files[0];
                    me.attachImage(file, canvas);
                }
            }
        };

        var previewImage = {
            xtype: 'image',
            frame: true,
            canvas: upLoadButton.inputId,
            width: me.imageWidth,
            height: me.imageHeight,
            animate: 2000,
            hidden: true, // initially hidden
            scope: this
        };

        if (!Ext.isEmpty(me.previewImageSrc)) {
            // if an existing value
            previewImage.src = me.previewImageSrc;
            previewImage.hidden = false;
        }

        me.dropTargetId = 'droptarget-' + (me.itemId || Math.random().toString());

        var dropTarget = {
            xtype: 'label',
            html: '<div class="drop-target"' + 'id=' + '\'' + me.dropTargetId + '\'' + '>' + me.dragAreaText + '</div>'
        };

        me.on('afterrender', function (e) {
            console.log('afterrender', me.query('image'), me.down('image'))
            var previewImage = me.down('image');
            if (!me.previewImageSrc){
                previewImage.setSrc('');
            }
                
            var dropWindow = document.getElementById(me.dropTargetId);

            dropWindow.addEventListener('dragenter', function (e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
            }, false);

            dropWindow.addEventListener('dragover', function (e) {
                e.preventDefault();
                dropWindow.classList.add('drop-target-hover');
            });

            dropWindow.addEventListener('drop', function (e) {
                e.preventDefault();
                dropWindow.classList.remove('drop-target-hover');

                var file = e.dataTransfer.files[0],
                    canvas = Ext.ComponentQuery.query('image[canvas="' + previewImage.canvas + '"]')[0];
                me.attachImage(file, canvas);

            }, false);

            dropWindow.addEventListener('dragleave', function (e) {
                dropWindow.classList.remove('drop-target-hover');
            }, false);

        });

        var fileUploadFieldSet = {
            xtype: 'fieldset',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            },

            title: me.title,
            style: {
                //marginRight: '10px'
            },

            items: [
                {
                    //columnWidth: 0.5,
                    margin: '0 10 5 0',
                    items: [dropTarget, upLoadButton]
                },
                {
                    //columnWidth: 0.5,
                    items: [previewImage]
                }
            ]
        };

        me.items = [fileUploadFieldSet];
        me.callParent(arguments);
    },

    attachImage: function (file, canvas) {

        var me = this,
            form = me.up('form');
        if (file.type == "image/jpeg" ||
            file.type == "image/jpg" ||
            file.type == "image/png" ||
            file.type == "image/gif" ||
            file.type == "image/ico"
            ) {

            if (!form.uploadableImages) {
                form.uploadableImages = [];
            }
            form.uploadableImages.push({imageKey: me.name, imageFile: file});

            var reader = new FileReader();
            reader.onload = function (e) {
                canvas.setSrc(e.target.result);
            };

            reader.readAsDataURL(file);
            canvas.show();

        } else {
            Ext.Msg.alert('Error', 'Only images please, supported files are jpeg,jpg,png,gif,ico');
        }
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
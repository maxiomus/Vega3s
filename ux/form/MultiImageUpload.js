/**
 * This componet handles icon upload along with preview and drag drop.
 * Usage: include it as xtype: 'imageuploadfield', including this field in a form requires us to submit it via a method submitWithImage instead of submit.
 */

Ext.define('Ext.ux.form.MultiImageUpload', {
    extend: 'Ext.form.FieldContainer',

    alias: 'widget.multiimageupload',

    /**
     * @cfg {String} text of the button, which is one of the ways to choose image
     */
    buttonText: 'Select image',

    /**
     * @cfg {String} name of the params which contained the image. This is will be used to process the image in the server side
     */
    name: 'image',

    /**
     * @cfg {Array} Array of preview images
     */
    //previewImages: [],

    /**
     * @cfg {Boolean} width of image
     */
    imageWidth: 128,

    /**
     * @cfg {Boolean} height of image
     */
    imageHeight: 140,

    /**
     * text to be displayed in the drag area
     */
    dragAreaText: 'Drop an image here',

    /**
     * @cfg {String} src of preview image
     */
    previewImageSrc: [],

    /**
     * @cfg {Array} Array of names for preview images
     */
    previewNames: [],

    /**
     * Allow selecting multiple files
     */
    multiselect: false,

    config: {

    },

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function () {

        var me = this,
            //previewImages = [],
            //dropTargets = [],
            fieldSetContainer = [];

        if(!Ext.isEmpty(me.previewNames)){
            var count = 0;
            Ext.each(me.previewNames, function(name) {
                var dropTargetId = name.toLowerCase() + '-droptarget-' +  me.id,
                    pasteAreaId = name.toLowerCase() + '-pasteArea-' +  me.id,

                dropTarget = {
                    xtype: 'box',
                    targetId: dropTargetId,
                    hidden: true, // initially hidden
                    html: '<div class="drop-target"' + 'id=' + '\'' + dropTargetId + '\'' + '>' + me.dragAreaText + '</div>'
                },

                pasteArea = {
                    xtype: 'box',
                    areaId: pasteAreaId,
                    width: 128,
                    height: 140,
                    hidden: true, // initially hidden
                    emptyText: 'Paste Image Here',
                    autoEl: {
                        tag: 'textarea',
                        id: pasteAreaId,
                        placeholder: 'Paste Image Here'
                    },
                    listeners: {
                        render: function(c){
                            c.getEl().on('paste', function(e){
                                var items = (e.event.clipboardData  || e.event.originalEvent.clipboardData).items;
                                //console.log(JSON.stringify(items)); // will give you the mime types
                                // find pasted image among pasted items
                                var blob = null;
                                for (var i = 0; i < items.length; i++) {
                                    if (items[i].type.indexOf("image") === 0) {
                                        blob = items[i].getAsFile();
                                    }
                                }
                                // load image if there is a pasted image
                                /*
                                 if (blob !== null) {
                                 var reader = new FileReader();
                                 reader.onload = function(event) {
                                 console.log(event.target.result); // data url!
                                 document.getElementById("pastedImage").src = event.target.result;
                                 };
                                 reader.readAsDataURL(blob);
                                 }
                                 */
                                if (blob != null) {
                                    me.addFilesToQueue(c.ownerCt, [blob]);
                                    c.hide(null, function () {
                                        var btn = this.ownerCt.down('button[itemId='+name.toLowerCase()+'-paste-'+me.id+']');
                                        btn.setPressed(false);
                                    });
                                }
                                else {
                                    Vega.util.Utils.showErrorMsg('You are copying non-Image type! Please use Image type only.')
                                }

                            }, c);
                        }
                    }
                };

                //dropTargets.push(dropTarget);

                /*
                var previewImage = {
                    xtype: 'image',
                    name: name.toLowerCase() +'imgsrc',
                    canvas: me.id + '-canvas-' + name.toLowerCase(),
                    width: me.imageWidth,
                    height: me.imageHeight,
                    animate: 2000,
                    hidden: false, // initially not hidden

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

                if (!Ext.isEmpty(me.previewImageSrc[count])) {
                    // if an existing value
                    previewImage.src = me.previewImageSrc[count];

                    //previewImage.hidden = false;
                }
                */

                //previewImages.push(previewImage);
                fieldSetContainer.push({
                    xtype: 'fieldset',
                    title: name,
                    layout: {
                        type: 'hbox'
                    },
                    flex: 1,
                    padding: '2 0 8 8',
                    defaultType: 'container',
                    items: [{
                        layout: 'fit',
                        items: me.previewImageSrc[count]
                    },
                    dropTarget,
                    pasteArea,
                    {
                        layout: {
                            type: 'vbox',
                            align: 'begin'
                        },
                        items: [{
                            xtype: 'button',
                            itemId: name.toLowerCase() + '-btn-' + me.id,
                            tooltip: 'Toggle Drop Area',
                            enableToggle: true,
                            margin: '0 0 3 3',
                            iconCls: 'fa fa-paperclip',
                            toggleHandler: function(btn, pressed){
                                //console.log(btn, btn.ownerCt, btn.ownerCt.ownerCt);
                                var dropTarget = me.query('box[targetId="' + name.toLowerCase() + '-droptarget-' + me.id + '"]')[0],
                                    pasteArea = me.query('box[areaId="' + name.toLowerCase() + '-pasteArea-' + me.id + '"]')[0],
                                //previewImage = me.query('image[canvas="' + me.id + '-canvas-' + name.toLowerCase() + '"]')[0];
                                    previewImage = btn.ownerCt.ownerCt.down('image');

                                previewImage.setHidden(pressed);
                                //pasteArea.setHidden(pressed);
                                dropTarget.setHidden(!pressed);
                                Ext.Array.each(me.query('button'), function(button){
                                    if(btn.id != button.id){

                                        if(button.pressed){
                                            button.toggle(!pressed);
                                            previewImage.setHidden(pressed);
                                        }
                                    }
                                })
                            },
                            scope: this
                        },{
                            xtype: 'button',
                            itemId: name.toLowerCase() + '-paste-' + me.id,
                            tooltip: 'Toggle Paste Area',
                            enableToggle: true,
                            margin: '0 0 3 3',
                            iconCls: 'fa fa-paste',
                            toggleHandler: function(btn, pressed){
                                //console.log(btn, btn.ownerCt, btn.ownerCt.ownerCt);
                                var dropTarget = me.query('box[targetId="' + name.toLowerCase() + '-droptarget-' + me.id + '"]')[0],
                                    pasteArea = me.query('box[areaId="' + name.toLowerCase() + '-pasteArea-' + me.id + '"]')[0],
                                    previewImage = btn.ownerCt.ownerCt.down('image');

                                previewImage.setHidden(pressed);
                                pasteArea.setHidden(!pressed);
                                //dropTarget.setHidden(pressed);
                                Ext.Array.each(me.query('button'), function(button){
                                    if(btn.id != button.id){

                                        if(button.pressed){
                                            button.toggle(!pressed);
                                            previewImage.setHidden(pressed);
                                        }
                                    }
                                });
                            },
                            scope: this
                        },{
                            xtype: 'filefield',
                            itemId: name.toLowerCase() + '-upload-' + me.id,
                            width: 30,
                            hideLabel: true,
                            buttonOnly: true,
                            //buttonText: '',
                            buttonConfig: {
                                text: '',
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

                                        me.addFilesToQueue(field.ownerCt.ownerCt, el.files);
                                        //me.attachImage(el.files);
                                    }
                                }
                            }
                        }]
                    }]
                });

                if(count % 2 == 0){
                    fieldSetContainer.push({ xtype: 'box', width: 10});
                }

                count = count + 1;
            });
        };

        /*
        me.on('afterrender', function (e) {
            //console.log('afterrender', me.query('image'));

            if(!Ext.isEmpty(me.previewNames)){
                var idx = 0;
                Ext.each(me.previewNames, function(name){
                    var previewImage = me.query('image[name="' + name.toLowerCase() + 'imgsrc' + '"]')[0],
                        //previewImage = me.query('image[canvas="' + me.id + '-canvas-' + name.toLowerCase() + '"]')[0],
                        dropTarget = me.query('box[targetId="' + me.id + '-droptarget-' + name.toLowerCase() + '"]')[0],
                        //dropWindow = document.getElementById(dropTarget.targetId);
                        dropWindow = me.up('window').getEl().dom;

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

                        if(me.query('button[itemId="btnDrop-'+name.toLowerCase()+'"]')[0].pressed) {
                            var file = e.dataTransfer.files[0];

                            //me.up('window').down('hidden[name=_'+name.toLowerCase()+'imgsrc]').setValue(window.URL.createObjectURL(file));
                            //me.up('window').down('hidden[name='+name.toLowerCase()+'imgsrc]').setValue(file.name);

                            me.attachImage(file, previewImage);
                        }

                        dropTarget.hide(null, function () {
                            var btn = this.ownerCt.down('button');
                            btn.setPressed(false);
                        });

                    }, false);

                    dropWindow.addEventListener('dragleave', function (e) {
                        dropWindow.classList.remove('drop-target-hover');
                    }, false);

                    idx += 1;
                });
            }
        });
        */

        Ext.apply(me, {

        });

        me.items = fieldSetContainer;

        me.callParent();
    },

    addFilesToQueue: function(fieldset, files) {

        var me = this,
            imageType = /^image\//,
            //ctn = me.down('multiimageupload'),
            //btn = ctn.query('button[pressed=true]')[0],
            category = fieldset.title.toLowerCase(),
            previewImage = fieldset.down('image[name="' + category  + 'img"]'),
            form = me.up('sales-edit-form'),
            win = me.up('edit-window'),
            rec = win.getViewModel().get('theStyle');

        //console.log('addFilesToQueue', form, rec);
        if(!files[0].name){
            me.blobToFile(files[0], Vega.util.Utils.generateGUID()+'.'+files[0].type.split('/').pop())
        }

        if (imageType.test(files[0].type)) {
            var found = false;

            if (!form.imagesQueue) {
                form.imagesQueue = [];
            }
            else {
                Ext.each(form.imagesQueue, function (item, index, self) {
                    if (item.imageFile.name == files[0].name) {
                        found = true;
                        return !found;
                    }
                });
            }

            if (!found) {
                var existings = [];
                Ext.each(form.imagesQueue, function (item, index, self) {
                    if (item.imageKey == previewImage.name + '-' + rec.id) {
                        existings.push(index);
                    }
                });

                Ext.each(existings, function (item) {
                    Ext.Array.removeAt(form.imagesQueue, item);
                });

                form.imagesQueue.push({imageKey: previewImage.name + '-' + rec.id, imageFile: files[0]});
                //me.addFiles(files[0], form, previewImage);

                var reader = new FileReader();
                reader.onload = function (e) {
                    //previewImage.setSrc(e.target.result);
                    rec.set(category + 'img', window.URL.createObjectURL(files[0]));
                    //rec.set(category+'imgsrc', files[0].name);
                    //previewImage.setSrc(window.URL.createObjectURL(files[0]));
                };

                reader.readAsDataURL(files[0]);
                previewImage.show();

                window.URL.revokeObjectURL(files[0]);
                //console.log(file, form.uploadableImages);
            }
            else {
                Ext.Msg.alert('Error', 'Same file name already used, differenct images name please');
            }

        }
        else {
            Ext.Msg.alert('Error', 'Only images please, supported files are jpeg,jpg,png,gif,ico');
        }
    },

    blobToFile: function (theBlob, fileName){
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;

        return theBlob;
    }

    /*
    attachImage: function (file, canvas) {

        var me = this,
            form = me.up('sales-edit-form'),
            imageType = /^image\//;

        if (file.type == "image/jpeg" ||
            file.type == "image/jpg" ||
            file.type == "image/png" ||
            file.type == "image/gif" ||
            file.type == "image/ico")

        if(imageType.test(file.type))
        {
            if (!form.uploadableImages) {
                form.uploadableImages = [];
            }
            else {
                var existings = [];
                Ext.each(form.uploadableImages, function(previewImage, index, self){
                    if(previewImage.imageKey === canvas.name){
                        existings.push(index);
                    }
                });

                Ext.each(existings, function(item){
                    Ext.Array.removeAt(form.uploadableImages, item);
                });
            }

            form.uploadableImages.push({imageKey: canvas.name, imageFile: file});

            var reader = new FileReader();
            reader.onload = function (e) {
                //canvas.setSrc(e.target.result);
                canvas.setSrc(window.URL.createObjectURL(file));
            };

            reader.readAsDataURL(file);
            canvas.show();
            //window.URL.revokeObjectURL(file);
            //console.log(file, form.uploadableImages);

        } else {
            Ext.Msg.alert('Error', 'Only images please, supported files are jpeg,jpg,png,gif,ico');
        }
    }
    */
});
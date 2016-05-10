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
     * @cfg {String} src of preview image
     */
    previewImageSrc: null,

    /**
     * @cfg {Array} Array of names for preview images
     */
    previewNames: [],

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
    imageHeight: 160,

    /**
     * text to be displayed in the drag area
     */
    dragAreaText: 'Drop an image here',

    layout: {
        type: 'hbox'
    },

    initComponent: function () {
        var me = this,
            //previewImages = [],
            dropTargets = [],
            fieldSetContainer = [];

        if(!Ext.isEmpty(me.previewNames)){
            var count = 0;
            Ext.each(me.previewNames, function(name) {
                var dropTargetId = me.id + '-droptarget-' +  name.toLowerCase();

                var dropTarget = {
                    xtype: 'label',
                    targetId: dropTargetId,
                    hidden: true, // initially hidden
                    html: '<div class="drop-target"' + 'id=' + '\'' + dropTargetId + '\'' + '>' + me.dragAreaText + '</div>'
                };
                dropTargets.push(dropTarget);

                var previewImage = {
                    xtype: 'image',
                    frame: true,
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

                if (!Ext.isEmpty(me.previewImageSrc)) {
                    // if an existing value
                    previewImage.src = me.previewImageSrc;
                    //previewImage.hidden = false;
                }

                //previewImages.push(previewImage);
                count = count + 1;
                if(count % 2 == 0){
                    fieldSetContainer.push({ xtype: 'box', width: 10});
                }

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
                        items: [dropTarget]
                    },{
                        layout: 'fit',
                        items: [previewImage]
                    },{
                        xtype: 'button',
                        itemId: 'btnToggleDropArea',
                        tooltip: 'Toggle Drop Area',
                        enableToggle: true,
                        margin: '0 0 0 3',
                        iconCls: 'fa fa-paperclip',
                        toggleHandler: function(btn, pressed){
                            //console.log(btn, btn.ownerCt, btn.ownerCt.down('image'));
                            var dropTarget = me.query('label[targetId="' + me.id + '-droptarget-' + name.toLowerCase() + '"]')[0],
                                //previewImage = me.query('image[canvas="' + me.id + '-canvas-' + name.toLowerCase() + '"]')[0];
                                previewImage = btn.ownerCt.down('image');

                            previewImage.setHidden(pressed);
                            dropTarget.setHidden(!pressed);
                        },
                        scope: this
                    }]
                });
            });
        };

        me.on('afterrender', function (e) {
            //console.log('afterrender', me.query('image'));
            if(!Ext.isEmpty(me.previewNames)){
                Ext.each(me.previewNames, function(name){

                    var previewImage = me.query('image[canvas="' + me.id + '-canvas-' + name.toLowerCase() + '"]')[0],
                        dropTarget = me.query('label[targetId="' + me.id + '-droptarget-' + name.toLowerCase() + '"]')[0],
                        dropWindow = document.getElementById(dropTarget.targetId);

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

                        var file = e.dataTransfer.files[0];
                        me.attachImage(file, previewImage);

                        dropTarget.hide(me, function(){
                            var btn = this.ownerCt.ownerCt.down('button');
                            btn.toggle();
                        });

                    }, false);

                    dropWindow.addEventListener('dragleave', function (e) {
                        dropWindow.classList.remove('drop-target-hover');
                    }, false);

                });
            }
        });

        Ext.apply(me, {

        });

        me.items = fieldSetContainer;

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
            else {
                var existings = [];
                Ext.each(form.uploadableImages, function(previewImage, index, self){
                    if(previewImage.imageKey === canvas.canvas){
                        existings.push(index);
                    }
                });

                Ext.each(existings, function(item){
                    Ext.Array.removeAt(form.uploadableImages, item);
                });
            }

            form.uploadableImages.push({imageKey: canvas.canvas, imageFile: file});

            var reader = new FileReader();
            reader.onload = function (e) {
                canvas.setSrc(e.target.result);
            };

            reader.readAsDataURL(file);
            canvas.show();
            console.log(canvas, form.uploadableImages);

        } else {
            Ext.Msg.alert('Error', 'Only images please, supported files are jpeg,jpg,png,gif,ico');
        }
    }
});
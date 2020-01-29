Ext.define('Vega.view.company.board.TopicController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.board-topic',

    init: function(){
        var me = this;

        me.mv = Vega.app.getMainView();
    },

    onComponentRender: function (c) {

        var me = this,
            node = c.getEl(),
            files = node.query('.file-attachment');

        //console.log(node, files);

        Ext.each(files, function(file){
            var fileEl = Ext.get(file);

            var fo = me.searchFileWithId(fileEl.getAttribute('fileId'), me.getView().active.data.files);
            //console.log(fo, fileEl.getAttribute('fileId'), me.getView().active.data.files);
            //butEl.removeCls('x-hidden');

            fileEl.hover(function () {
                fileEl.addCls('x-item-over');
            }, function () {
                fileEl.removeCls('x-item-over');
            });

            if(fileEl.hasListeners.dblclick == undefined){
                fileEl.on('dblclick', function(e,t,opts){
                    //console.log(this, e)
                    c.fireEvent('filedblclick', this, fo);
                });
            }

        });
    },

    onFileDblClick: function(el, t){
        //console.log(el, t);
        // download file by double click...
        var me = this,
            xf = Ext.util.Format,
            href = xf.format('../DLIB/BOARD-ATTACHMENTS/{0}/{1}/{2}', xf.date(t.created, 'Y/n/j'), t.fileId, t.name);

        me.downloadFile(href, t.name);

    },

    onEditButtonClick: function(node, rec){
        this.showReplyForm(rec);
    },

    onDeleteButtonClick: function(node, rec){
        var me = this;

        Ext.Msg.show({
            title:'Delete Message?',
            message: 'Are you sure you want to delete your message(s)?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);
                    rec.drop();
                    //console.log(rec);

                    var processMask = new Ext.LoadMask({
                        msg: 'Saving... Please wait',
                        target: me.mv
                    });

                    rec.save({
                        failure: function(record, operation) {
                            // do something if the save failed
                            processMask.hide('', function(){
                                processMask.destroy();
                                Ext.Msg.alert('Error', 'Error occurred');
                            });
                        },
                        success: function(record, operation) {
                            // do something if the save succeeded
                            processMask.hide('', function() {
                                processMask.destroy();
                                Ext.Msg.alert('Status', 'Changes saved successfully.');
                            });
                        },
                        callback: function(record, operation, success) {
                            // do something whether the save succeeded or failed
                            if(processMask.isMasked()){
                                processMask.hide('', function(){
                                    processMask.destroy();
                                });
                            }
                        }
                    });

                    //var batch = me.getView().getSession().getSaveBatch();
                    //me.processBatch(batch);
                }
            }
        });
    },

    onReplyButtonClick: function(rec){
        this.showReplyForm(null);
    },

    showReplyForm: function(rec){
        var me = this,
            view = me.getView(),
            dataview = view.down('board-post');

        //console.log(rec);
        dataview.setSelection(rec);

        me.win = view.add({
            xtype: 'board-window',
            isEdit: !!rec,

            viewModel: {
                data: {
                    title: rec ? 'Edit Reply ' + rec.get('subject') : 'Post Reply'
                },
                links: {
                    theMessage: rec || {
                        type: 'company.Post',
                        create: {
                            userId: Vega.user.get('Userid'),
                            created: new Date(),
                            topicId: view.active.get('topicId')
                        }
                    }
                }
            },

            session: true,

            width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 1024,
            height: window.innerHeight < 760 ? (view.getHeight() * 0.9) : 640,

            items: [{
                xtype: 'board-edit-form',
                categoryHidden: true
            }],

            session: true
        });

        me.win.on({
            cancel: function (b) {
                me.win.close();
            },
            save: {
                fn: 'saveForm',
                scope: this
            }
        });

        me.win.show('', function(){
            //me.mv.mask();
        });
    },

    saveForm: function(win, values){
        var me = this,
            isEdit = win.isEdit,
            view = me.getView(),
            dataview = view.down('board-post'),
            rec = dataview.getSelectionModel().getSelection()[0],
            id, data = [];
        //session = win.getSession(),
        //batch = session.getSaveBatch(),
        //changes = session.getChanges();

        if (!isEdit) {
            // Since we're not editing, we have a newly inserted record. Grab the id of
            // that record that exists in the child session
            id = win.getViewModel().get('theMessage').id;
        }

        win.getSession().save();

        win.getViewModel().get('theMessage').filesIns(function(files){
            files.each(function(item){
                data.push(item.data);
            });
        });

        if (!isEdit) {
            // Use the id of that child record to find the phantom in the parent session,
            // we can then use it to insert the record into our store
            rec = view.getSession().getRecord('company.Topic', id);
            dataview.getStore().insert(0, rec);
        }

        rec.set('files', data);

        var form = win.down('form'),
            //changes = view.getSession().getChanges(),
            field = form.down('viewupload').fileUpload;

        var batch = view.getSession().getSaveBatch();

        //console.log(view.getSession(), batch, win.getViewModel().get('theMessage'));

        me.processBatch(batch, field, {
            url: '/api/Files/Board/upload',
            success: function(response){
                //console.log(response);
                dataview.getView().refresh();
                Ext.Msg.alert('Success', response);
            },
            failure: function(response) {
                Ext.Msg.alert('Failure', response);
            }
        });

        me.win.close();
    },

    processBatch: function (batch, field, options) {
        var me = this;

        if(batch !== undefined){
            var processMask = new Ext.LoadMask({
                msg: 'Saving... Please wait',
                target: me.mv
            });

            batch.on({
                operationcomplete: function(batch, op){
                    //console.log(op, op.getResultSet());
                    var objResp = op.getResponse();
                    if(!Ext.isEmpty(objResp)){
                        var response = JSON.parse(objResp.responseText);

                        if(!Ext.isEmpty(response) && response.data.length > 0){

                            if(field && field.getFilesQueue().length > 0){
                                field.send(options, {
                                    File: JSON.stringify(response.data)
                                });
                            }
                        }

                    }
                },
                complete: function(batch, op){
                    //refresh In-Review
                    //view.getViewModel().getStore(view.getXType() + 's').reload();
                    var response = JSON.parse(op.getResponse().responseText);

                    processMask.hide('', function() {
                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                    });
                    /*
                    new Ext.window.Window({
                        autoShow: true,
                        title: 'Session Changes',
                        modal: true,
                        width: 600,
                        height: 400,
                        layout: 'fit',
                        items: {
                            xtype: 'textarea',
                            value: JSON.stringify(changes, null, 4)
                        }
                    });
                    */
                },
                exception: function(batch, op){
                    processMask.hide('', function(){
                        //Ext.Msg.alert('Error', 'Error occurred');
                        var objResp = op.error.response;
                        //console.log(objResp)
                        if(!Ext.isEmpty(objResp)){
                            var response = JSON.parse(objResp.responseText);
                            Ext.Msg.alert(objResp.statusText, objResp.responseText);
                        }

                    });
                }
            });

            processMask.show('', function(){

            });

            batch.start();
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
    },

    /**
     * Private function
     * @param key
     * @param array
     * @returns {*}
     */
    searchFileWithId: function(key, array){
        for (var i=0; i < array.length; i++) {
            if (array[i].fileId == key) {
                return array[i];
            }
        }
    },

    downloadFile: function(href, name){
        const a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);

        // Set the HREF to a Blob representation of the data to be downloaded
        a.href = href;

        // Use download attribute to set set desired file name
        a.setAttribute("download", name);

        // Trigger the download by simulating click
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
    }
    
});

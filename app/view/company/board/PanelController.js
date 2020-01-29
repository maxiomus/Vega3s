Ext.define('Vega.view.company.board.PanelController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.board-panel',

    init: function(){
        var me = this;

        me.mv = Vega.app.getMainView();
    },

    onBeforeTopicsLoad: function(store, op){
        var me = this,
            view = me.getView().up('board-default'),
            tree = view.lookupReference('navigate-tree'),
            rec = tree.selModel.getSelection()[0];

        //console.log(tree.selModel.getSelection()[0]);
        Ext.apply(store.getProxy().extraParams, {
            extra: rec.data.id // boardId
        });
    },

    onGridRowDblClick: function(view, rec, el, index){
        var me = this;

        me.openTopic(rec);
    },

    onToolbarAddClick: function(b, e){
        var me = this;

        me.onShowTopicForm(null);
    },

    onToolbarEditClick: function(b, e){
        var me = this,
            grid = me.getView().down('board-grid'),
            rec = grid.getSelection()[0];

        me.onShowTopicForm(rec);
    },

    onToolbarRemoveClick: function(b, e){
        var me = this,
            grid = me.getView().down('board-grid'),
            sm = grid.getSelectionModel();

        //console.log(sm.getSelection());
        Ext.Msg.show({
            title:'Delete Message?',
            message: 'Are you sure you want to delete your message(s)?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);
                    Ext.Array.each(sm.getSelection(), function(rec, idx, a){
                        rec.drop();

                        //rec.save();
                    });

                    //console.log(sm.selected);
                    if(sm.selected){
                        sm.deselectAll();
                    }

                    var batch = me.getView().getSession().getSaveBatch();
                    me.processBatch(batch);
                }
            }
        });
    },

    onToolbarRefreshClick: function(b, e){
        var me = this,
            store = me.getView().down('board-grid').getStore();

        //console.log(store);
        store.reload();
    },

    onAttachItemDblClick: function(view, rec, item, index){
        var me = this,
            form = me.getView(),
            viewer = form.up('board'),
            reference = 'topic-'+rec.getId().toString(),
            aw = viewer.lookupReference(reference),
            //title = rec.data.Title,
            //mv = Vega.app.getMainView(),
            xf = Ext.util.Format;

        //prefix = 'nDisplay-';

        var srcPath = xf.format('../services/PDFHandler.ashx?path={0}&name={1}', xf.format('BOARD-ATTACHMENTS/{0}/{1}', xf.date(rec.data.created, 'Y/n/j'), rec.data.fileId), rec.data.name);

        if(rec.data.hasOwnProperty('path') && !Ext.isEmpty(rec.data.path)){
            srcPath = rec.data.path;
        }

        if (!aw) {
            aw = form.add({
                xtype: 'window',
                reference: reference,
                iconCls: 'x-fa fa-print',
                title: rec.data.name,

                width: form.getWidth() * 0.98,
                height: form.getHeight() * 0.98,

                renderTo: Ext.getBody(),

                modal: true,
                maximizable: true,

                layout: 'fit',

                items: [{
                    xtype: 'component',
                    itemId: 'contentIframe',
                    autoEl: {
                        tag: 'iframe',
                        style: 'height: 100%; width: 100%; border: none',
                        //src: 'QuickGuideforIllustratorCS6-Basics.pdf'
                        src: srcPath
                    }
                }],

                buttons: [{
                    text: 'Print',
                    handler: function(btn){
                        var iframe = aw.getComponent('contentIframe');

                        if(iframe){
                            var cw = iframe.getEl().dom.contentWindow;
                            //console.log(iframe, cw.document);
                            cw.print();
                        }
                    }
                }, {
                    text: 'Cancel',
                    handler: function(btn){
                        aw.close();
                    },
                    scope: this
                }]
            });
        }

        aw.show('', function(){
            //me.mv.mask();
        });
    },

    openTopic: function(rec){
        var me = this,
            view = me.getView(),
            prefix = 'topic-',
            xf = Ext.util.Format,
            grid = view.down('board-grid'),
            topic = me.lookupReference(prefix+rec.getId());

        if(!topic){
            topic = view.add({
                inTab: true,
                node: 'board',
                xtype: 'board-topic',
                reference: prefix + rec.get('topicId'),
                title: xf.ellipsis(rec.data.subject, 18),
                closable: true
            })

            topic.setActive(rec);
        }

        view.suspendEvents(false);
        view.setActiveTab(topic);
        topic.tab.focus(100);
        view.resumeEvents(true);
    },

    onShowTopicForm: function(rec){
        var me = this,
            view = me.getView(),
            boardId = view.getViewModel().get('boardId');

        //console.log(boardId);

        me.win = view.add({
            xtype: 'board-window',
            isEdit: !!rec,
            //constrain: true,
            viewModel: {
                data: {
                    title: rec ? 'Edit ' + rec.get('subject') : 'Add New Topic'
                },
                links: {
                    theMessage: rec || {
                        type: 'company.Topic',
                        create: {
                            userId: Vega.user.get('Userid'),
                            created: new Date(),
                            boardId: boardId
                        }
                    }
                }
            },

            width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 1024,
            height: window.innerHeight < 760 ? (view.getHeight() * 0.9) : 720,

            items: [{
                xtype: 'board-edit-form'
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
            grid = view.down('board-grid'),
            rec = grid.getSelectionModel().getSelection()[0],
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
            grid.getStore().insert(0, rec);

        }

        console.log(data);
        rec.set('files', data);
        //win.getViewModel().get('theMessage').set('created', new Date());

        var form = win.down('form'),
            //changes = view.getSession().getChanges(),
            field = form.down('viewupload').fileUpload;

        var batch = view.getSession().getSaveBatch();

        //console.log(view.getSession(), batch, win.getViewModel().get('theMessage'));

        me.processBatch(batch, field, {
            url: '/api/Files/Board/upload',
            success: function(response){
                //console.log(response);
                grid.getView().refresh();
                Ext.Msg.alert('Success', response);
            },
            failure: function(response) {
                Ext.Msg.alert('Failure', response);
            }
        });

        /*
        var changes = view.getSession().getChanges();

        if(changes){
            new Ext.window.Window({
                autoShow: true,
                title: 'Session Changes',
                modal: true,
                width: 600,
                height: 400,
                layout: 'fit',
                items: {
                    xtype: 'textarea',
                    value: JSON.stringify(rec.data, null, 4)
                }
            });
            console.log(rec.data)
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }

        */
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
                    me.view.down('board-grid').getView().refresh();
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
    }
    
});

/**
 * Created by tech on 3/8/2016.
 */
Ext.define('Vega.view.company.notice.NoticeController', {
    extend: 'Ext.app.ViewController',

    requires: [
        //'Vega.model.Post',
        'Vega.view.company.notice.edit.Form',
        'Vega.view.company.notice.edit.Window'
    ],

    alias: "controller.notice",

    mixins: [
        'Ext.app.route.Base'
    ],

    init: function(b){

    },

    initViewModel:function(b){
        this.fireEvent("viewmodelready",this,b);
    },

    onBeforeLoad:function(d,e,f){

    },

    onLoad:function(d,e,f){
        //console.log("NoticeController - onLoad", d.isLoading(), d.loadCount);
    },

    onProxyException:function(f,d,e){
        Ext.Msg.alert("Error with data from server",e.error);

        this.view.el.update("");
        this.fireViewEvent("select",this,{data:{}});
    },

    onTabOpen:function(d,c){
        this.redirectTo("notice/tab/"+c.get("ArticleID"));
    },

    onRowDblClick:function(d,c){
        this.onTabOpen(d,c);
    },

    onNewPostClick:function(d){
        /*
        var rec = new Ext.create("Vega.model.Post",{
            BorderID:1,
            ParentID:0
        });
        */

        this.showWindow(null);
    },

    onRefreshClick:function(b){
        this.getStore("notices").reload();
    },

    onCloseWindowClick: function(btn){

        //this.win.getViewModel().get('thePost').reject();
        //this.win.down('grid').getStore().rejectChanges();

        this.getView().setActiveTab(0);
        this.win.close();

    },

    onSavePostClick: function(b){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('grid'),
            rec = grid.getSelectionModel().getSelection()[0],
            id, data = [];

        if (!this.isEdit) {
            // Since we're not editing, we have a newly inserted record. Grab the id of
            // that record that exists in the child session
            id = this.win.getViewModel().get('thePost').id;
        }

        this.win.getSession().save();

        if(!this.isEdit){
            rec = this.getSession().getRecord('Post', id);
            rec.set('Author', Vega.user.data.Userid);
            rec.set('CreatedOn', new Date());

            grid.getStore().insert(0, rec);

            this.win.getViewModel().get('thePost').filesInArticles(function(files){
                files.each(function(item){
                    data.push(item.data.name);
                });
            });
        }
        else {
            rec.filesInArticles(function(files){
                files.each(function(item){
                    data.push(item.data.name);
                });
            });
        }

        rec.set('Link', data);
        rec.set('UpdatedOn', new Date());

        var form = this.win.down('form'),
            //changes = this.getView().getSession().getChanges(),
            field = form.down('grid').getDockedItems('toolbar[dock="top"] > uploadfiles')[0];

        var batch = me.getView().getSession().getSaveBatch();

        this.processBatch(batch, field, {
            url: '/api/Files/Notice/upload',
            success: function(response){
                //console.log(response);
                grid.getView().refresh();
                Ext.Msg.alert('Success', response);
            },
            failure: function(response) {
                Ext.Msg.alert('Failure', response);
            }
        });

        this.win.close();

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
                    value: JSON.stringify(changes, null, 4)
                }
            });
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
        */
    },

    onContextMenuBookmarkClick: function(d,c){
        this.addBookmark(d,this.getView());
    },

    onContextMenuEditClick: function(rec,c){
        this.showWindow(rec);
    },

    onContextMenuDeleteClick: function(rec,c){
        var me = this,
            grid = me.getView().lookupReference('multiview').lookupReference('grid');

        Ext.Msg.show({
            title:'Save Changes?',
            message: 'You are closing a tab that has unsaved changes. Would you like to save your changes?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);
                    rec.drop();

                    var batch = me.getView().getSession().getSaveBatch();
                    me.processBatch(batch);
                }
            }
        });
    },

    onContextMenuPrintClick: function(d,c){

    },

    onContextMenuRefreshClick:function(d,c){
        this.getStore("notices").reload();
    },

    showWindow: function(rec){
        var me = this,
            view = me.getView(),
            multiview = view.lookupReference('multiview');

        this.isEdit = !!rec;

        this.win = view.add({
            xtype: "notice-window",
            reference: "noticeWindow",
            title: rec == null ? "Add Post" : "Edit Post " + rec.id,
            //constrain: true,
            width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 1024,
            height: window.innerHeight < 760 ? (view.getHeight() * 0.9) : 640,

            viewModel: {
                links: {
                    thePost: rec || {
                        type: 'Post',
                        create: true
                    }
                }
            },

            session: true,

            buttons: [{
                action: 'save',
                //itemId:'btnSave',
                text: 'Save',
                formBind: true,
                //glyph: 86,
                iconCls: 'x-fa fa-save',
                handler: 'onSavePostClick',
                scope: this
            },{
                action: 'close',
                //itemId:'btnClose',
                text: 'Close',
                //glyph: 88,
                iconCls: 'x-fa fa-close',
                handler: 'onCloseWindowClick',
                scope: this
            }]
        });

        this.win.show();

        //this.win.down("form").loadRecord(rec);
    },

    processBatch: function(batch, field, options){
        //var changes = this.getView().getSession().getChanges();

        if(batch !== undefined){
            var processMask = new Ext.LoadMask({
                msg: 'Saving... Please wait',
                target: this.getView()
            });

            batch.on({
                operationcomplete: function(batch, op){
                    //console.log(op, op.getResultSet());
                    var objResp = op.getResponse();
                    if(!Ext.isEmpty(objResp)){
                        var response = JSON.parse(objResp.responseText);

                        if(!Ext.isEmpty(response.data) && response.data[0].hasOwnProperty('ArticleID')){
                            if(field && field.getFilesQueue().length > 0){
                                field.send(options, {
                                    Article: JSON.stringify(response.data)
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

            processMask.show();
            batch.start();
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
    },

    attachFiles: function(){
        Ext.Ajax.request({
            //url: '/api/Sessions',
            url: '/api/Uploads',
            method: 'POST',
            success: function(response, options) {
                // decode response
                var result = Ext.decode(response.responseText);
                //console.log('checkLogin', result.data);
                // check if success flag is true
                if(result.success) {
                    console.log('success', result);
                }
                // couldn't login...show error
                else {
                    //console.log('login failed');
                }
            },
            failure: function(response, options) {
                Ext.Msg.alert(response.statusText, response.status + ' - ' + response.responseText );
            },
            callback: function(response, opotions) {

            }
        });
    }
});

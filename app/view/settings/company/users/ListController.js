Ext.define('Vega.view.settings.company.users.ListController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Vega.model.settings.users.User',
        'Vega.model.Option'
    ],

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.users-list',

    init: function(){

    },

    onSelect: function(view, rec, idx){

    },

    onItemContextMenu: function(view, rec, item, index, event){
        event.stopEvent();
        //console.log(rec);
        this.getView().actions.actEdit.setDisabled(rec.data.IsLockedOut);
        this.getView().actions.actUnlock.setDisabled(!rec.data.IsLockedOut);
        this.view.contextmenu.showAt(event.getXY());
    },

    onActNew: function(c, b){

        this.showEditWindow(null);
    },

    onActEdit: function(c, b){
        var me = this,
            rec = c.getSelection()[0];

        //console.log(rec, rec.store.getProxy());
        if(!rec.data.IsLockedOut){
            this.showEditWindow(rec);
        }
        //me.loadDetail(rec, me, me.showEditWindow);
    },

    onActRefresh: function(c, b){
        var me = this;

        me.view.getStore().reload();
    },

    onActDelete: function(c, b){
        var me = this,
            g = me.view,
            d = g.getSelection()[0];

        Ext.Msg.show({
            title: 'Warning!',
            message: 'Are you sure you want to delete user(s)?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    var processMask = new Ext.LoadMask({
                        msg: 'Saving... Please wait',
                        target: me.view
                    });
                    //grid.getStore().remove(rec);
                    d.drop();

                    processMask.show();
                    g.getStore().sync({
                        success: function(batch, opt) {
                            processMask.hide('', function() {
                                Ext.Msg.alert('Status', 'Changes saved successfully.');
                            });
                        },
                        failure: function(batch, opt) {

                        },
                        callback: function(batch, opt) {

                        }
                    });
                    //var batch = me.getView().getSession().getSaveBatch();
                    //me.processBatch(batch);
                }
            }
        });
    },

    onUnlockUser: function(c){
        var me = this,
            grid = me.view,
            rec = grid.getSelection()[0];

        rec.set({
            IsLockedOut: false
        });

        // pass the phantom record data to the server to be saved
        rec.save({
            failure: function(record, operation) {
                // do something if the save failed
                console.log('failure', record);
            },
            success: function(record, operation) {
                // do something if the save succeeded
                console.log('success', record);
            },
            callback: function(record, operation, success) {
                // do something whether the save succeeded or failed
                console.log('callback', record);
            }
        });

    },

    showEditWindow: function (rec) {
        var me = this;
            //win = me.view.down('window'),

        me.isEdit = !!rec;

        me.win = this.view.add({
            xtype: 'user-window',
            reference: 'user-window',

            session: true,
            width: 640,
            height: 480,

            title: !rec ? 'New User' : 'Edit User: ' + rec.get('FullName'),
            viewModel: {

                stores: {
                    departments: {
                        fields: ['id', 'text'],
                        autoLoad: true,

                        pageSize: 0,
                        proxy: {
                            type: "ajax",
                            url: "resources/data/settings/users/departments.json",

                            reader: {
                                type: "json",
                                rootProperty: "data"
                            }
                        }
                    }
                    /*
                    roles: {
                        model: 'Option',
                        autoLoad: true,
                        //remoteFilter: true,
                        proxy: {
                            type: 'ajax',
                            url: '/api/Options/roles',
                            reader: {
                                type: 'json',
                                rootProperty: 'data'
                            }
                        }
                    }
                    */
                },

                links: {
                    theUser: rec || {
                        type: 'Vega.model.settings.users.User',
                        create: {
                            Department: 'Accounting',
                            Roles: ['users']
                        }
                    }
                }

                /*
                formulas: {
                    FullName: {
                        get: function (get) {
                            var fn = get('FirstName'), ln = get('LastName');
                            return (fn && ln) ? (fn + ' ' + ln) : (fn || ln || '');
                        },

                        set: function (value) {
                            var space = value.indexOf(' '),
                                split = (space < 0) ? value.length : space;

                            this.set({
                                FirstName: value.substring(0, split),
                                LastName: value.substring(split + 1)
                            });
                        }
                    }
                }
                */
            }
        });

        me.win.on('close', function(){

        });

        // show window
        me.win.show('', function () {

        });
    },

    onWinSaveClick: function (b) {
        var me = this,
            vm = me.win.getViewModel(),
            rec = vm.get('theUser'),
            session = vm.getSession(),
            batch = session.getSaveBatch(),
            changes = session.getChanges();

        //console.log(vm, rec, session, changes);

        if(batch !== undefined){
            var processMask = new Ext.LoadMask({
                msg: 'Saving... Please wait',
                target: me.view
            });

            batch.on({
                operationcomplete: function(batch, op){
                    //console.log(op, op.getResultSet());
                    var objResp = op.getResponse();
                    if(!Ext.isEmpty(objResp)){
                        var response = JSON.parse(objResp.responseText);
                    }
                },
                complete: function(batch, op){
                    //console.log(op, op.getResponse());
                    var objResp = op.getResponse();
                    if(!Ext.isEmpty(objResp)){
                        var response = JSON.parse(objResp.responseText);
                    }

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
                me.onWinCloseClick();
            });
            batch.start();
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
    },

    onWinCloseClick: function(b){
        var me = this;

        me.win = Ext.destroy(me.win);
    }

});

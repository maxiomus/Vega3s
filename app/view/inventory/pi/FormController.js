Ext.define('Vega.view.inventory.pi.FormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pi-form',

    /**
     *  When working with Session & Association Model,
     *  All of models must be added on requires...
     */
    requires: [
        'Vega.model.PIH',
        'Vega.model.PI',
        'Vega.model.PIRoll',
        'Vega.view.inventory.pi.Window'
    ],

    init: function(){
        var vm = this.getViewModel();
        //console.log('init', vm.linkData.thePhysical);
        console.log('init', this.getReferences());
    },

    initViewModel: function(vm) {

        var rec = vm.linkData.thePhysical;
        console.log('initViewModel', vm.linkData);
    },

    onItemSelect: function(sm, rec){
        //var sm = view.getSelectionModel();
        //console.log(this.getView(), sm);
        var view = this.lookupReference('piview');
        view.setSelection(rec);
    },

    // Items...
    onAddItemClick: function(btn){
        var me = this,
        //form = me.getView(),
            refs = this.getReferences();

        this.showWindow(btn, null);
    },

    onCopyItemClick: function(btn){
        var me = this,
            refs = me.getReferences(),
            session = me.getViewModel().getSession(),
            grid = refs.piview,
            d = grid.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', d);
        grid.getStore().add(nd);

        /*
         d.powms().each(function (m) {
         nd.powms().add(m.copy(null, session));
         console.log('materials',m)
         });

         d.tnaps().each(function (p) {
         nd.tnaps().add(p.copy(null, session));
         console.log('tnaps', m)
         });
         */
        //console.log('onCopyStyleClick', d, nd);
        //grid.getView().refresh();
    },

    onEditItemClick: function(btn){
        var me = this,
            refs = this.getReferences(),
            grid = refs.piview,
            selection = grid.getSelection()[0];

        //console.log('onEdit', selection)
        this.showWindow(btn, selection);
    },

    onDeleteItemClick: function(btn){
        var me = this,
            refs = me.getReferences(),
            grid = refs.piview,
            store = grid.getStore(),
            selection = grid.getSelectionModel().getSelection()[0];

        //store.remove(grid.getSelection()[0]);
        selection.drop();
        grid.getSelectionModel().deselectAll();

    },

    onItemDblClick: function(grid, rec, tr, idx, e){
        var btn = this.lookupReference('edit');

        this.showWindow(btn, rec);
        //console.log(rec)
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(g)){
            i.select(g);
        }

        this.view.contextmenu.showAt(l.getXY());
    },

    onTabChange: function(t, n, o, e){

    },

    showWindow: function(comp, record){
        var me = this,
            view = this.getView(),
            viewer = view.up('viewer');

        //console.log(window.innerWidth, window.innerHeight)
        this.isEdit = !!record;
        me.win = view.add({
            xtype: 'pi-window',
            reference: 'piWindow',

            //alignTarget: '',
            width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 1500,
            //maxWidth: 1366,
            height: window.innerHeight < 760 ? (view.getHeight() * 0.94) : 580,

            viewModel: {
                data: {
                    title: !record ? 'Add New Item' : ('Edit Item: ' + (record.get('style') && record.get('color') ? ' (' + record.get('style') + ' / ' + record.get('color') + ')' : ''))
                },

                links: {
                    // If we are passed a record, a copy of it will be created in the newly spawned session.
                    // Otherwise, create a new phantom customer in the child.
                    theItem: record || {
                        type: 'PI',
                        create: {
                            logdate: view.getViewModel().get('thePhysical').data.pidate,
                            wareHouse: view.getViewModel().get('thePhysical').data.warehouse,
                            userName: Vega.user.data.Userid
                        }
                    }
                }
            },
            // Creates a child session that will spawn from the current session
            // of this view.
            session: true,

            buttons: [{
                text: 'Save',
                bind: {
                    //disabled: '{!isStyleValid}'
                },
                handler: this.onSaveItemClick,
                scope: this
            }, {
                text: 'Cancel',
                handler: function(b){
                    me.win.close();
                }
            }]
        });


        var rec = this.win.getViewModel().get('theItem');
        console.log(rec);
        //matStore.sort('lineseq', 'ASC');

        this.win.on('close', function(p){
            view.up('viewer').up('maincontainerwrap').unmask();
        });

        this.win.show('', function(){
            view.up('viewer').up('maincontainerwrap').mask();
        });
    },

    onSaveItemClick: function(b){
        // Save the changes pending in the win's child session back to the
        // parent session.
        console.log('onSave', this.getReferences());
        var me = this,
            session = me.getSession(),
            win = me.win,
            view = me.getView(),
            form = me.lookupReference('pi-edit-form'),
            grid = me.lookupReference('rolls'),
            isEdit = this.isEdit,
            id, rec;

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
            }
            id = win.getViewModel().get('theItem').id;
            win.getSession().save();

            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store
                rec = session.getRecord('PI', id);
                grid.getStore().add(rec);

            }
            else {
                rec = session.peekRecord('PI', id);
            }

            /*
            var data = [];
            win.getViewModel().get('theItem').pis(function(pis){
                piss.each(function(item){
                    //data.push(item.data);
                })
            });
            */

            me.win.close();
        }
    },

    onSave: function(action){
        var me = this,
            view = me.getView(),
            viewer = view.up('viewer'),
            vm = me.getViewModel(),
            rec = vm.get('thePhysical'),
            session = vm.getSession(),
            changes = session.getChanges();

        if(view.isValid()){

            var batch = session.getSaveBatch();
            //changes = session.getChanges();
            //console.log(changes, batch);
            //var changes = me.getView().getSession().getChanges();
            if(batch !== undefined){
                var processMask = new Ext.LoadMask({
                    msg: 'Saving... Please wait',
                    target: viewer
                });

                batch.on({
                    complete: function(batch, op){

                        var response = JSON.parse(op.getResponse().responseText);
                        //console.log(response);
                        //refresh In-Review
                        me.onClose();

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
            /*
            if (changes !== null) {
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

        }
    },

    onClose: function(btn, e){
        var me = this,
            viewer = me.getView().up('viewer');

        viewer.remove(me.getView());
    }

});

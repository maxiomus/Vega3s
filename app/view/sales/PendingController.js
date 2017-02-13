Ext.define('Vega.view.sales.PendingController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.pending',

    listen: {
        store: {
            '#pendings': {
                beforeload: {
                    fn: 'onStoreLoad'
                }
            }
        }
    },

    init: function(g){
        var multiview = g.lookupReference("multiview"),
            refs = multiview.getReferences(),
            j = refs.topbar.lookupReference("paneselection"),
            k = refs.topbar.lookupReference("viewselection"),
            i = j.getActiveItem();

        refs.center.getLayout().setActiveItem(k.getValue());

        /*Ext.Ajax.on('beforerequest', function(conn, op, e){
         console.log(op, op.params)
         })*/
    },

    initViewModel: function(b){
        this.fireEvent("viewmodelready", this, b)
    },

    onStoreLoad: function(store, op){
        //console.log('Pending Store', store);

        store.getProxy().setExtraParam('extra', 'pending');

    },

    onBeforeAdd: function(review, tab, idx, e){
        //console.log('ReviewController - beforeadd', tab.isXType('display'))
        if(tab.isXType('display')){

            //this.getView().relayEvents(tab, ['revise', 'accept']);
            var topbar = tab.lookupReference('topbar'),
                tvm = tab.getViewModel(),
                rec = tvm.get('thePow');
                //progress = tvm.get('progress'),
                //status = tvm.get('status');

            //console.log('beforeadd', tab.getViewModel().get('thePow'));
            if(rec.data.progress != 'approved'){

                if(Vega.user.inRole('exec') || Vega.user.inRole('administrators')){
                    topbar.add({
                        text: 'Revise',
                        iconCls: 'fa fa-edit',
                        hidden: false,
                        handler: function(btn){
                            this.redirectTo('pending/edit/' + rec.data.powhId)
                        },
                        scope: this
                    });
                }

                if(Vega.user.inRole('exec') || Vega.user.inRole('administrators')){
                    topbar.add({
                        text: 'Confirm',
                        iconCls: 'fa fa-check-circle-o',
                        hidden: false,
                        handler: 'onConfirm',
                        scope: this
                    },{
                        text: 'To Audit',
                        iconCls: 'fa fa-arrow-circle-o-left',
                        hidden: false,
                        handler: 'onAudit',
                        scope: this
                    });
                }
            }

        }

        if(tab.isXType('sales-edit-form')){
            var buttons = tab.getDockedItems('toolbar[dock="top"] > button');

            buttons[0].setText('Confirm');
            buttons[0].nextStep = 'approved';

        }
    },

    onConfirm: function(btn){
        var view = btn.up('display'),
            vm = view.getViewModel(),
            rec = vm.get('thePow'),
            msg = 'To <strong>Approve</strong> this, please enter a justification below.';

        rec.set('progress', 'proposed');
        rec.set('updatedby', Vega.user.get('Userid'));
        //rec.set('updatedon', new Date());
        //var changes = this.getView().getSession().getChanges();
        //console.log(Vega.user, vm.get('thePow'));

        var win = view.add({
            xtype: 'window',
            title: 'Confirmation for Accept',
            width: 520,
            minHeight: 260,
            alignTarget: view.up('viewer').up('maincontainerwrap').ownerCt,
            //defaultAlign: 'c-c',
            //animateTarget: btn.id,

            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            bodyPadding: 10,
            referenceHolder:  true,

            items: [{
                xtype: 'displayfield',
                value: msg
            },{
                xtype: 'textarea',
                //reference: 'txtNote',  // component's name in the ViewModel
                publishes: ['value'], // value is not published by default
                flex: 1
            }],
            // Creates a child session that will spawn from the current session
            // of this view.
            buttons: [{
                text: 'Save',
                bind: {
                    //disabled: '{!txtNote.value}'
                },
                handler: function(btn){

                    Ext.Ajax.request({
                        //url: Ext.String.urlAppend(listStore.getProxy().url + id),
                        url: '../api/Powh/approved',
                        method: 'POST',
                        jsonData: Ext.JSON.encode(rec.data),
                        success: function(response, options) {
                            // decode response
                            var result = Ext.decode(response.responseText);
                            //console.log('checkLogin', result.data);
                            // check if success flag is true
                            if(result.success) {
                                console.log('success', result);
                                var viewer = view.up('viewer');
                                viewer.getViewModel().getStore(viewer.getXType() + 's').reload();

                                var input = win.down('textarea');
                                if(input.getValue()){
                                    var log = Ext.create('Vega.model.Powlog', {
                                        powno: rec.data.powno,
                                        powhId: rec.data.powhId,
                                        powdId: 1,
                                        status: 'open',
                                        content: input.getValue(),
                                        userId: Vega.user.data.Userid
                                    });

                                    log.save({
                                        success: function(rec, op){
                                            win.close();
                                            view.close();
                                        },
                                        failure: function(rec, op){

                                        },
                                        callback: function(rec, op){

                                        }
                                    });
                                }
                                else {
                                    win.close();
                                    viewer.remove(view);
                                }
                            }
                            // couldn't login...show error
                            else {
                                console.log('login failed', result);
                            }
                        },
                        failure: function(response, options) {
                            Ext.Msg.alert(response.status.toString(), response.statusText + ', an error occurred during your request. Please try again.' );
                        },
                        callback: function(response, opotions) {

                        }
                    });

                    //return false;
                },
                scope: this
            }, {
                text: 'Cancel',
                handler: function(btn){
                    win.close();
                },
                scope: this
            }]
        });

        win.on('close', function(p){
            view.up('viewer').up('maincontainerwrap').unmask();
        });

        win.show('', function(){
            view.up('viewer').up('maincontainerwrap').mask();
        });

    },

    onAudit: function(btn) {
        var me = this,
            view = btn.up('display'),
            viewer = view.up('viewer'),
            vm = view.getViewModel(),
            rec = vm.get('thePow');

        //console.log(rec, rec.powds());

        var win = view.add({
            xtype: 'edit-tagging',
            title: 'Auditing',
            width: view.getWidth() - 960,
            minHeight: 640,
            alignTarget: viewer.up('maincontainerwrap').ownerCt,
            //defaultAlign: 'c-c',
            //animateTarget: btn.id,
            /*
            viewModel: {
                data: {
                    thePowh: rec
                }
            },
            */
            referenceHolder:  true,
            session: true,

            items: [{
                xtype: 'tabpanel',
                //plain: true,
                flex: 3,
                defaults: {
                    bodyPadding: '0 0 0 0',
                    scrollable: true
                }
            },{
                xtype: 'fieldcontainer',
                flex: 1,
                fieldLabel: '',
                padding: '0, 0, 5, 0',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'displayfield',
                    value: 'Please enter a justification below:'
                },{
                    xtype: 'textarea',
                    flex: 1,
                    //reference: 'txaNote',  // component's name in the ViewModel
                    publishes: ['value'] // value is not published by default
                    //allowBlank: false
                }]
            }],
            // Creates a child session that will spawn from the current session
            // of this view.
            buttons: [{
                text: 'Save',
                handler: me.onAuditSave
            }, {
                text: 'Cancel',
                handler: function(btn){
                    win.close();
                },
                scope: this
            }]
        });

        if(win){
            var tabpanel = win.down('tabpanel');
                //wvm = win.getViewModel(),
                //powh = wvm.data.thePowh;

            var styles = [], i = 0;
            rec.powds(function(powds){
                powds.each(function(item){

                    var tab = tabpanel.add({
                        xtype: 'tag-select',
                        title: Vega.util.Utils.getOrdinal(i+1) + ' Style',
                        viewModel: {
                            data: {
                                thePowd: item
                            }
                        },
                        session: true,
                        listeners: {
                            beforerender: function(p){
                                var grid = p.down('multiselector'),
                                    //store = grid.getStore(),
                                    search = grid.getSearch();

                                if(search.store.isStore){
                                    Ext.each(p.initData, function(obj, idx, self){
                                        search.store.add({powdId: item.data.powdId, name: obj.name})
                                    });

                                    /*
                                    search.store.each(function(rec){
                                        rec.data.powdId = item.data.powdId;
                                    })
                                    */
                                }
                                else{
                                    Ext.each(search.store.data, function(obj, idx, self){
                                        obj.powdId = item.data.powdId;
                                    });
                                }
                            }
                        }
                    });
                    i += 1;
                });

                tabpanel.setActiveTab(0);
            });

            win.on('close', function(p){
                viewer.up('maincontainerwrap').unmask();
            });

            win.show('', function(){
                viewer.up('maincontainerwrap').mask();
            });
        }
    },

    onAuditSave: function(btn){
        var win = btn.up('window'),
            tabs = win.down('tabpanel').items,
            view = win.up('display'),
            vm = view.getViewModel(),
            rec = vm.get('thePow');

        rec.set({
            progress: 'review',
            status: 'PENDING',
            updatedby: Vega.user.data.Userid,
            updatedon: new Date()
        });

        //console.log(vm.getSession().getChanges())
        var session = vm.getSession(),
            changes = session.getChanges(),
            batch = session.getSaveBatch();

        if(batch !== undefined){
            batch.on({
                complete: function(batch, op){

                    //var response = JSON.parse(op.getResponse().responseText);
                    //console.log(response);
                    var viewer = view.up('viewer');

                    /*
                    // refresh review tab...
                    if(tab){
                        var iframe = tab.getComponent('contentIframe');
                        if(iframe){
                            iframe.getEl().dom.contentWindow.location.reload();
                        }
                    }
                    */
                    //refresh In-Review
                    viewer.getViewModel().getStore(viewer.getXType() + 's').reload();

                    var input = win.down('textarea');
                    if(input.getValue()){
                        var log = Ext.create('Vega.model.Powlog', {
                            powno: rec.data.powno,
                            powhId: rec.data.powhId,
                            powdId: 1,
                            status: 'open',
                            content: input.getValue(),
                            userId: Vega.user.data.Userid
                        });

                        log.save({
                            success: function(rec, op){
                                win.close();
                                view.close();
                            },
                            failure: function(rec, op){

                            },
                            callback: function(rec, op){

                            }
                        });
                    }
                    else {
                        win.close();
                        view.close();
                    }

                    Ext.Msg.alert('Status', 'Changes saved successfully.');
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
                exception: function(){
                    Ext.Msg.alert('Error', 'Error occurred');
                }
            });
            //console.log(batch, changes);
            batch.start();
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }

        //var changes = me.getView().getSession().getChanges();
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
        } else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
        */

        /*
        rec.save({
            success: function(rec, op) {
                // decode response
                var response = op.getResponse(),
                    result = Ext.decode(response.responseText);
                // check if success flag is true
                if(op.success) {
                    Ext.Msg.alert(response.statusText, JSON.stringify(result.data, null, 4));

                    var log = Ext.create('Vega.model.Powlog', {
                        powno: result.data.powno,
                        status: 'open',
                        content: win.lookupReference('txaNote').getValue(),
                        userId: Vega.user.data.Userid
                    });

                    console.log(tabs)
                    //powds.sync();
                    //refresh In-Review
                    //viewer.getViewModel().getStore(viewer.getXType() + 's').reload();
                    //view.close();
                }
                else {
                    console.log('failure', op.getResponse());
                }
            },
            failure: function(rec, op) {
                var response = op.getResponse(),
                    result = result = Ext.decode(response.responseText);

                Ext.Msg.alert(response.status.toString(), response.statusText + ', an error occurred during your request. Please try again.' );
            },
            callback: function(rec, op, success) {

            }
        });
        */

        //win.close();
    },

    onSelect: function(sm, rec, idx, e){

        var m = this.getView(),
            refs = m.lookupReference("multiview").getReferences();

        refs.display.setActive(rec);

        if(!refs.preview.hidden){
            this.loadIframe(refs.display ,rec);
        }

        var l = [],
            s = refs.topbar.lookupReference("viewselection");

        l[0] = "pending";
        l[1] = s.value != 2 ? "default" : "tiles";
        l[2] = rec.get("powhId");

        this.redirectTo(l.join("/"));
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(g)){
            i.select(g)
        }
        this.view.contextmenu.showAt(l.getXY())
    },

    onActionNew: function(){
        this.redirectTo("pending/edit");
    },

    onActionRefresh: function(){
        this.getStore("pendings").reload();
    },

    onActionView: function(){
        var m = this.lookupReference("multiview"),
            g = m.lookupReference("grid"),
            s = g.getSelection()[0];

        this.onTabOpen(null, s);
    },

    onTabOpen: function(i, h){
        //console.log('onTabOpen', i, h);
        var j = this,
            f = j.view.lookupReference("multiview").lookupReference("tiles"),
            g = Ext.fly(f.getNode(h)).query("i", false);

        localStorage.setItem("pow-seen-"+h.data.powhId, true);
        f.addItemCls(h, "visited");
        g[0].addCls("visited");

        this.redirectTo("pending/tab/" + h.data.powhId);
    },

    onRowDblClick: function(g, i, j, h, f){
        this.onTabOpen(null, i);
    },

    onItemDblClick: function(g, h, j, f, i){
        this.onTabOpen(null, h);
    },

    onReviseTab: function(p, rec){
        //console.log('onReviseTab', p, rec);

        this.redirectTo("pending/edit/" + rec.data.powhId);
    },

    onTypeChange: function(btn, aItem){
        var me = this,
            //y,
            multiview = me.getView().lookupReference("multiview"),
            refs = multiview.getReferences(),
            grid = refs.grid,
            filters = grid.getPlugin("gridfilters"),
            columns = grid.getColumns(),
            topbar = refs.topbar;

        /*
         var extraParams = grid.getStore().getProxy().extraParams;
         if(extraParams.hasOwnProperty("filter")){
         delete extraParams.filter;
         }
         */

        var filter = Ext.create('Ext.util.Filter', {
            operator: "st",
            value: aItem.type,
            property: "progress",
            type: "string"
        });

        /*Ext.each(columns, function(column){
         y = column.filter;
         if(column.dataIndex === "progress"){
         return false;
         }
         });
         */
        if(aItem.type == null){
            //filters.clearFilters(false);
            grid.getStore().clearFilter();
        }
        else{
            grid.getStore().filter(filter);
            //y.setValue(aItem.type);
            //y.setActive(true);
        }
    },

    loadIframe: function(display, rec){
        var xf = Ext.util.Format;
        display.removeAll();
        display.add({
            xtype: "component",
            itemId: "contentIframe",
            autoEl: {
                tag: "iframe",
                style: {height: "100%"},
                width: "100%",
                border: "none",
                src: xf.format('../services/PowPreviewPrint.ashx?ID={0}', rec.data.powhId)
            }
        })
    }
});
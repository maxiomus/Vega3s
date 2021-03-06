Ext.define('Vega.view.sales.ReviewController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.review',

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

    listen: {
        store: {
            '#reviews': {
                beforeload: {
                    fn: 'onStoreLoad'
                    //single: true,
                },
                load: {
                    fn: function(s){
                        //s.setRemoteFilter(true);
                    },
                    single: true
                }
            }
        }
    },

    initViewModel: function(b){
        this.fireEvent("viewmodelready", this, b);
    },


    onStoreLoad: function(store, op){
        /*
        var grid = this.lookupReference('multiview').getReferences().grid;
        console.log('load', grid, store, op);

        var value = 'initiated';

        Ext.apply(store.getProxy().extraParams, {
            filter: '[{"operator":"like","value":"' + value +'","property":"progress","type":"string"}]'
        });
        */
        store.getProxy().setExtraParam('extra', 'review');
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

            //console.log('beforeadd', record, progress, status);

            if(rec.data.progress == 'review'){
                if(Vega.user.inRole('cs') || Vega.user.inRole('revise') || Vega.user.inRole('administrators')){
                    topbar.add({
                        text: 'Revise',
                        iconCls: 'x-fa fa-edit',
                        hidden: false,
                        handler: function(btn){
                            this.redirectTo('review/edit/' + rec.data.powhId);
                        },
                        scope: this
                    });
                }

                if(rec.data.status != 'PENDING'){
                    if(Vega.user.inRole('revise') || Vega.user.inRole('administrators')){
                        topbar.add({
                            text: 'Submit',
                            iconCls: 'x-fa fa-arrow-circle-o-up',
                            hidden: false,
                            handler: 'onSubmit',
                            scope: this
                        });
                    }
                }
            }

            /*
            if(Vega.getApplication().getProgressController().hasPermission(progress)){
                switch(progress){
                    case 'request':
                    case 'review':
                    case 'audit':
                    case 'approved':
                    case 'rejected':
                        break;
                }
            }
            */
        }

        if(tab.isXType('sales-edit-form')){
            var buttons = tab.getDockedItems('toolbar[dock="top"] > button');

            if(Vega.user.inRole('revise') || Vega.user.inRole('administrators')) {
                buttons[0].setText('Submit');
                buttons[0].nextStep = 'pending';
            }
            else {
                buttons[0].setHidden(true);
            }

            buttons[2].setHidden(false);
        }
    },

    onActionNew: function(){
        this.redirectTo("review/new");
    },

    onActionCopy: function(topbar,b){
        //console.log(a,b)
        var h = Ext.util.History.getToken(),
            g = h ? h.split("/") : [];
        //console.log(h, g.pop());

        this.redirectTo('review/copy/' + g.pop());
    },

    onActionEdit: function(topbar,b) {
        var h = Ext.util.History.getToken(),
            g = h ? h.split("/") : [];
        //console.log(h, g.pop());

        this.redirectTo('review/edit/' + g.pop());
    },

    onActionDelete: function(topbar){
        var me = this,
            m = me.lookupReference("multiview"),
            g = m.lookupReference("grid"),
            d = g.getSelection()[0];

        Ext.Msg.show({
            title:'Warning!',
            message: 'Are you sure you want to delete this?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    var processMask = new Ext.LoadMask({
                        msg: 'Saving... Please wait',
                        target: me.getView()
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

    /**
     *
     * @param topbar {Ext.toolbar.Toolbar}
     * @param widget {Ext.Component}
     */
    onActionView: function(topbar, widget){
        var m = this.lookupReference("multiview"),
            g = m.lookupReference("grid"),
            v = m.lookupReference('tiles'),
            s = g.getSelection().length != 0 ? g.getSelection() : v.getSelection();

        this.onTabOpen(null, s[0]);
    },

    onActionRefresh: function(){
        this.getStore("reviews").reload();
    },

    onSubmit: function(btn){
        var view = btn.up('display'),
            vm = view.getViewModel(),
            rec = vm.data.thePow,
            msg = 'To <strong>Pending</strong> this, please enter a justification below.';

        rec.set('progress', 'posted');
        //rec.set('updatedby', Vega.user.get('Userid'));
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
                        url: '../api/Powh/pending',
                        method: 'POST',
                        jsonData: Ext.JSON.encode(rec.data),
                        success: function(response, options) {
                            // decode response
                            var result = Ext.decode(response.responseText);
                            //console.log('checkLogin', result.data);
                            // check if success flag is true
                            if(result.success) {
                                //console.log('success', result);
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
                            Ext.Msg.alert(response.statusText, response.status + ' - ' + response.responseText );
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

    onSelect: function(sm, rec, idx, e){

        var m = this.getView(),
            refs = m.lookupReference("multiview").getReferences();

        refs.display.setActive(rec);

        if(refs.preview.hidden){
            refs.display.removeAll();
        }
        else {
            refs.display.loadIframe();
        }

        var l = [],
            s = refs.topbar.lookupReference("viewselection");

        l[0] = "review";
        l[1] = s.value != 2 ? "default" : "tiles";
        l[2] = rec.get("powhId");

        this.redirectTo(l.join("/"));
        //console.log('review - onSelect', sm.selected)
    },

    onTabOpen: function(i, h){

        var j = this,
            f = j.view.lookupReference("multiview").lookupReference("tiles"),
            g = Ext.fly(f.getNode(h)).query("i", false);

        localStorage.setItem("pow-seen-"+h.data.powhId, true);
        f.addItemCls(h, "visited");
        g[0].addCls("visited");

        this.redirectTo("review/tab/" + h.data.powhId);
    },

    onRowDblClick: function(g, i, j, h, f){
        this.onTabOpen(null, i);
    },

    onItemDblClick: function(g, h, j, f, i){
        this.onTabOpen(null, h);
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(j)){
            i.select(j);
        }

        this.view.contextmenu.items.items[4].setHidden(!(Vega.user.userOwn(j.data.userId) || Vega.user.inRole('administrators')));
        this.view.contextmenu.showAt(l.getXY());
    },

    onReviseTab: function(p, rec){

        this.redirectTo("review/edit/" + rec.data.powhId);
    },

    onTypeChange: function(btn, aItem){
        var me = this,
            y,
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

        if(aItem.type == null){
            //filters.clearFilters(false);
            grid.getStore().clearFilter();
        }
        else{
            grid.getStore().filter(filter);
            //y.setValue(aItem.type);
            //y.setActive(true);
        }
    }

});

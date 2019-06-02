Ext.define('Vega.view.sales.RequestController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.request',

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
            '#requests': {
                beforeload: {
                    fn: 'onBeforeStoreLoad'
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

    initViewModel: function(vm){
        //this.fireEvent("viewmodelready", this, vm)
    },

    onBeforeStoreLoad: function(store){
        /*
        var grid = this.lookupReference('multiview').getReferences().grid;
        console.log('load', grid, store, op);

        var value = 'initiated';

        Ext.apply(store.getProxy().extraParams, {
            filter: '[{"operator":"like","value":"' + value +'","property":"progress","type":"string"}]'
        });
        */
        store.getProxy().setExtraParam('extra', 'request');
    },

    onBeforeAdd: function(request, tab, idx, e){
        //console.log('requestController - beforeadd', tab.isXType('display'))
        var btnAcceptConfig = {
            text: 'Accept',
            iconCls: 'x-fa fa-arrow-circle-o-up',
            hidden: false,
            handler: 'onAccept',
            scope: this
        };

        if(tab.isXType('display')){

            var btnReviseConfig = {
                text: 'Revise',
                iconCls: 'x-fa fa-edit',
                hidden: false,
                handler: function(btn){
                    this.redirectTo('request/edit/' + btn.up('display').active.data.powhId);
                },
                scope: this
            };

            //this.getView().relayEvents(tab, ['revise', 'accept']);
            var topbar = tab.lookupReference('topbar'),
                tvm = tab.getViewModel(),
                rec = tvm.get('thePow');
                //progress = record.data.progress,
                //status = record.data.status;

            //console.log('beforeadd', tab.getViewModel().get('thePow'));

            if(rec.data.progress != 'accepted'){

                /*
                if(Vega.user.userOwn(rec.data.userId)){

                }
                else {

                }
                */

                topbar.add(btnReviseConfig);

                if(rec.data.status !== 'DRAFT'){
                    //topbar.add(btnReviseConfig);
                    if(Vega.user.inRole('cs') || Vega.user.inRole('administrators')){
                        //topbar.add(btnReviseConfig);
                        topbar.add(btnAcceptConfig);
                    }
                }
                else {
                    /*
                     if(Vega.user.inRole('sales')){

                     }
                     */
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

            //buttons[0].setHidden(true);
            //topbar.insert(0, btnAcceptConfig);

            if(Vega.user.inRole('sales') || Vega.user.inRole('administrators')){
                // Accept Button
                buttons[0].setHidden(true);
                // Save Button
                buttons[2].setHidden(false);
            }
            else {
                buttons[0].setText('Accept');
                buttons[0].nextStep = 'review';
            }

        }
    },

    onSalesChange: function(u, t){
        var me = this,
            y,
            multiview = me.getView().lookupReference("multiview"),
            refs = multiview.getReferences(),
            grid = refs.grid,
            x = grid.getPlugin("gridfilters"),
            r = grid.getColumns();

        Ext.each(r, function(a){
            y = a.filter;
            if(a.dataIndex === "userId"){
                return false;
            }
        });

        if(t.type == null){
            x.clearFilters(false);
        }
        else{
            y.setValue(t.type);
            y.setActive(true);
        }
    },

    onSalesRefresh: function(store){

        var multiview = this.getView().lookupReference("multiview"),
            button = multiview.down("cycle[reference=salesFilter]"),
            menu = button.getMenu();

        var items = [];
        store.each(function(rec){
            var idx = 0;
            items.push({
                xtype: 'menucheckitem',
                iconCls: Ext.baseCSSPrefix + 'menu-item-indent-right-icon x-fa fa-filter',
                group: button.id,
                //itemIndex: ++idx,
                type: rec.data.userId,
                //checked: idx === 0,
                text: rec.data.label,
                //itemId: rec.data.label,
                checkHandler: button.checkHandler,
                scope: button
            });
        });

        menu.add(items);
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

    onAccept: function(btn){

        //console.log(btn.ownerCt.ownerCt)
        var view = btn.ownerCt.ownerCt,
            vm = view.getViewModel(),
            msg = 'To <strong>Review</strong> this, please enter a justification below.';

        var rec = null;
        switch(view.getXType()){
            case 'display':
                rec = vm.get('thePow');
                break;
            case 'sales-edit-form':
                rec = vm.get('header');
                break;
        }

        //console.log(rec);
        rec.set('progress', 'accepted');
        //rec.set('updatedby', Vega.user.get('Userid'));
        //rec.set('updatedon', new Date());
        //var changes = this.getView().getSession().getChanges();
        //console.log(rec.data, vm.get('header').data, view.getForm().getFieldValues());

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
                    var viewer = view.up('viewer'),
                        input = win.down('textarea'),
                        remarks = input.getValue(),
                        processMask = new Ext.LoadMask({
                            msg: 'Saving... Please wait',
                            target: viewer
                        });

                    win.close();
                    processMask.show();

                    Ext.Ajax.request({
                        //url: Ext.String.urlAppend(listStore.getProxy().url + id),
                        url: '../api/Powh/review',
                        method: 'POST',
                        jsonData: Ext.JSON.encode(rec.data),
                        success: function(response, options) {
                            // decode response
                            var result = Ext.decode(response.responseText);
                            //console.log('checkLogin', result.data);
                            // check if success flag is true
                            if(result.success) {
                                //console.log('success', result);
                                Ext.Msg.alert(response.statusText, result);

                                if(remarks){
                                    var log = Ext.create('Vega.model.Powlog', {
                                        powno: result.data.powno,
                                        powhId: result.data.powhId,
                                        powdId: 1,
                                        status: 'open',
                                        content: remarks,
                                        userId: Vega.user.data.Userid
                                    });

                                    log.save({
                                        success: function(rec, op){
                                            viewer.getViewModel().getStore(viewer.getXType() + 's').reload();
                                            viewer.remove(view);
                                            processMask.hide('', function() {
                                                Ext.Msg.alert('Status', 'Changes saved successfully.');
                                            });
                                        },
                                        failure: function(rec, op){

                                        },
                                        callback: function(rec, op){

                                        }
                                    });
                                }
                                else {
                                    viewer.getViewModel().getStore(viewer.getXType() + 's').reload();
                                    viewer.remove(view);
                                    processMask.hide('', function() {
                                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                                    });
                                }

                                //view.close();
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

        //console.log('preview hidden', refs.preview.hidden);
        if(refs.preview.hidden){
            refs.display.removeAll();
        }
        else {
            refs.display.loadIframe();
        }

        var l = [],
            s = refs.topbar.lookupReference("viewselection");

        l[0] = "request";
        l[1] = s.value != 2 ? "default" : "tiles";
        l[2] = rec.get("powhId");

        this.redirectTo(l.join("/"));
    },

    onActionNew: function(){
        this.redirectTo("request/new");
    },

    onActionCopy: function(topbar, a){
        var h = Ext.util.History.getToken(),
            g = h ? h.split("/") : [];
        //console.log(h, g.pop());

        this.redirectTo('request/copy/' + g.pop());
    },

    onActionEdit: function(topbar, a){
        var h = Ext.util.History.getToken(),
            g = h ? h.split("/") : [];
        //console.log(h, g.pop());

        this.redirectTo('request/edit/' + g.pop());
    },

    /**
     *
     * @param topbar {Ext.toolbar.Toolbar}
     * @param widget {Ext.Component}
     */
    onActionView: function(topbar, widget){
        var m = this.lookupReference("multiview"),
            g = m.lookupReference('grid'),
            v = m.lookupReference('tiles'),
            s = g.getSelection().length != 0 ? g.getSelection() : v.getSelection();

        this.onTabOpen(null, s[0]);
    },

    onActionRefresh: function(){
        this.getStore("requests").reload();
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

    onTabOpen: function(i, h){
        //console.log('onTabOpen', i, h);
        var j = this,
            f = j.view.lookupReference("multiview").lookupReference("tiles"),
            g = Ext.fly(f.getNode(h)).query("i", false);

        localStorage.setItem("pow-seen-"+h.data.powhId, true);
        f.addItemCls(h, "visited");
        g[0].addCls("visited");

        //console.log('onTabOpen', h);
        this.redirectTo("request/tab/" + h.data.powhId);
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
        if(!i.isSelected(g)){
            i.select(g);
        }

        //this.view.contextmenu.items.items[2].setHidden(!(Vega.user.userOwn(j.data.userId) || Vega.user.inRole('administrators')));
        this.view.contextmenu.items.items[4].setHidden(!(Vega.user.userOwn(j.data.userId) || Vega.user.inRole('administrators')));
        this.view.contextmenu.showAt(l.getXY());
    },

    onReviseTab: function(p, rec){

        this.redirectTo("request/edit/" + rec.data.powhId);
    }

});

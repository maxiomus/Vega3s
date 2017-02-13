Ext.define('Vega.view.development.request.FabricController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Vega.model.development.FabricRequest'
    ],

    alias: 'controller.request-fabric',

    init: function(c){

    },

    onActionNew: function(b){
        this.showWindow(null);
    },

    onActionEdit: function(b, c){
        //console.log(b, c);

        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('fabric-grid');

        this.showWindow(grid.getSelection()[0]);
    },

    onActionRefresh: function(b, c){
        this.getStore("requestfabrics").reload();
    },

    onActionDelete: function(b, c){
        var me = this;
        Ext.Msg.show({
            title:'Warning!',
            message: 'Are you sure you want to delete this?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);
                    var layout = me.lookupReference('multiview'),
                        grid = layout.lookupReference('fabric-grid'),
                        rec = grid.getSelection()[0];

                    rec.drop();

                    me.saveStore(grid, me.getView());
                }
            }
        });
    },

    onActionMarkComplete: function(b, c){
        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('fabric-grid'),
            rec = grid.getSelection()[0];

        rec.set('Status', 'Complete');
        rec.set('Active', false);
        rec.set('Received', Ext.Date.format(new Date(), 'Y-m-d'));
        rec.set('UDate', new Date());
        rec.set('MUser', Vega.user.data.Userid);

        this.saveStore(grid, this.getView());
    },

    onActionMarkActive: function(b, c){
        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('fabric-grid'),
            rec = grid.getSelection()[0];

        rec.set('Status', 'In Progress');
        rec.set('Active', true);
        rec.set('Received', null);
        rec.set('UDate', new Date());
        rec.set('MUser', Vega.user.data.Userid);

        this.saveStore(grid, this.getView());
    },

    onClearFilters: function(b){
        var me = this,
            layout = me.view.lookupReference("multiview"),
            topbar = layout.lookupReference("topbar"),
            searchfield = topbar.down('gridsearchfield'),
            grid = layout.lookupReference("fabric-grid");

        searchfield.setValue('');
        searchfield.getTrigger('clear').hide();
        grid.filters.clearFilters();
    },

    onTypeChange: function(btn, aItem){
        var me = this,
        //y,
            layout = me.getView().lookupReference("multiview"),
            topbar = layout.lookupReference("topbar"),
            grid = layout.lookupReference('fabric-grid'),
            filters = grid.getPlugin("gridfilters"),
            columns = grid.getColumns();

        var filter = Ext.create('Ext.util.Filter', {
            operator: "like",
            value: aItem.type,
            property: "Status",
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

    /**
     *
     * @param sm
     * @param rec
     * @param index
     * @param eOpts
     */
    onSelect: function(sm, rec, index, eOpts){
        //onSelectionChange: function(sm, selected, eOpts) {

        var layout = this.getView().lookupReference('multiview'),
            refs = layout.getReferences(),
            topbar = refs.topbar,
            display = refs.display;

        display.setActive(rec);

        //console.log('fabric', rec);
        this.redirectTo('request-fabric/default/' + rec.get('ID'));
    },

    onRowDblClick: function (view, rec, tr, idx, e) {
        if(rec.get('Status') != 'Complete'){
            this.showWindow(rec);
        }

    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(g)){
            i.select(g)
        }
        this.view.contextmenu.showAt(l.getXY())
    },

    onFilterItemChange: function(combo, q, r, o){
        var toolbar = combo.up("toolbar"),
            m = toolbar.down("gridsearchfield"),
            n = toolbar.down("searchcombo"),
            j = combo.getValue();

        switch(j){
            case "Vendor":
            case "Dept":
            case "Coordinator":
            case "Status":
                n.paramName = j;
                n.show();
                m.hide()
                break;
            default:
                m.paramName = j;
                m.show();
                n.hide();
        }

        var store = this.getViewModel().getStore(j.toLowerCase());

        if(store != null){
            store.load();
            n.bindStore(store)
        }
    },

    showWindow: function(rec){
        var view = this.getView();

        this.win = view.add({
            xtype: 'request-edit-fabric',
            isEdit: !!rec,
            width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 1024,
            height: window.innerHeight < 640 ? (view.getHeight() * 0.9) : 480,

            viewModel: {
                data: {
                    title: rec ? 'Edit: ' + rec.get('ID') : 'Add Request'
                },

                links: {
                    theFabric: rec || {
                        type: 'development.FabricRequest',
                        create: {
                            CUser: Vega.user.data.Userid,
                            CDate: new Date(),
                            Issued: new Date(),
                            Vendor: 'BLUPRINT',
                            Priority: 'Medium',
                            Active:  true,
                            Complete: '0',
                            Status: 'In Progress'
                        }
                    }
                },

                formulas: {
                    formValid: {
                        bind: {
                            bindTo: '{theFabric}',
                            deep: true
                        },
                        get: function(req){
                            return req.isValid();
                        }
                    }
                }
            },

            session: true,

            buttons: [{
                text: 'Save',
                bind: {
                    disabled: '{!formValid}'
                },
                handler: 'onSaveFabricClick',
                scope: this
            }, {
                text: 'Cancel',
                handler: 'onCancelFabricClick',
                scope: this
            }]
        });

        this.win.on('close', function(p){
            //console.log(this)
            view.up('maincontainerwrap').unmask();
            /*
            var batch = this.getSession().getSaveBatch();

            if(batch !== undefined){
                var processMask = Ext.create('Ext.LoadMask', {
                    msg: 'Saving... Please wait',
                    target: view
                });

                batch.on({
                    complete: function(batch, op){

                        processMask.hide('', function() {
                            view.up('maincontainerwrap').unmask();
                            Ext.Msg.alert('Status', 'Changes saved successfully.');
                        });
                    },
                    exception: function(){
                        Ext.Msg.alert('Error', 'Error occurred');
                    }
                });

                processMask.show();
                batch.start();
            }
            else {
                Ext.Msg.alert('No Changes', 'There are no changes to the session.');
            }
            */
        });

        this.win.show('', function(){
            view.up('maincontainerwrap').mask();
        });
    },

    onSaveFabricClick: function(){
        var me = this,
            session = me.getSession(),
            win = me.win,
            view = me.getView(),
            form = win.down('form'),
            layout = view.lookupReference('multiview'),
            grid = layout.lookupReference('fabric-grid'),
            isEdit = win.isEdit,
            id, rec;

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
                id = win.getViewModel().get('theFabric').id;
            }

            win.getSession().save();

            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store
                rec = session.getRecord('development.FabricRequest', id);
                grid.getStore().insert(0, rec);
            }

            //grid.getView().refresh();
        }

        me.onCancelFabricClick();

        if(session.getChanges() != null){
            this.saveStore(grid, view);
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }

    },

    onCancelFabricClick: function(){
        this.win.close();
    },

    renderRequestId: function(v) {
        if (v <= -1) {
            v = 'R' + Math.abs(v);
        }
        return v;
    },

    saveStore: function(grid, viewMask){
        var processMask = Ext.create('Ext.LoadMask', {
            msg: 'Saving... Please wait',
            target: viewMask
        });
        processMask.show();

        grid.getStore().sync({
            success: function(batch, op){
                Ext.Msg.alert('Status', 'Changes saved successfully.');

            },
            failure: function(batch, op){
                //console.log(op);
                rec.drop();
            },
            callback: function(batch, op){
                processMask.hide('', function() {

                });
            }
        });
    }
    
});

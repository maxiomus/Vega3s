Ext.define('Vega.view.development.request.GraphicController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.request-graphic',

    init: function(c){
        if(!this.mask){
            this.mask = Ext.create('Ext.LoadMask', {
                msg: 'Saving... Please wait',
                target: this.getView()
            });
        }
    },

    onActionNew: function(b){
        this.showWindow(null);
    },

    onActionEdit: function(b){
        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('graphic-grid');

        this.showWindow(grid.getSelection()[0]);
    },

    onActionRefresh: function(b, c){
        this.getStore("requestgraphics").reload();
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
                        grid = layout.lookupReference('graphic-grid'),
                        recs = grid.getSelection();


                    for (var i=0; i<recs.length; i++){
                        recs[i].drop();
                    }

                    grid.getStore().sync({
                        success: function(a,b){
                            console.log(a,b);
                        },
                        failure: function(a,b){
                            console.log(a,b);
                        },
                        callback: function(a,b){
                            console.log(a,b);
                        }
                    });
                }
            }
        });
    },

    onActionMarkComplete: function(b, c){
        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('graphic-grid'),
            rec = grid.getSelection()[0];

        rec.set('Status', 'Complete');
        rec.set('Active', false);
        rec.set('Received', Ext.Date.format(new Date(), 'Y-m-d'));
        rec.set('UDate', new Date());
        rec.set('MUser', Vega.user.data.Userid);

        this.onSave(rec);
    },

    onActionMarkActive: function(b, c){
        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('graphic-grid'),
            rec = grid.getSelection()[0];

        rec.set('Status', 'In Progress');
        rec.set('Active', true);
        rec.set('Received', null);
        rec.set('UDate', new Date());
        rec.set('MUser', Vega.user.data.Userid);

        this.onSave(rec);
    },

    onClearFilters: function(b){
        var me = this,
            layout = me.view.lookupReference("multiview"),
            topbar = layout.lookupReference("topbar"),
            searchfield = topbar.down('gridsearchfield'),
            grid = layout.lookupReference("graphic-grid");

        searchfield.setValue('');
        searchfield.getTrigger('clear').hide();
        grid.filters.clearFilters();
    },

    onTypeChange: function(btn, aItem){
        var me = this,
        //y,
            layout = me.getView().lookupReference("multiview"),
            topbar = layout.lookupReference("topbar"),
            grid = layout.lookupReference('graphic-grid'),
            filters = grid.getPlugin("gridfilters"),
            columns = grid.getColumns();

        var filter = Ext.create('Ext.util.Filter', {
            operator: "like",
            value: aItem.type,
            property: "Status",
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
    },

    /**
     *
     * @param sm
     * @param rec
     * @param index
     * @param eOpts
     */
    onRowSelect: function(sm, rec, index, eOpts){
        //onSelectionChange: function(sm, selected, eOpts) {

        var layout = this.getView().lookupReference('multiview'),
            refs = layout.getReferences(),
            topbar = refs.topbar,
            display = refs.display;

        display.setActive(rec);
        //console.log('graphic', rec);
        this.redirectTo('request-graphic/default/' + rec.get('ID'));
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
            i.select(g);
        }
        this.view.contextmenu.showAt(l.getXY());
    },

    onFilterItemChange: function(combo, q, r, o){
        var toolbar = combo.up("toolbar"),
            m = toolbar.down("gridsearchfield"),
            n = toolbar.down("searchcombo"),
            j = combo.getValue();

        switch(j){
            case "Dept":
            case "Type":
            case "Coordinator":
            case "Status":
                n.paramName = j;
                n.show();
                m.hide();
                break;
            default:
                m.paramName = j;
                m.show();
                n.hide();
        }

        var store = this.getViewModel().getStore(j.toLowerCase());

        if(store != null){
            store.load();
            n.bindStore(store);
        }
    },

    showWindow: function(rec){
        var view = this.getView();

        this.win = view.add({
            xtype: 'request-edit-graphic',
            isEdit: !!rec,
            width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 720,
            height: window.innerHeight < 640 ? (view.getHeight() * 0.9) : 510,
            //minHeight: 560,

            viewModel: {
                data: {
                    title: rec ? 'Edit: ' + rec.get('ID') : 'Add Request'
                },

                links: {
                    theGraphic: rec || {
                        type: 'development.GraphicRequest',
                        create: {
                            CUser: Vega.user.data.Userid,
                            //CreatedOn: new Date(),
                            Issued: new Date(),
                            Type: 'Sublimation',
                            Active:  true,
                            RequestQty: 1,
                            Status: 'In Progress'
                        }
                    }
                },

                formulas: {
                    formValid: {
                        bind: {
                            bindTo: '{theGraphic}',
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
                handler: 'onSaveGraphicClick',
                scope: this
            }, {
                text: 'Cancel',
                handler: 'onCancelGraphicClick',
                scope: this
            }]
        });

        this.win.on('close', function(p){
            //console.log(this)
            view.up('maincontainerwrap').unmask();
        });

        this.win.show('', function(){
            view.up('maincontainerwrap').mask();
        });
    },

    onSaveGraphicClick: function(){
        var me = this,
            session = me.getSession(),
            win = me.win,
            view = me.getView(),
            form = win.down('form'),
            layout = view.lookupReference('multiview'),
            grid = layout.lookupReference('graphic-grid'),
            isEdit = win.isEdit,
            id, rec;

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
                id = win.getViewModel().get('theGraphic').id;
            }

            win.getSession().save();

            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store
                rec = session.getRecord('development.GraphicRequest', id);
                grid.getStore().insert(0, rec);
            }

            //grid.getView().refresh();
        }

        me.onCancelGraphicClick();

        if(session.getChanges() != null){
            var processMask = Ext.create('Ext.LoadMask', {
                msg: 'Saving... Please wait',
                target: view
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
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }

    },

    onCancelGraphicClick: function(){
        this.win.close();
    },

    renderRequestId: function(v) {
        if (v <= -1) {
            v = 'R' + Math.abs(v);
        }
        return v;
    },

    onSave: function(rec){
        var me = this;

        me.mask.show();

        rec.save({
            success: function(batch, op){
                Ext.Msg.alert('Status', 'Changes saved successfully.');
            },
            failure: function(batch, op){
                console.log(batch, op);
            },
            callback: function(batch, op){
                me.mask.hide('', function() {

                });
            }
        });
    }

});

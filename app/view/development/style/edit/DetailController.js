Ext.define('Vega.view.development.style.edit.DetailController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.style-edit-detail',

    init: function(){

    },

    /**
     *
     * @param c {Ext.form.field.Field} this
     * @param nv {Object} The new value
     * @param ov {Object} the old value
     */
    onMatQtyChange: function(c, nv, ov){
        var me = this;

    },

    /**
     *
     * @param editor {Ext.grid.plugin.Editing}
     * @param cx {Object}
     *  grid
     *  record
     *  field
     *  value
     *  row
     *  column
     *  rowidx
     *  colidx
     * @param e Object
     */
    onBomRowEdit: function(editor, cx, e){
        var me = this;
        console.log(cx);
        //this.updateTotal(recs[0].entityName, recs[0].store);
        //winRec.set('total', 9.99)
    },

    onBomItemRemove: function(recs, idx, item, view, e){
        console.log(recs, idx, item, view);
        //this.updateTotal(recs[0].entityName, recs[0].store);

    },

    // Materials...
    onAddMaterialClick: function(btn){
        var me = this,
            form = me.getView(),
            //refs = this.getReferences(),
            grid = form.lookupReference('boms'),
            store = grid.getStore(),
            bomRowEdit = grid.getPlugin("bomRowEdit");

        bomRowEdit.cancelEdit();

        var rec = store.insert(0, {
            style: form.down('textfield[name=style]').getValue(),
            color: form.down('textfield[name=color]').getValue(),
            bomno: form.down('combobox[name=bomno]').getValue()
        });

        bomRowEdit.startEdit(0, 0);
    },

    onCopyMaterialClick: function(btn){
        var me = this,
            //refs = me.getReferences(),
            session = me.getViewModel().getSession(),
            grid = me.lookupReference('boms'),
            store = grid.getStore(),
            d = grid.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', d);
        var rec = store.add(nd);
    },

    onEditMaterialClick: function(btn){
        var me = this,
            //refs = this.getReferences(),
            grid = me.getView().lookupReference('boms'),
            selection = grid.getSelection()[0],
            bomRowEdit = grid.getPlugin("bomRowEdit");

        bomRowEdit.cancelEdit();
        bomRowEdit.startEdit(selection, 0);
        //me.fireEvent('rowdblclick', )
    },

    onDeleteMaterialClick: function(btn){
        var me = this,
            //refs = me.getReferences(),
            grid = me.getView().lookupReference('boms'),
            store = grid.getStore(),
            bomRowEdit = grid.getPlugin("bomRowEdit"),
            selection = grid.getSelectionModel().getSelection()[0];

        bomRowEdit.cancelEdit();
        //store.remove(grid.getSelection()[0]);
        grid.getSelectionModel().deselectAll();

        selection.drop();
    },

    onCostSelect: function(combo, selected){
        var me = this,
            processSelect = this.lookupReference('processSelect');

        //processSelect.setDisabled(false);
    },

    onProcessSelect: function(combo, selected){

        var me = this,
            view = me.getView(),
            //vm = me.getViewModel(),
            window = view.up('window'),
            wvm = window.getViewModel(),
            rec = wvm.get('theCosting'),
            bolhs = rec.bolhs(),
            session = wvm.getSession(),
            bomno = this.lookupReference('costSelect').getValue(),
            store = view.getViewModel().get('processorders');

        if(bomno){
            // bolhs should not be undefined...
            console.log('before add', bolhs);
            if(bolhs){

                var bolh = bolhs.first();
                if(!bolh){
                    bolhs.add({
                        style: rec.data.style,
                        color: rec.data.color,
                        bomno: bomno,
                        ProcessType: combo.getValue(),
                        createUser: Vega.user.data.Userid
                    });

                    bolh = bolhs.first();
                }
                else {
                    if(bolh.phantom){
                        bolh.set('ProcessType', combo.getValue());

                        if(bolh.bols().getCount() > 0){
                            bolh.bols().removeAll();
                        }
                    }
                }

                store.filter([{
                    operator: "=",
                    value: combo.getValue(),
                    property: "ProcessType",
                    type: "string"
                }]);

                store.each(function(r){
                    bolh.bols().add({
                        style: rec.data.style,
                        color: rec.data.color,
                        bomno: bomno,
                        line: 1,
                        orderNo: r.data.orderNo,
                        ProcessType: r.data.ProcessType,
                        location: r.data.location,
                        inhouse: r.data.inhouse,
                        vendor: r.data.vendor,
                        leadtime: r.data.leadtime,
                        price: r.data.price,
                        po_autocreate: r.data.po_autocreate,
                        receiving_loc: r.data.receiving_loc
                    });
                });

                /*
                 wvm.linkTo('theProcessH', {
                 type: 'sample.Bolh',
                 create: {
                 style: style,
                 color: color,
                 bomno: bomno,
                 ProcessType: combo.getValue(),
                 createUser: Vega.user.data.Userid
                 }
                 })
                 */

                bolh.bols().on('update', function(store, record, op, mod, dt) {
                    //console.log('bols update', store, cRec)

                    var boltotal = 0;
                    store.each(function(r, idx){
                        boltotal += r.data.price;
                    });

                    bolh.set('TotalCost', boltotal);

                    rec.set('processtotal', boltotal);
                    rec.set('total', rec.get('subTotal') + rec.get('assoctotal'));

                }, this);

                bolh.bols().on('datachanged', function(store){
                    //console.log('datachanged', store, rec, cRec)

                    var boltotal = 0;
                    store.each(function(r, idx){
                        boltotal += r.data.price;
                    });

                    bolh.set('TotalCost', boltotal);

                    rec.set('processtotal', boltotal);
                    rec.set('total', rec.get('subTotal') + rec.get('assoctotal'));

                }, this);

                wvm.set('theProcessH', bolh);
                console.log('Adding',bolh);
            }
        }
        else {

            Ext.Msg.show({
                title: 'Warning!',
                message: 'Please select C.S # first!',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING,
                fn: function(btn){
                    combo.setValue('');
                }
            });
        }

        //console.log('Detail - theProcessH', wvm.get('theProcessH'))

    },

    // Labors...
    onNewLaborClick: function(btn){
        var me = this,
            vm = me.getViewModel(),
            style = vm.get('theSample'),
            combo = me.lookupReference('processSelect'),
        //store = vm.getStore('processorders'),
            bolRowEdit = me.lookupReference('bols').getPlugin("bolRowEdit");

        bolRowEdit.cancelEdit();

        //console.log(store, style);
        if(style.bols().getCount() > 0){
            style.bols().removeAll();
        }

        //console.log(style.bolh)
    },

    onAddLaborClick: function(btn){
        var me = this,
            view = me.getView(),
            //vm = me.getViewModel(),
            window = view.up('window'),
            wvm = window.getViewModel(),
            rec = wvm.get('theCosting'),
            grid = this.lookupReference('bols'),
            bomno = me.lookupReference('costSelect').getValue(),
            processType = me.lookupReference('processSelect').getValue(),
            store = grid.getStore(),
            bolRowEdit = grid.getPlugin("bolRowEdit");

        bolRowEdit.cancelEdit();

        var newRec = store.insert(0, {
            style: rec.data.style,
            color: rec.data.color,
            bomno: bomno,
            line: 1,
            ProcessType: processType
        });

        var idx = 0;
        store.each(function(rec,i){
            idx = idx < i ? i : idx;
        });

        bolRowEdit.startEdit(0,1);

    },

    onCopyLaborClick: function(btn){
        var me = this,
            //refs = me.getReferences(),
            session = me.getViewModel().getSession(),
            grid = me.lookupReference('bols'),
            d = grid.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', d);
        grid.getStore().add(nd);
    },

    onEditLaborClick: function(btn){
        var me = this,
            //refs = this.getReferences(),
            grid = me.lookupReference('bols'),
            selection = grid.getSelectionModel().getSelection()[0],
            bolRowEdit = grid.getPlugin("bolRowEdit");

        bolRowEdit.cancelEdit();
        bolRowEdit.startEdit(selection, 0);
        //me.fireEvent('rowdblclick', )
    },

    onRemoveLaborClick: function(btn){
        var me = this,
            //refs = me.getReferences(),
            grid = me.lookupReference('bols'),
            store = grid.getStore(),
            selection = grid.getSelectionModel().getSelection()[0],
            bolRowEdit = grid.getPlugin("bolRowEdit");

        bolRowEdit.cancelEdit();
        //store.remove(grid.getSelection()[0]);
        grid.getSelectionModel().deselectAll();

        selection.drop();
    },

    onDeleteLaborAllClick: function(btn){
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('bols'),
            combo = me.lookupReference('processSelect'),
            bolCrud = me.lookupReference('bolCrud'),
            store = grid.getStore(),
            //bolh = vm.get('theCosting').bolhs().first();
            bolh = vm.get('theProcessH');

        //grid.getSelectionModel().deselectAll();

        if(!bolh.phantom){
            store.each(function(rec){
                rec.drop();
            });

            me.getView().up('window').getViewModel().getSession().save();
        }

        bolh.drop();

        combo.setValue('');
        combo.setDisabled(!bolh.phantom);
        combo.setReadOnly(!bolh.phantom);

        console.log('Deleting', bolh);
    }

});

Ext.define('Vega.view.inventory.fabric.AllocationController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.allocation',

    init: function(){
        var me = this;

        me.listen({
            component: {
                'combo': {
                    change: 'onComboChanged'
                },
                //'searchfield': {
                //    change: 'onSearchfieldChanged'
                //},
                'textfield[itemId=search]': {
                    specialkey: 'onKeyPressed',
                    triggersearch: 'onTriggerSearchClicked',
                    triggerclear: 'onTriggerClearClicked'
                },
                'fabricrolldetail': {
                    select: function(grid, record, index){
                        console.log('select', record);
                    }
                },
                'fabricrolldetail combo#cboLotno': {
                    render: 'onComboRendered',
                    //beforequery: this.onBeforeQuery,
                    select: 'onComboSelected'
                },
                'fabricrolldetail button[action=checkall]': {
                    click: 'onCheckAllClicked'
                },
                'fabricrolldetail button[action=uncheckall]': {
                    click: 'onUncheckAllClicked'
                },
                'fabricrolldetail checkcolumn': {
                    beforecheckchange: 'onBeforeCheckChanged',
                    checkchange: 'onCheckChanged'
                }
            },

            store: {
                'rolldetails': {
                    beforesync: 'onBeforeSync'
                }
            }
        })
    },

    onBeforeSync: function(options){
        console.log('onBeforeSync', options);


    },

    onSearchfieldChanged: function(field, newValue, oldValue, eOpts){
        /*
        var me = this,
            grid = me.lookupReference('requirements');

        if(field.triggers.clear){
            field.triggers.clear.el.setDisplayed(field.getRawValue().toString().length == 0 ? false : true);
        }

        if (grid.getSelectionModel().selected && newValue != oldValue) {
            grid.getSelectionModel().deselectAll(false);
        }
         */
    },

    onKeyPressed: function(f, e){

        if (e.getKey() == e.ENTER) {
            var task = new Ext.util.DelayedTask(function(){
                f.fireEvent('triggersearch', f);
            });
            task.delay(10);
        }
    },

    onTriggerSearchClicked: function(field){

        this.redirectTo('allocation/' + field.getValue());
    },

    onTriggerClearClicked: function(field){

        this.redirectTo('allocation');
    },

    onComboRendered: function(combo){

    },

    onComboChanged: function (combo, newValue, oldValue, eOpts) {
        /*
        if(combo.triggers.clear){
            combo.triggers.clear.el.setDisplayed(combo.getRawValue().toString().length == 0 ? false : true);
        }
        */
    },

    onSearchClicked: function(btn) {
        /*
        var me = this,
            grid = me.lookupReference('requirements'),
            store = grid.getStore(),
            subGrid = me.lookupReference('details'),
            field = me.lookupReference('searchfield');
        //console.log(field, field[0], field[0].getValue());

        if (grid.getSelectionModel().selected) {
            grid.getSelectionModel().deselectAll(false);
        }
        */
        var me = this,
            field = me.lookupReference('search');

        field.fireEvent('triggersearch', field);
    },

    onSaveClicked: function(btn) {

        var me = this,
            store = me.getViewModel().getStore('rolldetails')//,
        //grid = this.getRequirements(),
        //record = grid.getSelectionModel().selected;
        //console.log(record, record[0]);

        var n = store.getNewRecords(), u = store.getUpdatedRecords(), d = store.getRemovedRecords();
        if (n.length > 0 || u.length > 0 || d.length > 0) {
            Ext.Msg.show({
                msg: 'Saving data, please wait...',

                progressText: 'Saving...',
                width: 160,
                //icon: Ext.Msg.INFO,
                wait: true,
                waitConfig: {interval:200}
            });
        }

        store.sync({
            success : function(batch, opt){
                //Ext.Msg.hide();
                store.load({
                    callback: function (records, operation, success){
                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                    }
                });
                //console.log('store', batch);
            },
            failure : function(batch, opt){
                var msg = '';

                if(batch.hasException){

                    for(var i = 0; i < batch.exceptions.length; i ++ ){
                        switch(batch.exceptions[i].action){
                            case "destroy" :
                                msg = msg + batch.exceptions[i].records.length + " Delete, ";
                                break;
                            case "update" :
                                msg = msg + batch.exceptions[i].records.length + " Update, ";
                                break;
                            case "create" :
                                msg = msg + batch.exceptions[i].records.length + " Create, ";
                                break;
                        }
                    }

                    Ext.Msg.alert("Status", msg + " operation failed!");
                }
                else
                    Ext.Msg.alert('Status', 'Changes failed.');
            }
        });

        /*Ext.apply(store.getProxy().extraParams, {
         style: record[0].get('style'),
         color: record[0].get('color'),
         lotno: record[0].get('lotno'),
         poclid: record[0].get('poclId')
         });*/

        /*store.reload({
         callback: function(records, options, success) {
         //console.log(records)

         }
         });*/
    },

    onPrintClicked: function(btn) {
        var query = {}, url = '../Services/PullRequestPrint.ashx?',
            toolbar = this.lookupReference('topbar'),
            cutno = toolbar.getComponent('search');

        query.pono = cutno.getValue();

        window.open(url + Ext.Object.toQueryString(query));
    },

    onRowSelected: function(model, record, index, eOpts) {
        var me = this,
            refs = me.getReferences(),
            store = me.getViewModel().getStore('rolldetails'),
            toolbar = refs.details.down('toolbar'),
            fabric = toolbar.getComponent('cboFabric'),
            color = toolbar.getComponent('cboColor'),
            lotno = toolbar.getComponent('cboLotno');

        fabric.setValue(record.data.style.trim());
        color.setValue(record.data.color.trim());

        Ext.apply(lotno.getStore().getProxy().extraParams, {
            style: fabric.getValue().trim(),
            color: color.getValue().trim()
        });
        lotno.getStore().load();

        Ext.apply(store.getProxy().extraParams, {
            style: fabric.getValue().trim(),
            color: color.getValue().trim(),
            //lotno: lotno.getValue(),
            pono: record.data.pono,
            poclid: record.data.poclId
        });

        store.load({
            callback: function(records, options, success) {
                //console.log(records)

            }
        });

    },

    onRowDeselected: function(model, record, index, eOpts) {
        var me = this,
            refs = me.getReferences(),
            store = me.getViewModel().getStore('rolldetails'),
            toolbar = refs.details.down('toolbar'),
            fabric = toolbar.getComponent('cboFabric'),
            color = toolbar.getComponent('cboColor'),
            lotno = toolbar.getComponent('cboLotno');

        fabric.clearValue();
        color.clearValue();
        lotno.clearValue();
        lotno.triggerCell.item(1).setDisplayed(false);
        store.clearFilter();

        store.removeAll();
    },

    onUncheckAllClicked: function(btn) {
        var me = this,
            requirements = me.lookupReference('requirements');

        me.getViewModel().getStore('rolldetails').rejectChanges();
        /*var selected = requirements.getSelectionModel().getSelection()[0];

        me.getViewModel().getStore('RollDetails').each(function(rec) {
            if (rec.data.unit1 != 0) {

                rec.set('checkStatus', 0);
                rec.set('alloc_qty_total', rec.data.alloc_qty_total - rec.data.alloc_qty);
                rec.set('alloc_qty', 0);
                rec.set('poclid', selected.data.poclId);
                rec.set('pono', selected.data.pono);
                rec.set('status', 'Cancel')
            }
        });*/
    },

    onCheckAllClicked: function(btn) {
        var me = this,
            requirements = me.lookupReference('requirements'),
            selected = requirements.getSelectionModel().getSelection()[0];

        me.getViewModel().getStore('rolldetails').each(function(rec) {
            if (rec.data.checkStatus != 1 && rec.data.unit1 != 0) {
                rec.set('checkStatus', 1);
                rec.set('poclid', selected.data.poclId);
                rec.set('pono', selected.data.pono);
                rec.set('alloc_qty', rec.data.unit1 - rec.data.alloc_qty_total);
                rec.set('alloc_qty_total', rec.data.alloc_qty_total + rec.data.alloc_qty);
                rec.set('status', 'Hold');
            }
        });
    },

    onBeforeCheckChanged: function(column, rowIndex, checked, eOpts) {
        var me = this,
            record = me.getViewModel().getStore('rolldetails').getAt(rowIndex);

        if(record.data.unit1 == 0) {
            return false;
        }
    },

    onCheckChanged: function(column, rowIndex, checked, eOpts) {

        var me = this,
            requirements = me.lookupReference('requirements'),
            selected = requirements.getSelectionModel().getSelection()[0],
            record = me.getViewModel().getStore('rolldetails').getAt(rowIndex);

        //console.log(record.data);
        var columnIndex = column.getIndex();
        if (checked) {

            if(record.id >= 0){
                record.reject(false);
            }
            else {
                record.set('poclid', selected.data.poclId);
                record.set('pono', selected.data.pono);
                record.set('alloc_qty', record.data.unit1);
                record.set('alloc_qty_total', record.data.alloc_qty_total + record.data.alloc_qty);
                record.set('status', 'Hold');
            }

        }
        else {

            if(record.id >= 0){
                record.set('poclid', selected.data.poclId);
                record.set('pono', selected.data.pono);
                record.set('alloc_qty_total', record.data.alloc_qty_total - record.data.alloc_qty);
                record.set('alloc_qty', 0);
                //record.set('status', '');
            }
            else {
                record.reject(false);
            }

        }

        // set store record is dirty...
        //this.getRequirements().recordDirty = record.dirty;

        //this.getDetails().getStore().commitChanges();
    },

    onComboSelected: function(combo, records, eOpts) {
        var me = this,
            store = me.getViewModel().getStore('rolldetails');

        if (combo.getValue().length > 0) {
            // Param name is ignored here since we use custom encoding in the proxy.
            // id is used by the Store to replace any previous filter

            store.filter({
                id: 'lotno',
                property: 'lotno',
                value: combo.getValue()
            });
            //combo.triggerCell.item(1).setDisplayed(true);
            //combo.updateLayout();
        }

    },

    onBeforeDestroyed: function() {
        var me = this,
            requirements = me.lookupReference('requirements'),
            details = me.lookupReference('details');

        requirements.getStore().clearFilter();
        details.getStore().removeAll();
        //console.log('Fabric Controller onDestroy calls.', store)
    }
    
});

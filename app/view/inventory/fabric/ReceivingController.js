Ext.define('Vega.view.inventory.fabric.ReceivingController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.receiving',

    init: function(){
        var me = this;

        me.listen({
            component: {
                'combo': {
                    change: 'onComboChanged'
                },
                'textfield[itemId=search]': {
                    specialkey: 'onKeyPressed',
                    //change: 'onSearchfieldChanged',
                    triggersearch: 'onTriggerSearchClicked',
                    triggerclear: 'onTriggerClearClicked'
                },
                'orders-list': {
                    //selectionchange: 'onOrdersSelectionChange'
                },
                'receivings-grid': {
                    selectionchange: 'onReceivingSelectionChange'
                },
                'combo[itemId=cboLotno]': {
                    beforeEdit: function(){
                        console.log('beforeEdit');
                    }
                }
            },
            store: {
                '#pohs': {
                    load: 'onPohStoreLoad'
                }
            }
        })
    },

    onPohStoreLoad: function(store, records, successful, operation){

    },

    onLotnosBeforeload: function(store, operation){
        var me = this,
            grid = me.lookupReference('receivings-grid'),
            selected = grid.getSelectionModel().getSelection()[0];

        Ext.apply(store.getProxy().extraParams, {
            style: selected.data.style.trim(),
            color: selected.data.color.trim()
        });
    },

    onRollsBeforeload: function(store, operation){
        var me = this,
            grid = me.lookupReference('receivings-grid'),
            selected = grid.getSelectionModel().getSelection()[0];

        Ext.apply(store.getProxy().extraParams, {
            style: selected.data.style.trim(),
            color: selected.data.color.trim(),
            lotno: selected.data.lotno.trim()
        });
    },

    onComboChanged: function (combo, newValue, oldValue, eOpts) {
        if(combo.triggers.clear){
            combo.triggers.clear.el.setDisplayed(combo.getRawValue().toString().length == 0 ? false : true);
        }
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

        /*var me = this,
            form = me.lookupReference('poheader').getForm(),
            store = me.getViewModel().getStore('podetails'),
            grid = me.lookupReference('orders-list'),
            selection = grid.getSelectionModel(),
            value = field.getValue();

        var proxy = store.getProxy();

        proxy.encodeFilters = function(filters){
            return filters[0].getValue();
        };

        if (selection.selected) {
            selection.deselectAll(false);
        }

        if(store.loadCount == 0){

            Vega.model.Poh.load(value, {
                callback: function(poh){
                    form.loadRecord(poh);
                    //console.log('POH #' + poh.get('pono'), poh);

                    poh.podetails(function(podetails){
                        grid.bindStore(podetails);
                        /!*pods.each(function(pod){
                         console.log('POD #' + pod.get('id'), pod);
                         });*!/
                    });
                }
            });
        }*/

        this.redirectTo('receiving/' + field.getValue());
    },

    onTriggerClearClicked: function(field){
        /*var me = this,
            form = me.lookupReference('poheader').getForm(),
            grid = me.lookupReference('orders-list'),
            selections = grid.getSelectionModel();

        //console.log('onTriggerClearClicked');
        form.reset();

        if(selections.selected){
            selections.deselectAll();
        }

        grid.getStore().removeAll();*/

        this.redirectTo('receiving');
    },

    onReceivingSelectionChange: function(selection, records, eOpts){

    },

    onSearchfieldChanged: function(field, newValue, oldValue, eOpts){
        /*var me = this,
         //form = me.lookupReference('poheader'),
         grid = me.lookupReference('orders-list');

         if(field.triggers.clear){
         field.triggers.clear.el.setDisplayed(field.getRawValue().toString().length == 0 ? false : true);
         }

         if (grid.getSelectionModel().selected && newValue != oldValue) {
         grid.getSelectionModel().deselectAll(false);
         }*/
    },

    onSearchClicked: function(btn) {
        var me = this,
            field = me.lookupReference('search');

        field.fireEvent('triggersearch', field);
    },

    onOrderRowSelected: function(model, record, index, eOpts) {
        var me = this,
            store = me.getViewModel().getStore('poreceivings');

        //console.log(record.data.style, record.data.color);
        Ext.apply(store.getProxy().extraParams, {
            style: record.data.style.trim(),
            color: record.data.color.trim(),
            //lotno: lotno.getValue(),
            pono: record.data.pono
        });

        store.load({
            callback: function(records, options, success) {
                //console.log(records)
            }
        });

    },

    onOrderRowDeselected: function(model, record, index, eOpts) {
        var me = this,
            store = me.getViewModel().getStore('poreceivings');

        store.removeAll();
    }
});

Ext.define('Vega.view.sales.edit.TnaOrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.edit-tnaorder',

    init: function(){

    },

    onPlanTypeChange: function(combo, rec){
        var me = this,
            tnaStore = me.getViewModel().getStore('tnaOrders');

        tnaStore.filter([{
            property: 'roleId',
            type: 'int',
            value: combo.getValue()
        }])
    },

    onTypeChange: function(btn, aItem){
        var store = this.lookupReference('orders').getStore();

        store.filter({
            operator: "eq",
            value: aItem.type,
            property: "roleId"
        });
    },

    onAddClick: function(btn){
        //console.log(this.getReferences())
        var store = this.lookupReference('orders').getStore(),
            rec = new Ext.create('Vega.model.TnaOrder', {
                roleId: store.getAt(0).data.roleId,
                priority: (store.getCount() + 1) * 10
            });

        store.add(rec);
    },

    onRemoveClick: function(btn){
        //console.log(this.getReferences())
        var grid = this.lookupReference('orders'),
            sm = grid.getSelectionModel(),
            rec = sm.getSelection()[0];

        rec.drop();
    }
    
});

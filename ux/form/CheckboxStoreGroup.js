Ext.define('Ext.ux.form.CheckboxStoreGroup', {
    extend: 'Ext.form.CheckboxGroup',

    mixins: [
        'Ext.util.StoreHolder'
    ],

    alias: 'widget.checkboxstoregroup',

    labelField: 'label',
    valueField: 'id',
    checkedField: 'checked',
    //columns: 3,
    //boxFieldName: 'cb'

    /*
    applyStore: function(store) {
        if (Ext.isString(store)) {
            return Ext.getStore(store);
        } else {
            return store;
        }
    },

    updateStore: function(newStore, oldStore) {
        if (oldStore) {
            oldStore.removeEventListener('datachanged', this.onStoreChange, this);
        }
        newStore.on('datachanged', this.onStoreChange, this);
    },

    onStoreChange: function(s) {

        Ext.suspendLayouts();
        this.removeAll();

        var vField = this.getValueField();
        var lField = this.getLabelField();
        var cField = this.getCheckedField();
        //var fName = this.getBoxFieldName();
        var rec = null;

        for (var i=0; i<s.getCount(); i++) {
            rec = s.getAt(i);

            this.add({
                //xtype: 'checkbox',
                boxLabel: rec.get(lField),
                inputValue: rec.get(vField)
                //checked: rec.get(cField)
                //name: this.name
            });
        }

        Ext.resumeLayouts(true);

    },
    */

    initComponent: function() {
        var me = this,
            store = me.store;

        me.callParent(arguments);

        me.bindStore(store || 'empty-ext-store', true);
    },

    onBindStore: function(s) {

        if(s && this.rendered){
            var me = this,
                store = me.store;

            Ext.suspendLayouts();
            me.removeAll();

            var vField = me.valueField;
            var lField = me.labelField;
            var cField = me.checkedField;
            //var fName = this.getBoxFieldName();
            var rec = null;

            for (var i=0; i<store.getCount(); i++) {
                rec = store.getAt(i);

                me.add({
                    //xtype: 'checkbox',
                    boxLabel: rec.get(lField),
                    inputValue: rec.get(vField)
                    //checked: rec.get(cField)
                    //name: this.name
                });
            }

            Ext.resumeLayouts(true);
        }
    }
});
Ext.define('Ext.ux.form.field.MemoryCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.memorycombo',

    initComponent: function() {
        this.callParent(arguments);
    },

    afterQuery: function(qe) {
        this.callParent(arguments);
        var store = qe.combo.store;
        store.loadPage(1, {
            rawQuery: qe.rawQuery
        });
    }
});
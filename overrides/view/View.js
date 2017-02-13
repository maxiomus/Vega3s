Ext.define('Ext.overrides.view.View', {
    override: 'Ext.view.View',

    // Solves chained store missing loadmask issue
    initComponent: function () {
        this.callParent(arguments);
    }
});
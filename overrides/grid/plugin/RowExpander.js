
Ext.define('Ext.overrides.grid.plugin.RowExpander', {
    override: 'Ext.grid.plugin.RowExpander',

    getRowBodyContentsFn: function (rowBodyTpl) {
        var me = this;
        return function (rowValues) {
            rowBodyTpl.owner = me;
            return rowBodyTpl.applyTemplate(rowValues.record.getData(true));
        };
    }
});
Ext.define('Ext.overrides.grid.GridPanel', {
    override: 'Ext.grid.Panel',

    // Temparay Fix for stateful grid unique stateId
    initComponent: function() {

        var columns = this.columns;
        if (columns) {
            // OVERRIDE
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                if (column) {
                    column.stateId = column.stateId || column.dataIndex || column.text;
                }
            }
        }
        this.callParent(arguments);
    }
});
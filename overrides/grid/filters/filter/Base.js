/**
 * Created by tech on 8/19/2015.
 */

/**
 * Adding Filter data type property 'type'
 */
Ext.define('Ext.overrides.grid.filters.filter.Base', {
    override: 'Ext.grid.filters.filter.Base',
    createFilter: function(config, key) {
        var me = this,
            filter = me.callParent(arguments),
            type = me.getInitialConfig('type');
        filter.type = type;
        return filter;
    }
});
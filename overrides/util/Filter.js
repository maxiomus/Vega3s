/**
 * Created by tech on 8/17/2015.
 */

/*
Ext.define('Ext.overrides.util.Filter', {
    override: 'Ext.util.Filter',

    createFilterFn: function() {

        var me       = this,
            matcher  = me.createValueMatcher(),
            property = !Ext.isArray(me.property) ? me.property.split(',') : me.property
        return function(item) {
            var hasmatch = false;
            for(var i=0;i<property.length;i++) {
                if(matcher.test(me.getRoot.call(me, item)[property[i]])) {
                    hasmatch=true;
                    break;
                }
            }
            return matcher === null ? value === null : hasmatch;
        };
    }
});*/
/**
 * Adding Filter data type property 'type'
 */
Ext.define('Ext.overrides.util.Filter', {
    override: 'Ext.util.Filter',

    getState: function() {
        var me = this,
            state = this.callParent(arguments);

        if (me.type) {
            state.type = me.type;
        }

        return state;
    }
});

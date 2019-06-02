/**
 * Created by tech on 5/13/2019.
 */
Ext.define('Ext.overrides.dashboard.Dashboard', {
    override: 'Ext.dashboard.Dashboard',

    getPart: function (type) {
        var parts = this.getParts();
        return parts.findBy(function(item, key) {
            if (key === type) {
                if (item.getId() === key) {
                    return item;
                }
            }
        });
    }
});
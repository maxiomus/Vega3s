/**
 * Created by tech on 12/10/2015.
 */
// fix the following error...
// targetCls is missing. This may mean that getTargetEl() is being overridden but not applyTargetCls()
Ext.define('Ext.overrides.layout.container.Container', {
    override: 'Ext.layout.container.Container',

    notifyOwner: function() {
        this.owner.afterLayout(this);
    }
});
/**
 * Created by tech on 9/28/2015.
 */
Ext.define('Ext.overrides.layout.container.Card', {
    override: 'Ext.layout.container.Card',

    getActiveIndex: function() {
        return this.getLayoutItems().indexOf(this.activeItem);
    }
})
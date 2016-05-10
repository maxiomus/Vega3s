/**
 * Created by tech on 10/2/2015.
 */
Ext.define('Ext.ux.button.MultiSortButton', {
    extend: 'Ext.button.Button',
    xtype: 'multisortbutton',

    config: {
        direction: "DESC",
        dataIndex: undefined
    },

    /**
     * @event changeDirection
     * Fired whenever the user clicks this button to change its direction
     * @param {String} direction The new direction (ASC or DESC)
     */
    handler: function() {
        this.toggleDirection();
    },

    /**
     * Updates the new direction of this button
     * @param {String} direction The new direction
     */
    updateDirection: function(direction) {
        this.setIconCls('sort-direction-' + direction.toLowerCase());
        this.fireEvent('changeDirection', this.getDirection());
    },

    /**
     * Toggles between ASC and DESC directions
     */
    toggleDirection: function() {
        this.setDirection(Ext.String.toggle(this.getDirection(), "ASC", "DESC"));
    }
});

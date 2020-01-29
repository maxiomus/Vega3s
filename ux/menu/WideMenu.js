Ext.define('Ext.ux.menu.WideMenu', {
    extend: 'Ext.menu.Menu',

    alias: 'widget.widemenu',

    showBy: function (cmp, pos, off) {
        var me = this,
            x = me.deltaX === undefined ? 0 : me.deltaX,
            y = me.deltaY === undefined ? 0 : me.deltaY;

        // get target for our menu
        cmp = me.getMenuTarget();
        // or set offset for menu
        off = [x, y];

        me.callParent([cmp, pos, off]);
        return me;
    },

    getMenuTarget: function () {
        return this.ownerCt;
    }
})
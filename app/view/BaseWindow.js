Ext.define('Vega.view.BaseWindow', {
    extend: 'Ext.window.Window',
    xtype: 'basewindow',

    cls: 'vega-base-window',

    closable: false,
    resizable: false,
    autoShow: true,

    maximized: true,
    //frameHeader: false,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center',

        // Tell the layout to animate the x/width of the child items.
        animate: true,
        animatePolicy: {
            x: true,
            width: true
        }
    }
});
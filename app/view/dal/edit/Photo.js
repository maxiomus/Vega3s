Ext.define('Vega.view.dal.edit.Photo', {
    extend: 'Ext.window.Window',

    alias: 'widget.dal-edit-photo',

    maxHeight: 560,

    monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,

    bind: {
        title: '{title}'
    },

    layout: {
        type: 'fit'
    },

    padding: '0 0 0 10',

    initComponent: function(c){
        var me = this;

        me.callParent(arguments);
    }

})
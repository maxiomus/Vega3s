Ext.define('Vega.view.development.style.edit.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.style-edit-upload-toolbar',

    /*
     controller: "sample-edit-toolbar",
     viewModel: {
     type: "sample-edit-toolbar"
     },
     */

    width: "100%",
    enableOverflow: true,
    defaultActionType: 'button',

    initComponent: function (c) {
        var me = this;

        me.removeall = Ext.create('Ext.Action', {
            text: 'Remove All',
            //glyph: 43,
            iconCls: 'x-fa fa-cog',
            tooltip: 'Remove All',
            handler: function(item){
                me.fireEvent("actremoveall", me, item);
            },
            scope: me
        });

        me.togglep = Ext.create('Ext.Action', {
            iconCls: 'x-fa fa-toggle-off',
            ui: 'bootstrap-btn-default',
            //cls:"delete-focus-bg",
            tooltip: 'Show Details',
            enableToggle: true,
            toggleHandler: function(item, pressed){
                item.setIconCls(pressed ? 'x-fa fa-toggle-on' : 'x-fa fa-toggle-off');
                me.fireEvent('acttoggle', me, item, pressed);
            },
            scope: me
        });

        me.items = me.buildItems();

        me.callParent(arguments);
    },

    buildItems: function(){
        return [
            this.removeall,
            { xtype: 'tbfill'},
            this.togglep
        ];
    }
});

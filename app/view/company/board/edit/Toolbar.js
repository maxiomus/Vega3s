Ext.define('Vega.view.company.board.edit.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.board-edit-upload-toolbar',

    /*
     controller: "sample-edit-toolbar",
     viewModel: {
     type: "sample-edit-toolbar"
     },
     */

    //width: "100%",
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

        me.items = me.buildItems();

        me.callParent();
    },

    buildItems: function(){
        return [
            this.removeall,
            { xtype: 'tbfill'}
        ];
    }
});

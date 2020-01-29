
Ext.define('Vega.view.company.board.TopBar',{
    extend: 'Ext.toolbar.Toolbar',

    requires: [
        'Vega.view.company.board.TopBarController',
        'Vega.view.company.board.TopBarModel'
    ],

    alias: 'widget.board-topbar',

    controller: 'board-topbar',
    viewModel: {
        type: 'board-topbar'
    },

    initComponent: function(c){
        var me = this;

        me.actions = {
            add: Ext.create('Ext.Action', {
                text: "Add",
                tooltip: "Add a New Item",
                //ui: "default",
                //reference: 'new',
                iconCls: "x-fa fa-plus",
                //glyph: 'xf044@FontAwesome',
                /**
                 *
                 * @param btn Button
                 * @param e Event
                 */
                handler: function(btn, e){
                    me.fireEvent('actadd', btn, me);
                },
                scope: me
            }),

            edit: Ext.create('Ext.Action', {
                text: 'Edit',
                tooltip: 'Edit Selected Item',
                //ui: 'default',
                iconCls: 'x-fa fa-edit',
                bind: {
                    disabled: '{!grid.selection}'
                },
                handler: function(btn, e){
                    me.fireEvent('actedit', btn, me);
                },
                scope: me
            }),

            remove: Ext.create('Ext.Action', {
                text: "Remove",
                tooltip: "Remove Selected Item",
                //ui: "default",
                iconCls: "x-fa fa-remove",
                //glyph: 'xf12d@FontAwesome',
                bind: {
                    disabled: '{!grid.selection}'
                },
                handler: function(btn, e){
                    me.fireEvent('actremove', btn, me);
                },
                scope: me
            }),

            save: Ext.create('Ext.Action', {
                text: "Save",
                tooltip: "Save",
                //ui: "default",
                iconCls: "x-fa fa-save",
                //glyph: 'xf12d@FontAwesome',
                handler: function(btn, e){
                    me.fireEvent('actsave', btn, me);
                },
                scope: me
            }),

            copy: Ext.create('Ext.Action', {
                text: "Copy",
                tooltip: "Copy selected Item",
                //ui: "default",
                iconCls: "x-fa fa-copy",
                //glyph: 'xf01e@FontAwesome',
                bind: {
                    disabled: '{!grid.selection}'
                },
                handler: function(btn, e){
                    me.fireEvent('actcopy', btn, me);
                },
                scope: me
            }),

            refresh: Ext.create('Ext.Action', {
                text: "Refresh",
                tooltip: "Refresh",
                //ui: "default",
                iconCls: "x-fa fa-refresh",
                //glyph: 'xf01e@FontAwesome',
                handler: function(btn, e){
                    me.fireEvent('actrefresh', btn, me);
                },
                scope: me
            })
        },

        me.items = me.buildItems();

        me.callParent();
    },

    buildItems: function(){
        var me = this;

        return [
            me.actions.add, me.actions.refresh//, me.actions.edit, me.actions.remove, me.actions.copy,  me.actions.save
        ];
    }
});

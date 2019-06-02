
Ext.define("Vega.view.company.board.Default",{
    extend: "Ext.container.Container",

    requires: [
        "Vega.view.company.board.DefaultController",
        "Vega.view.company.board.DefaultModel",
        'Vega.view.company.board.Panel',
        'Vega.view.company.board.Grid',
        'Vega.view.company.board.View',
        'Vega.view.company.board.Window',
        'Vega.view.company.board.Add',
        'Vega.view.company.board.manage.Board',
        'Vega.view.company.board.manage.Category'
    ],

    alias: 'widget.board-default',

    config: {
        activeState: null,
        defaultActiveState: "default"
    },

    controller: "board-default",
    viewModel: {
        type: "board-default"
    },

    cls: "shadow-panel",

    margin: '0 0 0 4',

    //bodyPadding: 10,

    layout: {
        type: 'border'
    },

    session: true,

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {

            items: [{
                xtype: 'treepanel',
                region: 'west',
                title: 'Navigation',
                width: 320,
                split: true,
                reference: 'navigate-tree',
                collapsible: true,   // make collapsible
                rootVisible: true,
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        text: 'Add',
                        iconCls: 'x-fa fa-plus',
                        itemId: 'add-button',
                        handler: 'showAddForm'
                    },{
                        xtype: 'button',
                        text: 'Manage',
                        iconCls: 'x-fa fa-edit',

                        menu: {
                            items: [{
                                text: 'Board',
                                iconCls: 'x-fa fa-file-text-o',
                                handler: 'showManageBoard'

                            },{
                                text: 'Category',
                                iconCls: 'x-fa fa-reorder',
                                handler: 'showManageCategory'
                            }],
                            listeners: {
                                beforeshow: function(p){
                                    if(!Vega.user.inRole('managers')){
                                        Ext.Msg.alert('Warning', 'you do not have enough access privileges for this operation.');
                                        return false;
                                    }
                                }
                            }
                        }
                    }]
                }],

                bind: {
                    store: '{areas}',
                    selection: '{navigate-menu.selection}'
                },

                selModel: {
                    allowDeselect: false,
                    listeners: {
                        select: {
                            fn: 'onTreeSelectionChange'
                        }
                    }
                },

                columns: [{
                    xtype: 'treecolumn',
                    text: 'BLUPRINT',
                    dataIndex: 'text',
                    flex: 1
                }],

                listeners: {
                    select: {
                        fn: 'onTreeSelect'
                    },
                    itemclick: {
                        fn: 'onTreeItemClicked'
                    }
                }
            },
            {
                region: 'center',
                layout: 'card',
                reference: 'center-base',
                tbar: [{
                    xtype: 'breadcrumb',
                    reference: 'navigate-menu',
                    displayField: 'text',
                    showIcons: true,
                    //showMenuIcons: true,
                    bind: {
                        store: '{areas}',
                        selection: '{navigate-tree.selection}'
                    },
                    //buttonUI: "default-toolbar", //BUG # EXTJS-15615 - WORKAROUND @ https://www.sencha.com/forum/showthread.php?294072
                    listeners: {
                        change: 'onBreadCrumbChange'
                    }
                }]
            }]
        });

        me.callParent(arguments);
    }
});

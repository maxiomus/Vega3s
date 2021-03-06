
Ext.define("Vega.view.settings.Default",{
    extend: "Ext.panel.Panel",

    requires: [
        "Vega.view.settings.DefaultController",
        "Vega.view.settings.DefaultModel",
        'Vega.view.settings.notification.Default',
        'Vega.view.settings.company.Default',
        'Vega.view.settings.view.Default',
        'Vega.view.settings.product.Default',
        'Vega.view.settings.task.Default',
        'Vega.view.settings.vendors.Default'
    ],

    alias: 'widget.settings-default',

    config: {
        activeState: null,
        defaultActiveState: "default"
    },

    controller: "settings-default",
    viewModel: {
        type: "settings-default"
    },

    cls: "shadow-panel",
    header: false,
    margin: '0 0 0 4',

    //bodyPadding: 10,

    layout: {
        type: 'border'
    },

    initComponent: function(){
        var me = this;

        /*
        me.tbar = [{
            xtype: 'breadcrumb',
            reference: 'navigate-menu',
            overflowHandler: 'scroller',
            bind: {
                store: '{areas}'
            },
            showIcons: true,
            showMenuIcons: true,
            listeners: {
                change: 'onBreadCrumbChange'
            }
        }],
        */

        Ext.applyIf(me, {

            items: [{
                region: 'west',
                title: 'Navigate',
                width: 220,
                split: true,
                collapsible: true,   // make collapsible
                floatable: false,
                reference: 'navigate-tree',
                xtype: 'treepanel',
                bind: {
                    store: '{areas}',
                    selection: '{navigate-menu.selection}'
                }
            },
            {
                region: 'center',
                layout: 'card',
                reference: 'center-base',
                tbar: [{
                    xtype: 'breadcrumb',
                    reference: 'navigate-menu',
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
                }],

                items: [{
                    xtype: 'container',
                    reference: 'settings-base'
                }]
            }]
        });

        me.callParent(arguments);
    }
});

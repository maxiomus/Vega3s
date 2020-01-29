
Ext.define('Vega.view.company.work.Default',{
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.company.work.DefaultController',
        'Vega.view.company.work.DefaultModel',
        'Vega.view.company.work.Tasks',
        'Vega.view.company.work.Processes',
        'Vega.view.company.work.Templates'
    ],

    alias: 'widget.work-default',

    controller: 'work-default',
    viewModel: {
        type: 'work-default'
    },

    //ui: 'bootstrap-nav-pills-tabs-danger',
    cls: "shadow-panel",

    header: false,
    margin: '0 0 0 4',

    listeners: {

    },

    initComponent: function (c) {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'work-tasks',
                tabConfig: {
                    margin: '6 10 6 10'
                },
                bind: {
                    store: '{tasks}'
                }
            },{
                xtype: 'work-processes',
                tabConfig: {
                    margin: '6 10 6 10'
                },
                bind: {
                    store: '{processes}'
                }
            },{
                xtype: 'work-templates',
                tabConfig: {
                    margin: '6 10 6 10'
                },
                bind: {
                    store: '{templates}'
                }
            }]
        });

        me.callParent();
    }
});

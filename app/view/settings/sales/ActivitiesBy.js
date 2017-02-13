
Ext.define("Vega.view.settings.sales.ActivitiesBy",{
    extend: "Ext.form.Panel",

    requires: [
        "Vega.view.settings.sales.ActivitiesByController",
        "Vega.view.settings.sales.ActivitiesByModel"
    ],

    alias: 'widget.activitiesby',

    controller: "activitiesby",
    viewModel: {
        type: "activitiesby"
    },

    title: 'Activities By',

    initComponent: function(){
        var me = this;

        me.tbar = [{
            xtype: 'button',
            text: 'Add',
            width: 70,
            iconCls: 'fa fa-plus'
        },{
            xtype: 'button',
            text: 'Remove',
            iconCls: 'fa fa-remove'
        },{
            xtype: 'button',
            text: 'Refresh',
            iconCls: 'fa fa-refresh'
        }],

        Ext.applyIf(me, {

        });

        me.callParent();
    }
});

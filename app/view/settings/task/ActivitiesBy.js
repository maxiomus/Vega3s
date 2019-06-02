
Ext.define("Vega.view.settings.task.ActivitiesBy",{
    extend: "Ext.form.Panel",

    requires: [
        "Vega.view.settings.task.ActivitiesByController",
        "Vega.view.settings.task.ActivitiesByModel"
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
            iconCls: 'x-fa fa-plus'
        },{
            xtype: 'button',
            text: 'Remove',
            iconCls: 'x-fa fa-remove'
        },{
            xtype: 'button',
            text: 'Refresh',
            iconCls: 'x-fa fa-refresh'
        }],

        Ext.applyIf(me, {

        });

        me.callParent();
    }
});

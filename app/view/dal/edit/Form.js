
Ext.define("Vega.view.dal.edit.Form",{
    extend: "Ext.panel.Panel",

    requires: [
        "Vega.view.dal.edit.FormController",
        "Vega.view.dal.edit.FormModel"
    ],

    alias: 'widget.dal-edit-form',

    controller: "dal-edit-form",
    viewModel: {
        type: "dal-edit-form"
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {

        });

        me.callParent(arguments);
    }
});

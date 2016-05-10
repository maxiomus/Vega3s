Ext.define('Vega.view.sales.edit.FormController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Vega.model.sales.Powh',
        'Vega.model.sales.Powd'
    ],

    alias: 'controller.sales-edit-form',

    init: function(){

        //this.getViewModel().set('powds', this.getViewModel().getLinks().header.powds);
    },

    onMerchandExpand: function(panel){

        this.setBtnVisible(panel);
    },

    onMerchandCollapse: function(panel){
        this.setBtnVisible(panel);

    },

    onAttachExpand: function(panel){

        this.setBtnVisible(panel);
    },

    onAttachCollapse: function(panel){
        this.setBtnVisible(panel)
    },

    setBtnVisible: function(panel){
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            btn = refs.add;

        if(panel.reference == 'attachments'){
            btn = refs.attach;
        }

        btn.setHidden(panel.collapsed);
    },

    onToogleAttach: function(btn, pressed){

        var me = this,
            view = me.getView(),
            refs = me.getReferences();

        if(refs.attachments){
            var panel = refs.attachments;

            panel.setVisible(pressed);
            if(!pressed){
                panel = refs.information;
                button = refs.attach;
                //button.getEl().setCls('delete-focus-bg');
                button.setHidden(!pressed);
            }
            btn.setIconCls(pressed ? 'fa fa-toggle-on' : 'fa fa-toggle-off');

            var header = panel.getDockedItems('header[dock="left"]')[0];
            header.fireEvent('click', header);
        }
    },

    onAddStyle: function(btn ,e){
        var me = this,
            view = me.getView(),
            refs = me.getReferences();


        if(refs.merchandise){
            var panel = refs.merchandise;

            panel.add({
                xtype: 'edit-lineitem'
            });

            panel.updateLayout();
        }
    },

    onCopyStyle: function(btn, e){
        var me = this,
            view = me.getView(),
            refs = me.getReferences();

        if(refs.merchandise){

        }
    },

    onSave: function(btn, e){
        var me = this,
            view = me.getView(),
            vm  = me.getViewModel(),
            refs = me.getReferences();

        if(refs.merchandise){
            var panel = refs.merchandise,
                lineItems = panel.items.items;
        }

        for(var i = 0; i < lineItems.length; i++){
            console.log(lineItems[i].getForm());
        }

        console.log(view.getForm().getValues())
    }
    
});

/**
 * Created by tech on 5/6/2019.
 */
Ext.define('Ext.ux.calendar.form.Edit', {
    extend: 'Ext.ux.calendar.form.Form',

    alias: 'widget.ux-calendar-form-edit',

    /**
     * @cfg {String} title
     * The title for the dialog.
     */
    title: 'Edit Event',

    config: {
        user: undefined
    },

    applyUser: function(newValue, oldValue){
        //return newValue;
        var me = this,
            writer = this.getEvent().get('userName');

        /*
        var dropBtnConfig = {
            text: 'Delete',
            handler: 'onDropTap'
        };

        var saveBtnConfig = {
            text: 'Save',
            handler: 'onSaveTap'
        };
        */

        if(newValue.name != writer){
            me.getDropButton().hidden = true;
            me.getSaveButton().hidden = true;
        }

        if(!newValue.isManager){
            var hideDesc = me.getHideDescField();
            hideDesc.disabled = true;
        }

        //me.setDropButton(dropBtnConfig);
        //me.setSaveButton(saveBtnConfig);
    }
});
/**
 * Created by tech on 5/8/2019.
 */
Ext.define('Ext.ux.calendar.form.Add', {
    extend: 'Ext.ux.calendar.form.Form',

    alias: 'widget.ux-calendar-form-add',

    dropButton: null,

    /**
     * @cfg {String} title
     * The title for the dialog.
     */
    title: 'Add Event',

    config: {
        user: undefined
    },

    applyUser: function(newValue, oldValue){
        //return newValue;
        var me = this,
            writer = me.getEvent().get('userName');

        if(!newValue.isManager){
            var hideDesc = me.getHideDescField();
            hideDesc.disabled = true;
        }
    }
});
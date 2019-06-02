Ext.define('Ext.ux.form.field.Month', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.monthfield',

    requires: ['Ext.picker.Month'],

    alternateClassName: ['Ext.form.MonthField', 'Ext.form.Month'],

    createPicker: function() {
        var me = this,
            format = Ext.String.format;

        return Ext.create('Ext.picker.Month', {
            pickerField: me,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            //showToday: me.showToday,
            showButtons: me.showButtons,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                scope: me,
                select: me.onSelect,
                //monthclick: me.onSelect,
                //yearclick: me.onSelect,
                okclick: me.onSelect,
                cancelclick: me.onCancelClick
            },
            keyNavConfig: {
                esc: function() {
                    me.inputEl.focus();
                    me.collapse();
                }
            }
        });
    },

    onCancelClick: function() {
        var me = this;
        //me.selectMonth = null;
        me.inputEl.focus();
        me.collapse();
    },

    onSelect: function(m, d) {
        var me = this;
        if (me.picker.hasSelection()) {
            me.setValue(new Date((d[0] + 1) + '/1/' + d[1]));
        }
        me.collapse();
    }
});
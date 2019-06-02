Ext.define('Ext.overrides.form.field.Field', {
    override: 'Ext.form.field.Field',

    config: {
        requiredMessage: 'This field is required',

        labelTextAlign: 'right',

        errorTip: {
            anchor: true,
            align: 'l-r?',
            ui: 'tooltip invalid'
        }
    }
});

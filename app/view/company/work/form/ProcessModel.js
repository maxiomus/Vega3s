Ext.define('Vega.view.company.work.form.ProcessModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.work-form-process',

    data: {
        deadline: 0
    },

    formulas: {
        calculated: function(get){
            var length = get('length'),
                startDate = get('startOn'),
                dueDate = new Date(startDate.setDate(startDate.getDate() + length));

            switch (get('unit')) {
                case 'Weeks':
                    dueDate = new Date(startDate.setDate(startDate.getDate() + (length * 7)));
                    break;
                case 'Months':
                    dueDate = new Date(startDate.setMonth(startDate.getMonth() + length));
                    break;
            }
        }
    }
});

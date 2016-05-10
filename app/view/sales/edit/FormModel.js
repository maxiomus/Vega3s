Ext.define('Vega.view.sales.edit.FormModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.sales.Powh',
        'Vega.model.sales.Powd',
        'Vega.model.sales.Powm'
    ],

    alias: 'viewmodel.sales-edit-form',

    data: {
        powh: null,
        powd: null,
        powm: null
    },

    links: {
        header: {
            type: 'sales.Powh',
            create: true
        }
    },

    formulas: {
        // used to enable/disalbe form buttons
        dirty: {
            bind: {
                bindTo: '{powd}',
                deep: true
            },
            get: function(data){
                return data ? data.dirty: false;
            }
        },

        preticketValue: {
            bind: '{header.preticket}',
            get: function(value) {
                return {
                    preticket: value
                };
            },
            set: function(value) {
                this.set('header.preticket', value.preticket);
            }
        },

        ediValue: {
            bind: '{header.edi}',
            get: function(value) {
                return {
                    edi: value
                };
            },
            set: function(value) {
                this.set('header.edi', value.edi);
            }
        },

        salesValue: {
            bind: '{header.sales}',
            get: function(value) {

                var va = value.split(',').map(function(item) {
                    return parseInt(item, 10);
                });
                return {
                    sales: va
                };
            },
            set: function(value){
                this.set('header.sales', value.sales.toString());
            }
        },

        contactValue: {
            bind: '{header.salescontact}',
            get: function(value) {

                var va = value.split(',').map(function(item) {
                    return parseInt(item, 10);
                });
                return {
                    salescontact: va
                };
            },
            set: function(value){
                this.set('header.salescontact', value.salescontact.toString());
            }
        },

        submissionValue: {
            bind: '{header.submissions}',
            get: function(value) {

                var va = value.split(',').map(function(item) {
                    return parseInt(item, 10);
                });
                return {
                    submissions: va
                };
            },
            set: function(value){
                this.set('header.submissions', value.submissions.toString());
            }
        }
    }
});

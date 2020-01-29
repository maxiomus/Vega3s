Ext.define('Vega.view.company.work.TemplatesModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.work-templates',

    requires: [
        'Vega.model.company.work.Process',
        'Vega.model.company.work.Detail'
    ],

    stores: {
        templates: {
            model: 'company.work.Process',
            remoteFilter: true,
            //autoLoad: true,
            session: true,
            listeners: {
                beforeload: function(store, options, e) {
                    console.log('Template store before load', store, options);
                }
            }
        },

        details: {
            model: 'company.work.Detail',
            remoteFilter: true,
            //autoLoad: true,
            session: true,
            listeners: {
                beforeload: function(store, options, e) {
                    //console.log('Board store Load', store, options);
                }
            }
        }
    }

});

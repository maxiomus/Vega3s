Ext.define("Vega.view.sales.PowModel", {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.Pow',
        'Ext.data.proxy.Rest',
        'Ext.data.proxy.LocalStorage'
    ],

    alias: "viewmodel.pow",

    data: {
        selectedPows: null
    },

    stores: {
        views: {
            fields: ["id", "pid", "status"],
            proxy: {
                type: "localstorage",
                id: "pow-views"
            }
        },

        pows: {
            model: "Pow",
            storeId: "pows",
            //remoteFilter: true,
            remoteSort: true,
            autoLoad: false,
            pageSize: 99,
            proxy: {
                type: "rest",
                url: "/api/Pows/",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            },

            listeners: {
                beforeload: function(s){
                    s.setRemoteFilter(true);
                }
                //load: "onLoad"
            },

            isDirty:function(){
                var b = this.getModifiedRecords().length;
                b = b || this.getNewRecords().length;
                b = b || this.getRemovedRecords().length;
                return !!b;
            }
        }

        /*
        sales: {
            fields: ['id', 'label'],
            storeId: 'sales',
            proxy: {
                type: 'ajax',
                url: 'data/sales.json'
            },
            autoLoad: true
        },

        submissions: {
            fields: ['id', 'label'],
            storeId: 'submissions',
            proxy: {
                type: 'ajax',
                url: 'data/submissions.json'
            },
            autoLoad: true
        },

        powsChained: {
            source: "{pows}"
        }
        */
    }
});

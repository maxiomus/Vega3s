
Ext.define('Vega.view.production.ScheduleModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.Schedule',
        'Ext.data.BufferedStore',
        'Ext.data.proxy.Rest',
        'Ext.data.proxy.LocalStorage'
    ],

    alias: 'viewmodel.prod-schedule',

    stores: {
        schedules: {
            model: "Schedule",
            //type: 'buffered',
            storeId: "schedules",
            autoLoad: false,

            //leadingBufferZone: 600,
            remoteFilter: true,
            remoteSort: true,

            pageSize: 999999,

            proxy: {
                type: "rest",
                url: "/api/Cuts/",
                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total"
                },
                listeners: {

                }},

            listeners: {
                //beforeload: "onBeforeLoad",
                //load: "onLoad"
            },

            isDirty: function(){
                var b = this.getModifiedRecords().length;
                b = b || this.getNewRecords().length;
                b = b || this.getRemovedRecords().length;
                return !!b;
            }
        },

        category: {
            fields: ["label", "field"],
            data: [{
                label: "P.O.W #",
                field: "POW"
            },
            {
                label: "Customer",
                field: "CUSTOMER"
            },
            {
                label: "CXL",
                field: "CXL"
            },
            {
                label: "PAT",
                field: "PAT"
            },
            {
                label: "NR",
                field: "NR"
            },
            {
                label: "Fabrics",
                field: "FABRICS"
            },
            {
                label: "Style #",
                field: "STYLE"
            },
            {
                label: "Cut #",
                field: "CUTNO"
            },
            {
                label: "Prints",
                field: "PRINTCODE"
            }],
            listeners: {

            }
        }
    }

});

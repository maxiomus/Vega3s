Ext.define("Vega.view.dal.DalModel", {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.Media',
        'Ext.data.proxy.Rest'
    ],

    alias: "viewmodel.dal",

    data: {
        selectedImage: null
    },

    filters: {
        all: ["Body", "Photos", "Prints"],
        body: ["Body"],
        photos: ["Photos"],
        prints: ["Prints"]
    },

    stores: {
        types: {
            fields: ["id", "text"],
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "/api/Options/types",
                reader: {
                    type: "json",
                    rootProperty: 'data',
                    totalProperty: 'total',
                    successProperty: 'success'
                }
            },

            listeners: {
                refresh: "onTypesRefresh"
            }
        },

        dals: {
            model: "Media",
            storeId: "dals",
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            listeners: {
                load: function(store){

                }
            },

            isDirty: function(){
                var b=this.getModifiedRecords().length;
                b=b||this.getNewRecords().length;
                b=b||this.getRemovedRecords().length;
                return !!b
            }
        },

        category: {
            fields: ["label", "field"],
            data: [{
                label: "P.D.M #",
                field: "F_OWNER"
            },
            {
                label: "Style #",
                field: "F_NAME"
            },
            {
                label: "Desc",
                field: "F_DESC1"
            },
            {
                label: "Type",
                field: "F_DESC2"
            },
            {
                label: "Color",
                field: "F_DESC3"
            },
            {
                label: "Vendor",
                field: "F_DESC4"
            },
            {
                label: "Body #",
                field: "F_DESC5"
            },
            {
                label: "Print #",
                field: "F_DESC6"
            },
            {
                label: "Account",
                field: "F_DESC8"
            },
            {
                label: "Theme",
                field: "F_DESC9"
            }],
            listeners: {load: "onCategoryLoad"}
        },
        dalsChained: {
            source: "{dals}"
        }
    }
});


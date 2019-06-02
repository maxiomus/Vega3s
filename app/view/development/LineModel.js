Ext.define('Vega.view.development.LineModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.line',

    requires: [
        'Vega.model.sample.Linesheet'
    ],

    data: {
        cDate: new Date()
    },

    formulas: {
        selectedValue: {
            get: function(get) {
                /*
                var year = value[1],
                    month = value[0]+ 1,
                    month = (month < 10 ? '0' : '')+month;
                */
                var d = get('cDate'),
                    m = d.toLocaleString("en-us",{ month: "short" });
                return m+', '+ d.getFullYear();

            }
        }
    },

    stores: {
        years: {
            fields: ['year'],
            sorters: [{
                property: 'year',
                direction: 'DESC'
            }],

            data: (function(){
                var data = [],
                    date = new Date(),
                    thisYear = date.getFullYear();

                for(var i = 2000; i <= thisYear+1; i++){
                    data.push({
                        year: i
                    });
                }
                return data;
            })()
        },
        /*
        months: {
            type: 'tree',

            root: {
                expanded: true,
                children: (function(){
                    var month = ["January","February","March","April","May","June","July","August","September","October","November","December"],
                    children = [];

                    for(var i = 0; i < 12; i++){
                        children.push({
                            text: month[i], leaf: true
                        })
                    }

                    return children;

                })()
            },
            listeners: {

            }
        },
        */
        markets: {
            fields: ['id', 'month', 'year'],

            data: (function(){
                var data = [],
                    names = ["January","February","March","April","May","June","July","August","September","October","November","December"];

                for (var i = 0; i < 12; i++){
                    data.push({
                        id: (i < 9 ? '0' : '') + (i + 1),
                        month: names[i]
                    });
                }
                return data;
            })(),
            listeners: {

            }
        },

        lines: {
            model: 'sample.Sample',

            //storeId: 'samples',
            autoLoad: false,

            //session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/api/Samples/',
                //url: '../Services/Samples.ashx',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            }
        },

        linesheets: {
            model: 'sample.Linesheet',
            //storeId: 'reviews',
            //session: true,
            pageSize: 0,
            autoLoad: true,
            autoSync: true,
            remoteFilter: true,
            //remoteSort: true,
            groupField: 'season',
            sorters: [{
                property: 'season',
                direction: 'ASC'
            },{
                property: 'userTime',
                direction: 'DESC'
            }]
            //pageSize: 100,
            /*
             filters: [{
             property: 'progress',
             value: 'review',
             type: 'string'
             }]
             */
        },

        categories: {
            fields: ['label', 'field'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/development/sample/categories.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        vendors: {
            fields: ["id", "text"],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/vendors",

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
        },

        groups: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/groups",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        subcategories: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/subcategories",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        }
    }

});

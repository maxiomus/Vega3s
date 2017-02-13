Ext.define('Vega.model.Powm', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'powmId'},
        { name: 'revision', type: 'int'},
        { name: 'matcategory', type: 'string'},
        { name: 'mattype', type: 'string'},
        { name: 'matcode', type: 'string', allowNull: true },
        { name: 'matcolor', type: 'string', allowNull: true },
        { name: 'matdesc', type: 'string', allowNull: true },
        { name: 'matvendor', type: 'string', allowNull: true },
        { name: 'matcost', type: 'float', allowNull: true },
        { name: 'lineseq', type: 'int'},
        { name: 'descript', type: 'string', persist: false,
            calculate: function(data){
                //var data = rec.getData();
                var stRight = (data.matcode && data.matcolor) ? data.matcode + ' ' + data.matcolor : data.matcode || data.matcolor,
                    stLeft = data.matdesc;

                if (data.mattype === 'STONE'){
                    stLeft = data.matvendor;
                    stRight = (data.matcost && data.matdesc) ? data.matcost + ' ' + data.matdesc : data.matcost || data.matdesc;
                }

                return Ext.String.format('{0} {1}', stLeft, stRight);
            }
        },
        {
            name: 'powdId',
            //If the association isn't given data,
            // it will attempt to retrieve the data.
            // Only way to stop it currently is to override the association or give it dummy data.
            reference: {
                parent: 'Powd',
                //type: 'sales.Powd',
                //association: 'MaterialsByStyle',
                role: 'powd',
                inverse: 'powms'
            }
        }
    ],

    idProperty: 'powmId',
    identifier: 'negative',

    autoLoad: false,

    proxy: {
        //$configStrict: false,
        type: 'rest',
        url: '/api/Powm/',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        //extraParams: {},
        /*
        encodeFilters: function(filters) {
            var out = [],
                length = filters.length,
                i = 0;

            for (; i < length; i++) {
                out[i] = {
                    property: filters[i].property,
                    value   : filters[i].value,
                    operator   : filters[i].operator, // added
                    type   : filters[i].type // added
                };
            }
            return this.applyEncoding(out);
        },
        */
        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});
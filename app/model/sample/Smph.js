/**
 * Created by tech on 9/23/2015.
 */

Ext.define('Vega.model.sample.Smph', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'ID', type: 'int'},
        { name: 'FID', type: 'int'},
        { name: 'F_NAME', type: 'string', allowNull: true},
        { name: 'F_TYPE', type: 'string', allowNull: true},
        { name: 'F_SIZE', type: 'string', allowNull: true},
        { name: 'F_STYLE', type: 'string', allowNull: true},
        { name: 'F_CATEGORY', type: 'string'},
        { name: 'F_LOCATION', type: 'string', allowNull: true },
        { name: 'F_APPLICATION', type: 'string', allowNull: true },
        { name: 'F_LINK', type: 'string', allowNull: true },
        { name: 'F_EXT', type: 'string', allowNull: true },
        { name: 'F_STATUS', type: 'boolean'},
        { name: 'F_BFLAG', type: 'boolean'},
        { name: 'F_MFLAG', type: 'string', allowNull: true },
        { name: 'F_DESC1', type: 'string', allowNull: true },
        { name: 'F_DESC2', type: 'string', allowNull: true },
        { name: 'F_DESC3', type: 'string', allowNull: true },
        { name: 'F_DESC4', type: 'string', allowNull: true },
        { name: 'F_DESC5', type: 'string', allowNull: true },
        { name: 'F_DESC6', type: 'string', allowNull: true },
        { name: 'F_DESC7', type: 'string', allowNull: true },
        { name: 'F_DESC8', type: 'string', allowNull: true },
        { name: 'F_DESC9', type: 'string', allowNull: true },
        { name: 'F_DESC10', type: 'string', allowNull: true },
        { name: 'F_OWNER', type: 'string', allowNull: true },
        { name: 'F_USERID', type: 'string' },
        { name: 'F_MOD_USER_ID', type: 'string', allowNull: true },
        { name: 'F_CREATED_ON', type: 'date', dateFormat: 'c'},
        { name: 'F_UPDATED_ON', type: 'date', dateFormat: 'c'},
        { name: 'RORDER', type: 'int'},
        { name: 'F_PATH', type: 'string', persist: false,
            calculate: function(d){
                var b;
                if(d.F_CREATED_ON != null){
                    b = d.F_CREATED_ON.getFullYear() + '/' + (d.F_CREATED_ON.getMonth() + 1) + '/' + d.F_CREATED_ON.getDate();
                }

                return b;
            }
        },
        {
            name: 'productId',
            reference: {
                parent: 'sample.Product',
                //type: 'Product',
                //association: 'bomsByProduct',
                //role: 'product',
                field: 'id',
                inverse: 'smphs'
            }
        }
    ],

    idProperty: 'ID',
    identifier: 'negative',

    proxy: {
        type: "rest",
        batchActions: true, // default false when rest proxy.
        url: "/api/Photos",
        //true to have any request parameters sent as jsonData where they can be parsed from the raw request
        //paramsAsJson: true,

        reader: {
            type: "json",
            rootProperty: "data"
        },

        writer: {
            type: 'json',

            transform: function(data, request){
                if(request.getAction() == 'destroy'){
                    var newData = [];
                    Ext.each(request.getRecords(), function(rec, idx){
                        newData.push(rec.data);
                    });
                    data = newData;
                }

                //console.log(data, request)
                return data;
            },

            //clientIdProperty: 'clientId',
            //writeAllFields: true,

            allowSingle: false // set false to send a single record in array
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});

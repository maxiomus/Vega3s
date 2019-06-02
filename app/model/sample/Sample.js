/**
 * Created by tech on 10/6/2014.
 */

Ext.define('Vega.model.sample.Sample', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'id', type: 'int'},
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'descript', type: 'string'},
        { name: 'status', type: 'string'},
        { name: 'division', type: 'string'},
        { name: 'season', type: 'string'},
        { name: 'category', type: 'string'},
        { name: 'fabricType', type: 'string'},
        { name: 'grp', type: 'string'},
        { name: 'subcategory', type: 'string'},
        { name: 'processtype', type: 'string'},
        { name: 'fabcontent', type: 'string'},
        { name: 'userName', type: 'string'},
        { name: 'userTime', type: 'date', dateFormat: 'c'},
        { name: 'updateUser', type: 'string'},
        { name: 'updateTime', type: 'date', dateFormat: 'c'},
        //{ name: 'leadTime', type: 'string'},
        { name: 'sizeCat', type: 'string'},
        { name: 'memo', type: 'string'},
        { name: 'impCat', type: 'string'},
        { name: 'designer', type: 'string'},
        { name: 'user1', type: 'string'},
        { name: 'user2', type: 'string'},
        { name: 'user3', type: 'string'},
        { name: 'user4', type: 'string'},
        { name: 'cost', type: 'float'},
        { name: 'confirmCost' },
        { name: 'defaultBomCost', type: 'float'},
        { name: 'bomCost1', type: 'float'},
        { name: 'bomCost2', type: 'float'},
        { name: 'bomCost3', type: 'float'},
        { name: 'bomCost4', type: 'float'},
        { name: 'bomCost5', type: 'float'},
        { name: 'avgCost', type: 'float'},
        { name: 'fabrics', type: 'string'},
        { name: 'prints', type: 'string'},
        { name: 'photos', type: 'string', persist: false},
        { name: 'name', type: 'string', mapping: 'mp.name', persist: false},
        { name: 'userId', type: 'string', mapping: 'userName', persist: false},
        { name: 'printVendor', type: 'string',
            convert: function(v, record) {

                var tmp = record.data.prints,
                    vendors = tmp.split("(#)");
                //console.log(tmp, vendors);
                return vendors[2];
            }
        },
        { name: 'stone', type: 'string'}
    ]
});

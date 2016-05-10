/**
 * Created by tech on 8/5/2014.
 */


Ext.define('Vega.model.fabric.RollInfo', {
    extend: 'Vega.model.Base',

    //identifier: 'sequential', 1, 2, 3...
    identifier: 'negative', // -1, -2, -3...
    clientIdProperty: 'clientId',

    fields: [
        //{ name: 'styleColor', convert: grpStyleColor},
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'lotno', type: 'string'},
        { name: 'rollno', type: 'string'},
        { name: 'logdate',
            convert: function(value, record){
                if (value != null) {
                    var d = new Date(value);

                    function pad(n){return n<10 ? '0'+n : n}

                    return pad(d.getUTCMonth()+1)+'-'
                        + pad(d.getUTCDate())+'-'
                        + d.getUTCFullYear()
                }
            }
        },
        { name: 'unit1', type: 'float'},
        { name: 'unit2', type: 'float'},
        { name: 'unit3', type: 'float'},
        { name: 'unit4', type: 'float'},
        { name: 'unit5', type: 'float'},
        { name: 'unit6', type: 'float'},
        { name: 'unit7', type: 'float'},
        { name: 'unit8', type: 'float'},
        { name: 'unit9', type: 'float'},
        { name: 'unit10', type: 'float'},
        { name: 'unit11', type: 'float'},
        { name: 'unit12', type: 'float'},
        { name: 'unit13', type: 'float'},
        { name: 'unit14', type: 'float'},
        { name: 'unit15', type: 'float'},
        { name: 'totalunit', type: 'float'},
        { name: 'warehouse', type: 'string'},
        { name: 'memo', type: 'string'},
        { name: 'actual_yn', type: 'string'},
        { name: 'cuttable', type: 'int'},
        { name: 'prelimL', type: 'string'},
        { name: 'prelimL_per', type: 'float'},
        { name: 'prelimW', type: 'string'},
        { name: 'prelimW_per', type: 'float'},
        { name: 'shrinkL', type: 'string'},
        { name: 'shrinkW', type: 'string'},
        { name: 'washname', type: 'string'},
        { name: 'barcode', type: 'string'},
        { name: 'markno', type: 'string'}
    ]//,

    //belongsTo: 'fabric.RollReceived'
});

function grpStyleColor(v, record) {
    return record.data.style + ',' + record.data.color;
};

/**
 * Created by tech on 8/5/2014.
 */


Ext.define('Vega.model.fabric.RollInfo', {
    extend: 'Vega.model.Base',

    fields: [
        //{ name: 'styleColor', convert: grpStyleColor},
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'lotno', type: 'string'},
        { name: 'rollno', type: 'string'},
        { name: 'logdate', type: 'date', dateFormat: 'c'
            /*
            convert: function(value, record){
                if (value != null) {
                    var d = new Date(value);

                    function pad(n){return n<10 ? '0'+n : n}

                    return pad(d.getUTCMonth()+1)+'-'
                        + pad(d.getUTCDate())+'-'
                        + d.getUTCFullYear()
                }
            }
            */
        },
        { name: 'unit1', type: 'number'},
        { name: 'unit2', type: 'number'},
        { name: 'unit3', type: 'number'},
        { name: 'unit4', type: 'number'},
        { name: 'unit5', type: 'number'},
        { name: 'unit6', type: 'number'},
        { name: 'unit7', type: 'number'},
        { name: 'unit8', type: 'number'},
        { name: 'unit9', type: 'number'},
        { name: 'unit10', type: 'number'},
        { name: 'unit11', type: 'number'},
        { name: 'unit12', type: 'number'},
        { name: 'unit13', type: 'number'},
        { name: 'unit14', type: 'number'},
        { name: 'unit15', type: 'number'},
        { name: 'totalunit', type: 'number'},
        { name: 'warehouse', type: 'string'},
        { name: 'memo', type: 'string'},
        { name: 'actual_yn', type: 'string'},
        { name: 'cuttable', type: 'int'},
        { name: 'prelimL', type: 'string'},
        { name: 'prelimL_per', type: 'number'},
        { name: 'prelimW', type: 'string'},
        { name: 'prelimW_per', type: 'number'},
        { name: 'shrinkL', type: 'string'},
        { name: 'shrinkW', type: 'string'},
        { name: 'washname', type: 'string'},
        { name: 'barcode', type: 'string'},
        { name: 'markno', type: 'string'}
    ],

    //belongsTo: 'fabric.RollReceived'
    //identifier: 'sequential', 1, 2, 3...
    identifier: 'negative', // -1, -2, -3...
    clientIdProperty: 'clientId'
});

function grpStyleColor(v, record) {
    return record.data.style + ',' + record.data.color;
}

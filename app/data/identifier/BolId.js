Ext.define('Vega.data.identifier.BolId', {
    extend: 'Ext.data.identifier.Sequential',

    alias: 'data.identifier.bolId',

    config: {
        style: 'st', // some config property w/default value
        color: 'co',
        bomno: 1,
        line: 1,
        ordno: 10,
        midfix: '-'
    },

    generate: function () {
        var me = this,
            style = me._style,
            color = me._color,
            bomno = me._bomno,
            line = me._line,
            ordno = me._ordno,
            midfix = me._midfix;

        return style + midfix + color + midfix + bomno + midfix + line + midfix + ordno;
    },

    getData: function(data){
        return data;
    }
});
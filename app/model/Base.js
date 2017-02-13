Ext.define('Vega.model.Base', {
    extend: 'Ext.data.Model',

    schema: {
        namespace: 'Vega.model'
    }
});

function tr(value, record){
    if(!Ext.isEmpty(value)){
        return Ext.String.trim(value);
    }
    return value;
};

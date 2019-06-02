Ext.define('Vega.model.sample.Bomh', {
    extend: 'Vega.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        {
            name: 'id'
            /*
            calculate: function(data){
                return data.style.trim() + '-' + data.color.trim() + '-' + data.bomno;
            }
            */
        },
        //{ name: 'ID', type: 'int', allowNull: true },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'bomno', type: 'int' },
        { name: 'styleCompTotal', type: 'number' },
        { name: 'colorCompTotal', type: 'number' },
        { name: 'markers', type: 'number' },
        { name: 'grading', type: 'number' },
        { name: 'freight', type: 'number' },
        { name: 'insurance', type: 'number' },
        { name: 'warehouse', type: 'number' },
        { name: 'finishing', type: 'number' },
        { name: 'misc', type: 'number' },
        { name: 'quota', type: 'number' },
        { name: 'plainOverHead', type: 'number' },
        { name: 'markup', type: 'number', allowNull: true },
        { name: 'sales', type: 'number', allowNull: true },
        { name: 'chgBack', type: 'number', allowNull: true },
        { name: 'overHead', type: 'number', allowNull: true },
        { name: 'target', type: 'number' },
        { name: 'selling', type: 'number' },
        { name: 'total', type: 'number' },
        { name: 'setDefault', allowNull: true },
        { name: 'duty', type: 'number', allowNull: true },
        { name: 'createUser', type: 'string', convert: tr },
        { name: 'createTime', type: 'date', dateFormat: 'c' },
        { name: 'updateUser', type: 'string', allowNull: true, convert: tr },
        { name: 'updateTime', type: 'date', dateFormat: 'c' },
        { name: 'processType', type: 'string', convert: tr },
        { name: 'EffStartDate', type: 'date', defaultValue: '2000-01-01 00:00:00', dateFormat: 'c' },
        { name: 'EffEndDate', type: 'date', defaultValue: '2099-12-31 12:59:59', dateFormat: 'c' },
        { name: 'processtotal', type: 'number' },
        { name: 'bommemo', type: 'string', allowNull: true, convert: tr },
        { name: 'confirm_yn', type: 'string', allowNull: true,
            convert: function(value){
                return value ? 'Y' : null;
            }
        },
        { name: 'assoctotal', type: 'number' },
        { name: 'associate_type', type: 'string', allowNull: true, convert: tr },
        { name: 'userId', type: 'string', mapping: 'createUser', persist: false},
        { name: 'subTotal', type: 'number',
            calculate: function(data){
                // The maximum number of decimals is 17, but floating point arithmetic is not always 100% accurate
                // To solve the problme, it helps to multiply and divide
                return (data.colorCompTotal * 100 + data.processtotal * 100) / 100;
            },
            persist: false
        },
        {
            name: 'productId',
            reference: {
                parent: 'sample.Product',
                //type: 'Product',
                //association: 'bomsByProduct',
                //role: 'product',
                field: 'id',
                inverse: 'bomhs'
            }
        }
    ],

    //idProperty: 'bomhId',
    //identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence',
        bomno: 'presence'
    },

    proxy: {
        type: 'rest',
        url: '/api/Bomh',

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

        extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('BomH - Model', response, operation);
            }
        }
    },

    onLoad: function(){
        /*
         var me = this;
         Ext.each(this.get('Boms'), function(rec, idx, self){
         me.boms().add(rec);
         });
         */
        //console.log('onLoad', this.boms())
        //this.boms().setGroupField('rawMatType');
    }
});

function tr(value, record){
    if(!Ext.isEmpty(value)){
        return Ext.String.trim(value);
    }
    return value;
}

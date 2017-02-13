Ext.define('Vega.model.Product', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'id', type: 'int'},
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'status', type: 'string', convert: tr},
        { name: 'location', type: 'string', convert: tr},
        { name: 'cost', type: 'number'},
        { name: 'availableDate', type: 'date', dateFormat: 'c'},
        { name: 'price1', type: 'number'},
        { name: 'price2', type: 'number'},
        { name: 'price3', type: 'number'},
        { name: 'price4', type: 'number'},
        { name: 'price5', type: 'number'},
        { name: 'userName', type: 'string', convert: tr},
        { name: 'userTime', type: 'date', dateFormat: 'c'},
        { name: 'season', type: 'string', allowBlank: false, convert: tr},
        { name: 'oh1', type: 'number'},
        { name: 'oh2', type: 'number'},
        { name: 'oh3', type: 'number'},
        { name: 'oh4', type: 'number'},
        { name: 'oh5', type: 'number'},
        { name: 'oh6', type: 'number'},
        { name: 'oh7', type: 'number'},
        { name: 'oh8', type: 'number'},
        { name: 'oh9', type: 'number'},
        { name: 'oh10', type: 'number'},
        { name: 'oh11', type: 'number'},
        { name: 'oh12', type: 'number'},
        { name: 'oh13', type: 'number'},
        { name: 'oh14', type: 'number'},
        { name: 'oh15', type: 'number'},
        { name: 'ohs', type: 'number'},
        { name: 'division', type: 'string', allowBlank: false, convert: tr},
        { name: 'grp', type: 'string', convert: tr},
        { name: 'lot', type: 'string', convert: tr},
        { name: 'leadTime', type: 'int'},
        { name: 'shrinkWidth', type: 'number'},
        { name: 'shrinkHeight', type: 'number'},
        { name: 'cost1', type: 'number'},
        { name: 'cost2', type: 'number'},
        { name: 'cost3', type: 'number'},
        { name: 'avgCost', type: 'number'},
        { name: 'stdCost', type: 'number'},
        { name: 'vendorColor1', type: 'string', convert: tr},
        { name: 'vendorColor2', type: 'string', convert: tr},
        { name: 'vendorColor3', type: 'string', convert: tr},
        { name: 'category', type: 'string', convert: tr},
        { name: 'width', type: 'number'},
        { name: 'actualWidth', type: 'number'},
        { name: 'rawMatType', type: 'string', convert: tr},
        { name: 'active', type: 'string', convert: tr},
        { name: 'fabcontent', type: 'string', allowBlank: false, convert: tr},
        { name: 'required', type: 'number'},
        { name: 'subdivision', type: 'string', convert: tr},
        { name: 'type', type: 'string', convert: tr},
        { name: 'processtype', type: 'string', convert: tr},
        { name: 'uom', type: 'string', convert: tr},
        { name: 'sizeCat', type: 'string', convert: tr},
        { name: 'descript', type: 'string', convert: tr},
        { name: 'weight', type: 'number'},
        { name: 'vendor1', type: 'string', allowNull: true, convert: tr},
        { name: 'vendor2', type: 'string', allowNull: true, convert: tr},
        { name: 'vendor3', type: 'string', allowNull: true, convert: tr},
        { name: 'uom1', type: 'string', allowNull: true, convert: tr},
        { name: 'uom2', type: 'string', allowNull: true, convert: tr},
        { name: 'uom3', type: 'string', allowNull: true, convert: tr},
        { name: 'subcategory', type: 'string', convert: tr},
        { name: 'UpdateUser', type: 'string', convert: tr},
        { name: 'UpdateTime', type: 'date', dateFormat: 'c'},
        { name: 'impCat', type: 'string', convert: tr},
        { name: 'memo', type: 'string', convert: tr},
        { name: 'ldp', type: 'number'},
        { name: 'customer', type: 'string', convert: tr},
        { name: 'fabricType', type: 'string', allowBlank: false, convert: tr},
        { name: 'reserve', type: 'number'},
        { name: 'reOrderLevel', type: 'number'},
        { name: 'lstCost', type: 'number'},
        { name: 'currency1', type: 'string', convert: tr},
        { name: 'currency2', type: 'string', convert: tr},
        { name: 'currency3', type: 'string', convert: tr},
        { name: 'noneInventory', type: 'string'},
        { name: 'sgtRetailPrice', type: 'number'},
        { name: 'originalProjection', type: 'int', defaultValue: 0 },
        { name: 'defaultBomCost', type: 'number'},
        { name: 'BomCost1', type: 'number'},
        { name: 'bomcost2', type: 'number'},
        { name: 'bomcost3', type: 'number'},
        { name: 'bomcost4', type: 'number'},
        { name: 'bomcost5', type: 'number'},
        { name: 'user1', type: 'string', convert: tr},
        { name: 'user2', type: 'string', convert: tr},
        { name: 'user3', type: 'string', convert: tr},
        { name: 'user4', type: 'string', convert: tr},
        { name: 'body', type: 'string', convert: tr},
        { name: 'bundle', type: 'string', convert: tr},
        { name: 'sub_style', type: 'string', convert: tr},
        { name: 'sub_color', type: 'string', convert: tr},
        { name: 'pack_sizecat', type: 'string', convert: tr},
        { name: 'designer', type: 'string', convert: tr},
        { name: 'po_memo', type: 'string', convert: tr},
        { name: 'min_order_qty', type: 'number'},
        { name: 'userdate', type: 'date', dateFormat: 'c'},
        { name: 'binlocation', type: 'string', convert: tr},
        { name: 'allowancerate', type: 'number'},
        { name: 'coo', type: 'string', convert: tr},
        { name: 'account', type: 'string', convert: tr},
        { name: 'warehouse', type: 'string', convert: tr},
        { name: 'cost_cur_cs', type: 'number'},
        { name: 'price_ddp', type: 'number'},
        { name: 'price_fob', type: 'number'},
        { name: 'productId',
            mapping: 'id',
            persist: false
        }
    ],

    idProperty: 'productId',
    identifier: 'negative',

    validators: {
        style: 'presence',
        color: 'presence',
        rawMatType: 'presence',
        season: 'presence',
        division: 'presence',
        fabcontent: 'presence',
        fabricType: 'presence'
        /*
         ordertype: { type: 'length', min: 2 },
         gender: { type: 'inclusion', list: ['Male', 'Female'] },
         username: [
         { type: 'exclusion', list: ['Admin', 'Operator'] },
         { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
         ]
         */
    },

    proxy: {
        type: 'rest',
        url: '/api/Product/',

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
            allowSingle: true // set false to send a single record in array
        },

        //extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
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
        this.boms().setGroupField('rawMatType');
    }

});

function tr(value, record){
    if(!Ext.isEmpty(value)){
        return Ext.String.trim(value);
    }
    return value;
};
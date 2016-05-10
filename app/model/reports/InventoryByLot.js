/**
 * Created by tech on 2/13/2015.
 */
Ext.define('Vega.model.reports.InventoryByLot', {
    extend: 'Vega.model.Base',

    fields: [
        {name: 'style', type: 'string'},
        {name: 'color', type: 'string'},
        {name: 'descript', type: 'string'},
        {name: 'division', type: 'string'},
        {name: 'uom', type: 'string'},
        {name: 'rawMatType', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'memo', type: 'string'},
        {name: 'total', type: 'float'},
        {name: 'totalcost', type: 'float'},
        {name: 'ohs', type: 'float'},
        {name: 'detail', type: 'auto'}
    ]
});

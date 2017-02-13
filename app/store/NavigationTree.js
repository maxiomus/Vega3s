Ext.define('Vega.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',
    root: {
        expanded: true,
        children: [
            {
                text:   'Dashboard',
                view:   'dashboard.Dashboard',
                leaf:   true,
                read: true,
                iconCls: 'right-icon new-icon fa fa-desktop',
                routeId: 'dashboard'
            },
            {
                text:   'Notice',
                view:   'notice.Notice',
                leaf:   true,
                read: true,
                iconCls: 'fa fa-send',
                routeId: 'notice'

            },
            {
                text:   'Sales',
                expanded: false,
                selectable: false,
                iconCls: 'fa fa-dollar',
                routeId: 'sales',
                id: 'sales',
                children: [{
                    text: 'P.O.W',
                    view: 'sales.Pow',
                    leaf: true,
                    read: true,
                    iconCls: 'fa fa-file-text-o',
                    routeId: 'pow'
                },{
                    text: 'REQUEST',
                    view: 'sales.Request',
                    leaf: true,
                    read: true,
                    granted: ['sales', 'cs', 'administrators'],
                    iconCls: 'fa fa-file-text-o',
                    routeId: 'request'
                },{
                    text: 'REVIEW',
                    view: 'sales.Review',
                    leaf: true,
                    read: true,
                    granted: ['cs', 'revise', 'administrators'],
                    iconCls: 'fa fa-file-text-o',
                    routeId: 'review'
                },{
                    text: 'PENDING',
                    view: 'sales.Pending',
                    leaf: true,
                    read: true,
                    granted: ['exec', 'administrators'],
                    iconCls: 'fa fa-file-text-o',
                    routeId: 'pending'
                }]
            },
            {
                text: 'D.A.L',
                view: 'dal.Dal',
                leaf: true,
                read: true,
                iconCls: 'fa fa-th-large',
                routeId: 'dal'
            },
            {
                text: 'Development',
                expanded: false,
                selectable: false,
                iconCls: 'fa fa-tasks',
                routeId:'development',
                id: 'development',
                children: [{
                    text: 'P.L.M',
                    view: 'development.plm.Plm',
                    selectable: false,
                    leaf: true,
                    read: true,
                    iconCls: 'fa fa-tasks',
                    routeId: 'development.plm'
                },
                {
                    text: 'Sample Style',
                    view: 'development.sample.Sample',
                    leaf: true,
                    read: true,
                    iconCls: 'fa fa-tag',
                    routeId: 'sample'
                },
                {
                    text: 'Fabric Request',
                    view: 'development.request.Fabric',
                    leaf: true,
                    read: true,
                    iconCls: 'fa fa-database',
                    routeId: 'request-fabric'
                },
                {
                    text: 'Work Request',
                    view: 'development.request.Work',
                    leaf: true,
                    read: true,
                    iconCls: 'fa fa-scissors',
                    routeId: 'request-work'
                }]
            },
            {
                text: 'Production',
                expanded: false,
                selectable: false,
                iconCls: 'fa fa-refresh',
                routeId : 'production',
                id:       'production',
                children: [{
                    text: 'Schedule',
                    view: 'production.Schedule',
                    leaf: true,
                    read: true,
                    iconCls: 'fa fa-calendar',
                    routeId: 'schedule'
                }]
            },
            {
                text: 'Inventory',
                expanded: false,
                selectable: false,
                iconCls: 'fa fa-cubes',
                routeId : 'inventory',
                id:       'inventory',
                children: [{
                    text:   'P.I',
                    view:   'inventory.pi.Physical',
                    leaf:   true,
                    read: true,
                    iconCls: 'fa fa-calculator',
                    routeId: 'physical'
                },{
                    text:   'Receiving',
                    view:   'inventory.fabric.Receiving',
                    leaf:   true,
                    read: true,
                    iconCls: 'fa fa-edit',
                    routeId: 'receiving'
                },
                {
                    text: 'Fabric Allocate',
                    view: 'inventory.fabric.Allocation',
                    leaf: true,
                    read: true,
                    iconCls: 'fa fa-exchange',
                    routeId: 'allocation'
                },
                {
                    text: 'Fabric Rolls',
                    view: 'inventory.fabric.Rolls',
                    leaf: true,
                    read: true,
                    iconCls: 'fa fa-dot-circle-o',
                    routeId: 'rolls'
                }]
            },
            {
                text: 'Reports',
                expanded: false,
                selectable: false,
                iconCls: 'fa fa-leanpub',
                routeId : 'reports',
                id:       'reports',
                children: [{
                    text:   'Lot Activities',
                    view:   'reports.inventory.LotActivity',
                    iconCls: 'fa fa-edit',
                    leaf:   true,
                    read: true,
                    routeId: 'lotactivity'
                },
                {
                    text: 'Inventory By Lot',
                    view: 'reports.inventory.InventoryByLot',
                    iconCls: 'fa fa-pie-chart',
                    leaf:   true,
                    read: true,
                    routeId: 'inventorybylot'
                },
                {
                    text: 'Transactions',
                    view: 'reports.transaction.Layout',
                    iconCls: 'fa fa-edit',
                    leaf: true,
                    read: true,
                    routeId: 'layout'
                }]
            },
            {
                text: 'Settings',
                view: 'settings.Default',
                iconCls: 'fa fa-wrench',
                granted: ['administrators'],
                leaf: true,
                read: true,
                routeId: 'settings'
            }
        ]
    },
    fields: [
        {
            name: 'text'
        }
    ]
});

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
                iconCls: 'right-icon new-icon fa fa-desktop',
                routeId: 'dashboard'
            },
            {
                text:   'Notice',
                view:   'notice.Notice',
                leaf:   true,
                iconCls: 'fa fa-send',
                routeId: 'notice'

            },
            {
                text:   'P.O.W',
                view:   'sales.Pow',
                leaf:   true,
                iconCls: 'fa fa-file-text-o',
                routeId: 'pow'
            },
            {
                text: 'D.A.L',
                view: 'dal.Dal',
                leaf: true,
                iconCls: 'fa fa-th-large',
                routeId: 'dal'
            },
            {
                text: 'Development',
                expanded: false,
                selectable: false,
                iconCls: 'fa fa-question',
                routeId:'development',
                id: 'development',
                children: [
                    {
                        text: 'Sample Style',
                        view: 'development.sample.Sample',
                        leaf: true,
                        iconCls: 'fa fa-tag',
                        routeId: 'sample'
                    },
                    {
                        text: 'P.L.M',
                        view: 'development.plm.Plm',
                        leaf: true,
                        iconCls: 'fa fa-calendar-o',
                        routeId: 'development.plm'
                    }
                ]
            },
            {
                text: 'Production',
                expanded: false,
                selectable: false,
                iconCls: 'fa fa-server',
                routeId : 'production',
                id:       'production',
                children: [
                    {
                        text: 'Schedule',
                        view: 'production.Schedule',
                        leaf: true,
                        iconCls: 'fa fa-calendar',
                        routeId: 'schedule'
                    }
                ]
            },
            {
                text: 'Inventory',
                expanded: false,
                selectable: false,
                iconCls: 'fa fa-cubes',
                routeId : 'inventory',
                id:       'inventory',
                children: [
                    {
                        text:   'Receiving',
                        view:   'inventory.fabric.Receiving',
                        leaf:   true,
                        iconCls: 'fa fa-edit',
                        routeId:'inventory.receiving'
                    },
                    {
                        text: 'Fabric Allocate',
                        view: 'inventory.fabric.Allocation',
                        leaf: true,
                        iconCls: 'fa fa-exchange',
                        routeId:'inventory.allocation'
                    },
                    {
                        text: 'Fabric Rolls',
                        view: 'inventory.fabric.Rolls',
                        leaf: true,
                        iconCls: 'fa fa-dot-circle-o',
                        routeId:'inventory.rolls'
                    }
                ]
            },
            {
                text: 'Reports',
                expanded: false,
                selectable: false,
                iconCls: 'fa fa-leanpub',
                routeId : 'reports',
                id:       'reports',
                children: [
                    {
                        text:   'Lot Activities',
                        view:   'reports.inventory.LotActivity',
                        iconCls: 'fa fa-edit',
                        leaf:   true,
                        routeId:'reports.lotactivity'
                    },
                    {
                        text: 'Inventory By Lot',
                        view: 'reports.inventory.InventoryByLot',
                        iconCls: 'fa fa-pie-chart',
                        leaf:   true,
                        routeId:'reports.inventorybylot'
                    },
                    {
                        text: 'Transactions',
                        view: 'reports.transaction.Layout',
                        iconCls: 'fa fa-edit',
                        leaf: true,
                        routeId: 'reports.layout'
                    }
                ]
            }
        ]
    },
    fields: [
        {
            name: 'text'
        }
    ]
});

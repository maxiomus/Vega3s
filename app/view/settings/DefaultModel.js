Ext.define('Vega.view.settings.DefaultModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.settings-default',

    stores: {
        areas: {
            type: 'tree',

            root: {
                text: 'Settings',
                routeId: 'base',
                expanded: true,
                children: [
                    {
                        leaf: true,
                        text: 'Notification',
                        routeId: 'notification-default'
                    },
                    {
                        text: 'Company',
                        routeId: 'company-default',
                        expanded: true,
                        children: [
                            {
                                leaf: true,
                                text: 'Users',
                                routeId: 'users-list'
                            }
                        ]
                    },
                    {
                        text: 'Views',
                        routeId: 'view-default',
                        expanded: true,
                        children: [
                            {
                                leaf: true,
                                text: 'Notice',
                                routeId: 'view-notice-default'
                            },
                            {
                                leaf: true,
                                text: 'Sales',
                                routeId: 'view-sales-default'
                                //expanded: true,
                            },
                            {
                                text: 'D.A.L',
                                routeId: 'view-dal-default',
                                expanded: false,
                                children: [
                                    {
                                        leaf: true,
                                        text: 'Print Themes',
                                        routeId: 'view-dal-theme'
                                    }
                                ]
                            },
                            {
                                leaf: true,
                                text: 'Development',
                                routeId: 'view-development-default'
                            },
                            {
                                leaf: true,
                                text: 'Production',
                                routeId: 'view-production-default'
                            }
                        ]
                    },
                    {
                        text: 'Product',
                        routeId: 'product-default',
                        expanded: true,
                        children: [
                            {
                                leaf: true,
                                text: 'Category',
                                routeId: 'product-category'
                            },
                            {
                                leaf: true,
                                text: 'Color',
                                routeId: 'product-color'
                            },
                            {
                                leaf: true,
                                text: 'Component Type',
                                routeId: 'product-componenttype'
                            },
                            {
                                leaf: true,
                                text: 'Fabric Content',
                                routeId: 'product-fabriccontent'
                            },
                            {
                                leaf: true,
                                text: 'Fabric Type',
                                routeId: 'product-fabrictype'
                            },
                            {
                                leaf: true,
                                text: 'Group',
                                routeId: 'product-group'
                            },
                            {
                                leaf: true,
                                text: 'Size',
                                routeId: 'product-size'
                            },
                            {
                                leaf: true,
                                text: 'Sub Category',
                                routeId: 'product-subcategory'
                            },
                            {
                                leaf: true,
                                text: 'U.O.M',
                                routeId: 'product-uom'
                            }
                        ]
                    },
                    {
                        text: 'Tasks',
                        routeId: 'task-default',
                        expanded: true,
                        children: [
                            { leaf: true, text: 'Plan', routeId: 'task-plan' },
                            { leaf: true, text: 'Activity', routeId: 'task-activity' }
                        ]
                    },
                    {
                        text: 'Vendors',
                        routeId: 'vendors-default',
                        expanded: true,
                        children: [
                            { leaf: true, text: 'Process Location', routeId: 'vendors-processloc' },
                            { leaf: true, text: 'Process Type', routeId: 'vendors-processtype' },
                            { leaf: true, text: 'Vendor Type', routeId: 'vendors-vendortype' }
                        ]
                    }
                ]
            }
        },

        coordinators: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "/api/Combos/users",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total",
                    successProperty: "success"
                }
            }
        },

        customers: {
            fields: ["id", "text"],
            autoLoad: true,
            //pageSize: 999,
            proxy: {
                type: "ajax",
                url: "/api/Combos/customers",

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
        }
    }
});

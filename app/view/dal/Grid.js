
Ext.define("Vega.view.dal.Grid", {
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.dal.GridController',
        'Vega.view.dal.GridModel'
    ],

    alias: "widget.dal-grid",

    itemId: "dal-grid",

    controller: "dal-grid",
    viewModel: {
        type: "dal-grid"
    },

    publishes: ["selectedImage"],

    bind: {
        store: "{dals}",
        selection: "{selectedImage}"
    },

    config: {

    },
    stateful: true,
    stateId: "dal-grid",
    stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],
    listeners: {
        select: {
            fn: "onSelect"
        }
    },

    // This XTemplate is used by the controller to format the title column.
    titleTpl:
        '<div class="media-wrapper">' +
            //'<div class="media-icon {type}">&nbsp;</div>' +
        '<div class="media-data">' +
        '<div class="media-picture"><img class="{F_BFLAG}" src="../{F_LINK}thumbs/{F_LOCATION}_thumb{F_EXT}" title="{F_DESC1}" /></div>' +
        '<div class="{F_BFLAG}">Rejected</div>' +
        '<div class="media-content">' +
        '<div class="media-title">{Title}</div>' +
            //'<div class="media-small">by <span class="news-author">{F_USERID}</span>' +
            //    '<div><i class="fa fa-calendar"></i> <i class="fa fa-clock-o"></i> {F_CREATED_ON}</div>' +
        '</div>' +
        '<div class="media-description">{F_DESC1:ellipsis(130, true)}</div>' +
        '</div>' +
            //'</div>' +
        '<div>',

    initComponent: function(){
        var b=this;
        b.columns=this.buildColumns();
        Ext.applyIf(b, {
            selModel: {
                mode: "MULTI",
                pruneRemoved: false
            },
            viewConfig: {
                loadMask: true,
                stripeRows: true,
                trackOver: true,
                preserveScrollOnRefresh: true,
                deferInitialRefresh: true,
                emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                listeners: {

                }
            },
            plugins: [{
                ptype: "gridfilters",
                pluginId: "gridfilters"
            }]
        });

        this.callParent(arguments);
    },

    buildColumns: function(){
        return[{
            dataIndex: "F_NAME",
            text: "Name",
            flex: 5,
            filter: {type: "string"},
            renderer: "renderCategoryColumn"
        },
        {
            dataIndex: "F_CATEGORY",
            text: "Category",
            flex: 1,
            hidden: false,
            filter: {type: "string"}
        },
        {
            dataIndex: "F_OWNER",
            hidden: true,
            filter: {type: "string"}
        },
        {
            dataIndex: "F_DESC2",
            hidden: true,
            filter: {type: "string"}
        },
        {
            dataIndex: "F_DESC3",
            hidden: true,
            filter: {type: "string"}
        },
        {
            dataIndex: "F_DESC4",
            hidden: true,
            filter: {type: "string"}
        },
        {
            dataIndex: "F_DESC5",
            hidden: true,
            filter: {
                type: "string",
                operator: "st"
            }
        },
        {
            dataIndex: "F_DESC6",
            hidden: true,
            filter: {type: "string"}
        },
        {
            dataIndex: "F_DESC7",
            hidden: true,
            filter: {type: "string"}
        },
        {
            dataIndex: "F_DESC8",
            hidden: true,
            filter: {type: "string"}
        },
        {
            dataIndex: "F_DESC9",
            hidden: true,
            filter: {type: "string"}
        },
        {
            dataIndex: "F_DESC1",
            hidden: true,
            filter: {type: "string"}
        },
        {
            dataIndex: "F_CREATED_ON",
            text: "Date Created",
            flex: 2,
            hidden: false,
            filter: {type: "date"},
            renderer: this.formatDate
        },
        {
            xtype: "datecolumn",
            dataIndex: "F_UPDATED_ON",
            text: "Date Modified",
            hidden: true,
            filter: {type: "date"},
            renderer: this.formatDate
        }]
    },

    onSelect: function(g, h, f, e){

    },

    loadStore: function(){
        this.getStore().load()
    }
});


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

    style: {
        borderTop: '1px solid #cfcfcf',
        borderBottom: '1px solid #cfcfcf'
    },

    //stateful: true,
    //stateId: "dal-grid",
    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

    listeners: {
        select: {
            fn: "onSelect"
        }
    },

    // This XTemplate is used by the controller to format the title column.
    titleTpl: new Ext.XTemplate(
        '<div class="media-wrapper">' +
            //'<div class="media-icon {type}">&nbsp;</div>' +
        '<div class="media-data">' +
        //'<div class="media-picture"><img class="{F_BFLAG}" src="../{F_LINK}thumbs/{F_LOCATION}_thumb{F_EXT}" title="{F_DESC1}" /></div>' +
        '<div class="media-picture"><img class="{F_BFLAG}" src="{[this.getSrcPath(values)]}?w=64&h=64" title="{F_DESC1}" /></div>' +
        '<div class="{F_BFLAG}">Rejected</div>' +
        '<div class="media-content">' +
        '<div class="media-title">{Title}</div>' +
            //'<div class="media-small">by <span class="news-author">{F_USERID}</span>' +
            //    '<div><i class="x-fa fa-calendar"></i> <i class="x-fa fa-clock-o"></i> {F_CREATED_ON}</div>' +
        '</div>' +
        '<div class="media-description">{F_DESC1:ellipsis(130, true)}</div>' +
        '</div>' +
            //'</div>' +
        '<div>',
        {
            getSrcPath: function(a){
                var str = '../' + a.F_LINK + a.F_PATH + '/';

                if(!Ext.isEmpty(a.F_NAME) && !Ext.isEmpty(a.F_TYPE)) {
                    //str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME.replace(/(\.[^.]+)$/, "_medium$1");
                    str += a.ID + '/' + a.F_NAME;
                }
                else {
                    str += a.F_LOCATION + a.F_EXT;
                }

                return str;
                //return a.replace(/(\.[^.]+)$/, "_medium$1");
            },
            formatDate: function(a){
                if(!a){
                    return "";
                }
                return Ext.Date.format(a, "M j,Y,g: i A");
            }
        }
    ),

    initComponent: function(){
        var b=this;
        b.columns=this.buildColumns();

        Ext.applyIf(b, {
            selModel: {
                //mode: "MULTI",
                pruneRemoved: false
            },
            viewConfig: {
                loadMask: true,
                stripeRows: true,
                trackOver: true,
                preserveScrollOnRefresh: true,
                deferInitialRefresh: true,
                emptyText: '<h1 style="margin: 20px">No matching results</h1>'
            },
            plugins: [{
                ptype: 'rowediting',
                pluginId: 'dal-grid-rowedit',
                clicksToEdit: 1
            },{
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
            flex: 1,
            //filter: {type: "string"},
            renderer: "renderCategoryColumn"
        },
        {
            dataIndex: "F_STYLE",
            text: "Style #",
            width: 140,
            filter: {
                type: "string",
                operator: 'like'
            }
        },
        {
            dataIndex: "F_CATEGORY",
            text: "Category",
            //flex: 1,
            hidden: false,
            filter: {type: "string"}
        },
        {
            dataIndex: "F_MFLAG",
            text: 'F/B',
            hidden: false,
            filter: {
                type: "string",
                operator: 'like'
            },
            editor: {
                xtype: 'combo',
                name: 'F_MFLAG',
                //fieldLabel: 'FACTORY',
                hideLabel: true,
                //editable: false,
                queryMode: 'local',
                store: ['FRONT', 'BACK']
                //triggerAction: 'all',
            }
        },
        {
            dataIndex: "F_OWNER",
            text: '',
            hidden: true,
            filter: {
                type: "string",
                operator: 'like'
            }
        },
        {
            dataIndex: "F_DESC2",
            text: 'Type',
            //flex: 3,
            hidden: false,
            filter: {
                type: "string",
                operator: 'like'
            },
            editor: {
                xtype: "tagfield",
                name: 'F_DESC2',
                //fieldLabel: "Body Type",
                //hideLabel: true,
                hideTrigger: true,
                bind: {
                    store: '{bodyTypes}',
                    value: '{components.selection.F_DESC2}'
                },
                valueField: "id",
                displayField: "id",
                forceSelection: false,
                selectOnFocus: true,
                queryMode: 'local',
                //queryParam: "filter",
                triggerAction: 'all',
                //lastQuery: '',
                //filterPickList: true,
                //pageSize: 100,
                minChars: 1,
                matchFieldWidth: false,
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 340
                },
                plugins: [{
                    ptype: "cleartrigger"
                }]
            }
        },
        {
            dataIndex: "F_DESC3",
            text: '',
            hidden: true,
            filter: {
                type: "string",
                operator: 'like'
            }
        },
        {
            dataIndex: "F_DESC4",
            text: '',
            hidden: true,
            filter: {
                type: "string",
                operator: 'like'
            }
        },
        {
            dataIndex: "F_DESC5",
            text: '',
            hidden: true,
            filter: {
                type: "string",
                operator: 'like'
            }
        },
        {
            dataIndex: "F_DESC6",
            text: '',
            hidden: true,
            filter: {
                type: "string",
                operator: 'like'
            }
        },
        {
            dataIndex: "F_DESC7",
            text: '',
            hidden: true,
            filter: {
                type: "string",
                operator: 'like'
            }
        },
        {
            dataIndex: "F_DESC8",
            text: 'Customer',
            hidden: false,
            filter: {
                type: "string",
                operator: 'like'
            }
        },
        {
            dataIndex: "F_DESC9",
            text: 'Theme',
            flex: 1,
            hidden: false,
            filter: {type: "string"},
            editor: {
                xtype: "tagfield",
                name: 'F_DESC9',
                //fieldLabel: "Theme",
                //hideLabel: true,
                hideTrigger: true,
                bind: {
                    store: '{themes}',
                    value: '{components.selection.F_DESC9}'
                },
                valueField: "id",
                displayField: "id",
                forceSelection: false,
                selectOnFocus: true,
                autoLoadOnValue: true,
                queryMode: 'local',
                filterPickList: true,
                //queryParam: "filter",
                triggerAction: 'all',
                //lastQuery: '',
                minChars: 1,
                matchFieldWidth: false,
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 340
                },
                plugins: [{
                    ptype: "cleartrigger"
                }]
            }
        },
        {
            dataIndex: "F_DESC10",
            text: 'Colorway',
            flex: 1,
            hidden: false,
            filter: {type: "string"},
            editor: {
                xtype: "tagfield",
                name: 'F_DESC10',
                //fieldLabel: "Colorway",
                //hideLabel: true,
                hideTrigger: true,
                bind: {
                    store: '{pantones}',
                    value: '{components.selection.F_DESC10}'
                },
                valueField: "id",
                displayField: "id",
                forceSelection: false,
                selectOnFocus: true,
                queryMode: 'local',
                //queryParam: "filter",
                triggerAction: 'all',
                //lastQuery: '',
                //filterPickList: true,
                //pageSize: 100,
                minChars: 1,
                matchFieldWidth: false,
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 340
                },
                plugins: [{
                    ptype: "cleartrigger"
                }]
            }
        },
        {
            dataIndex: "F_DESC1",
            text: 'Description',
            hidden: true,
            filter: {type: "string"}
        },
        {
            xtype: 'datecolumn',
            dataIndex: "F_CREATED_ON",
            text: "Date Created",
            //flex: 2,
            hidden: true,
            filter: {type: "date"},
            format: 'Y-m-d H:i:s A'
        },
        {
            xtype: "datecolumn",
            dataIndex: "F_UPDATED_ON",
            text: "Date Modified",
            hidden: true,
            filter: {type: "date"},
            format: 'm-d-Y g:i A'
        }];
    },

    loadStore: function(){
        this.getStore().load();
    }
});

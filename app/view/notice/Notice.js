/**
 * Created by tech on 3/8/2016.
 */
Ext.define("Vega.view.notice.Notice", {
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.notice.NoticeController',
        'Vega.view.notice.NoticeModel',
        'Vega.view.notice.Post',
        'Vega.view.notice.Grid',
        'Vega.view.notice.Window',
        'Vega.view.TopBar',
        'Ext.ux.form.GridSearchField'
    ],

    alias: 'widget.notice',

    config: {
        activeState: null,
        defaultActiveState: "default"
    },

    controller: "notice",
    viewModel: {type: "notice"},

    cls: "shadow-panel",
    header: false,
    margin: 8,

    listeners: {
        newclick: "onNewPostClick",
        refreshclick: "onRefreshClick",
        opentab: "onTabOpen",
        rowdblclick: "onRowDblClick",
        ctxmnurefreshclick: "onContextMenuRefreshClick",
        ctxmnuprintclick: "onContextMenuPrintClick",
        ctxmnueditclick: "onContextMenuEditClick",
        ctxmnubookmarkclick: "onContextMenuBookmarkClick"
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
                items: [{
                    xtype: "multiview",
                    reference: "multiview",
                    title: "Notice",
                    iconCls: "fa fa-send fa-inverse",
                    tbar: [{
                        xtype: "topbar",
                        reference: "topbar"
                    }],

                    mainItems: [{
                        xtype: "notice-grid",
                        reference: "grid",
                        scrollable: true,
                        flex: 2
                    }],

                    displayItems: [{
                        xtype: "notice-post",
                        reference: "post"
                    }]
                }
                ]
            }
        );

        me.callParent(arguments);

        var multiview = this.lookupReference("multiview"),
            grid = multiview.lookupReference("grid"),
            post = multiview.lookupReference("post"),
            topbar = multiview.lookupReference("topbar");

        topbar.items.last().setHidden(true);
        topbar.insert(0, [{xtype: "gridsearchfield", width: 300, grid: "notice-grid", paramName: "Title"}]);

        this.relayEvents(topbar, ["newclick", "refreshclick"]);
        this.relayEvents(post, ["opentab"]);
        this.relayEvents(grid, ["rowdblclick", "ctxmnurefreshclick", "ctxmnueditclick", "ctxmnuprintclick", "ctxmnubookmarkclick"])
    }
});

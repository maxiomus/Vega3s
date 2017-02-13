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
        'Vega.view.notice.edit.Form',
        'Vega.view.notice.edit.Window',
        'Vega.view.TopBar',
        'Ext.ux.form.GridSearchField'
    ],

    alias: 'widget.notice',

    config: {
        activeState: null,
        defaultActiveState: "default"
    },

    controller: "notice",
    viewModel: {
        type: "notice"
    },

    cls: "shadow-panel",
    header: false,
    margin: 8,

    session: true,

    listeners: {
        actnew: "onNewPostClick",
        actrefresh: "onRefreshClick",
        tabopen: "onTabOpen",
        rowdblclick: "onRowDblClick",
        savewindow: 'onSavePostClick',
        closewindow: 'onCloseWindowClick',
        ctxmnurefreshclick: "onContextMenuRefreshClick",
        ctxmnuprintclick: "onContextMenuPrintClick",
        ctxmnueditclick: "onContextMenuEditClick",
        ctxmnudeleteclick: "onContextMenuDeleteClick",
        ctxmnubookmarkclick: "onContextMenuBookmarkClick"
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
                items: [{
                    xtype: "multiview",
                    reference: "multiview",
                    title: "Notice",
                    sesson: true,
                    iconCls: "fa fa-send fa-inverse",
                    tbar: {
                        xtype: "topbar",
                        reference: "topbar"
                    },

                    mainItems: [{
                        xtype: "notice-grid",
                        reference: "grid",
                        //session: true,
                        scrollable: true,
                        flex: 2,
                        listeners: {
                            reconfigure: function(grid, store){
                                //
                                /*
                                store.each(function(rec){
                                    var data = [];
                                    //console.log(rec.powms());
                                    rec.filesInArticles().each(function(item){
                                        data.push(item.data);
                                    });
                                    rec.set('Link', data);
                                });
                                */
                            }
                        }
                    }],

                    displayItems: [{
                        xtype: "notice-post",
                        reference: "post"
                    }]
                }]
            }
        );

        me.callParent(arguments);

        var multiview = this.lookupReference("multiview"),
            grid = multiview.lookupReference("grid"),
            post = multiview.lookupReference("post"),
            topbar = multiview.lookupReference("topbar");

        topbar.items.items[1].setHidden(false);
        topbar.items.last().setHidden(true);
        topbar.insert(0, [{
            xtype: "gridsearchfield",
            width: 300,
            grid: "notice-grid",
            paramName: "Title"
        }]);

        this.relayEvents(topbar, ["actnew", "actrefresh"]);
        this.relayEvents(post, ["open"], 'tab');
        this.relayEvents(grid, ["rowdblclick", "ctxmnurefreshclick", "ctxmnueditclick", "ctxmnudeleteclick", "ctxmnuprintclick", "ctxmnubookmarkclick"]);
        this.relayEvents(multiview, ['savewindow', 'closewindow'])
    }
});

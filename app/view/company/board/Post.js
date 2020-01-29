/**
 * @class notice.Post
 * @extend Ext.panel.Panel
 *
 * Show the detail of a notice post
 *
 * @constructor
 * Create a new post
 * @param {Object} config The config object
 */
Ext.define("Vega.view.company.board.Post",{
    extend: "Ext.view.View",

    alias: 'widget.board-post',

    requires: [
        "Vega.view.company.board.PostController",
        "Vega.view.company.board.PostModel"
    ],

    controller: "board-post",
    viewModel: {
        type: "board-post"
    },

    scrollable: 'y',
    enableTextSelection: false,

    cls: 'post-view',

    overItemCls: "x-item-over",
    itemSelector: "div.post-body-wrap",

    preserveScrollOnRefresh: true,
    //deferInitialRefresh: true,

    padding: '27 10 10 10',

    style: {
        //borderTop: '1px solid #cfcfcf'
        //borderBottom: '1px solid #cfcfcf'
    },

    bind: {
        store: '{posts}'
    },

    prepareData: function(f, d, e){
        Ext.apply(f, {
            //viewStatus: localStorage.getItem("pow-seen-" + f.powhId) == "true" ? "visited" : ""
        });
        return f;
    },

    listeners: {
        render: 'onRender',
        //dataitemeditclick: 'onEditButtonClick',
        //dataitemdeleteclick: 'onDeleteButtonClick',
        itemmouseenter: 'onItemMouseEnter',
        itemmouseleave: 'onItemMouseLeave',
        filedblclick: 'onFileDblClick'
    },

    initComponent: function(){
        var me = this;

        me.tpl = me.buildTemplate();

        me.callParent();
    },

    buildTemplate: function(){
        return new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="post-body-wrap">',
                //'<div style="font-size: 28px; margin: 40px 0 40px 0;">{subject}</div>',
                '<div class="body">',
                    '<div style="display: flex;">',
                        '<div style="font-size: 20px; width: 120px; margin: 0 0 0 16px;"><i class="x-fa fa-user fa-lg"></i> {userId:this.defaultValue}</div>',
                        '<div style="margin: auto;"></div>',
                        '<div style="width: 180px;"><i class="x-fa fa-clock-o fa-lg"></i> {created:this.formatDate}</div>',
                    '</div>',
                    '<div class="content">{content}</div>',
                    //'<div class="post-link {hasAttach}">{Link:this.formatLink(values)}</div>',
                    '<div class="topic-attach-view">',
                        '<tpl for="files">',
                            '<div class="thumb-wrap x-unselectable file-attachment" fileId="{fileId}">',
                                '<div class="thumb">',
                                    '<div class="img"><i class="fa fa-file-{type:this.getFileType}-o fa-3x"></i></div>',
                                    '<div class="title">{name:ellipsis(38)}</div>',
                                '</div>',
                            '</div>',
                        '</tpl>',
                    '</div>',

                    '<a class="x-btn x-unselectable x-btn-default-toolbar-small dataview-button" style="margin: 0 20px 0 0;">',
                    '<span class="x-btn-button x-btn-text x-btn-icon x-btn-icon-left">',
                        '<span class="x-btn-icon-el x-btn-icon-el-default-toolbar-small x-fa fa-close"></span>',
                        '<span class="x-btn-inner x-btn-inner-default-toolbar-small">Delete</span>',
                    '</span>',
                    '</a>',
                    '<a class="x-btn x-unselectable x-btn-default-toolbar-small dataview-button">',
                    //'<span class="x-btn-wrap x-btn-wrap-default-toolbar-small ">',
                    '<span class="x-btn-button x-btn-text x-btn-icon x-btn-icon-left">',
                        '<span class="x-btn-icon-el x-btn-icon-el-default-toolbar-small x-fa fa-mail-reply"></span>',
                        '<span class="x-btn-inner x-btn-inner-default-toolbar-small">Edit</span>',
                    '</span>',
                    //'</span>',
                    '</a>',
                '</div>',
            '</div>',
            '</tpl>',
            {
                getBody: function(a){
                    return Ext.util.Format.stripScripts(a);
                },
                defaultValue: function(a){
                    return a ? a : 'Unknown';
                },
                formatDate: function(a){
                    if (!a) {
                        return '';
                    }
                    return Ext.Date.format(new Date(a), "M j, Y, g: i a");
                },
                getFileType: function(v){
                    var a = ['image', 'pdf', 'excel', 'word', 'powerpoint'];

                    for(var i = 0; i < a.length; i++){
                        if(v.indexOf(a[i]) != -1) {
                            return a[i];
                        }
                    }

                    return 'code';
                }
            })
    },

    onEditButtonClick: function(){
        this.fireEvent('')
    }
});

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

    //cls: 'post-preview',

    overItemCls: "x-item-over",
    itemSelector: "div.thumb-wrap",

    preserveScrollOnRefresh: true,
    //deferInitialRefresh: true,

    padding: '27 0 0 7',

    style: {
        borderTop: '1px solid #cfcfcf',
        borderBottom: '1px solid #cfcfcf'
    },

    prepareData: function(f, d, e){
        Ext.apply(f, {
            //viewStatus: localStorage.getItem("pow-seen-" + f.powhId) == "true" ? "visited" : ""
        });
        return f;
    },

    listeners: {

    },

    initComponent: function(){
        var me = this;

        me.tpl = this.buildTemplate();

        me.callParent();
    },

    buildTemplate: function(){
        return new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="thumb-wrap x-unselectable">',
                    '<div class="head">',
                        '<div class="post-author"">',
                            '{userId:capitalize}',
                        '</div>',
                        '<div class="post-date">',
                            '{created:date("M j, Y, g:i a")}',
                        '</div>',
                    '</div>',
                    '<div class="post-data">',
                        '{content}',
                    '</div>',
                    '<hr />',
                    '<div class="footer">',
                        // attachment here...
                    '</div>',
                '</div>',
            '</tpl>',
            {
                formatStatus: function(v){
                    if(Ext.isEmpty(v)){
                        v = 'Disabled';
                    }

                    return v == 1 ? 'Active' : 'Disabled';
                }
            })
    }
});

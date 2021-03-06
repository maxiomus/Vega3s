Ext.define('Vega.view.company.notice.PostController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.notice-post',

    mixins: [
        'Ext.app.route.Base'
    ],

    init: function(view){

    },

    onRender: function(post) {

        if (post.body != undefined) {
            post.body.el.on('contextmenu', function (e) {
                e.stopEvent();
                post.contextmenu.showAt(e.getXY());
            }, post);
        }
        //this.callParent(arguments);
    },

    onAddBookmark: function(record, item){
        this.addBookmark(record, item);
    }
    
});

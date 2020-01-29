Ext.define('Vega.view.company.board.PostController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.board-post',

    mixins: [
        'Ext.app.route.Base'
    ],

    onBeforePostsLoad: function(store, op){
        var me = this,
            view = me.getView(),
            topic = view.up('board-topic');

        //console.log(topic.active);

        Ext.apply(store.getProxy().extraParams, {
            extra: topic.active.get('topicId') // topicId
        });
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
    },

    onItemMouseEnter: function(view, rec, item, index){
        var me = this,
            post = me.getView(),
        //console.log(view, rec, item);
            buttons = Ext.fly(item).query('.dataview-button'),
            files = Ext.fly(item).query('.file-attachment');

        Ext.each(buttons, function(btn){
            var butEl = Ext.get(btn);
            butEl.setVisible(true);
            //butEl.removeCls('x-hidden');

            butEl.hover(function () {
                butEl.addCls('x-btn-over');
            }, function () {
                butEl.removeCls('x-btn-over');
            });

            if(butEl.hasListeners.click == undefined){
                butEl.on('click', function(e,t,opts){
                    //console.log(me, this, e)
                    post.fireEvent('dataitem'+this.dom.text+'click', this, rec);
                });
            }

        });

        Ext.each(files, function(file){
            var fileEl = Ext.get(file);

            //console.log(fo, fileEl.getAttribute('fileId'), me.getView().active.data.files);
            //butEl.removeCls('x-hidden');
            var fo = me.searchFileWithId(fileEl.getAttribute('fileId'), rec.data.files);

            fileEl.hover(function () {
                fileEl.addCls('x-item-over');
            }, function () {
                fileEl.removeCls('x-item-over');
            });

            if(fileEl.hasListeners.dblclick == undefined){
                fileEl.on('dblclick', function(e,t,opts){
                    //console.log(this, e)
                    post.fireEvent('filedblclick', this, fo);
                });
            }

        });
    },

    onItemMouseLeave: function(view, rec, item, index){
        //console.log(view, rec, item);
        var buttons = Ext.fly(item).query('.dataview-button');
        Ext.each(buttons, function(btn){
            var butEl = Ext.get(btn);
            //Ext.get(btn).addCls('x-hidden');
            butEl.setVisible(false);
        });
    },

    onFileDblClick: function(el, t){

        // download file by double click...
        var me = this,
            xf = Ext.util.Format,
            href = xf.format('../DLIB/BOARD-ATTACHMENTS/{0}/{1}/{2}', xf.date(t.created, 'Y/n/j'), t.fileId, t.name);

        //console.log(t, href);
        me.downloadFile(href, t.name);

    },

    /**
     * Private function
     * @param key
     * @param array
     * @returns {*}
     */
    searchFileWithId: function(key, array){
        for (var i=0; i < array.length; i++) {
            if (array[i].fileId == key) {
                return array[i];
            }
        }
    },

    downloadFile: function(href, name){
        const a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);

        // Set the HREF to a Blob representation of the data to be downloaded
        a.href = href;

        // Use download attribute to set set desired file name
        a.setAttribute("download", name);

        // Trigger the download by simulating click
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
    }
    
});

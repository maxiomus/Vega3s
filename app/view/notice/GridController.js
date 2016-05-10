Ext.define('Vega.view.notice.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.notice-grid',

    init: function() {
        var me = this;
    },

    onAfterRender: function(grid){
        //console.log(this.getViewModel().get('notices').isLoading())
        //this.getViewModel().get('notices').load();
    },

    /**
     *
     * @param view
     * @param record
     * @param item
     * @param index
     * @param e
     * @param eOpts
     */
    //onItemClick: function(view, record, item, index, e, eOpts){
    onSelect: function(view, record, index, eOpts){
        var l = this.getView(),
            preview = l.up("multiview").lookupReference("preview"),
            post = preview.down("notice-post");

        post.setActive(record);
        this.redirectTo("notice/default/"+record.get("ArticleID"));
    },

    /**
     *  Open the context menu
     * @param view
     * @param rec
     * @param item
     * @param index
     * @param event
     */
    onItemContextMenu: function(view, rec, item, index, event){
        event.stopEvent();
        //console.log(this.view, view);
        this.view.menu.showAt(event.getXY());
    },

    onRefreshView: function(view, eOpts) {
        /*if(this.view.currentPost == null){
            return;
        }

        /!**
         * When store reload, new record id assigned.
         *!/

        var newRecordsToSelect = [];
        for (var i = 0; i < this.view.currentPost.length; i++) {
            //console.log('refresh - record', this.view.currentPost[i].isModel);
            var record = this.view.getStore().findRecord('ArticleID', this.view.currentPost[i].get('ArticleID'));
            if(!Ext.isEmpty(record)){
                newRecordsToSelect.push(record);
            }
        }

        this.view.getSelectionModel().select(newRecordsToSelect);*/

        /*
         if (0 >= this.selectedRecords.length) {
            return;
         }

         var newRecordsToSelect = [];
         for (var i = 0; i < this.selectedRecords.length; i++) {
            record = this.getStore().getById(this.selectedRecords[i].getId());
            if (!Ext.isEmpty(record)) {
                newRecordsToSelect.push(record);
            }
         }
         this.getSelectionModel().select(newRecordsToSelect);

         Ext.defer(this.setScrollTop, 30, this, [this.getView().scrollState.top]);
        */
    }
});

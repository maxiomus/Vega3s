Ext.define("Vega.view.company.board.WindowController", {
    extend: 'Ext.app.ViewController',

    alias: "controller.board-window",

    /**
     * To be called when a cancel action takes place. Fires the
     * cancel event.
     * @protected
     */
    onCancelTap: function(b) {
        this.fireViewEvent('cancel', this);
    },

    /**
     * To be called when a save takes place. Fires the save
     * event.
     * @param {Object} data The form data.
     * @protected
     */
    onSaveTap: function(b) {
        var form = this.getView().form,
            values = form.getForm().getFieldValues();

        if(!form.isValid()){
            return;
        }

        this.fireViewEvent('save', values);
    },

    /**
     * To be called when a open file take place. Fires
     * the open event.
     * @param {Object}
     * @param {Object}
     */
    onItemDblClick: function(upload,rec){
        //console.log(upload, rec);
    }
});
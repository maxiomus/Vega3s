/**
 * Created by tech on 5/29/2019.
 */
Ext.define('Vega.view.company.board.WindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.board-window',

    /**
     * To be called when a cancel action takes place. Fires the
     * cancel event.
     * @protected
     */
    onCancelTap: function() {
        this.fireViewEvent('cancel', this);
    },

    /**
     * To be called when a save takes place. Fires the save
     * event.
     * @param {Object} data The form data.
     * @protected
     */
    onSaveTap: function() {
        var form = this.getView().form,
            values = form.getForm().getFieldValues();

        if(!form.isValid()){
            return;
        }

        this.fireEvent('save', this, values);
    }
});
/**
 * Created by tech on 5/28/2019.
 */
Ext.define('Vega.view.company.board.Window', {
    extend: 'Ext.window.Window',

    requires: [
        'Vega.view.company.board.WindowController'
    ],

    alias: 'widget.board-window',

    controller: 'board-window',

    layout: {
        type: 'fit'
    },

    minHeight: 240,
    minWidth: 360,

    monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,
    modal: true,

    session: true,

    tools: [{
        type: 'pin'
    }],

    config: {
        /**
         * @cfg {Object} saveButton
         * The config for the save button.
         */
        saveButton: {
            text: 'Save',
            iconCls: 'x-fa fa-save',
            handler: 'onSaveTap'
        },

        /**
         * @cfg {Object} cancelButton
         * The config for the cancel button.
         */
        cancelButton: {
            text: 'Cancel',
            iconCls: 'x-fa fa-close',
            handler: 'onCancelTap'
        }
    },

    initComponent: function() {
        var me = this;

        me.fbar = me.generateButtons();

        me.callParent();
        me.form = me.items.first();

        me.on({
            cancel: function(v){
                me = Ext.destroy(v);
            }
        })
    },

    generateButtons: function() {
        var buttons = [],
            save = this.getSaveButton();

        if (save) {
            buttons.push(save);
        }

        buttons.push({
            xtype: 'component',
            flex: 1
        }, this.getCancelButton());

        return buttons;
    }
});
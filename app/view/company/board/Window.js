/**
 * Created by tech on 5/28/2019.
 */
Ext.define('Vega.view.company.board.Window', {
    extend: 'Ext.window.Window',

    requires: [
        'Vega.view.company.board.WindowController',
        'Vega.view.company.board.edit.Form'
    ],

    alias: 'widget.board-window',

    controller: 'board-window',

    bind: {
        title: '{title}'
    },

    layout: {
        type: 'fit'
    },

    minWidth: 360,
    minHeight: 360,

    monitorResize: true,
    maximizable: true,
    //constrain: true,

    closable: true,
    modal: true,

    tools: [{
        type: 'pin'
    }],

    config: {
        isEdit: false,
        /**
         * @cfg {Object} saveButton
         * The config for the save button.
         */
        saveButton: {
            text: 'Save',
            iconCls: 'x-fa fa-save',
            tabIndex: 3,
            handler: 'onSaveTap'
        },

        /**
         * @cfg {Object} cancelButton
         * The config for the cancel button.
         */
        cancelButton: {
            text: 'Cancel',
            iconCls: 'x-fa fa-close',
            tabIndex: 4,
            handler: 'onCancelTap'
        }
    },

    initComponent: function() {
        var me = this;

        me.fbar = me.generateButtons();

        me.callParent();
        me.form = me.items.first();

        me.on({
            close: function(win){
                var mv = Vega.app.getMainView();

                if(mv.isMasked){
                    mv.unmask();
                }
            }
        });
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
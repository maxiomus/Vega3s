/**
 * Created by tech on 5/17/2019.
 */
Ext.define('Vega.view.company.board.announcement.Default', {
    extend: 'Ext.panel.Panel',

    requires: [
        //'Vega.view.company.board.announcement.DefaultController',
        //'Vega.view.company.board.announcement.DefaultModel'
    ],

    alias: 'widget.board-announcement',

    /*
    controller: 'board-announcement-default',
    viewModel: {
        type: 'board-announcement-default'
    },
    */

    title: 'Announcements',

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {

        });

        me.callParent(arguments);
    }
});
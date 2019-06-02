/**
 * Created by tech on 5/28/2019.
 */
Ext.define('Vega.view.company.board.Add', {
    extend: "Ext.form.Panel",

    alias: 'widget.add-board',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    margin: '8 8 8 8',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: "textfield",
                name: 'name',
                fieldLabel: "Title",
                allowBlank: false,
                bind: '{theBoard.name}'
                //msgTarget: 'side'
                //hideLabel: true,
                //labelWidth: 50,
                //anchor: '100%'
            },{
                xtype: 'textarea',
                name: 'desc',
                fieldLabel: 'Description',
                //height: 100,
                //anchor: '100% 88%',
                bind: '{theBoard.desc}',
                grow: true,
                growMax: 180
            },{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'displayfield',
                    name: 'userId',
                    fieldLabel: 'Created By',
                    flex: 1,
                    bind: {
                        value: '{theBoard.userId}'
                    }
                },{
                    xtype: 'checkbox',
                    name: 'status',
                    boxLabel: 'Active',
                    checked: true,
                    inputValue: 1,
                    flex: 1,
                    bind: {
                        value: '{theBoard.status}'
                    }
                }]
            }]
        });

        me.callParent(arguments);
    }
});
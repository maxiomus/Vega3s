/**
 * Created by tech on 5/28/2019.
 */
Ext.define('Vega.view.company.board.edit.Form', {
    extend: "Ext.form.Panel",

    alias: 'widget.board-edit-form',

    requires: [
        'Vega.view.company.board.edit.Upload',
        'Vega.view.company.board.edit.Toolbar',
        'Ext.ux.view.Upload'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    margin: '8 8 8 8',

    config: {
        categoryEditable: true,
        categoryDisabled: false,
        categoryHidden: false
    },

    initComponent: function() {
        var me = this;

        me.items = me.buildItems();

        Ext.applyIf(me, {

        });

        me.callParent();
    },

    buildItems: function () {
        var me = this;

        return [{
            xtype: "textfield",
            name: 'subject',
            fieldLabel: "Title",
            allowBlank: true,
            bind: '{theMessage.subject}'
            //msgTarget: 'side'
            //hideLabel: true,
            //labelWidth: 50,
            //anchor: '100%'
        },{
            xtype: "combo",
            name: 'categoryId',
            reference: 'category',
            //itemId: "cboPrint",
            fieldLabel: "Category",
            //labelWidth: 50,
            width: 160,
            hideTrigger: true,
            //emptyText: 'Style',
            //publishes: 'value',
            enabled: me.getCategoryEditable(),
            hidden: me.getCategoryHidden(),
            disabled: me.getCategoryDisabled(),
            bind: {
                value: '{theMessage.categoryId}'
            },
            store: 'memBoardCategories',
            remoteStore: 'boardCategories',
            valueField: 'id',
            displayField: 'text',
            //forceSelection: false,
            //selectOnFocus: true,
            matchFieldWidth: false,
            autoLoadOnValue: true,
            //minChars: 0,
            pageSize: 50,
            queryMode: "local",
            triggerAction: 'query',
            //queryParam: "filter",
            //queryDelay: 800,
            //lastQuery: '',
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            tpl: '<tpl for=".">' +
                '<tpl if="[xindex] == 1">' +
                '<table class="cbo-list">' +
                '<tr>' +
                '<th width="35%">ID</th>' +
                '<th width="65%">Name</th>' +
                '</tr>' +
                '</tpl>' +
                '<tr class="x-boundlist-item">' +
                '<td>{id}</td>' +
                '<td>{text}</td>' +
                '</tr>' +
                '<tpl if="[xcount-xindex]==0">' +
                '</table>' +
                '</tpl>' +
                '</tpl>',
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                beforequery: {
                    fn: function(qe){
                        //delete qe.combo.lastQuery;
                    }
                }
            }
        },{
            xtype: 'htmleditor',
            name: 'content',
            fieldLabel: 'Description',
            flex: 3,
            minHeight: 120,
            //anchor: '100% 88%',
            bind: {
                value: '{theMessage.content}'
            }
        },{
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                name: 'userId',
                fieldLabel: 'Created By',
                flex: 1,
                bind: {
                    value: '{theMessage.userId}'
                }
            }]
        },{
            xtype: 'panel',
            title: 'Attachments',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 5,
            items: [{
                xtype: 'board-edit-upload-toolbar',
                border: '0 0 1 0',
                listeners: {
                    actremoveall: function(tb, btn){
                        var view = tb.nextSibling('viewupload');

                        view.getStore().each(function(rec, idx){
                            rec.drop();
                            if(rec.phantom){
                                view.fileUpload.removeFileFromQueue(rec.id * -1 - 1)
                            }
                        });

                        //view.fileUpload.filesQueue.length = 0;
                        //view.getStore().removeAll();
                    }
                }
            },{
                xtype: 'viewupload',

                cls: 'topic-attach-view',
                overItemCls: "x-item-over",
                itemSelector: "div.thumb-wrap",

                scrollable: true,
                padding: 10,

                flex: 1,

                bind: {
                    store: '{theMessage.filesIns}'
                },

                tpl: new Ext.XTemplate(
                    '<tpl for=".">',
                        '<div class="thumb-wrap x-unselectable">',
                            '<div class="thumb">',
                            '<div class="img" style="padding-bottom: 6px;"><i class="fa fa-file-{type:this.getFileType}-o fa-3x" style="padding-top:0px;"></i></div>',
                                '<div class="title">{name:ellipsis(38)}</div>',
                            '</div>',
                        '</div>',
                    '</tpl>',
                    '<div class="x-clear"></div>',
                    {
                        getFileType: function(v){
                            var a = ['image', 'pdf', 'excel', 'word', 'powerpoint'];

                            for(var i = 0; i < a.length; i++){
                                if(v.indexOf(a[i]) != -1) {
                                    return a[i];
                                }
                            }

                            return 'code';
                        }
                    }
                ),
                listeners: {
                    render: function(c){
                        var toolbar = c.previousSibling('toolbar');

                        toolbar.add(c.fileUpload);
                    },
                    itemdblclick: {
                        fn: 'onItemDblClick'
                    }
                }
            }]
        }
        /*
        {
            xtype: 'board-edit-upload',
            bind: {
                store: '{theMessage.filesInTopics}'
            },
            flex: 5
        }
        */
        ]
    }
});
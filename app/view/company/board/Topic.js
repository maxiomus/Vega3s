
Ext.define('Vega.view.company.board.Topic',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Vega.view.company.board.TopicController',
        'Vega.view.company.board.TopicModel',
        'Vega.view.company.board.Post'
    ],

    alias: 'widget.board-topic',

    controller: 'board-topic',
    viewModel: {
        type: 'board-topic'
    },

    cls: 'topic-view',
    //cls: 'topic-attach-view',
    config: {
        active: null
    },

    scrollable: true,

    style: {
        borderTop: '1px solid #cfcfcf'
    },

    session: true,

    listeners: {
        //render: 'onRender',
        addbookmark: 'onAddBookmark',
        dataitemeditclick: 'onEditButtonClick',
        dataitemdeleteclick: 'onDeleteButtonClick'
    },

    initComponent: function(){
        var me = this;

        //this.tpl = this.createTpl();
        me.dockedItems = this.createToolbar();

        me.items = this.buildItems();
        me.contextmenu = this.buildContextMenu();

        me.callParent();

        var dataview = me.down('board-post');
        me.relayEvents(dataview, ['dataitemeditclick', 'dataitemdeleteclick']);

        // adding attribute target = _blank
        // so every clicks on the links will open in the new tab/window
        Ext.getBody().addListener('click', function (event, el) {
            var clickTarget = event.target;

            if (clickTarget.href && clickTarget.href.indexOf(window.location.origin) === -1) {
                clickTarget.target = "_blank";
            }
        });
    },

    createTpl: function() {
        return new Ext.XTemplate(
            '<div class="body-wrap">',
                '<div class="subject">{subject}</div>',
                '<div class="body">',
                    '<div class="header">',
                        '<div style="font-size: 20px; width: 120px; margin: 0 0 0 16px;"><i class="x-fa fa-user fa-lg"></i> {userId:this.defaultValue}</div>',
                        '<div style="margin: auto;"></div>',
                        '<div style="width: 180px;"><i class="x-fa fa-clock-o fa-lg"></i> {created:this.formatDate}</div>',
                    '</div>',
                    '<div class="content">{content}</div>',
                    //'<div class="post-link {hasAttach}">{Link:this.formatLink(values)}</div>',
                    //'<div>Attachments</div>',
                    '<div class="topic-attach-view">',
                        '<tpl for="files">',
                            '<div class="thumb-wrap x-unselectable file-attachment" fileId="{fileId}">',
                                '<div class="thumb">',
                                    '<div class="img""><i class="fa fa-file-{type:this.getFileType}-o fa-3x"></i></div>',
                                    '<div class="title">{name:ellipsis(38)}</div>',
                                '</div>',
                            '</div>',
                        '</tpl>',
                    '</div>',
                '</div>',
            '</div>',
            {
                getBody: function(a){
                    return Ext.util.Format.stripScripts(a);
                },
                defaultValue: function(a){
                    return a ? a : 'Unknown';
                },
                formatDate: function(a){
                    if (!a) {
                        return '';
                    }
                    return Ext.Date.format(new Date(a), "M j, Y, g: i a");
                },
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
        );
    },

    buildItems: function(){
        return [{
            xtype: 'component',
            //cls: 'topic-view',
            padding: 10,
            itemId: 'inPanel',
            tpl: this.createTpl(),
            listeners: {
                render: 'onComponentRender',
                filedblclick: 'onFileDblClick'
            }
        },{
            xtype: 'board-post'
        }];
    },

    buildContextMenu: function(){
        return Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Add to Bookmark',
                //glyph: 47,
                iconCls: 'x-fa fa-bookmark',
                scope: this,
                handler: 'addBookmark'
            },{
                text: 'Print',
                //glyph: 47,
                iconCls: 'x-fa fa-print',
                scope: this,
                handler: 'printTab'
            }]
        });
    },

    onDestroy: function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    },

    /**
     * Set the active post*
     * @param {Ext.data.Model} rec The record
     */
    setActive: function(rec) {
        var me = this;

        me.active = rec;
        //me.update(rec.data);
        var innerPnl = me.getComponent('inPanel');
        innerPnl.update(rec.data);
    },

    /**
     * Create the top toolbar
     * @private
     * @returns {Ext.toolbar.Toolbar}
     */
    createToolbar: function(){
        var config = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: 'Close',
                iconCls: 'x-fa fa-close',
                handler: function(b){
                    this.close();
                },
                scope: this
            },{
                text: 'Reply',
                iconCls: 'x-fa fa-mail-reply',
                handler: 'onReplyButtonClick'
            },'->',{
                text: 'Print',
                //glyph: 102,
                iconCls: 'x-fa fa-print',
                hidden: true,
                handler: 'printTab',
                scope: this
            }]
        }]

        return config;
    },

    printTab: function() {

        var innerPnl = this.getComponent('inPanel');

        innerPnl.print();
        //console.log(widget);
    },

    addBookmark: function() {
        this.fireEvent('addbookmark', this.active, this);
    }
});

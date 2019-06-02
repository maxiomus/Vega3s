
Ext.define('Vega.view.company.board.Topic',{
    extend: 'Ext.container.Container',

    requires: [
        'Vega.view.company.board.TopicController',
        'Vega.view.company.board.TopicModel'
    ],

    alias: 'board-topic',

    controller: 'board-topic',
    viewModel: {
        type: 'board-topic'
    },

    cls: 'topic-preview',

    scrollable: true,

    style: {
        borderTop: '1px solid #cfcfcf'
    },

    config: {
        active: null
    },

    listeners: {
        addbookmark: 'onAddBookmark',
        render: {
            fn: 'onRender'
        }
    },

    initComponent: function(){
        var me = this;

        //this.tpl = this.createTpl();
        this.dockedItems = this.createToolbar();
        this.items = this.buildItems();
        this.contextmenu = this.buildContextMenu();

        me.callParent();

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
        var me = this;
        return new Ext.XTemplate(
            '<div class="post-data">',
            '<span class="post-date">{CreatedOn:this.formatDate}</span>',
            '<div class="post-title">{Title}</div>',
            '<div class="post-author">by {Author:this.defaultValue}</div>',
            '</div>',
            '<div class="post-link {hasAttach}">{Link:this.formatLink(values)}</div>',
            '<div class="post-body">{Description:this.getBody}</div>',
            {
                getBody: function(value){
                    return Ext.util.Format.stripScripts(value);
                },

                defaultValue: function(v){
                    return v ? v : 'Unknown';
                },

                formatDate: function(value){
                    if (!value) {
                        return '';
                    }
                    return Ext.Date.format(value, 'M j, Y, g:i a');
                },

                formatLink: function(value, data){
                    var rec = me.active,
                        str = '<i class="x-fa fa-paperclip fa-lg"></i><a href="../DLIB/BOARD-ATTACHMENTS/{0}/{1}/{2}/{3}" target="_blank">{4};</a>',
                        tmp = '';

                    var d = new Date(data.CreatedOn),
                        ar = value.split(",");

                    for (i = 0; i <= ar.length - 1; i++) {
                        var path = ar[i];
                        if(rec.filesInArticles().getCount() > 0){
                            rec.filesInArticles(function(files){
                                files.each(function(file){
                                    if(ar[i].toString() === file.data.name){
                                        path = data.ArticleID + '/' + ar[i];
                                    }
                                });
                            });
                        }

                        tmp += Ext.String.format(str, d.getFullYear(), d.getMonth()+1, d.getDate(), path, ar[i]);
                    }

                    return tmp;
                }
            }
        );
    },

    buildItems: function(){
        return [{
            xtype: 'panel',
            itemId: 'inPanel',
            tpl: this.createTpl()
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
        var config = {},
            items = [];

        items.push({
            text: 'Close',
            iconCls: 'x-fa fa-close',
            handler: function(b){
                this.close();
            },
            scope: this
        },{
            text: 'Print',
            //glyph: 102,
            iconCls: 'x-fa fa-print',
            handler: 'printTab',
            scope: this
        });

        config.items = items;
        return Ext.create('Ext.toolbar.Toolbar', config);
    },

    printTab: function() {

        var innerPnl = this.getComponent('innerPnl');

        innerPnl.print();
        //console.log(widget);
    },

    addBookmark: function() {
        this.fireEvent('addbookmark', this.active, this);
    }
});

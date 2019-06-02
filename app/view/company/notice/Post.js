/**
 * @class notice.Post
 * @extend Ext.panel.Panel
 *
 * Show the detail of a notice post
 *
 * @constructor
 * Create a new post
 * @param {Object} config The config object
 */
Ext.define("Vega.view.company.notice.Post",{
    extend: "Ext.panel.Panel",

    alias: 'widget.notice-post',

    requires: [
        "Vega.view.company.notice.PostController",
        "Vega.view.company.notice.PostModel"
    ],

    controller: "notice-post",
    viewModel: {
        type: "notice-post"
    },

    cls: 'post-preview',

    scrollable: true,
    //border: true,

    style: {
        borderTop: '1px solid #cfcfcf'
    },

    config: {
        inTab: false,
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
        this.dockedItems = [this.createToolbar()];
        this.items = this.buildItems();
        this.contextmenu = this.buildContextMenu();

        me.callParent(arguments);

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

                    /*
                    if(rec.filesInArticles().getCount() > 0){
                        rec.filesInArticles(function(files){
                            files.each(function(file){
                                var d = new Date(file.data.created);
                                tmp += Ext.String.format(str, d.getFullYear(), d.getMonth()+1, d.getDate(), file.data.name, file.data.name);
                            })
                        });
                    }
                    else{
                        var d = new Date(data.CreatedOn),
                            ar = value.split(",");

                        for (i = 0; i <= ar.length - 1; i++) {
                            tmp += Ext.String.format(str, d.getFullYear(), d.getMonth()+1, d.getDate(), escape(ar[i]), ar[i]);
                        }

                    }
                    */

                    return tmp;
                }
            }
        );
    },

    buildItems: function(){
        var innerPnl = Ext.create('Ext.panel.Panel', {
            itemId: 'innerPnl'
        });
        innerPnl.tpl = this.createTpl();

        return [innerPnl];
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
        var innerPnl = me.getComponent('innerPnl');
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

        if (!this.inTab) {
            items.push({
                text: 'View in new tab',
                textAlign: 'left',
                width: 120,
                //glyph: 102,
                iconCls: 'x-fa fa-external-link',
                handler: 'openTab',
                scope: this
            });
        }
        else {
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
            // make toolbar with noborder
            //config.cls = 'x-docked-noborder-top';
        }

        config.items = items;
        return Ext.create('Ext.toolbar.Toolbar', config);
    },

    /**
     * Open the post in a new tab
     * @private
     */
    openTab: function(){
        this.fireEvent('open', this, this.active);
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

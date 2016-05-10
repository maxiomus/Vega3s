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
Ext.define("Vega.view.notice.Post",{
    extend: "Ext.panel.Panel",

    alias: 'widget.notice-post',

    requires: [
        "Vega.view.notice.PostController",
        "Vega.view.notice.PostModel"
    ],

    controller: "notice-post",
    viewModel: {
        type: "notice-post"
    },

    cls: 'post-preview',
    scrollable: true,
    border: true,

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
        return new Ext.XTemplate(
            '<div class="post-data">',
            '<span class="post-date">{CreatedOn:this.formatDate}</span>',
            '<div class="post-title">{Title}</div>',
            '<div class="post-author">by {Author:this.defaultValue}</div>',
            '</div>',
            '<div class="post-body">{Description:this.getBody}</div>',
            {
                getBody: function(value, all){
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
                iconCls: 'fa fa-bookmark',
                scope: this,
                handler: 'addBookmark'
            },{
                text: 'Print',
                //glyph: 47,
                iconCls: 'fa fa-print',
                scope: this,
                handler: 'printTab'
            }]
        })
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
                scope: this,
                handler: 'openTab',
                text: 'View in new tab',
                textAlign: 'left',
                width: 120,
                //glyph: 102,
                iconCls: 'fa fa-external-link'
            });
        }
        else {
            items.push({
                scope: this,
                handler: 'printTab',
                text: 'Print',
                textAlign: 'left',
                width: 100,
                //glyph: 102,
                iconCls: 'fa fa-print'
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
        this.fireEvent('opentab', this, this.active);
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

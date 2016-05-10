
Ext.define("Vega.view.Display",{
    extend: "Ext.panel.Panel",

    alias: 'widget.display',

    requires: [
        "Vega.view.DisplayController",
        "Vega.view.DisplayModel"
    ],

    controller: "display",
    viewModel: {
        type: "display"
    },

    scrollable: false,
    border: false,

    cls: 'display',

    width: '100%',

    layout: {
        type: 'auto'
    },

    config: {
        inTab: false,
        active: null
    },

    initComponent: function(){
        var me = this;

        //this.tpl = this.createTpl();
        //this.items = this.buildItems();
        this.dockedItems = [this.createToolbar()];

        me.callParent(arguments);
    },

    /**
     * Set the active post*
     * @param {Ext.data.Model} rec The record
     */
    setActive: function(rec) {
        var me = this;

        me.active = rec;
        me.update(rec.data);

        //var innerPnl = me.getComponent('innerPnl');
        //innerPnl.update(rec.data);
    },

    /**
     * Create the top toolbar
     * @private
     * @returns {Ext.toolbar.Toolbar}
     */
    createToolbar: function(){
        var config = {},
            items = [],
            btnViewTab, btnPrintTab, btnBookmark;

        btnViewTab = Ext.widget('button', {
            handler: "openTab",
            scope: this,
            text: 'View in new tab',
            width: 120,
            //glyph: 102,
            iconCls: 'fa fa-external-link'
        });

        btnPrintTab = Ext.widget('button', {
            handler: "printTab",
            scope: 'controller',
            text: 'Print',
            textAlign: 'left',
            width: 100,
            //glyph: 102,
            iconCls: 'fa fa-print'
        });

        btnBookmark = Ext.widget('button', {
            handler: "bookmarkTab",
            text: 'Add to Bookmark',
            textAlign: 'left',
            width: 120,
            //glyph: 102,
            iconCls: 'fa fa-bookmark'
        });

        if (!this.inTab) {
            items.push(btnViewTab,btnPrintTab);
        }
        else {
            items.push(btnPrintTab, btnBookmark);
            //
            //config.cls = 'x-docked-noborder-top';
        }
        config.items = items;
        return Ext.create('Ext.toolbar.Toolbar', config);
    },

    buildItems: function(){
        var innerPnl = Ext.create('Ext.panel.Panel', {
            itemId: 'innerPnl'
        });

        return [innerPnl];
    },

    /**
     * Open the post in a new tab
     * @private
     */
    openTab: function(btn){
        this.fireEvent('opentab', this, this.active);
    }
});

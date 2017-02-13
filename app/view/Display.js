
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
        node: null,
        active: null
    },

    initComponent: function(){
        var me = this;

        //this.tpl = this.createTpl();
        me.dockedItems = me.createToolbar();

        //this.items = this.buildItems();
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
            btnClose, btnViewTab, btnPrintTab, btnBookmark;

        btnClose = Ext.widget('button', {
            text: 'Close',
            iconCls: 'fa fa-close',
            handler: 'onClose'
        });

        btnViewTab = Ext.widget('button', {
            text: 'View in new tab',
            //glyph: 102,
            iconCls: 'fa fa-external-link',
            handler: "openTab",
            scope: this
        });

        btnPrintTab = Ext.widget('button', {
            text: 'Print',
            //glyph: 102,
            iconCls: 'fa fa-print',
            handler: "printTab"
        });

        btnBookmark = Ext.widget('button', {
            text: 'Add to Bookmark',
            //glyph: 102,
            iconCls: 'fa fa-bookmark',
            handler: "bookmarkTab"
        });

        if (!this.inTab) {
            items.push(btnViewTab, btnPrintTab, {xtype: 'tbfill'});
        }
        else {
            items.push(btnClose, btnPrintTab, btnBookmark, {xtype: 'tbfill'});
        }

        /*
        switch(this.node){
            case 'review':
                items.push(btnRevise, btnAccept);
                break;
        }
        */

        config.reference = 'topbar';
        config.items = items;

        return Ext.create('Ext.toolbar.Toolbar', config);
    },

    /*
    buildItems: function(){
        var innerPnl = Ext.create('Ext.panel.Panel', {
            itemId: 'innerPnl'
        });

        return [innerPnl];
    },
    */

    /**
     * Open the post in a new tab
     * @private
     */
    openTab: function(btn){
        console.log('openTab', this.active);
        this.fireEvent('open', this, this.active);
    }
});

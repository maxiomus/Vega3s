
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

    focusable: true,
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
        active: null,
        // In order to keyboard nav works,
        // Non-focusable must be focusable and tabIndex must be supplied.
        keyHandlers: {
            Q: 'onEnterKey',
            B: 'onPrintKeyPressed'
        }
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            tabIndex: parseInt(me.getId().replace('display-', ''),10)
        });

        //this.tpl = this.createTpl();
        me.dockedItems = me.createToolbar();
        //this.items = this.buildItems();

        me.callParent(arguments);
    },

    afterRender: function(){
        var me = this;
        me.callParent(arguments);
    },

    onDisable: function() {
        this.callParent(arguments); // always!!
    },

    onEnable: function() {
        this.callParent(arguments); // always!!
    },

    onEnterKey: function(event){
        //console.log(this)
        //Ext.Msg.alert('KeyMap', 'You pressed ENTER.');
        event.preventDefault();
        event.stopEvent();

        var tabpanel = this.ownerCt;
        if(event.ctrlKey && this.closable){
            tabpanel.remove(this);
        }
    },

    onPrintKeyPressed: function(e){
        e.stopEvent();

        if(e.ctrlKey){
            var iframe = this.getComponent('contentIframe');

            if(iframe){
                var cw = iframe.getEl().dom.contentWindow;
                //console.log(iframe, cw.document);
                cw.print();
            }
            else{
                //var innerPnl = this.view.items.items[0].ownerCt;
                //var img = innerPnl.down('image');

                var innerPnl = this.getComponent('innerPnl');
                innerPnl.print();
                //console.log(innerPnl)
            }
        }
    },

    /**
     * Set the active post*
     * @param {Ext.data.Model} rec The record
     */
    setActive: function(rec) {
        var me = this;

        me.active = rec;
        me.update(rec.data);

        /*
        var innerPnl = me.getComponent('innerPnl');
        if(innerPnl){
            innerPnl.update(rec.data);
        }
        */
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
            iconCls: 'x-fa fa-close',
            handler: 'onClose'
        });

        btnViewTab = Ext.widget('button', {
            text: 'View in new tab',
            //glyph: 102,
            iconCls: 'x-fa fa-external-link',
            handler: "openTab",
            scope: this
        });

        btnPrintTab = Ext.widget('button', {
            text: 'Print',
            //glyph: 102,
            iconCls: 'x-fa fa-print',
            handler: "printTab"
        });

        btnBookmark = Ext.widget('button', {
            text: 'Add to Bookmark',
            //glyph: 102,
            iconCls: 'x-fa fa-bookmark',
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
        //console.log('openTab', this.active);
        this.fireEvent('open', this, this.active);
    },

    loadIframe: function(){
        var me = this,
            d = Ext.util.Format,
            srcPath = d.format('../services/PowPreviewPrint.ashx?ID={0}', me.active.data.powhId);

        me.removeAll();

        if(me.active.data.revision == -1){
            srcPath = d.format('../services/POWHandler.ashx?date={0}&file={1}', d.date(me.active.data.createdon, 'm/d/Y'), me.active.data.link);
        }

        me.add({
            xtype: "component",
            itemId: "contentIframe",
            autoEl: {
                tag: "iframe",
                style: {height: "100%"},
                width: "100%",
                border: "none",
                src: srcPath
            }
        });
    }
});

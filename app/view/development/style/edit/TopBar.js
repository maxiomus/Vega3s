
Ext.define('Vega.view.development.style.edit.TopBar', {
    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.style-edit-topbar',

    requires: [
        'Vega.view.development.style.edit.TopBarController',
        'Vega.view.development.style.edit.TopBarModel'
    ],
    /*
    controller: 'sample-edit-topbar',
    viewModel: {
        type: 'sample-edit-topbar'
    },
    */
    width: "100%",
    enableOverflow: true,
    defaultActionType: 'button',

    defaults: {
        ui: 'default'
    },

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {

        });
        /*
        me.actNew = Ext.create('Ext.Action', {
            text: "New",
            tooltip: "New",
            iconCls: "x-fa fa-plus-circle",
            handler: function(item, e){
                this.fireEvent("actnew", this, item);
            },
            scope: this
        }),
        me.actCopy = Ext.create('Ext.Action', {
            text: 'Copy',
            tooltip: 'Copy',
            iconCls: 'x-fa fa-copy',
            handler: function(item, e){
                this.fireEvent("actcopy", this, item);
            },
            scope: this
        }),
        me.actEdit = Ext.create('Ext.Action', {
            text: 'Edit',
            tooltip: 'Edit',
            iconCls: 'x-fa fa-edit',
            hidden: true,
            handler: function(item, e){
                this.fireEvent("actedit", this, item);
            },
            scope: this
        }),
        me.actDelete = Ext.create('Ext.Action', {
            text: "Delete",
            tooltip: "Delete",
            //reference: 'delete',
            iconCls: "x-fa fa-minus-circle",
            hidden: true,
            //disabled: true,
            handler: function(item, e){
                this.fireEvent("actdelete", this, item);
            },
            scope: this
        });
        */
        me.items = me.buildItems();

        me.callParent(arguments);
    },

    buildItems: function(){
        var me = this;

        return [{
            iconCls: 'x-fa fa-save',
            //reference: 'save',
            text: 'Save',
            nextStep: 'save',
            tooltip: 'Save the Data',
            formBind: true,
            handler: 'onSave'
        },{
            iconCls: 'x-fa fa-close',
            text: 'Close',
            //glyph:'xf0c7@FontAwesome',
            tooltip: 'Close View',
            handler: 'onClose'
        },{
            xtype: 'buttongroup',
            reference: 'costCrud',
            margin: -8,
            hidden: true,
            items: [{
                text: 'New',
                iconCls: 'x-fa fa-plus-circle',
                //glyph:'xf0c7@FontAwesome',
                tooltip: 'Add Costing',
                //reference: 'add',
                //ui: 'default',
                handler: 'onAddCostClick'
            },
            {
                text: 'Copy',
                iconCls: 'x-fa fa-copy',
                tooltip: 'Duplicate Costing',
                //reference: 'copy',
                bind: {
                    disabled: '{!current.costSheet}'
                },
                handler: 'onCopyCostClick'
            },
            {
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Costing',
                //reference: 'edit',
                bind: {
                    disabled: '{!current.costSheet}'
                },
                handler: 'onEditCostClick'
            },
            {
                text: 'Delete',
                iconCls: 'x-fa fa-remove',
                tooltip: 'Delete Costing',
                //reference: 'remove',
                bind: {
                    disabled: '{!current.costSheet}'
                },
                handler: 'onDeleteCostClick'
            },{
                text: 'Copy From',
                iconCls: 'x-fa fa-flickr',
                handler: 'onCopyFromClick'
            }]
        },{
            xtype: 'buttongroup',
            reference: 'reqCrud',
            margin: -8,
            hidden: true,
            items: [{
                text: 'New',
                iconCls: 'x-fa fa-plus-circle',
                //glyph:'xf0c7@FontAwesome',
                tooltip: 'New Request',
                //reference: 'add',
                //ui: 'default',
                handler: 'onAddReqClick'
            },
            {
                text: 'Copy',
                iconCls: 'x-fa fa-copy',
                tooltip: 'Copy Request',
                //reference: 'copy',
                bind: {
                    disabled: '{!current.quote}'
                },
                handler: 'onCopyReqClick'
            },
            {
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Costing',
                //reference: 'edit',
                bind: {
                    disabled: '{!current.quote}'
                },
                handler: 'onEditReqClick'
            },
            {
                text: 'Delete',
                iconCls: 'x-fa fa-remove',
                tooltip: 'Delete Request',
                //reference: 'remove',
                bind: {
                    disabled: '{!current.quote}'
                },
                handler: 'onDeleteReqClick'
            }]
        },'->',{
            xtype: "cycle",
            //ui: "default",
            ui: 'bootstrap-btn-default',
            //cls:"delete-focus-bg",
            prependText: "Header: ",
            iconCls: "x-fa fa-chevron-left",
            //iconAlign: 'right',
            showText: true,
            reference: "positionBtn",
            changeHandler: "onPositionChange",
            //scope: this.controller,
            menu: {
                items: [{
                    text: "Top",
                    iconCls: "x-fa fa-chevron-up",
                    //reference: 'top',
                    itemId: "top",
                    checked: false
                },{
                    text: "Right",
                    iconCls: "x-fa fa-chevron-right",
                    //reference: 'right',
                    itemId: "right",
                    checked: false
                },{
                    text: "Bottom",
                    iconCls: "x-fa fa-chevron-down",
                    //reference: 'bottom',
                    itemId: "bottom",
                    checked: false
                },{
                    text: "Left",
                    iconCls: "x-fa fa-chevron-left",
                    //reference: 'left',
                    itemId: "left",
                    checked: true
                }]
            }
        }];
    }
});

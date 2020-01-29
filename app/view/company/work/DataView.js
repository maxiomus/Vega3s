
Ext.define('Vega.view.company.work.DataView', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.work-dataview',

    style: {
        border: '1px solid #cfcfcf'
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        padding: 15,
        items: [{
            xtype: 'displayfield',
            name: 'name',
            fieldStyle: 'font-size: 16px',
            hideLabel: true,
            bind: '{sectionName}'
        }]
    },{
        xtype: 'toolbar',
        dock: 'bottom',
        padding: 15,
        items: [
            '@new'
        ]
    }],

    initComponent: function (c) {
        var me = this;

        me.actions = {
            new: Ext.create('Ext.Action', {
                text: "New field",
                tooltip: "Add new field",
                //ui: "default",
                //reference: 'new',
                scale: 'medium',
                iconCls: "x-fa fa-plus",
                //glyph: 'xf044@FontAwesome',
                /**
                 *
                 * @param btn Button
                 * @param e Event
                 */
                handler: function(btn, e){
                    me.fireEvent('actfield', btn, me.down('dataview'));
                },
                scope: me
            })
        };

        Ext.applyIf(me, {
            items: me.buildItems()
        });

        me.callParent(arguments);

        /*
        var topbar = me.down('toolbar[dock="top"]'),
            botbar = me.down('toolbar[dock="bottom"]');

        me.relayEvents(botbar, ['actfield']);
        */
    },

    buildItems: function() {
        var me = this;
        return [{
            xtype: 'dataview',

            scrollable: 'y',
            enableTextSelection: false,

            cls: 'form-data-view',

            overItemCls: "x-item-over",
            itemSelector: "div.form-data-ComponentItem",

            prepareData: function(f, d, e){
                Ext.apply(f, {
                    //viewStatus: localStorage.getItem("pow-seen-" + f.powhId) == "true" ? "visited" : ""
                });
                return f;
            },

            tpl: me.buildTemplate(),

            bind: {
                store: '{theProcess.details}'
            },

            listeners: {
                refresh: function(view, opts){

                    Ext.destroy(this.components);
                    this.components = [];

                    var nodes = view.getNodes(),
                        length = nodes.length,
                        i = 0;

                    for (; i < length; i++){
                        var node = nodes[i],
                            rec = view.getRecord(node),
                            widget;

                        widget = Ext.create('Ext.form.FieldContainer', {
                            viewModel: {
                                data: rec
                            },
                            renderTo: node,
                            layout: 'hbox',
                            items: me.buildComponents()
                        });

                        //widget.setData(rec);
                        this.components.push(widget);
                    }
                }
            }
        }]
    },

    buildComponents: function(){
        var configs = [{
            xtype: 'textfield',
            fieldLabel: '<i class="x-fa fa-ellipsis-v fa-lg"></i><i class="x-fa fa-ellipsis-v fa-lg"></i>',
            ui: 'medium',
            //fieldStyle: 'font-size: 15px',
            emptyText: 'Enter new field name...',
            allowBlank: false,
            flex: 1,
            bind: '{name}'
        },{
            xtype: 'combo',
            ui: 'medium',
            fieldStyle: 'font-family: Open Sans;font-size: 15px;',
            editable: false,
            allowBlank: false,
            displayField: 'name',
            valueField: 'name',
            width: 140,
            bind: '{type}',
            store: {
                field: ['name'],
                data: [{'name':'Date'}, {'name':'Number'}, {'name':'Text input'}, {'name':'Yes / No'}]
            },
            tpl: new Ext.XTemplate('<tpl for=".">' +
                '<div style="font-size: 15px;" class="x-boundlist-item">' +
                '{name}' +
                '</div>' +
                '</tpl>')
        },{
            xtype: 'combo',
            ui: 'medium',
            fieldStyle: 'font-family: Open Sans;font-size: 15px;',
            editable: false,
            allowBlank: false,
            width: 140,
            bind: '{property}',
            store: {
                field:['name'],
                data: [{'name':'Readonly'}, {'name':'Hidden'}, {'name':'Required'}]
            },
            tpl: new Ext.XTemplate('<tpl for=".">' +
                '<div style="font-size: 15px;" class="x-boundlist-item">' +
                '{name}' +
                '</div>' +
                '</tpl>')
        }],
        items = [];

        var i = 0,
            field = 'Ext.form.field.Text';

        configs.forEach(function(config){
            if(i !== 0){
                field = 'Ext.form.field.ComboBox'
            }

            var component = Ext.create(field, config);
            items.push(component);
            i++;
        });

        return items;
    },

    buildTemplate: function () {
        var template = new Ext.XTemplate(
            '<div style="display: flex;">',
                '<div style="border: 1px solid black;width: 100%;">Field name</div>',
                '<div style="border: 1px solid black;width: 140px; margin: 0 0 0 16px;">Type</div>',
                '<div style="border: 1px solid black;width: 140px; margin: 0 0 0 16px;">Settings</div>',
            '</div>',
            '<tpl for=".">',
                '<div class="form-data-ComponentItem">',
                /*
                '<div style="font-size: 14px; margin: auto;"><i class="x-fa fa-ellipsis-v fa-lg"></i><i class="x-fa fa-ellipsis-v fa-lg"></i>{nameText}</div>',
                '<div style="width: 200px; margin: 0 0 0 16px;">{typeCombo}</div>',
                '<div style="width: 200px; margin: 0 0 0 16px;">{propertyCombo}</div>',
                '<div style="width:36px; height:36px; border:1px solid #ADB3B8;border-radius:22px; text-align:center; line-height:32px;"><i style="color: #ADB3B8" class="x-fa fa-trash fa-lg"></i></div>',
                */
                '</div>',
            '</tpl>'
        );

        return template;
    }
});
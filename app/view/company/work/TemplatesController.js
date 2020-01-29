Ext.define('Vega.view.company.work.TemplatesController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.work-templates',

    init: function () {
        var me = this;

        me.mv = Vega.app.getMainView();
    },

    onToolbarAddClick: function(){
        var me = this;

        me.showAddTemplate(null);
    },

    showAddTemplate: function(rec) {
        var me = this,
            view = me.getView();

        me.isEdit = !!rec;

        me.win = view.add({
            xtype: 'window',
            //title: 'Create New Template',
            bind: {
                title: '{title}'
            },

            layout: {
                type: 'fit'
            },

            header: false,
            constrain: true,
            maximized: true,
            //defaultFocus: 'name',

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                height: 70,
                bodyPadding: 10,
                //header: false,
                //padding: 5,
                items: [{
                    xtype: 'textfield',
                    name: 'name',
                    width: 600,
                    fieldLabel: '<i class="x-fa fa-th fa-2x"></i>',
                    labelWidth: 30,
                    labelSeparator: '',
                    allowBlank: false,
                    emptyText: 'Template name...',
                    fieldStyle: {
                        border: 'none',
                        fontSize: '22px'
                    },
                    //flex: 1,
                    bind: '{theProcess.name}'
                },{
                    xtype: 'box',
                    flex: 1
                },{
                    xtype: 'button',
                    //ui: 'bootstrap-btn-success',
                    scale: 'medium',
                    bind: {
                        text: '{saveBtnText}',
                        disabled: '{!formValid}'
                    },
                    handler: function (btn) {
                        me.win.fireEvent('save', this);
                    }
                },{
                    xtype: 'button',
                    //ui: 'bootstrap-btn-default',
                    scale: 'medium',
                    text: 'Cancel',
                    handler: function (btn) {
                        //me.win.fireEvent('cancel', this);
                        me.win.close();
                    }
                }]
            }],

            session: true,

            viewModel: {
                data: {
                    saveBtnText: rec ? 'Save changes' : 'Create template'
                },
                links: {
                    // If we are passed a record, a copy of it will be created in the newly spawned session.
                    // Otherwise, create a new phantom customer in the child.
                    theProcess: rec || {
                        type: 'company.work.Process',
                        create: {
                            creator: Vega.user.data.Userid,
                            created: new Date(),
                            unit: 'Days'
                        }
                    }
                },
                formulas: {
                    processTitle: {
                        bind: '{theProcess.name}',
                        get: function(get) {
                            // bind record therefore get is record not data.
                            //console.log('G', this);
                            this.set('theProcess.title', get);
                            return get;
                        },
                        set: function(value) {
                            //console.log('S', value, this);
                            this.set('theProcess.title', value);
                        }
                    },
                    formValid: {
                        bind: {
                            bindTo: '{theProcess}',
                            deep: true
                        },
                        get: function(get){
                            return get.isValid();
                        }
                    }
                }
            },

            items: [{
                xtype: 'work-form-template'
            }]
        });

        me.win.show('', function() {
            me.mv.mask();
        });

        me.win.on({
            save: 'onSaveTemplate',
            close: function(win){
                if(me.mv.isMasked){
                    me.mv.unmask();
                }
            },
            //save: me.onSaveBoard,
            scope: this
        });
    },

    onSaveTemplate: function (a) {

        var win = this.win,
            form = win.down('work-form-template'),
            isEdit = this.isEdit,
            id;
            //values = form.getForm().getFieldValues();

        if(!form.isValid()){
            return;
        }
        else {
            if(!isEdit){
                id = win.getViewModel().get('theProcess').id;
            }
            win.getSession().save();
            if(!isEdit){
                this.getViewModel().getStore('templates').insert(0, this.getSession().getRecord('company.work.Process', id));
                console.log(this.getViewModel().getStore('templates'))
            }
        }

        console.log(this.getView().getSession().getChanges());
    }
});

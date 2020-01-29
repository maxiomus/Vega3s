Ext.define('Vega.view.company.work.form.TemplateController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.work-form-template',

    init: function () {

    },

    initViewModel: function(vm) {
        var me = this,
            store = vm.get('theProcess.tasks'),
            dataStore = vm.get('theProcess.details');

        store.on({
            datachanged: {
                fn: function (s) {
                    var total = store.getCount();

                    vm.set('taskTotal', total == 0 ? '' : total);

                }
            },
            remove: {
                fn: function (store, recs, index, isMove) {
                    var card = me.lookupReference('card-base'),
                        //task = me.lookupReference('task-detail'),
                        process = me.lookupReference('process-detail'),
                        task = me.lookupReference('task-detail');

                    if(process){
                        card.getLayout().setActiveItem(process);
                    }
                    else {
                        if(task){
                            task.destroy();
                        }
                    }
                }
            }
        });

        dataStore.on({
            datachanged: {
                fn: function (s) {

                }
            },
            update: {
                fn: function (store, rec, op, mod, det) {
                    //console.log(store, rec, op, mod, det);
                    var process = me.lookupReference('process-detail');

                    if(process && op == 'edit' && mod[0] == 'name'){
                        var button = process.lookupReference('btnAddMenu'),
                            txtProcessTitle = process.lookupReference('txtProcessTitle'),
                            menu = button.getMenu();

                        menu.insert(0, {
                            text: rec.data.name,
                            scale: 'medium',
                            //ui: "default",
                            minHeight: 30,
                            handler: function (item, e) {
                                var oValue = txtProcessTitle.getValue();
                                txtProcessTitle.setValue(oValue + '{' + rec.data.name + '}');
                            }
                        })
                    }
                }
            },
            add: { 
                fn: function (store, recs, index) {
                    //console.log(recs);

                }
            },
            remove: {
                fn: function (store, recs, index, isMove) {
                    var process = me.lookupReference('process-detail');

                    if(process){
                        var button = process.lookupReference('btnAddMenu'),
                            txtProcessTitle = process.lookupReference('txtProcessTitle'),
                            menu = button.getMenu();

                        recs.forEach(function (rec, index, self) {
                            var found = 0;
                            menu.items.each(function (item, index, len) {
                                if(rec.data.name == item.text){
                                    found = index;
                                }
                            });

                            menu.remove(menu.items.getAt(found));
                        });

                    }
                }
            }
        });
        //console.log(vm.get('theProcess.details'));
    },

    /**
     *
     * @param btn
     * @param comp
     */
    onToolbarStartClick: function(btn,comp){
        //console.log(btn.aType);
        var me = this,
            view = me.getView(),
            tab = view.lookupReference('data-form'),
            grid = view.down('work-order');

        this.showDetailForm(btn.aType, null);

        tab.setDisabled(false);
        grid.getAction('task').setDisabled(false);
        grid.getAction('approval').setDisabled(false);

    },

    onToolbarTaskClick: function(btn,comp){
        this.addNewTask(btn.aType);
    },

    onToolbarApprovalClick: function (btn,comp) {
        this.addNewTask(btn.aType);
    },

    onOrderGridRowDblClick: function(view, rec, el, index){
        this.showDetailForm('task', rec);
    },

    onOrderGridCellClick: function(tb, td, cIdx, rec, tr, rIdx, e){

        if(cIdx == 4){
            var sm = tb.getSelectionModel();
            //rec = view.getStore().getAt(rowIndex);
            rec.drop();

            if(sm.selected){
                sm.deselectAll();
            }

            return false;
        }

        this.showDetailForm('task', rec);
    },
    /*
    onToolbarFieldClick: function(btn, view, e){
        var store = view.getStore();

        var nr = store.insert(0, {
            //name: 'New field name',
            type: 'Text input',
            property: 'Required'
        });

        view.refresh();
        console.log(view, store);
    },
    */
    onToolbarFieldClick: function(btn, grid, e){
        var rowEdit = grid.getPlugins()[0],
            store = grid.getStore();
        //console.log(grid, store);

        rowEdit.cancelEdit();
        var nr = store.insert(0, {
            //name: 'New field name',
            type: 'Text input',
            property: 'Required'
        });

        rowEdit.startEdit(nr[0], 0);
    },

    addNewTask: function(com){
        var me = this,
            view = me.getView(),
            grid = view.down('work-order'),
            store = grid.getStore();

        var nr = store.insert(0, {
            creator: Vega.user.data.Userid,
            created: new Date(),
            type: com,
            unit: 'Days'
        });
    },

    showDetailForm: function(com, rec){
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            refs = view.getReferences(),
            //navi = refs['navigate-menu'],
            card = refs['card-base'],
            //view = refs['board-base']
            prefix = 'work-form-',
            postfix = '-detail',
            config = {
                reference: com+postfix
            },
            item = view.lookupReference(com+postfix);

        if(!item){
            if(com == 'task'){
                config.links = {
                    // If we are passed a record, a copy of it will be created in the newly spawned session.
                    // Otherwise, create a new phantom customer in the child.
                    theTask: rec
                }
            }

            item = Ext.widget(prefix+com, config);
        }

        card.getLayout().setActiveItem(item);
    }
    
});

Ext.define('Vega.view.company.board.DefaultController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Vega.model.company.Board',
        'Vega.model.company.tree.Board',
        'Vega.model.company.tree.BoardTopic'
    ],

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.board-default',

    listen: {
        controller: {
            'board-window': {
                //save: 'onSaveTreeNode'
            }
        }
    },

    init: function(){
        var me = this;
        me.mv = Vega.app.getMainView();
    },

    onTreeItemClicked: function(view, rec, item, index, eOpts) {

        //console.log('tree itemclick.', rec);
        /*
        var store = this.getStore('topics'),
            afilter = [];

        store.clearFilter();

        if (rec.data.mtype == 'board') {
            //afilter = new Ext.util.Filter();

            afilter.push({
                property: 'boardId',
                value: parseInt(rec.get('id'), 10)
            });

        }
        else if (rec.data.mtype == 'category') {
            //afilter = new Ext.util.Filter();

            afilter.push({
                property: 'boardId',
                value: parseInt(rec.get('parentId'), 10)
            },{
                property: 'categoryId',
                value: parseInt(rec.get('categoryId'), 10)
            });
        }

        store.filter(afilter);

        store.load({
            callback: function(records, options, success) {
                //console.log('store load', store);
            }
        });
        */

        /*
        var store = tree.getStore();

        Ext.apply(store.getProxy().extraParams, {
            board: record.get('id')
        });

        store.load({
            callback: function(records, options, success) {
                //console.log(records)

            }
        });
        */
    },

    onTreeSelect: function(selModel, rec, index){

    },

    onTreeSelectionChange: function(selModel, selection){
        var panel = this.getView().lookupReference('board-panel');
        //console.log(panel, this.getView().getReferences()['board-panel'], selModel, selection);

        if(!selection.data.root){
            if(panel != null){
                var topicStore = panel.getViewModel().getStore('topics');
                topicStore.load({
                    callback: function(records, options, success) {
                        //console.log('store load', store);
                    }
                });
            }
        }
        /*
        var me = this,
            view = me.getView(),
            tree = view.lookupReference('navigate-tree'),
            board = view.query('board-view')[0],
            button = tree.down('#add-button'),
            selectedNode;

        //console.log('onTreeSelectionChange', board, selection[0])

        if(selection.length){
            selectedNode = selection[0];

            if (selectedNode instanceof Vega.model.company.tree.Board) {
                tree.addClass = Vega.model.company.tree.BoardCategory;
                button.setText('Add Category');
                button.enable();
            } else if (selectedNode instanceof Vega.model.company.tree.BoardCategory) {
                tree.addClass = Vega.model.company.tree.BoardTopic;
                button.setText('Add Topic');
                button.enable();
            } else {
                button.disable();
            }
        } else {
            tree.addClass = Vega.model.company.tree.Board;
            button.setText('Add Board');
            button.enable();
        }
        */
    },

    onItemDblClick: function(dataview, rec, item, index, event){
        var me = this,
            view = me.getView(),
            tree = view.lookupReference('navigate-tree');

        tree.selModel.select(tree.getStore().getNodeById(rec.getId()));
    },

    /**
     *
     * @param bc Ext.toolbar.Breadcrumb
     * @param node Ext.data.TreeModel
     * @param prev Ext.data.TreeModel
     */
    onBreadCrumbChange: function(bc, node, prev){
        //console.log('onBreadCrumbChange', node, prev)
        if(node){
            this.redirectTo('board/' + node.data.id);

            this.navigateBoards(node.data.id);
        }
    },

    onToolbarAddClick: function(){
        var me = this;

        if(!Vega.user.inRole('managers')){
            Ext.Msg.alert('Warning', 'you do not have enough access privileges for this operation.');
        }
        else {
            me.showAddForm(null);
        }
    },

    showAddForm: function(rec) {
        var me = this,
            view = me.getView();

        me.win = view.add({
            xtype: 'board-window',
            title: 'Add Message Board',
            defaultFocus: 'name',
            isEdit: !!rec,

            viewModel: {
                links: {
                    theBoard: rec || {
                        type: 'company.Board',
                        create: {
                            userId: Vega.user.get('Userid'),
                            created: new Date(),
                            topTotal: 0,
                            status: 1
                        }
                    }
                }
            },

            width: window.innerWidth < 1360 ? (view.getWidth() * 0.7) : 800,
            height: window.innerHeight < 760 ? (view.getHeight() * 0.45) : 320,

            items: [{
                xtype: 'add-board'
            }],

            session: true
        });

        me.win.show('', function() {
            me.mv.mask();
        });

        me.win.on({
            cancel: function (b) {
                me.win.close();
            },
            save: me.onSaveTreeNode,
            //save: me.onSaveBoard,
            scope: this
        });
    },

    onToolbarManageClick: function() {
        this.showManageBoard();
    },

    /*
    onMenuItemBoardClick: function() {
        this.showManageBoard(null);
    },

    onMenuItemCategoryClick: function() {
        this.showManageCategory();
    },
    */

    showManageBoard: function (rec) {
        var me = this,
            view = me.getView();

        me.win = view.add({
            xtype: 'board-window',
            title: 'Manage Message Board',

            saveButton: null,

            width: window.innerWidth < 1360 ? (view.getWidth() * 0.7) : 1024,
            height: window.innerHeight < 760 ? (view.getHeight() * 0.9) : 640,

            items: [{
                xtype: 'tabpanel',
                items: [{
                    xtype: 'manage-board'
                },{
                    xtype: 'manage-category'
                }]
            }]
        });

        me.win.on({
            cancel: function (b) {
                me.win.close();
            },
            //save: me.onSaveTreeNode,
            save: me.onSaveBoard,
            scope: this
        });

        me.win.show('', function() {
            me.mv.mask();
        });
    },

    showManageCategory: function () {
        var me = this,
            view = me.getView();

        me.win = view.add({
            xtype: 'board-window',
            title: 'Manage Category',

            width: window.innerWidth < 1360 ? (view.getWidth() * 0.7) : 1024,
            height: window.innerHeight < 760 ? (view.getHeight() * 0.9) : 640,

            items: [{
                xtype: 'manage-category'
            }]
        });

        me.win.on({
            cancel: function (b) {
                me.win.close();
            },
            //save: me.onSaveTreeNode,
            save: me.onSaveBoard,
            scope: this
        });

        me.win.show('', function() {
            me.mv.mask();
        });
    },

    navigateBoards: function(id){
        if(!id){
            //id = 'base';
        }

        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = vm.get('areas'),
            refs = view.getReferences(),
            navi = refs['navigate-menu'],
            center = refs['center-base'],
            //view = refs['board-base'],
            item = view.lookupReference('board-' + (id === 'root' ? id : 'panel'));

        if(navi.getStore() == null){
            navi.setStore(store);
        }

        var nd = store.findNode('id', id);
        //Breadcrumb setSelection only accept Node not Record...
        navi.setSelection(nd);

        if(!item) {
            if(nd.data.root){
                item = Ext.widget('container', {
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    header: false,
                    reference: 'board-root',
                    //routeId: 'board',
                    items: [{
                        xtype: 'toolbar',
                        border: '1 0 1 0',

                        items: [{
                            text: 'Refresh',
                            iconCls: 'x-fa fa-refresh',
                            handler: function(b){
                                store.load(function (recs, op, success) {
                                    var boardStore = item.down('board-view').getStore();
                                    boardStore.load();
                                })

                            }
                        }]
                    },{
                        xtype: 'board-view',
                        title: nd.data.text,
                        cls: 'board-view',
                        flex: 1,
                        bind: {
                            store: '{boards}'
                        }
                    }]
                });
            }
            else {
                item = Ext.widget('board-panel', {
                    reference: 'board-panel',
                    routeId: 'board',
                    items: [{
                        xtype: 'board-grid',
                        iconCls: 'x-fa fa-folder-o',
                        reference: 'grid',
                        flex: 1
                        //session: true,
                    }]
                });

                if (nd.data.mtype == 'board') {


                }
                else if(nd.data.mtype == 'category'){
                    //item = view.lookupReference('board-' + nd.data.parentId);
                }
            }
        }

        if(!nd.data.root){
            item.getViewModel().set({
                boardId: nd.data.id,
                title: nd.data.text
            });
        }

        center.getLayout().setActiveItem(item);
    },

    onSaveTreeNode: function(win, data){
        var me = this,
            view = me.getView(),
            tree = view.lookupReference('navigate-tree'),
            target = tree.selModel.getSelection()[0] || tree.getRootNode(),
            //inputField = tree.down('#new-name'),
            //value = inputField && inputField.getValue(),
            store = tree.getStore(),
            node;

        node = {
            name: data.name,
            text: data.name,
            desc: data.desc,
            status: data.status,
            created: new Date(),
            children: [],
            mtype: 'board',
            leaf: true
        };

        var newBoard = Ext.create('Vega.model.company.tree.Board', node);
        node = target.appendChild(newBoard);

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.mv
        });

        processMask.show('', function(){
            win.close();
        });

        newBoard.save({
            failure: function(record, operation) {
                // do something if the save failed
                processMask.hide('', function(){
                    Ext.Msg.alert('Status', 'Error occurred!');
                });
            },
            success: function(record, operation) {
                // do something if the save succeeded
                //console.log('Board Save', record);
                me.getStore('boards').load({
                    callback: function(records, options, success) {
                        //console.log('store load', store);
                        processMask.hide('', function() {
                            Ext.Msg.alert('Status', 'Changes saved successfully.');
                        });
                    }
                });
            },
            callback: function(record, operation, success) {
                // do something whether the save succeeded or failed

            }
        });

        // User might want to see what they've just added!
        if (!target.isExpanded()) {
            target.expand(false);
        }

        // tree.selModel.select(node); select newly created node...
        //tree.selModel.select(node);
    },

    onSaveBoard: function(win, values){
        var me = this,
            isEdit = win.isEdit,
            view = me.getView(),
            tree = view.lookupReference('navigate-tree'),
            target = tree.selModel.getSelection()[0] || tree.getRootNode(),
            dataview = view.down('board-view'),
            rec = dataview.getSelectionModel().getSelection()[0],
            id, data = [];

        if (!isEdit) {
            // Since we're not editing, we have a newly inserted record. Grab the id of
            // that record that exists in the child session
            id = win.getViewModel().get('theBoard').id;
        }

        win.getSession().save();

        if (!isEdit) {
            // Use the id of that child record to find the phantom in the parent session,
            // we can then use it to insert the record into our store
            rec = view.getSession().getRecord('company.Board', id);

            var node = Ext.create('Vega.model.company.tree.Board', {
                name: values.name,
                text: values.name,
                desc: values.desc,
                status: values.status,
                children: [],
                mtype: 'board',
                leaf: true
            });

            target.appendChild(node);

            dataview.getStore().insert(0, rec);
        }

        var batch = view.getSession().getSaveBatch();

        //console.log(view.getSession(), batch, values);

        me.processBatch(batch);
    },

    processBatch: function (batch) {
        var me = this;

        if(batch !== undefined){
            var processMask = new Ext.LoadMask({
                msg: 'Saving... Please wait',
                target: me.mv
            });

            batch.on({
                operationcomplete: function(batch, op){
                    //console.log(op, op.getResultSet());
                    var objResp = op.getResponse();
                    if(!Ext.isEmpty(objResp)){
                        var response = JSON.parse(objResp.responseText);
                    }
                },
                complete: function(batch, op){
                    //console.log(op, op.getResponse());
                    var objResp = op.getResponse();
                    if(!Ext.isEmpty(objResp)){
                        var response = JSON.parse(objResp.responseText);
                        console.log(response);
                    }

                    processMask.hide('', function() {
                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                    });
                },
                exception: function(batch, op){
                    processMask.hide('', function(){
                        //Ext.Msg.alert('Error', 'Error occurred');
                        var objResp = op.error.response;
                        //console.log(objResp)
                        if(!Ext.isEmpty(objResp)){
                            var response = JSON.parse(objResp.responseText);
                            Ext.Msg.alert(objResp.statusText, objResp.responseText);
                        }

                    });
                }
            });

            processMask.show('', function(){
                //me.onCancelTap();
            });

            batch.start();
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
    }

});

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
                save: 'onSaveTreeNode'
            }
        }
    },

    onBeforeTopicsLoad: function(store, op){
        var me = this,
            view = me.getView(),
            tree = view.lookupReference('navigate-tree'),
            rec = tree.selModel.getSelection()[0];

        //console.log(tree.selModel.getSelection()[0]);
        Ext.apply(store.getProxy().extraParams, {
            extra: rec.data.id // boardId
        });
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
        //console.log(selModel, selection);

        if(!selection.data.root){
            var store = this.getStore('topics');
            store.load({
                callback: function(records, options, success) {
                    //console.log('store load', store);
                }
            });
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
            //this.redirectTo('settings/' + node.data.routeId);

            this.navigateBoards(node.data.id);
        }
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
            item = view.lookupReference('board' + id);

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
                    reference: 'board' + id,
                    items: [{
                        xtype: 'toolbar',
                        border: '1 0 0 0',

                        items: [{
                            text: 'Refresh',
                            iconCls: 'x-fa fa-refresh',
                            handler: function(b){
                                var store = b.ownerCt.ownerCt.down('board-view').getStore();
                                store.reload();
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
                //item = view.query('board-panel[reference=board_' + id + ']')[0];
                if (nd.data.mtype == 'board') {

                    item = Ext.widget('board-panel', {
                        reference: 'board' + id,
                        items: [{
                            xtype: 'board-grid',
                            title: nd.data.text,
                            iconCls: 'x-fa fa-folder-o',
                            store: 'topics',

                            columns: me.buildTopicColumns()
                        }]
                    })

                }
                else if(nd.data.mtype == 'category'){
                    item = view.lookupReference('board' + nd.data.parentId);
                }
            }

        }

        center.getLayout().setActiveItem(item);
    },

    buildTopicColumns: function(){
        return [{
            text: "Title",
            dataIndex: "subject",
            flex: 1,
            renderer: function(value, f, rec){
                var xf = Ext.util.Format;
                return Ext.String.format(
                    '<div class="topic">' +
                    '<span class="title">{0}</span>' +
                    '<i style="float: right" class="x-fa fa-paperclip fa-lg {1}"></i>' +
                    '<span class="author">Posted by {2}, last updated {3}</span>' +
                    '</div>',
                    value, rec.get('hasAttach') ? '': 'hidden', rec.get("userId")|| "Unknown", xf.date(rec.get('created'), 'M j, Y, g:i a'))
            }

        },
        {
            text: 'User',
            dataIndex: 'userId',
            hidden: true
        },
        {
            text: "Replies",
            dataIndex: "postTotal"
        }];
    },

    showAddForm: function() {
        var me = this,
            view = me.getView();

        if(!Vega.user.inRole('managers')){
            Ext.Msg.alert('Warning', 'you do not have enough access privileges for this operation.');
        }
        else {
            me.win = view.add({
                xtype: 'board-window',
                title: 'Add Message Board',

                viewModel: {
                    links: {
                        theBoard: {
                            type: 'Vega.model.company.Board',
                            create: {
                                userId: Vega.user.get('Userid'),
                                status: 1
                            }
                        }
                    }
                },

                width: window.innerWidth < 1360 ? (view.getWidth() * 0.7) : 800,
                height: window.innerHeight < 760 ? (view.getHeight() * 0.45) : 320,

                items: [{
                    xtype: 'add-board'
                }]
            });
        }

        me.win.show();
    },

    showManageBoard: function () {
        var me = this,
            view = me.getView();

        me.win = view.add({
            xtype: 'board-window',
            title: 'Manage Message Board',

            width: window.innerWidth < 1360 ? (view.getWidth() * 0.7) : 1024,
            height: window.innerHeight < 760 ? (view.getHeight() * 0.9) : 640,

            items: [{
                xtype: 'manage-board'
            }]
        });

        me.win.show();
    },

    showManageCategory: function () {
        var me = this,
            view = me.getView();

        me.win = view.add({
            xtype: 'board-window',
            title: 'Manage Category',

            saveButton: null,

            width: window.innerWidth < 1360 ? (view.getWidth() * 0.7) : 1024,
            height: window.innerHeight < 760 ? (view.getHeight() * 0.9) : 640,

            tbar: {
                xtype: "company-board-topbar",
                reference: "topbar"
            },

            items: [{
                xtype: 'manage-category'
            }]
        });

        me.win.show();
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
            children: [],
            mtype: 'board',
            leaf: true
        };

        var newBoard = Ext.create('Vega.model.company.tree.Board', node);
        node = target.appendChild(newBoard);

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.view
        });

        processMask.show('', function(){
            me.win.close();
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

    onSaveBoard: function(win, data){
        var me = this,
            vm = me.getViewModel(),
            session = vm.getSession(),
            batch = session.getSaveBatch(),
            changes = session.getChanges();

        //console.log(session, batch, changes);

        /*
        if(batch !== undefined){
            var processMask = new Ext.LoadMask({
                msg: 'Saving... Please wait',
                target: me.view
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

         */
    }

});

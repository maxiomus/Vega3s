Ext.define('Vega.view.settings.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.settings-grid',

    init: function(c){

    },

    onRowSelect: function(rm, rec, idx){
        var me = this,
            grid = me.getView();

        Ext.each(grid.getColumns(), function(col, idx){
            if(col.dataIndex == 'code'){
                col.getEditor().setDisabled(!rec.phantom);
                return false;
            }
        });
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var sm = h.getSelectionModel();

        if(!sm.isSelected(g)){
            sm.select(g);
        }

        this.view.contextmenu.showAt(l.getXY());
    },

    /**
     *
     * @param ct Ext.grid.header.Container
     * @param column Ext.grid.column.Column
     * @param e Ext.event.Event
     * @param t HTMLElement
     */
    onGridCellClick: function(view, td, cIdx, rec, tr, rIdx, e){
        var me = this,
            grid = me.getView(),
            column = grid.getColumns()[cIdx],
            topbar = me.lookupReference('topbar'),
            search = topbar.lookupReference('searchfield');

        search.paramName = column.dataIndex;

        column.focus();
        //console.log(grid.getHeaderContainer(), grid.getColumns()[cIdx].focus(), column.dataIndex)
    },

    onToolbarAddClick: function(b, e){

        var me = this,
            grid = me.getView(),
            rowEdit = grid.getPlugins()[0],
            store = grid.getStore();

        rowEdit.cancelEdit();
        var nr = store.insert(0, {
            displayCheck: 1
        });
        rowEdit.startEdit(nr[0], 0);
    },

    onToolbarCopyClick: function(b, e){
        var me = this,
            grid = me.getView(),
            rowEdit = grid.getPlugins()[0],
            rec = grid.getSelection()[0];

        rowEdit.cancelEdit();
        var nr = rec.copy(null);
        grid.getStore().insert(0, nr);
        rowEdit.startEdit(nr, 0);

    },

    onToolbarEditClick: function(b, e){
        var me = this,
            grid = me.getView(),
            rowEdit = grid.getPlugins()[0],
            store = grid.getStore(),
            rec = grid.getSelection()[0];

        rowEdit.cancelEdit();

        rowEdit.startEdit(rec, store.indexOf(rec));
    },

    onToolbarRemoveClick: function(b, e){
        var me = this,
            grid = me.getView(),
            sm = grid.getSelectionModel();

        Ext.Array.each(sm.getSelection(), function(rec, idx, a){
            rec.drop();
        });

        //console.log(sm.selected);
        if(sm.selected){
            sm.deselectAll();
        }
    },

    onToolbarRefreshClick: function(b, e){
        var me = this,
            store = me.getView().getStore();

        store.reload();
    },

    onToolbarSaveClick: function(b, e){
        var me = this,
            vm = me.getViewModel(),
            session = vm.getSession(),
            batch = session.getSaveBatch(),
            changes = session.getChanges();

        //console.log(vm, session, changes);

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

            });
            batch.start();
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
    }
});

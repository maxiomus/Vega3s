Ext.define('Vega.view.company.board.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.board-grid',

    onRowSelect: function(rm, rec, idx){
        var me = this,
            grid = me.getView();

    },

    /**
     *
     * @param h {Object} tableview
     * @param j {Object} record
     * @param k
     * @param g
     * @param l
     */
    onItemContextMenu:function(h, j, k, g, l){

        l.stopEvent();

        var me = this,
            //topbar = me.lookupReference('topbar'),
            sm = h.getSelectionModel();

        if(!sm.isSelected(g)){
            sm.select(g);
        }

        me.view.contextmenu.items.items[0].setDisabled(!(Vega.user.userOwn(j.data.userId)));
        me.view.contextmenu.items.items[1].setDisabled(j.data.postTotal || !(Vega.user.userOwn(j.data.userId)));

        me.view.contextmenu.showAt(l.getXY());
    },

    /**
     *
     * @param ct Ext.grid.header.Container
     * @param column Ext.grid.column.Column
     * @param e Ext.event.Event
     * @param t HTMLElement
     */
    onCellClick: function(view, td, cIdx, rec, tr, rIdx, e){
        var me = this,
            grid = me.getView(),
            column = grid.getColumns()[cIdx],
            topbar = me.lookupReference('topbar'),
            search = topbar.lookupReference('searchfield');

        search.paramName = column.dataIndex;

        column.focus();
        //console.log(grid.getHeaderContainer(), grid.getColumns()[cIdx].focus(), column.dataIndex)
    },

    onClearFilters: function(b){
        var me = this,
            layout = me.view.lookupReference("multiview"),
            topbar = layout.lookupReference("topbar"),
            searchcombo = topbar.lookupReference('searchcombo'),
            searchfield = topbar.down('gridsearchfield'),
            grid = layout.lookupReference("grid");

        searchcombo.setValue('');
        searchcombo.getTrigger('clear').hide();
        searchfield.setValue('');
        searchfield.getTrigger('clear').hide();

        // Clear Sort...
        grid.getStore().sorters.clear();
        // Clear Grid filters...
        grid.filters.clearFilters();
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

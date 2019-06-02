Ext.define('Vega.view.settings.task.PlanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.task-plan',

    requires: [
        'Vega.model.Tnarole',
        'Vega.model.Tna'
    ],

    init: function(view){

    },

    initViewModel: function(vm){
        //console.log(vm, this.lookup('seqGrid').getStore())
    },

    onSeqBeforeload: function(store, op){
        //console.log(store);
    },

    onRoleSelect: function(view, rec){
        //console.log(this.getViewModel(), rec.tnas());
        rec.tnas().on('beforeload', function(s){
            //console.log('b', s);
        });
    },

    onActivitySelect: function(c, rec){
        var grid = this.lookupReference('seqGrid'),
            sm = grid.getSelectionModel(),
            selected = sm.getSelection();

        Ext.Array.each(selected, function(record, index, self){
            record.set('descript', rec.data.text);
        });
    },

    onActivityRenderer: function(val, metaData, rec, rowIndex, colIndex, store, view){
        var me = this,
            activities = me.getViewModel().getStore('activities');

        var idx = activities.findExact('id', val);
        if(idx != -1){
            var rs = activities.getAt(idx).data;
            return rs.text;
        }
    },

    onActNew: function(b, e){
        var grid = this.lookupReference('roleGrid');

        grid.getStore().add({
            active: true
        });
    },

    onActCopy: function(b, e){
        var session = this.getViewModel().getSession(),
            grid = this.lookupReference('roleGrid'),
            selected = grid.getSelection();

        Ext.Array.each(selected, function(rec, idx, a){

            var nr = rec.copy(null, session);

            rec.tnas().each(function (r) {

                var nd = r.copy(null, session);

                nr.tnas().add(nd);
            });

            grid.getStore().add(nr);
        });

    },

    onActDelete: function(b, e){
        var grid = this.lookupReference('roleGrid'),
            selected = grid.getSelection();

        Ext.Array.each(selected, function(rec, idx, a){
           rec.drop();
        });
    },

    onActRefresh: function(b, e){
        var store = this.getViewModel().getStore('roles');

        store.reload();
    },

    onActAdd: function(b, e){
        var grid = this.lookupReference('seqGrid'),
            store = grid.getStore();

        store.add({
            active: true
        });

        store.each(function(rec,idx){
            rec.set('priority', (idx+1) * 10);
        });
    },

    onActRemove: function(b, e){
        var grid = this.lookupReference('seqGrid'),
            selected = grid.getSelection();

        Ext.Array.each(selected, function(rec, idx, a){
            rec.drop(false);
        });
    },

    onActSave: function(b, e){
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

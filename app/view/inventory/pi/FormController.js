Ext.define('Vega.view.inventory.pi.FormController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.pi-form',

    requires: [
        'Vega.model.PIH',
        'Vega.model.PI'
    ],

    init: function(){
        var vm = this.getViewModel();
        //console.log('init', vm.linkData.thePhysical);
        console.log('init', this.getReferences())
    },

    initViewModel: function(vm) {

        var rec = vm.linkData.thePhysical;
        console.log('initViewModel', vm.linkData)
    },

    // Materials...
    onAddMaterialClick: function(btn){
        var me = this,
        //form = me.getView(),
            refs = this.getReferences(),
        //bomGrid = this.lookupReference('boms'),
            rowEditing = refs.boms.getPlugin("rowEditing");

        //console.log(refs, refs.style);
        rowEditing.cancelEdit();

        var rec = Ext.create('Vega.model.Bom', {
            style: refs.style.getValue(),
            color: refs.color.getValue()
        });

        refs.boms.getStore().insert(0, rec);
        rowEditing.startEdit(rec, 0);
    },

    onCopyMaterialClick: function(btn){
        var me = this,
            refs = me.getReferences(),
            session = me.getViewModel().getSession(),
            grid = refs.boms,
            d = grid.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', d);
        grid.getStore().add(nd);

        /*
         d.powms().each(function (m) {
         nd.powms().add(m.copy(null, session));
         console.log('materials',m)
         });

         d.tnaps().each(function (p) {
         nd.tnaps().add(p.copy(null, session));
         console.log('tnaps', m)
         });
         */
        //console.log('onCopyStyleClick', d, nd);
        //grid.getView().refresh();
    },

    onEditMaterialClick: function(btn){
        var me = this,
            refs = this.getReferences(),
            grid = refs.boms,
            selection = grid.getSelection()[0],
            rowEditing = refs.boms.getPlugin("rowEditing");

        rowEditing.cancelEdit();
        rowEditing.startEdit(selection, 0);
        //me.fireEvent('rowdblclick', )
    },

    onDeleteMaterialClick: function(btn){
        var me = this,
            refs = me.getReferences(),
            grid = refs.boms,
            store = grid.getStore(),
            rowEditing = grid.getPlugin("rowEditing"),
            selection = grid.getSelectionModel().getSelection()[0];

        rowEditing.cancelEdit();
        //store.remove(grid.getSelection()[0]);
        selection.drop();
        grid.getSelectionModel().deselectAll();

    },

    onPositionChange: function(btn, active){
        var tabpanel = this.lookupReference('tabs');

        tabpanel.setBind({
            tabPosition: active.itemId
        });
    },

    onTabChange: function(t, n, o, e){

    },

    onSave: function(action){
        var me = this,
            view = me.getView(),
            viewer = view.up('viewer'),
            vm = me.getViewModel(),
            rec = vm.get('thePhysical'),
            session = vm.getSession(),
            changes = session.getChanges();

        if(view.isValid()){

            var batch = session.getSaveBatch();

            //changes = session.getChanges();
            //console.log(changes, batch);
            var processMask = new Ext.LoadMask({
                msg: 'Saving... Please wait',
                target: viewer
            });

            if(batch !== undefined){
                batch.on({
                    complete: function(batch, op){

                        var response = JSON.parse(op.getResponse().responseText);
                        //console.log(response);
                        //refresh In-Review
                        me.onClose();

                        processMask.hide('', function() {
                            Ext.Msg.alert('Status', 'Changes saved successfully.');
                        });
                        /*
                         new Ext.window.Window({
                         autoShow: true,
                         title: 'Session Changes',
                         modal: true,
                         width: 600,
                         height: 400,
                         layout: 'fit',
                         items: {
                         xtype: 'textarea',
                         value: JSON.stringify(changes, null, 4)
                         }
                         });
                         */
                    },
                    exception: function(){
                        processMask.hide('', function(){
                            Ext.Msg.alert('Error', 'Error occurred');
                        });
                    }
                });

                processMask.show();
                batch.start();
            }
            else {
                Ext.Msg.alert('No Changes', 'There are no changes to the session.');
            }

            //var changes = me.getView().getSession().getChanges();
            /*
             if (changes !== null) {
             new Ext.window.Window({
             autoShow: true,
             title: 'Session Changes',
             modal: true,
             width: 600,
             height: 400,
             layout: 'fit',
             items: {
             xtype: 'textarea',
             value: JSON.stringify(changes, null, 4)
             }
             });
             }
             else {
             Ext.Msg.alert('No Changes', 'There are no changes to the session.');
             }
             */
        }
    },

    onClose: function(btn, e){
        var me = this,
            viewer = me.getView().up('viewer');

        viewer.remove(me.getView());
    }
    
});

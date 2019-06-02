Ext.define('Vega.view.development.style.ProductController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.product',

    listen: {
        component: {
            'window': {
                close: function(p){
                    this.mv.unmask();
                }
            }
        }
    },

    init: function(){
        //console.log(this.lookupReference('multiview').refs);
        var me = this;

        me.mv = Vega.app.getMainView();
    },

    onBeforeStoreLoad: function(s){
        s.setRemoteFilter(true);
    },

    onTypesRefresh: function(store){

        var multiview = this.getView().lookupReference("multiview"),
            button = multiview.down("cycle[reference=processSelect]"),
            menu = button.getMenu();

        var items = [];
        store.each(function(rec){
            var idx = 0;
            items.push({
                xtype: 'menucheckitem',
                iconCls: Ext.baseCSSPrefix + 'menu-item-indent-right-icon x-fa fa-filter',
                group: button.id,
                //itemIndex: ++idx,
                type: rec.data.id,
                //checked: idx === 0,
                text: rec.data.text,
                //itemId: rec.data.id,
                checkHandler: button.checkHandler,
                scope: button
            });
        });

        menu.add(items);
    },

    onProcessChange: function(u, t){
        var me = this,
            view = me.getView(),
            mv = view.lookupReference("multiview"),
            refs = mv.getReferences(),
            grid = refs.grid,
            //x = grid.getPlugin("gridfilters"),
            //r = grid.getColumns(),
            topbar = refs.topbar;

        /*
         //using gridfilter...
         var y;
         Ext.each(r, function(a){
         y = a.filter;
         if(a.dataIndex === "F_CATEGORY"){
         return false;
         }
         });

         if(t.type == null){
         x.clearFilters(false);
         }
         else{
         y.setValue(t.type);
         y.setActive(true);
         }
         */

        var store = grid.getStore();
        Ext.apply(store.getProxy().extraParams, {
            extra: t.type
        });

        store.reload({
            callback: function(){

            }
        });
    },

    onActNewClick: function(b){
        this.redirectTo("product/new");
    },

    onActEditClick: function(b, c){

        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('grid') || layout.lookupReference('tiles'),
            rec = grid.getSelection()[0];

        //this.showWindow(grid.getSelection()[0]);
        this.redirectTo("product/edit/" + rec.data.id);
    },

    /**
     *
     * @param b
     * @param c
     */
    onActCopyClick: function(b, c){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('grid'),
            rec = grid.getSelectionModel().selected.items[0];

        me.showWindow(rec, 'windows-sample-stylecopy', function(type){
            var win = me.win,
                //colors = [],
                //colorStore = win.down('multiselector').getStore(),
                colors = win.lookupReference('colors'),
                btnSave = win.down('button[action="save"]');

            win.lookupReference('chkCopyImages').setHidden(false);

            win.lookupReference('chkNewColor').on('change', function(c, n, o){
                if(!n){
                    colors.setValue('');
                }
                btnSave.setDisabled(n === true && colors.getValue().length === 0);
            });

            colors.on('change', function(c, n, o){
                btnSave.setDisabled(c.getValue().length === 0);
            });

            /*
            colorStore.on('datachanged', function(store){
                colors = [];
                store.each(function(rec){
                    colors.push(rec.data.code.trim());
                });

                if(colors.length > 0){
                    hidden.setValue(colors.join());
                }
                btnSave.setDisabled(store.getCount() == 0);
            });
            */

            win.on('saveclick', me.onSaveCopy, me);
        });
    },

    onActRefreshClick: function(b, c){
        this.getStore("products").reload();
    },

    onActDeleteClick: function(b, c){
        var me = this;
        Ext.Msg.show({
            title:'Warning!',
            message: 'Are you sure you want to delete this?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);
                    var layout = me.lookupReference('multiview'),
                        grid = layout.lookupReference('grid'),
                        rec = grid.getSelection()[0];
                }
            }
        });
    },

    onContextMenuEditClick: function(d, c){

    },

    onContextMenuBookmarkClick: function(d, c){
        this.addBookmark(d, this.getView());
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

    /**
     *
     * @param sm
     * @param rec
     * @param index
     * @param eOpts
     */
    onSelect: function(sm, rec, index, eOpts){
        //onSelectionChange: function(sm, selected, eOpts) {

        var layout = this.getView().lookupReference('multiview'),
            refs = layout.getReferences(),
            grid = refs.grid,
            dataview = refs.tiles,
            topbar = refs.topbar;
            //display = refs.display;

        //display.setActive(rec);

        //console.log(rec);
        var k = [],
            q = topbar.lookupReference("viewselection");

        k[0] = "product";
        k[1] = q.value == 0 ? "default" : q.value == 1 ? "medium" : "tiles";
        k[2] = rec.get("id");

        this.redirectTo(k.join("/"));
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var sm = h.getSelectionModel();

        if(!sm.isSelected(g)){
            sm.select(g);
        }

        this.view.contextmenu.showAt(l.getXY());
    },

    onCopyCSClick: function(item){
        var grid = this.view.lookupReference("multiview").lookupReference("grid"),
            rec = grid.getSelectionModel().getSelection()[0];

        var newData = [];

        this.getViewModel().set('cbCache', newData);

        //console.log(this.getViewModel().get('cbCache'))
    },

    showWindow: function(rec, xtype, callback){
        var me = this,
            view = me.getView(),
            multiview = view.lookupReference('multiview');

        me.isEdit = !!rec;

        me.win = view.add({
            xtype: xtype,

            viewModel: {
                data: {
                    selected: rec
                },

                formulas: {
                    thePrint: function(get) {
                        var print = get('selected').get('prints');
                        return print ? print.split('(#)')[0] : '';
                    }
                }
            },
            // Create a child session that will spawn from the current session of this view
            session: true
        });

        me.win.show('', function(){
            me.mv.mask();
        });

        if(typeof callback === "function"){
            callback(xtype);
        }
    },

    onOpenUploadClick: function(){
        var me = this,
            mv = me.getView().lookupReference('multiview'),
            grid = mv.lookupReference('grid') || mv.lookupReference('tiles'),
            rec = grid.getSelectionModel().selected.items[0];

        this.showWindow(rec, 'windows-sample-upload', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
            //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                btnSave = win.down('button[action="save"]');

            wvm.setStores({
                fileStore: {
                    model: 'Vega.model.sample.Smph',
                    listeners: {
                        beforesync: function(options, e){

                        }
                    }
                }
            });

            wvm.getStore('fileStore').on('add', function(store, records, index){

                records.forEach(function(mediaRec){
                    mediaRec.set('FID', '3');
                    mediaRec.set('RORDER', index+1);
                    mediaRec.set('F_OWNER', rec.id);
                    mediaRec.set('F_CATEGORY', 'Photos');
                    mediaRec.set('F_APPLICATION', 'PROD');
                    mediaRec.set('F_LINK', 'N41IMG/200xImages/');
                    mediaRec.set('F_LOCATION', mediaRec.data.name + '_' + mediaRec.data.size);
                    mediaRec.set('F_EXT', '.' + mediaRec.data.name.split('.').pop());
                    mediaRec.set('F_BFLAG', false);
                    mediaRec.set('F_MFLAG', index > 1 ? null : (index == 0 ? 'FRONT' : 'BACK'));
                    mediaRec.set('F_NAME', rec.data.style.trim() + '_' + rec.data.color.trim() + (!Ext.isEmpty(mediaRec.get('F_MFLAG')) ? '_' + mediaRec.get('F_MFLAG').toLowerCase() : '') + mediaRec.data.F_EXT);
                    mediaRec.set('F_TYPE', mediaRec.data.type);
                    mediaRec.set('F_SIZE', mediaRec.data.size);
                    mediaRec.set('F_STYLE', rec.data.style.trim());
                    mediaRec.set('F_DESC5', rec.data.user2);
                    mediaRec.set('F_DESC6', rec.data.prints.split('(#)')[0]);
                    mediaRec.set('F_DESC3', rec.data.prints.split('(#)')[1]);
                    //mediaRec.set('F_OWNER', rec.data.style.trim());
                    mediaRec.set('F_USERID', Vega.user.data.Userid);
                    mediaRec.set('F_CREATED_ON', new Date());
                    //idx = idx + 1;
                    //console.log(mediaRec);
                });
            });

            wvm.getStore('fileStore').on('datachanged', function(store){
                btnSave.setDisabled(store.getCount() == 0);
            });

            win.on('saveclick', me.onSaveUpload, me);
        });
    },

    onSaveUpload: function(b, c){

        var me = this,
            vm = c.getViewModel(),
            grid = me.getView().refs.multiview.refs.grid,
            form = c.down('form').getForm(),
            sampleRec = grid.getSelection()[0],
            fileStore = vm.getStore('fileStore'),
            field = c.down('form').down('multiupload').getDockedItems('toolbar[dock="top"] > uploadfiles')[0];

        if(!form.isValid()){
            Ext.create('Ext.ux.window.Notification', {
                position: 'br',
                useXAxis: true,
                cls: 'ux-notification-light',
                iconCls: 'ux-notification-icon-information',
                closable: false,
                title: 'Error',
                padding: '0 5px 5px 5px',
                html: '<p>Form is invalid. Please check all the fields.</p>',
                slideInDuration: 800,
                slideBackDuration: 1500,
                autoCloseDelay: 4000,
                slideInAnimation: 'elasticIn',
                slideBackAnimation: 'elasticIn'
            }).show();
        }

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.getView()
        });

        fileStore.sync({
            //url: '/form-upload.aspx',
            //headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
            //waitMsg: 'Uploading files...',
            success: function(batch, opt) {

                var operations = batch.getOperations();

                for(var i in operations){
                    var operation = operations[i];
                    //console.log(operation);
                    if(operation.getResponse()){
                        var response = JSON.parse(operation.getResponse().responseText);
                        if(field && field.getFilesQueue().length > 0){
                            field.send({
                                url: '/api/Files/Photos/upload',
                                success: function(resp){
                                    //console.log(resp);
                                    processMask.hide('', function() {
                                        Ext.Msg.alert('Status', JSON.stringify(resp.data.Media, null, 4));
                                    });

                                    grid.getStore().reload();
                                },
                                failure: function(resp) {
                                    processMask.hide('', function() {
                                        Ext.Msg.alert('Failure', resp);
                                    });
                                }
                            }, {
                                Media: JSON.stringify(response.data)
                            });
                        }
                    }
                }

            },
            failure: function(batch, options) {

                if(batch.hasException) {
                    for (var i = 0; i < batch.exceptions.length; i++) {
                        switch (batch.exceptions[i].action) {
                            case "destroy" :
                                msg = msg + batch.exceptions[i].records.length + " Delete, ";
                                break;
                            case "update" :
                                msg = msg + batch.exceptions[i].records.length + " Update, ";
                                break;
                            case "create" :
                                msg = msg + batch.exceptions[i].records.length + " Create, ";
                                break;
                        }
                    }

                    Ext.Msg.alert("Status", msg + " operation failed!");
                }
                else
                {
                    Ext.Msg.alert('Status', 'Changes failed.');
                }

            },
            callback: function (batch, options) {
                //console.log(options);
            }
        });

        me.win.close();
        processMask.show();
    },

    /**
     *
     * @param b Ext.button.Button
     * @param c Ext.window.Window
     */
    onSaveCopy: function(b, c){

        var me = this,
            view = me.getView(),
            vm = c.getViewModel(),
            grid = view.refs.multiview.refs.grid,
            session = vm.getSession(),
            changes = session.getChanges(),
            //colorStore = c.lookupReference('color-grid').getStore(),
            newColor = c.lookupReference('chkNewColor'),
            copyCs = c.lookupReference('chkCopyCS'),
            copyImages = c.lookupReference('chkCopyImages'),
            //csnum = c.lookupReference('numCS'),
        //colors = grid.getStore().getRange(),
            sRec = grid.getSelection()[0];

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: view
        });

        c.hide('', function(){
            me.mv.unmask();
            processMask.show();
        });

        var form = c.down('form').getForm();

        /*
        colorStore.each(function(rec){
            colors.push(rec.data.code.trim());
        })
        */

        //console.log(form.getValues(), form.getFieldValues(), colors)

        if(form.isValid()){
            form.submit({
                url: '/api/Product/production/Copy',
                success: function(form, action){
                    processMask.hide('', function() {
                        Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                            view.getViewModel().getStore('products').reload();
                        });
                    });
                },
                failure: function(form, action){
                    processMask.hide('', function(){
                        var response = Ext.decode(action.response.responseText, true);
                        Ext.Msg.alert(action.response.statusText, response.Message + "</br>" + response.ExceptionMessage);

                    });
                }
            });
        }

        /*
        Vega.model.product.Product.load(parseInt(sRec.getId(),10), {
            success: function (rec, ope) {

                var colors = [];

                if(!newStyle.checked){
                    colors.push(rec.data.color.trim());
                }
                else {
                    colorStore.each(function(rec){
                        colors.push(rec.data.code.trim())
                    })
                }

                Ext.each(colors, function(color){

                    var record = rec.copy(null, session);

                    if(!newStyle.checked){
                        record.data.style = '';
                    }
                    record.data.color = color;
                    record.data.userName = Vega.user.data.Userid;
                    record.data.userTime = new Date();
                    record.data.UpdateUser = null;
                    record.data.UpdateTime = null;

                    if(!copyCs.checked){
                        record.data.cost = 0;
                        record.data.defaultBomCost = 0;
                        record.data.avgCost = 0;
                        record.data.BomCost1 = 0;
                        record.data.bomcost2 = 0;
                        record.data.bomcost3 = 0;
                        record.data.bomcost4 = 0;
                        record.data.bomcost5 = 0;
                    }
                    else {
                        rec.bomhs(function(bomhs){
                            //console.log('Product Get', bomhs, csnum.getValue());
                            bomhs.each(function(bomh){
                                if(bomh.data.bomno == csnum.getValue()){

                                    var nbomh = bomh.copy(null, session);
                                    nbomh.data.color = record.data.color;
                                    nbomh.data.createUser = Vega.user.data.Userid;
                                    nbomh.data.createTime = new Date();
                                    nbomh.data.updateUser = null;
                                    nbomh.data.updateTime = null;

                                    var abomh = record.bomhs().add(nbomh);

                                    bomh.boms(function(boms){

                                        boms.each(function(bom){
                                            var nbom = bom.copy(null, session);
                                            nbom.data.color = record.data.color;

                                            abomh[0].boms().add(nbom);
                                        });
                                        //console.log('Product Get', boms, abomh);
                                    });

                                    bomh.bolhs(function(bolhs){
                                        bolhs.each(function(bolh){
                                            var nbolh = bolh.copy(null, session);
                                            nbolh.data.color = record.data.color;
                                            nbolh.data.createUser = Vega.user.data.Userid;
                                            nbolh.data.createTime = new Date();
                                            nbolh.data.updateUser = null;
                                            nbolh.data.updateTime = null;

                                            var abolh = abomh.bolhs().add(nbolh);

                                            bolh.bols().each(function(bol){
                                                var nbol = bol.copy(null, session);
                                                nbol.data.color = record.data.color;

                                                abolh[0].bols().add(nbol);
                                            });
                                        });
                                    });
                                }
                            })
                        })
                    }
                });

                //console.log(session, session.getChanges())

                var batch = session.getSaveBatch();

                if(batch !== undefined){

                    batch.on({
                        operationcomplete: function(batch, op){
                            //console.log(op, op.getResultSet());
                            var objResp = op.getResponse();
                            if(!Ext.isEmpty(objResp)){
                                var response = JSON.parse(objResp.responseText);
                                //console.log(response)

                                if(!Ext.isEmpty(response) && response.data.hasOwnProperty('bomhId')){
                                    var cost = view.down('numberfield[name="cost"]');
                                    //cost.setValue('')
                                }

                            }
                        },
                        complete: function(batch, op){

                            var response = JSON.parse(op.getResponse().responseText);

                            processMask.hide('', function() {
                                Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                                    view.getViewModel().getStore('products').reload();
                                });
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

                    batch.start();
                }
                else {
                    Ext.Msg.alert('No Changes', 'There are no changes to the session.');
                }

            },
            failure: function(rec, ope) {

            },
            callback: function(rec, ope){

            }
        });
        */
    }

});

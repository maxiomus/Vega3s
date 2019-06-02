Ext.define('Vega.view.development.style.SampleController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.sample',

    requires: [
        'Vega.model.Media'
        //'Vega.model.Color'
    ],

    listen: {
        component: {
            'window': {
                close: function(w){
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

    onActNewClick: function(b){
        this.redirectTo("sample/new");
    },

    onActEditClick: function(b, c){
        //console.log(b, c);

        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('grid') || layout.lookupReference('tiles'),
            rec = grid.getSelection()[0];

        console.log(rec.data.id);
        //this.showWindow(grid.getSelection()[0]);
        this.redirectTo("sample/edit/" + rec.data.id);
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
                //colorStore = win.down('multiselector').getStore(),
                colors = win.lookupReference('colors'),
                divisionSize = win.lookupReference('divisionSize'),
                btnSave = win.down('button[action="save"]');

            divisionSize.setHidden(true);

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
                btnSave.setDisabled(store.getCount() == 0);
            });
            */

            win.on('saveclick', me.onSaveCopy, me);
        });

        //var wvm = me.win.getViewModel();
        /*
        wvm.setStores({
            colors: {
                //storeId: 'memMyColors',
                pageSize: 50,
                remoteFilter: true,
                proxy: {
                    type: 'memory',
                    enablePaging: true,
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }
        });

        var remoteColors = Ext.create('Ext.data.Store', {
            model: 'Color',

            pageSize: 0,
            autoLoad: true,

            remoteFilter: true,

            proxy: {
                type: 'ajax',
                url: '/api/Options/colors',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },

            listeners: {
                load: function(s){

                    wvm.getStore('colors').getProxy().setData(s.getRange());
                    wvm.getStore('colors').load();

                }
            }
        });
        */
    },

    onActRefreshClick: function(b, c){
        this.getStore("samples").reload();
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

                    //rec.drop();
                    //me.saveStore(grid, me.getView());
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
            topbar = refs.topbar,
            display = refs.display;

        //display.setActive(rec);

        //console.log(rec);
        var k = [],
            q = topbar.lookupReference("viewselection");

        k[0] = "sample";
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
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('grid'),
            rec = grid.getSelectionModel().selected.items[0];

        this.showWindow(rec, 'windows-sample-upload', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                btnSave = win.down('button[action="save"]');

            wvm.setStores({
                fileStore: {
                    model: 'Media',
                    listeners: {
                        beforesync: function(options, e){
                            /*
                             me.fileStoreMask = new Ext.LoadMask({
                             msg    : 'Please wait...',
                             target : view
                             });

                             me.fileStoreMask.show();
                             */
                        }
                    }
                }
            });

            wvm.getStore('fileStore').on('add', function(store, records, index){

                records.forEach(function(mediaRec){
                    mediaRec.set('FID', '3');
                    mediaRec.set('RORDER', index+1);
                    mediaRec.set('F_NAME', rec.data.style.trim() + (!Ext.isEmpty(rec.data.user2) ? '_' + rec.data.user2.trim() : '') + (!Ext.isEmpty(rec.data.prints) ? '_' +  rec.data.prints.split('(#)')[0] : '') + '_' + mediaRec.data.RORDER + '.' + mediaRec.data.name.split('.').pop());
                    mediaRec.set('F_TYPE', mediaRec.data.type);
                    mediaRec.set('F_SIZE', mediaRec.data.size);
                    mediaRec.set('F_EXT', '.' + mediaRec.data.name.split('.').pop());
                    mediaRec.set('F_STYLE', rec.data.style.trim());
                    mediaRec.set('F_DESC5', rec.data.user2);
                    mediaRec.set('F_DESC6', rec.data.prints.split('(#)')[0]);
                    mediaRec.set('F_DESC3', rec.data.prints.split('(#)')[1]);
                    mediaRec.set('F_LINK', 'DLIB/BLU-PHOTOS/');
                    mediaRec.set('F_OWNER', rec.id);
                    mediaRec.set('F_LOCATION', mediaRec.data.name + '_' + mediaRec.data.size);
                    mediaRec.set('F_APPLICATION', 'DAL');
                    mediaRec.set('F_CATEGORY', 'Photos');
                    //mediaRec.set('F_OWNER', rec.data.style.trim());
                    mediaRec.set('F_BFLAG', true);
                    mediaRec.set('F_MFLAG', index > 1 ? null : (index == 0 ? 'FRONT' : 'BACK'));
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
            copy = c.lookupReference('chkCopyCS'),
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


        if(form.isValid()){
            form.submit({
                url: '/api/Product/sample/Copy',
                success: function(form, action){
                    processMask.hide('', function() {
                        Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                            view.getViewModel().getStore('samples').reload();
                        });
                    });
                },
                failure: function(form, action){
                    processMask.hide('', function(){
                        var objResp = op.error.response;
                        //console.log(objResp)
                        if(!Ext.isEmpty(objResp)){
                            var response = JSON.parse(objResp.responseText);
                            Ext.Msg.alert(objResp.statusText, objResp.responseText);
                        }

                    });
                }
            });
        }
        /*
        Vega.model.sample.Product.load(parseInt(sRec.getId(),10), {
            success: function (rec, ope) {

                var colors = [];

                if(!newColor.checked){
                    colors.push(rec.data.color.trim());
                }
                else {
                    colorStore.each(function(rec){
                        colors.push(rec.data.code.trim())
                    })
                }

                Ext.each(colors, function(color){

                    var record = rec.copy(null, session);

                    if(!newColor.checked){
                        record.data.style = '';
                    }
                    record.data.color = color;
                    record.data.userName = Vega.user.data.Userid;
                    record.data.userTime = new Date();
                    record.data.UpdateUser = null;
                    record.data.UpdateTime = null;

                    if(!copy.checked){
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
                                    view.getViewModel().getStore('samples').reload();
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

                /*
                var res = Ext.JSON.decode(response.responseText, true);
                var win = form.owner.up('window');
                if(win){
                    win.close();
                }
                */

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
                                    //Ext.Msg.alert('Status', 'Changes saved successfully.');
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

    onOpenLabeltagClick: function(btn){

        var win,
            view = this.getView(),
            layout = view.lookupReference('multiview'),
            grid = layout.lookupReference('grid'),
            record = grid.getSelectionModel().selected.items[0];

        if (!win) {

            win = Ext.widget('windows-sample-labeltag', {
                width: 400,
                height: view.getHeight() - 80
                //maxHeight: 600
                //width: window.innerWidth * 0.8,
                //height: window.innerHeight * 0.8
            });

            //console.log(window.innerHeight)
            //win.loader.load();
            var request = "../PrintTag.aspx?style=" + record.get('style').trim() + "&color=" + record.get('color').trim();
            win.html = '<iframe src="' + request + '" id="innerFrame" name="innerFrame" width="100%" height="100%" frameborder="0"></iframe>';
        }

        win.show(this, function () {
            //console.log('callback function from window show.');
        });
    }

});

Ext.define("Vega.view.dal.DalController", {
    extend: 'Ext.app.ViewController',

    requires: [
        'Vega.model.Media',
        'Vega.store.Pantones'
    ],

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: "controller.dal",

    listen: {
        store: {
            '#components': {
                beforeload: {
                    fn: 'onCompStoreBeforeLoad'
                }
            }
        }
    },

    init: function(g){

        var multiview = g.lookupReference("multiview"),
            refs = multiview.getReferences(),
            j = refs.topbar.lookupReference("paneselection"),
            k = refs.topbar.lookupReference("viewselection"),
            //m = refs.topbar.lookupReference('togglerowedit'),
            i = j.getActiveItem();

        Ext.Ajax.request({
            url: 'resources/data/dal/stores.json',
            scope: g,
            success: function(response){
                var o = {};

                try {
                    o = Ext.decode(response.responseText);
                }
                catch(e){
                    alert(e.message);
                    return;
                }

                if(!o.success){

                    // @todo error handling
                    alert("Unknow error occurs!");
                    return;
                }

                Ext.Object.each(o.stores, function(key, value, itself){
                    var store = g.getViewModel().getStore(key);
                    //console.log(store, key, value)
                    if(store && value){
                        store.loadData(value);
                    }
                });
            },
            failure: function(response){

            }
        });

        this.getViewModel().set('viewMode', k.getValue());

        k.setBind({
            value: '{viewMode}'
        });

        refs.center.getLayout().setActiveItem(k.getValue());

        var m = refs.topbar.insert(20, ['-', {
            iconCls: 'x-fa fa-lock',
            reference: 'togglerowedit',
            ui: 'bootstrap-btn-default',
            //cls:"delete-focus-bg",
            tooltip: 'Toggle Row Editing',
            bind: {
                disabled: '{viewMode}'
            },
            enableToggle: true,
            toggleHandler: function(btn, pressed){
                btn.setIconCls(pressed ? 'x-fa fa-unlock' : 'x-fa fa-lock');

                //Save Button...
                //refs.topbar.items.items[6].setHidden(!pressed);
                refs.topbar.actSave.setHidden(!pressed);

                var rowEdit = refs.grid.getPlugin("dal-grid-rowedit");
                rowEdit.cancelEdit();
            }
        }]);

        k.on('toggle', function(btn, pressed){
            //console.log(k.getValue())
            if(k.getValue() != 0){
                //check if grid is row edit mode...
                if(m[1].pressed){
                    m[1].toggle(false);
                }
            }
        });

        refs.grid.on('beforeedit', function(e, ctx){
            //console.log('beforeedit', ctx.colIdx, m[1]);
            if (!m[1].pressed)
                return false;
        });
    },

    initViewModel: function(vm){
        this.fireEvent("viewmodelready", this, vm);
    },

    onCompStoreBeforeLoad: function(s){
        //console.log(s, this.win.getReferences())
    },

    onLoad: function(d, e, f){

    },

    /**
     *
     * @param topbar {Ext.toolbar.Toolbar}
     * @param widget {Ext.Component}
     */
    onActionView: function(topbar, widget){

        var m = this.getView().lookupReference("multiview"),
            ctn = m.lookupReference('center'),
            g = ctn.getLayout().getActiveItem(),
            s = g.getSelection()[0];

        this.onTabOpen(null, s);
    },

    onActionRefresh: function(t,w){
        //console.log(t, w)
        this.getStore("dals").reload();
    },

    onActionDelete: function(b, c){
        var me = this,
            m = this.getView().lookupReference("multiview"),
            ctn = m.lookupReference('center'),
            g = ctn.getLayout().getActiveItem(),
            s = g.getSelection()[0];

        Ext.Msg.show({
            title:'Warning!',
            message: 'Are you sure you want to delete this?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);
                    s.drop();

                    var batch = me.getView().getSession().getSaveBatch();
                    var processMask = new Ext.LoadMask({
                        msg: 'Saving... Please wait',
                        target: me.getView()
                    });
                    me.processBatch(batch, null, null, processMask);
                }
            }
        });
    },

    onActionSave: function (t,w) {

        var batch = this.getSession().getSaveBatch();

        if(batch !== undefined){
            var processMask = Ext.create('Ext.LoadMask', {
                msg: 'Saving... Please wait',
                target: this.getView()
            });

            batch.on({
                complete: function(batch, op){
                    //refresh In-Review
                    var response = JSON.parse(op.getResponse().responseText);

                    // Using Ext.callback for 100 milisecond delay...
                    Ext.Msg.show({
                        title: 'Status',
                        message: 'Changes saved successfully.',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        delay: 100,
                        fn: function(btn){
                            processMask.hide();
                        }
                    });
                    //Ext.callback(Ext.Msg.alert, Ext.Msg, ['Status', 'Changes saved successfully.'], 100);

                },
                exception: function(batch, op){
                    processMask.hide();
                    var response = JSON.parse(op.error.response.responseText);

                    Vega.util.Utils.showErrorMsg(response);
                }
            });

            processMask.show();
            batch.start();
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }

        /*
         var me = this,
         view = me.getView(),
         layout = view.lookupReference('multiview'),
         grid = layout.lookupReference('grid');

         var processMask = Ext.create('Ext.LoadMask', {
         msg: 'Saving... Please wait',
         target: view
         });
         processMask.show();

         grid.getStore().sync({
         success: function(batch, op){
         Ext.Msg.alert('Status', 'Changes saved successfully.');

         },
         failure: function(batch, op){
         console.log(op);
         //rec.drop();
         },
         callback: function(batch, op){
         processMask.hide('', function() {

         });
         }
         });
         */
    },

    onClearFilters: function(b){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            topbar = multiview.lookupReference("topbar"),
            searchcombo = topbar.lookupReference('searchcombo'),
            searchfield = topbar.lookupReference('searchfield'),
            grid = multiview.lookupReference('grid');

        searchcombo.setValue('');
        searchcombo.getTrigger('clear').hide();
        searchfield.setValue('');
        searchfield.getTrigger('clear').hide();
        grid.filters.clearFilters();
    },

    onFilterItemChange: function(combo, q, r, o){
        var toolbar = combo.up("toolbar"),
            m = toolbar.down("gridsearchfield"),
            n = toolbar.down("searchcombo"),
            j = combo.getValue(),
            st = '';

        switch(j){
            case "F_DESC2":
                if(st === ''){
                    st = 'bodyTypes';
                }
            case "F_DESC4":
                if(st === ''){
                    st = 'vendors';
                }
            case "F_DESC8":
                if(st === ''){
                    st = 'customers';
                }
            case "F_DESC9":
                if(st === ''){
                    st = 'themes';
                }
            case "F_DESC10":
                if(st === ''){
                    st = 'pantones';
                }
                n.paramName = j;
                n.show();
                m.hide();
                break;
            default:
                m.paramName = j;
                m.show();
                n.hide();
        }

        var view = this.getView(),
            k = view.getViewModel().getStore(st);

        if(k != null){
            k.load();
            n.bindStore(k);
        }
    },

    onViewReady: function(view){
        //console.log('onViewReady', view)
    },

    onOpenBodyClick: function(btn){
        this.showWindow(null, 'dal-edit-body', 1);

        this.win.on('saveclick', this.onSaveBody, this);
    },

    onSaveBody: function(b){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('grid');

        var form = me.win.down('multiupload'),
            field = form.getDockedItems('toolbar[dock="top"] > uploadfiles')[0];

        form.down('grid').getStore().each(function(rec){
            grid.getStore().insert(0, rec);
        });

        var batch = me.getView().getSession().getSaveBatch();

        /*
        var changes = me.getView().getSession().getChanges();
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

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.getView()
        });

        this.processBatch(batch, field, {
            url: '/api/Files/Body/upload',
            success: function(response){

                grid.getView().refresh();
                //Ext.Msg.alert('Success', response);
                // Using Ext.callback for 100 milisecond delay...
                //Ext.callback(Ext.Msg.alert, Ext.Msg, ['Status', 'Changes saved successfully.'], 100);
                processMask.hide('', function() {
                    Ext.callback(Ext.Msg.alert, Ext.Msg, ['Status', 'Changes saved successfully.'], 100);
                });
            },
            failure: function(response) {
                //Ext.Msg.alert('Failure', response);
                processMask.hide('', function() {
                    Ext.Msg.alert('Failure', response);
                });
            }
        }, processMask);

        this.win.close();
    },

    onOpenComponentClick: function(){
        this.showWindow(null, 'dal-edit-component', 2);

        this.win.on('saveclick', this.onSaveComponent, this);
    },

    onSaveComponent: function(b, c){

        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('grid');

        var form = me.win.down('multiupload'),
            field = form.getDockedItems('toolbar[dock="top"] > uploadfiles')[0];

        form.down('grid').getStore().each(function(rec){
            grid.getStore().insert(0, rec);
        });

        var batch = me.getView().getSession().getSaveBatch();
        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.getView()
        });

        this.processBatch(batch, field, {
            url: '/api/Files/Prints/upload',
            success: function(response){
                //console.log(response);
                grid.getView().refresh();
                //Ext.Msg.alert('Success', response);
                // Using Ext.callback for 100 milisecond delay...
                processMask.hide('', function() {
                    Ext.callback(Ext.Msg.alert, Ext.Msg, ['Status', 'Changes saved successfully.'], 100);
                });
            },
            failure: function(response) {
                processMask.hide('', function() {
                    Ext.Msg.alert('Failure', response);
                });
            }
        }, processMask);

        me.win.close();

        /*
        if (!me.isEdit) {
            // Since we're not editing, we have a newly inserted record. Grab the id of
            // that record that exists in the child session
            id = me.win.getViewModel().get('theMedia').id;
        }

        this.win.getSession().save();

        var data = [];
        if(!this.isEdit){
            rec = this.getSession().getRecord('Media', id);
            rec.set('F_USERID', Vega.user.data.Userid);

            grid.getStore().insert(0, rec);

            this.win.getViewModel().get('theMedia').filesInMedias(function(files){
                files.each(function(item){
                    data.push(item.data.name);
                })
            })
        }
        */
    },

    showWindow: function(rec, xtype, fid){
        var me = this,
            view = me.getView(),
            multiview = view.lookupReference("multiview"),
            button = multiview.down("cycle[reference=filterButton]");

        //console.log(window.innerWidth, window.innerHeight,multiview.getHeight());
        me.isEdit = !!rec;

        me.win = view.add({
            xtype: xtype,
            width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 1260,
            height: window.innerHeight < 760 ? (view.getHeight() * 0.9) : 580,
            title: 'Add ' + (fid == 1 ? 'Bodies' : 'Components'),

            viewModel: {
                stores: {
                    fileStore: {
                        model: 'Vega.model.Media',
                        autoDestroy: true
                    }
                }
            },
            // Create a child session that will spawn from the current session of this view
            session: true
        });

        var items = [],
            compType;

        switch (fid){
            case 1:
                compType = 'Body';
                break;
            case 2:
                compType = 'Prints';
                break;
            default:
                compType = 'Photos';
        }

        button.getMenu().items.keys.forEach(function(key){
            if(key !== 'all'){
                items.push({
                    xtype: 'menucheckitem',
                    iconCls: Ext.baseCSSPrefix + 'menu-item-indent-right-icon x-fa fa-flickr',
                    type: key,
                    text: key,
                    checked: key === compType ? true : false
                });
            }

        });

        var tbar = me.win.down('multiupload').getDockedItems('toolbar[dock="top"]')[0],
            cycle = tbar.insert(1, {
                xtype: "cycle",
                ui: "default",
                prependText: "Select:  ",
                iconCls: "x-fa fa-flickr",
                showText: true,
                reference: "categorySelect",
                menu: {
                    items: items
                },
                changeHandler: function(cycle, activeItem){
                    me.win.down('grid').getStore().each(function(rec){
                        rec.set('F_CATEGORY', activeItem.text);
                    });
                }
            });

        me.win.getViewModel().getStore('fileStore').on('add', function(store, records, index){
            records.forEach(function(rec){
                rec.set('FID', fid);

                //console.log(cycle)
                //rec.set('F_TYPE', rec.data.type);
                //rec.set('F_SIZE', rec.data.size);
                var fname = rec.data.name,
                    dot =  fname.lastIndexOf('.'),
                    ext = fname.substring(dot, fname.length),
                    name = fname.substring(0, dot);

                rec.set('F_EXT', ext);
                rec.set('F_LINK', fid > 2 ? 'DLIB/BLU-PHOTOS/' : (fid == 2 ? 'DLIB/BLU-PRINTCAD/' : 'DLIB/BLU-ILLUSTRATIONS/'));
                rec.set('F_CATEGORY', cycle.getActiveItem().text);
                rec.set('F_LOCATION', fname + '_' + rec.data.size);
                rec.set('F_APPLICATION', 'DAL');

                //var fileName = rec.data.name.split('.')[0];
                var a = name.split('_');

                if(compType == 'Body'){
                    rec.set('F_DESC5', a.shift());

                    if(a.length == 1){
                        rec.set('F_MFLAG', a.shift());
                    }

                    if(a.length > 1){

                        rec.set('F_OWNER', a.shift().replace('ref', ''));
                        rec.set('F_MFLAG', a.shift());
                    }
                }

                if(compType == 'Prints'){
                    var code = a.shift(),
                        color = '00',
                        type = 'SUBLIMATION',
                        side = 'FRONT',
                        vendor = 'BLUPRINT';

                    switch(code.substring(2,3).toUpperCase()){
                        case 'V':
                            type = 'SILK SCREEN';
                            break;
                        case 'T':
                            type = 'TEXTILE';
                            break;
                        case 'E':
                            type = 'EMBROIDERY';
                        default:
                            break;
                    }

                    /*
                    if(a.length == 1){

                    }

                    if(a.length > 1){

                    }
                    */

                    //console.log(name, name.split('_').pop())
                    if(name.split('_').pop() != 'CAD'){
                        side = name.split('_').pop().toUpperCase();
                    }

                    if(name.substring(0,2).toUpperCase() != 'BP'){
                        vendor = '';
                    }

                    rec.set('F_DESC6', code);
                    rec.set('F_DESC3', color);
                    rec.set('F_DESC2', type);
                    rec.set('F_MFLAG', side);
                    rec.set('F_DESC4', vendor);
                    //rec.set('F_DESC1', name.split('_')[1]);
                }

                rec.set('F_BFLAG', true);
                rec.set('F_USERID', Vega.user.data.Userid);
                rec.set('F_CREATED_ON', new Date());
            });
        });

        me.win.on('close', function(w){
            view.setActiveTab(0);
            view.up('maincontainerwrap').unmask();
        });

        me.win.show('', function(){
            view.up('maincontainerwrap').mask();
        });
    },

    onSaveMedia: function(){

        var me = this,
            form = this.win.down('imageupload'),
            field = form.getDockedItems('toolbar[dock="top"] > uploadfiles')[0],
            isEdit = me.isEdit,
            id;

        /*
         if(field.getFilesQueue().length > 0){
            //field.formData.append('changes', JSON.stringify(changes));
            //var file = field.filesQueue[0];
         }

        if(field && field.getFilesQueue().length > 0){

        }
        */

        if(!isEdit){
            // Since we're not editing, we have a newly inserted record. Grab the id of
            // that record that exists in the child session
            id = me.win.getViewModel().get('theMedia').id;
        }

        me.win.getSession().save();

        if(!isEdit){
            // Use the id of that child record to find the phantom in the parent session,
            // we can then use it to insert the record into our store
            me.getStore('dals').add(me.getSession().getRecord('Media', id));
        }

        var batch = me.getView().getSession().getSaveBatch(),
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('grid'),
            rec = me.win.getViewModel().get('theMedia');
        //rec = grid.getSelectionModel().getSelection()[0];

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.getView()
        });

        this.processBatch(batch, field, {
            url: '/api/Files/'+ rec.get('F_CATEGORY') +'/upload',
            success: function(response){
                //console.log('SaveMedia', response);

                grid.getView().refreshNode(rec);
                //Ext.Msg.alert('Success', response);
                // Using Ext.callback for 100 milisecond delay...
                //Ext.callback(Ext.Msg.alert, Ext.Msg, ['Status', 'Changes saved successfully.'], 100);
                processMask.hide('', function() {
                    Ext.callback(Ext.Msg.alert, Ext.Msg, ['Status', 'Changes saved successfully.'], 100);
                });

            },
            failure: function(response) {
                //Ext.Msg.alert('Failure', response);

                processMask.hide('', function() {
                    Ext.Msg.alert('Failure', response);
                });

            }
        }, processMask);

        this.win.close();

        /*
         form.submitWithImage({
         method: 'POST',
         url: '/api/Dals/upload',
         params: {
         newStatus: 'delivered'
         },
         success: function(form, action) {
         console.log(form, action);
         Ext.Msg.alert('Success', form);
         },
         failure: function(form, action) {
         switch (action.failureType) {
         case Ext.form.action.Action.CLIENT_INVALID:
         Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
         break;
         case Ext.form.action.Action.CONNECT_FAILURE:
         Ext.Msg.alert('Failure', 'Ajax communication failed');
         break;
         case Ext.form.action.Action.SERVER_INVALID:
         Ext.Msg.alert('Failure', action);
         }
         }
         });
         */

        /*
         var changes = this.getView().getSession().getChanges();
         if(changes){
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
    },

    showEditWindow: function(rec){
        var me = this,
            view = me.getView(),
            multiview = view.lookupReference("multiview");

        me.isEdit = !!rec;

        me.win = view.add({
            xtype: 'dal-edit-window',
            reference: 'dal-edit-window',

            width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 1024,
            height: window.innerHeight < 640 ? (view.getHeight() * 0.9) : 480,

            bind: {
                title: '{title}'
            },

            viewModel: {
                data: {
                    title: (rec ? 'Edit: ' : 'Add: ') + rec.get('F_CATEGORY'),
                    previewImageSrc: !Ext.isEmpty(rec.data.F_NAME) && !Ext.isEmpty(rec.data.F_TYPE) ? '../' + rec.get('F_LINK') +  rec.get('F_PATH') + '/' + rec.get('ID') + '/' + rec.get('F_NAME') + '?w=264&h=288' :
                    '../' + rec.get('F_LINK') + rec.get('F_PATH') + '/' + rec.get('F_LOCATION') + rec.get('F_EXT') + '?w=264&h=288'
                },
                // If we are passed a rec, a copy of it will be created in the newly spawned sesson.
                // Otherwise, create a new phantom rec in the child
                links: {
                    theMedia: rec || {
                        type: 'Media',
                        create: true
                    }
                }
            },

            // Create a child session that will spawn from the current session of this view
            session: true,

            items: [{
                xtype: 'imageupload',
                name: 'imageupload',
                reference: 'image-upload',
                padding: '0 0 0 10',
                scrollable: true,
                imageWidth: 264,
                imageHeight: 288,
                //previewImageSrc: 'resources/images/default.png',
                fields: (rec.data.FID > 0 && rec.data.FID < 3) ? (rec.data.FID > 1 ? this.buildCompFields() : this.buildBodyFields()) : this.buildPhotoFields(),
                listeners: {
                    dropped: {
                        fn: function(form, field){
                            var rec = me.win.getViewModel().get('theMedia');
                            var hiddenName = form.query('container > hidden[name=name]')[0],
                                hiddenType = form.query('container > hidden[name=type]')[0],
                                hiddenSize = form.query('container > hidden[name=size]')[0];

                            var newName = hiddenName.getValue(),
                                newType = hiddenType.getValue(),
                                newSize = hiddenSize.getValue();

                            var idx = 0;
                            if(!Ext.isEmpty(rec.data.F_NAME)){
                                var oldName = rec.data.F_NAME.split('.')[0];

                                if(oldName.indexOf('_v') != -1){
                                    idx = oldName.split('_v').pop();
                                }

                                idx = idx + 1;
                            }

                            var fileName = newName.split('.')[0];

                            switch (rec.data.F_CATEGORY.toLowerCase()) {
                                case 'body':
                                    var bodyCode = fileName.split('_')[0],
                                        reference = fileName.replace('ref ', '').split('_')[1],
                                        fabricType = fileName.split('_')[2];

                                    rec.set('F_DESC5', bodyCode);
                                    rec.set('F_OWNER', reference);
                                    rec.set('F_MFLAG', fabricType);

                                    rec.set('F_NAME', bodyCode + (!Ext.isEmpty(reference) ? '_ref ' + reference : '') + (!Ext.isEmpty(fabricType) ? '_' + fabricType : '') + '.' + newName.split('.').pop());
                                    //rec.set('F_NAME', bodyCode + (!Ext.isEmpty(reference) ? '_ref ' + reference : '') + (!Ext.isEmpty(fabricType) ? '_' + fabricType : '') + '_v' + idx + '.' + newName.split('.').pop());
                                    break;
                                case 'prints':
                                    var code = fileName.split('_')[0],
                                        color = '00',
                                        type = 'SUBLIMATION',
                                        side = 'Front',
                                        vendor = 'BLUPRINT',
                                        descript = fileName.split('_')[1];

                                    switch(fileName.substring(2,3).toUpperCase()){
                                        case 'V':
                                            type = 'SILK SCREEN';
                                            break;
                                        case 'T':
                                            type = 'TEXTILE';
                                            break;
                                        case 'E':
                                            type = 'EMBROIDERY';
                                        default:
                                            break;
                                    }

                                    if(fileName.split('_').pop() != 'CAD'){
                                        side = fileName.split('_').pop().toUpperCase();
                                    }

                                    if(fileName.substring(0,2).toUpperCase() != 'BP'){
                                        vendor = '';
                                    }

                                    rec.set('F_DESC6', code);
                                    rec.set('F_DESC3', color);
                                    rec.set('F_DESC2', type);
                                    rec.set('F_MFLAG', side);
                                    rec.set('F_DESC4', vendor);
                                    rec.set('F_DESC1', descript);

                                    rec.set('F_NAME', code + (!Ext.isEmpty(descript) ? '_' + descript : '') + (!Ext.isEmpty(side) ? '_' + side : '') + '_CAD' + '.' + newName.split('.').pop());
                                    //rec.set('F_NAME', code + (!Ext.isEmpty(descript) ? '_' + descript : '') + (!Ext.isEmpty(side) ? '_' + side : '') + '_CAD' + '_v' + idx + '.' + newName.split('.').pop());
                                    break;
                                case 'photos':
                                    rec.set('F_NAME', rec.data.F_STYLE + (!Ext.isEmpty(rec.data.F_DESC5) ? + '_' + rec.data.F_DESC5 : '') + (!Ext.isEmpty(rec.data.F_DESC6) ? '_' + rec.data.F_DESC6 : '') + '.' + newName.split('.').pop());
                                    //rec.set('F_NAME', rec.data.F_STYLE + (!Ext.isEmpty(rec.data.F_DESC5) ? + '_' + rec.data.F_DESC5 : '') + (!Ext.isEmpty(rec.data.F_DESC6) ? '_' + rec.data.F_DESC6 : '') + '_v' + idx + '.' + newName.split('.').pop());
                                    break;
                                default:
                                    rec.set('F_NAME', newName);
                                    break;
                            }

                            rec.set('F_TYPE', newType);
                            rec.set('F_SIZE', newSize);
                            rec.set('F_EXT', '.' + newName.split('.').pop());
                            rec.set('F_LOCATION', newName + '_' + newSize);
                            rec.set('F_MOD_USER_ID', Vega.user.data.Userid);
                            rec.set('F_UPDATED_ON', new Date());
                        }
                    }
                }
            }]
        });

        me.win.on('close', function(w){
            view.setActiveTab(0);
            view.up('maincontainerwrap').unmask();
        });

        me.win.show('', function(){
            view.up('maincontainerwrap').mask();
        });
    },

    buildBodyFields: function(){
        return [{
            xtype: 'hiddenfield',
            name: 'name'
        },{
            xtype: 'hiddenfield',
            name: 'type'
        },{
            xtype: 'hiddenfield',
            name: 'size'
        },{
            xtype: 'textfield',
            name: 'F_NAME',
            hidden: true,
            bind: {
                value: '{theMedia.F_NAME}'
            }
        },{
            xtype: 'textfield',
            name: 'F_TYPE',
            hidden: true,
            bind: {
                value: '{theMedia.F_TYPE}'
            }
        },{
            xtype: 'textfield',
            name: 'F_SIZE',
            hidden: true,
            bind: {
                value: '{theMedia.F_SIZE}'
            }
        },{
            xtype: 'combo',
            name: 'F_CATEGORY',
            fieldLabel: 'Category',
            //hideLabel: true,
            hideEmptyLabel: false,
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            bind: {
                store: '{types}',
                value: '{theMedia.F_CATEGORY}'
            },
            valueField: "text",
            displayField: "text",
            //forceSelection: true,
            //selectOnFocus: true,
            allowBlank: false,
            editable: false,
            queryMode: "local",
            autoLoadOnValue: true,
            //queryParam: "filter",
            //triggerAction: 'all',
            //minChars: 1,
            matchFieldWidth: true,
            plugins: [{
                ptype: "cleartrigger"
            }]
        },{
            //xtype: 'textfield',
            name: 'F_DESC5',
            fieldLabel: 'Body #',
            allowBlank: false,
            bind: {
                value: '{theMedia.F_DESC5}'
            }
        },{
            xtype: "tagfield",
            name: 'F_OWNER',
            fieldLabel: "Original #",
            //hideLabel: true,
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            store: 'memBodies',
            remoteStore: 'Bodies',
            bind: {
                value: '{theMedia.F_OWNER}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            pageSize: 50,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //filterPickList: true,
            //minChars: 0,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }]
        },{
            //xtype: 'textfield',
            fieldLabel: 'Sewing Price',
            name: 'F_DESC7',
            bind: {
                value: '{theMedia.F_DESC7}'
            }
        },{
            xtype: "combo",
            name: 'F_MFLAG',
            fieldLabel: "Fabric Type",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{fabricTypes}',
                value: '{theMedia.F_MFLAG}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //filterPickList: true,
            //pageSize: 25,
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                render: function(c){
                    c.on('focus', function () {
                        c.expand();
                    });
                }
            }
        },{
            xtype: "tagfield",
            name: 'F_DESC2',
            fieldLabel: "Body Type",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{bodyTypes}',
                value: '{theMedia.F_DESC2}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //filterPickList: true,
            //pageSize: 100,
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }]
        },{
            xtype: 'textareafield',
            fieldLabel: 'Description',
            name: 'F_DESC1',
            bind: {
                value: '{theMedia.F_DESC1}'
            }
        }];
    },

    buildCompFields: function(){
        //var compStore = Ext.create('Vega.store.Components');
        /*
         compTypeStore = Ext.create('Vega.store.RawMatTypes', {
         autoLoad: true
         }),
         */

        Ext.getStore('memComponents').clearFilter();

        return [{
            xtype: 'hiddenfield',
            name: 'name'
        },{
            xtype: 'hiddenfield',
            name: 'type'
        },{
            xtype: 'hiddenfield',
            name: 'size'
        },{
            xtype: 'textfield',
            name: 'F_NAME',
            hidden: true,
            bind: {
                value: '{theMedia.F_NAME}'
            }
        },{
            xtype: 'textfield',
            name: 'F_TYPE',
            hidden: true,
            bind: {
                value: '{theMedia.F_TYPE}'
            }
        },{
            xtype: 'textfield',
            name: 'F_SIZE',
            hidden: true,
            bind: {
                value: '{theMedia.F_SIZE}'
            }
        },{
            xtype: 'combo',
            name: 'F_CATEGORY',
            //reference: 'cboCategory',
            fieldLabel: 'Category',
            //hideLabel: true,
            hideEmptyLabel: false,
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            bind: {
                store: '{types}',
                value: '{theMedia.F_CATEGORY}'
            },
            valueField: "text",
            displayField: "text",
            publishes: '{value}',
            //forceSelection: true,
            //selectOnFocus: true,
            minChars: 1,
            editable: false,
            autoLoadOnValue: true,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'all',
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                select: function(combo, rec, e){
                    var cboCode = combo.ownerCt.query('combo[name="F_DESC6"]')[0],
                        store = cboCode.getStore();

                    /*
                    Ext.apply(store.getProxy().extraParams, {
                        type: rec.data.text.trim()
                    });

                    store.reload({
                        callback: function(){

                        }
                    });
                    */
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC6',
            //reference: 'cboComponent',
            fieldLabel: "Code #",
            //hideLabel: true,
            //labelWidth: 50,
            //width: 160,
            //hideTrigger: true,
            bind: {
                //store: '{components}',
                value: '{theMedia.F_DESC6}'
            },
            store: 'memComponents',
            remoteStore: 'Components',
            valueField: "label",
            displayField: "label",
            forceSelection: false,
            selectOnFocus: true,
            matchFieldWidth: false,
            autoLoadOnValue: true,
            pageSize: 50,
            //minChars: 1,
            queryMode: "local",
            //queryParam: "filter",
            //queryDelay: 800,
            //triggerAction: 'last',
            //lastQuery: '',
            tpl: [
                '<tpl for=".">',
                //'<tpl if="[xindex] == 1">',
                '<table class="cbStyles-list" width="100%">',
                //'<tr>',
                //'<th>Style</th>',
                //'<th>Description</th>',
                //'</tr>',
                //'</tpl>',
                '<tr class="x-boundlist-item">',
                '<td style="padding:0px 0px;" width="60%">{label}</td>',
                '<td width="40%">{text}</td>',
                '</tr>',
                '<tpl if="[xcount-xindex]==0">',
                '</table>',
                '</tpl>',
                '</tpl>'
            ],
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                beforequery: function(qe){
                    //delete qe.combo.lastQuery;
                },
                select: function(combo, rec, e){
                    var cboColor = combo.ownerCt.query('combo[name="F_DESC3"]')[0],
                        store = cboColor.getStore();

                    /*
                    Ext.apply(store.getProxy().extraParams, {
                        type: rec.data.text.trim(),
                        style: rec.data.id.trim()
                    });

                    store.reload({
                        callback: function(){
                            cboColor.select(store.first());
                            cboColor.fireEvent('select', combo, [store.first()]);
                        }
                    });
                    */
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC3',
            fieldLabel: "Color",
            //hideLabel: true,
            //labelWidth: 50,
            //width: 160,
            //hideTrigger: true,
            bind: {
                //store: '{compColors}',
                value: '{theMedia.F_DESC3}'
            },
            store: 'memRawColors',
            remoteStore: 'rawColors',
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            autoLoadOnValue: true,
            matchFieldWidth: false,
            pageSize: 50,
            //minChars: 1,
            queryMode: "local",
            //queryParam: "filter",
            //queryDelay: 800,
            //triggerAction: 'last',
            //lastQuery: '',
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                beforequery: function(qe){
                    //delete qe.combo.lastQuery;
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC2',
            fieldLabel: "Type",
            //hideLabel: true,
            //hideTrigger: true,
            bind: {
                store: '{bomtypes}',
                value: '{theMedia.F_DESC2}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            //pageSize: 100,
            autoLoadOnValue: true,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
           // minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                render: function(c){
                    c.on('focus', function(c){
                        c.expand();
                    });
                },
                beforequery: function(qe){
                    //if triggerAction: 'last'
                    //delete qe.combo.lastQuery;
                }
            }
        },{
            xtype: 'combo',
            name: 'F_MFLAG',
            fieldLabel: 'Side',
            //hideLabel: true,
            //hideTrigger: true,
            bind: {
                store: '{sides}',
                value: '{theMedia.F_MFLAG}'
            },
            valueField: "text",
            displayField: "text",
            forceSelection: false,
            selectOnFocus: true,
            queryMode: 'local',
            autoLoadOnValue: true,
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: true,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                render: function(c){
                    c.on('focus', function(c){
                        c.expand();
                    });
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC4',
            fieldLabel: "Vendor",
            //hideLabel: true,
            //hideTrigger: true,
            bind: {
                //store: '{vendors}',
                value: '{theMedia.F_DESC4}'

            },
            store: 'Vendors',
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            autoLoadOnValue: true,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                render: function(c){
                    c.on('focus', function(c){
                        c.expand();
                    });
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC8',
            fieldLabel: "Account",
            //hideLabel: true,
            //hideTrigger: true,
            bind: {
                //store: '{customers}',
                value: '{theMedia.F_DESC8}'

            },
            store: 'Customers',
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            autoLoadOnValue: true,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                render: function(c){
                    c.on('focus', function () {
                        c.expand();
                    });
                }
            }
        },{
            xtype: "tagfield",
            name: 'F_DESC9',
            fieldLabel: "Theme",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{themes}',
                value: '{theMedia.F_DESC9}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            queryMode: 'local',
            autoLoadOnValue: true,
            filterPickList: true,
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }]
        },{
            xtype: "tagfield",
            name: 'F_DESC10',
            fieldLabel: "Colorway",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{pantones}',
                value: '{theMedia.F_DESC10}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            autoLoadOnValue: true,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            filterPickList: true,
            //pageSize: 100, // only works with queryMode = 'remote'
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }]
        },{
            xtype: 'textareafield',
            name: 'F_DESC1',
            fieldLabel: 'Description',
            grow: true,
            //hidLabel: true,
            bind: {
                value: '{theMedia.F_DESC1}'
            }
        }];
    },

    buildPhotoFields: function(){
        //var compStore = Ext.create('Vega.store.Components');
        /*
         compTypeStore = Ext.create('Vega.store.RawMatTypes', {
         autoLoad: true
         }),
         */

        return [{
            xtype: 'hiddenfield',
            name: 'name'
        },{
            xtype: 'hiddenfield',
            name: 'type'
        },{
            xtype: 'hiddenfield',
            name: 'size'
        },{
            xtype: 'textfield',
            name: 'F_NAME',
            hidden: true,
            bind: {
                value: '{theMedia.F_NAME}'
            }
        },{
            xtype: 'textfield',
            name: 'F_TYPE',
            hidden: true,
            bind: {
                value: '{theMedia.F_TYPE}'
            }
        },{
            xtype: 'textfield',
            name: 'F_SIZE',
            hidden: true,
            bind: {
                value: '{theMedia.F_SIZE}'
            }
        },{
            xtype: 'combo',
            name: 'F_CATEGORY',
            //reference: 'cboCategory',
            fieldLabel: 'Category',
            //hideLabel: true,
            hideEmptyLabel: false,
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            bind: {
                store: '{types}',
                value: '{theMedia.F_CATEGORY}'
            },
            valueField: "text",
            displayField: "text",
            publishes: '{value}',
            //forceSelection: true,
            //selectOnFocus: true,
            editable: false,
            readOnly: true,
            autoLoadOnValue: true,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'all',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                select: function(combo, rec, e){
                    var cboCode = combo.ownerCt.query('combo[name="F_DESC6"]')[0],
                        store = cboCode.getStore();

                    /*
                    Ext.apply(store.getProxy().extraParams, {
                        type: rec.data.text.trim()
                    });

                    store.reload({
                        callback: function(){

                        }
                    });
                    */
                }
            }
        },{
            xtype: "combo",
            name: 'F_STYLE',
            fieldLabel: "Style #",
            //hideLabel: true,
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            bind: {
                //store: '{styles}',
                value: '{theMedia.F_STYLE}'
            },
            store: 'memStyles',
            remoteStore: 'Styles',
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            pageSize: 50,
            //minChars: 1,
            matchFieldWidth: false,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'last',
            //lastQuery: '',

            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                beforequery: function(qe){
                    //delete qe.combo.lastQuery;
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC5',
            fieldLabel: "Body #",
            //hideLabel: true,
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            bind: {
                //store: '{bodies}',
                value: '{theMedia.F_DESC5}'
            },
            store: 'memBodies',
            remoteStore: 'Bodies',
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            pageSize: 50,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'last',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                beforequery: function(qe){
                    //delete qe.combo.lastQuery;
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC6',
            //reference: 'cboPrints',
            fieldLabel: "Print #",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                //store: '{components}',
                value: '{theMedia.F_DESC6}'
            },
            store: 'memComponents',
            remoteStore: 'Components',
            valueField: "label",
            displayField: "label",
            forceSelection: false,
            selectOnFocus: true,
            pageSize: 50,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            tpl: [
                '<tpl for=".">',
                //'<tpl if="[xindex] == 1">',
                '<table class="cbStyles-list" width="100%">',
                //'<tr>',
                //'<th>Style</th>',
                //'<th>Description</th>',
                //'</tr>',
                //'</tpl>',
                '<tr class="x-boundlist-item">',
                '<td style="padding:0px 0px;" width="60%">{label}</td>',
                '<td width="40%">{text}</td>',
                '</tr>',
                '<tpl if="[xcount-xindex]==0">',
                '</table>',
                '</tpl>',
                '</tpl>'
            ],
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                beforequery: function(qe){
                    //if triggerAction: 'last'
                    //delete qe.combo.lastQuery;
                }
            }
        },{
            xtype: 'combo',
            name: 'F_MFLAG',
            fieldLabel: 'F/B',
            editable: false,
            bind: {
                value: '{theMedia.F_MFLAG}'
            },
            queryMode: 'local',
            store: ['FRONT', 'BACK'],
            hidden: false
        },{
            xtype: 'combo',
            name: 'F_DESC8',
            fieldLabel: 'Customer',
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                //store: '{customers}',
                value: '{theMedia.F_DESC8}'
            },
            store: 'Customers',
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            queryMode: 'local',
            autoLoadOnValue: true,
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                render: function(c){
                    c.on('focus', function () {
                        c.expand();
                    });
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC4',
            fieldLabel: "Vendor",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                //store: '{vendors}',
                value: '{theMedia.F_DESC4}'

            },
            store: 'Vendors',
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            autoLoadOnValue: true,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                render: function(c){
                    c.on('focus', function () {
                        c.expand();
                    });
                }
            }
        },{
            xtype: "textfield",
            name: 'F_DESC7',
            fieldLabel: "Stone Price",
            //hideLabel: true,
            bind: {
                value: '{theMedia.F_DESC7}'
            }
        },{
            xtype: 'textareafield',
            name: 'F_DESC1',
            fieldLabel: 'Description',
            grow: true,
            //hidLabel: true,
            bind: {
                value: '{theMedia.F_DESC1}'
            }
        }];
    },

    onTypesRefresh: function(store){

        var multiview = this.getView().lookupReference("multiview"),
            button = multiview.down("cycle[reference=filterButton]"),
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
                itemId: rec.data.id,
                checkHandler: button.checkHandler,
                scope: button
            });
        });

        menu.add(items);
    },

    onTypeChange: function(u, t){
        var me = this,
            view = me.getView(),
            multiview = view.lookupReference("multiview"),
            refs = multiview.getReferences(),
            grid = refs.grid,
            x = grid.getPlugin("gridfilters"),
            r = grid.getColumns(),
            topbar = refs.topbar,
            btn = multiview.getDockedItems('pagingtoolbar > button[name="btnCustInfo"]')[0],

            w = topbar.down("multisortbutton[name=body]"),
            p = topbar.down("multisortbutton[name=print]"),
            n = topbar.down("multisortbutton[name=photo]");

        w.setVisible(t.type == "Body");
        p.setVisible(t.type == "Prints");
        n.setVisible(t.type == "Photos");

        //console.log(btn);
        btn.setDisabled(t.type != "Prints");

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

    onCategoryLoad: function(j, f, h){
        var i = this.getViewModel(),
        g = this.lookupReference("filterSelection");
    },

    onSortItemChange: function(i, j, h, g){
        var l = i.up("toolbar"),
            k = l.down("combo#sortButton").getValue();

        this.getStore("dals").sort(k);
    },

    onRowDblClick: function(g, i, j, h, f){
        this.onTabOpen(null, i);
    },

    onItemDblClick: function(g, h, j, f, i){
        this.onTabOpen(null, h);
    },

    /*
    onRefreshClick: function(b){
        this.getStore("dals").reload();
    },

    onContextmenuOpenClick: function(d, c){
        this.onTabOpen(null, d);
    },

    onContextMenuRefreshClick: function(d, c){
        this.getStore('dals').load();
    },
    */

    onContextMenuDownloadClick: function(d, c){
        this.downloadItems(d);
    },

    onContextMenuEditClick: function(d,c){
        this.showEditWindow(d);
        this.win.on('saveclick', this.onSaveMedia, this);
    },

    onContextMenuDeleteClick: function(d,c){
        var me = this;
        Ext.Msg.show({
            title:'Warning!',
            message: 'Are you sure you want to delete this?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);

                    d.drop();

                    var batch = me.getView().getSession().getSaveBatch();
                    var processMask = new Ext.LoadMask({
                        msg: 'Saving... Please wait',
                        target: me.getView()
                    });
                    me.processBatch(batch, null, null, processMask);
                }
            }
        });
    },

    onContextMenuBookmarkClick: function(d, c){
        this.addBookmark(d, this.getView());
    },

    onTabOpen: function(d, c){
        this.redirectTo("dal/tab/" + c.get("ID"));
    },

    onSelect: function(t, r, o, n){
        var p = this.getView().lookupReference("multiview"),
            l = p.getReferences(),
            s = l.topbar,
            m = l.display;

        m.active = r;
        //me.update(rec.data);
        var innerPnl = m.getComponent('innerPnl');
        innerPnl.update(r.data);

        //m.setActive(r);

        var k = [],
            q = s.lookupReference("viewselection");

        k[0] = "dal";
        k[1] = q.value == 0 ? "default" : q.value == 1 ? "medium" : "tiles";
        k[2] = r.get("ID");

        this.redirectTo(k.join("/"));
    },

    onItemContextMenu: function(h, j, k, g, l){
        l.stopEvent();
        var i = h.getSelectionModel();

        if(!i.isSelected(g)){
            i.select(g);
        }

        this.view.contextmenu.items.items[4].setHidden(!(Vega.user.userOwn(j.data.userId) || Vega.user.inRole('administrators')));
        this.view.contextmenu.showAt(l.getXY());
    },

    processBatch: function(batch, field, options, pMask){
        //var changes = this.getView().getSession().getChanges();

        if(batch !== undefined){
            batch.on({
                /*
                operationcomplete: function(batch, op){

                },
                */
                complete: function(batch, op){
                    //refresh In-Review

                    var objResp = op.getResponse();
                    if(!Ext.isEmpty(objResp)){
                        var response = JSON.parse(objResp.responseText);

                        if(field && field.getFilesQueue().length > 0){
                            field.send(options, {
                                Media: JSON.stringify(response.data)
                            });
                        }
                        else {
                            pMask.hide('', function() {
                                Ext.Msg.alert('Status', 'Changes saved successfully.');
                            });
                        }
                    }
                    //console.log(typeof response.data, response.data, JSON.stringify(response.data));
                },
                exception: function(batch, op){
                    //Ext.Msg.alert('Error', 'Error occurred');
                    var objResp = op.error.response;
                    //console.log(objResp)
                    pMask.hide('', function() {
                        if(!Ext.isEmpty(objResp)){
                            var response = JSON.parse(objResp.responseText);
                            Ext.Msg.alert(objResp.statusText, objResp.responseText);
                        }
                    });
                }
            });

            pMask.show();
            batch.start();
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
    }
});

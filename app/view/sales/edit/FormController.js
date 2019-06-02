Ext.define('Vega.view.sales.edit.FormController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Vega.model.Powh',
        'Vega.model.Powd',
        'Vega.model.Powm',
        'Vega.model.Powlog',
        'Vega.model.Powdtag',
        'Vega.model.Tnap',
        'Vega.model.TnaOrder',
        'Vega.model.sales.File'
    ],

    alias: 'controller.sales-edit-form',

    listen: {
        component: {
            'edit-window': {
                close: function(w){
                    var form = this.getView();
                    if(form.imagesQueue && form.imagesQueue.length != 0){
                        form.imagesQueue.length = 0;
                    }
                }
            }
        },
        store: {
            '#tnaOrders': {
                beforeload: {
                    fn: 'onStoreBeforeLoad'
                }
            },
            '#powlogs': {
                datachanged: {
                    fn: 'onStoreDataChanged'
                }
            }

        }
    },

    init: function(){
        //console.log('init', this);
        var me = this;

        Ext.Ajax.request({
            url: 'resources/data/sales/stores.json',
            scope: me,
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
                    var store = me.getViewModel().getStore(key);
                    //console.log(store, key, value)
                    if(store && value){
                        store.loadData(value);
                    }
                });
            },
            failure: function(response){

            }
        });

    },

    initViewModel: function(vm){
        //this.fireEvent("viewmodelready", thModel');
    },

    onAfterRender: function(p){

        /*
        var btnTna = this.getView().getDockedItems('toolbar[dock="top"] > button[text="T&A"]')[0];

        var powh = this.getViewModel().get('header');
        //console.log(powh, this.getViewModel().linkData.header)
        if(powh != null){
            var powds = powh.powds();

            btnTna.setDisabled(powds.getCount() == 0);

            powds.on('datachanged', function(s){
                var total = 0;
                s.each(function(p){
                    total += p.tnaps().getCount();
                });
                btnTna.setDisabled(s.getCount() == 0 || total != 0);
            })
        }

        var me = this,
            vm = this.getViewModel(),
            rec = vm.get('header');
        */
    },

    onStoreBeforeLoad: function(store, op){
        var me = this,
            vm = this.getViewModel(),
            rec = vm.get('header');
        //combo = me.tna.query('combo')[0],

        //console.log('beforestoreload', rec);
        //store.getProxy().setExtraParam('tnaId', 0);
        //store.filter('roleId', cycle.getActiveItem().type);
    },

    onStoreDataChanged: function(store, e){
        var me = this,
            vm = me.getViewModel(),
            powh = vm.get('header');

        //console.log('onStoreDataChanged', powh);
        //powh.set('updatedby', Vega.user.data.Userid);
        powh.set('updatedon', new Date());
    },

    /*
    onActivate: function(p){

    },

    onAdded: function(c, p){
        //console.log(c, p)
    },
    */

    onAttchmentRender: function(){
        var refs = this.getReferences(),
            view = refs.attachments.down('viewupload'),
            toolbar = refs.attachments.down('toolbar');

        toolbar.add(view.fileUpload);
    },

    /*
    onBtnReject: function(btn){
        var me = this,
            refs = this.getReferences(),
            view = refs.attachments.down('viewupload'),
            vm = me.getViewModel(),
            changes = me.getSession().getChanges();

        view.getStore().rejectChanges();

        console.log(me.getSession())

        changes=Ext.JSON.encodeValue(changes, '<br>');
        Ext.Msg.alert('proxy', '<pre>' + changes + '</pre>');
    },
    */

    onBtnRemoveAll: function(btn){
        var refs = this.getReferences(),
            view = refs.attachments.down('viewupload');

        view.getStore().removeAll();
        view.fileUpload.filesQueue.length = 0;
    },

    /**
     *
     * @param btn
     * @param value
     */
    onToggleSlideChange: function(btn, pressed){
        var refs = this.getReferences(),
            attach = refs.attachments;

        btn.setIconCls(pressed ? 'x-fa fa-toggle-on' : 'x-fa fa-toggle-off');

        if(pressed){
            attach.add({
                xtype: 'container',
                itemId: 'attach_detail',
                region: 'east',
                split: {
                    size: 1
                },
                style: {
                    'background-color' : '#f5f5f5'
                },
                width: '30%',
                minWidth: 200
            })
        }
        else {
            attach.remove(attach.getComponent('attach_detail'))
        }
    },

    onPositionChange: function(btn, active){
        var tabpanel = this.lookupReference('panels');

        tabpanel.setBind({
            tabPosition: active.itemId
        });

        //console.log(tabpanel.getTabBar())
    },

    onTabChange: function(t, n, o, e){
        var refs = this.getView().getReferences();

        refs.groupCrud.setHidden(n.reference != 'merchandise');
        refs.toggledetail.setHidden(n.reference != 'attachments');
    },

    showWindow: function(comp, record){
        var view = this.getView(),
            viewer = view.up('viewer');

        //console.log(window.innerWidth, window.innerHeight)
        this.isEdit = !!record;
        this.win = view.add({
            xtype: 'edit-window',
            reference: 'editWindow',

            //alignTarget: '',
            width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 1280,
            //maxWidth: 1366,
            height: window.innerHeight < 760 ? (view.getHeight() * 0.94) : 580,

            viewModel: {
                data: {
                    title: !record ? 'Add New Style' : ('Edit Style: ' + record.get('bodyref') + (record.get('style') && record.get('color') ? ' (' + record.get('style') + ' / ' + record.get('color') + ')' : ''))
                },

                links: {
                    // If we are passed a record, a copy of it will be created in the newly spawned session.
                    // Otherwise, create a new phantom customer in the child.
                    theStyle: record || {
                        type: 'Powd',
                        create: {
                            userId: Vega.user.data.Userid,
                            factory: view.getViewModel().get('header').data.factory
                        }
                    }
                },

                formulas: {
                    isStyleValid: {
                        bind: {
                            bindTo: '{theStyle}',
                            deep: true
                        },
                        get: function(powd){
                            return powd.isValid();
                        }
                    },

                    statusValue: {
                        bind: '{header.status}',
                        get: function(value) {
                            return value == 'approved' ? true : false;
                        },
                        set: function(value) {
                            this.set('header.status', value == true ? 'approved' : 'pending');
                        }
                    },

                    bodyimg: {
                        bind: {
                            bindTo: '{theStyle}',
                            deep: true
                        },
                        get: function(value) {
                            var src = '';
                            if(value.data.bodyimgsrc != null){
                                src = '../' + encodeURIComponent(value.data.bodyimgsrc) + '?w=128&h=140';
                            }
                            return value.data.bodyimg.indexOf('blob:') !== -1 ? value.data.bodyimg : src
                        }
                    },
                    printimg: {
                        bind: {
                            bindTo: '{theStyle}',
                            deep: true
                        },
                        get: function(value) {
                            //var src = 'resources/images/default.png';
                            var src = '';
                            if(value.data.printimgsrc != null){
                                src = '../' + encodeURIComponent(value.data.printimgsrc) + '?w=128&h=140';
                            }
                            return value.data.printimg.indexOf('blob:') !== -1 ? value.data.printimg : src
                        }
                    }

                }
            },

            // Creates a child session that will spawn from the current session
            // of this view.
            session: true,

            buttons: [{
                text: 'Save',
                bind: {
                    disabled: '{!isStyleValid}'
                },
                handler: 'onSaveStyleClick'
            }, {
                text: 'Cancel',
                handler: 'onCancelStyleClick',
                scope: this
            }]
        });


        var rec = this.win.getViewModel().get('theStyle');

        //matStore.sort('lineseq', 'ASC');

        if(!this.isEdit){

            rec.powms().add({
                lineseq: 1,
                matcategory: 'SELF',
                mattype: 'FABRICS',
                matcode: view.getViewModel().get('header').data.mainfabric
            },{
                lineseq: 2,
                matcategory: 'PRINTS',
                mattype: 'PRINTS'
            },{
                lineseq: 3,
                matcategory: 'STONE',
                mattype: 'STONE'
            },{
                lineseq: 4,
                matcategory: 'CONTRAST1',
                mattype: 'FABRICS'
            },{
                lineseq: 5,
                matcategory: 'TRIMS',
                mattype: 'TRIMS'
            });

            var data = [];
            rec.powms(function(powms){
                powms.each(function(item){
                    data.push(item.data);
                })
            });
            rec.set('mats', data);
        }
        else {
            /*
            var upload = this.win.down('multiimageupload'),
                body = upload.down('image[canvas="' + upload.id + '-canvas-' + 'body' + '"]'),
                print = upload.down('image[canvas="' + upload.id + '-canvas-' + 'prints' + '"]');

            body.setSrc(!Ext.isEmpty(record.data._bodyimgsrc) ? record.get('_bodyimgsrc') : '../DLIB/BLU-ILLUSTRATIONS/' + record.get('bodyimgsrc') + '?w=128&h=140');
            print.setSrc(!Ext.isEmpty(record.data._printimgsrc) ? record.get('_printimgsrc') : '../DLIB/BLU-PRINTCAD/' + record.get('printimgsrc') + '?w=128&h=140');
            */
            //rec.set('updatedby', Vega.user.data.Userid);
        }

        this.win.on('close', function(p){
            view.up('viewer').up('maincontainerwrap').unmask();
        });

        this.win.show('', function(){
            view.up('viewer').up('maincontainerwrap').mask();
        });
    },

    onGridRowDblclick: function(grid, rec, tr, idx, e){
        var btn = this.lookupReference('edit');

        this.showWindow(btn, rec);
        //console.log(rec)
    },

    onAddStyleClick: function(btn){
        this.showWindow(btn, null);
    },

    onCopyStyleClick: function(btn){
        var me = this,
            session = me.getViewModel().getSession(),
            grid = me.lookupReference('details'),
            d = grid.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', d);

        var mat = grid.getStore().add(nd);

        Ext.Object.each(session.data.Powm, function(key, value, self){
            var rec = value.record;
            if(rec.get('powdId') == d.id){
                nd.powms().add(rec.copy(null, session));
            }
        });

        Ext.Object.each(session.data.Tnap, function(key, value, self){
            var rec = value.record;
            if(rec.get('powdId') == d.id){
                nd.tnaps().add(rec.copy(null, session));
            }
        });

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

        grid.getView().refresh();
    },

    onEditStyleClick: function(btn){
        var me = this,
            rec = me.lookupReference('details').getSelection()[0];

        this.showWindow(btn, rec);
        //console.log('onEditStyleClick', me.lookupReference('details').getSelection()[0], me.getViewModel().getSession().peekRecord('Powd', rec.id))
        //this.showWindow(btn, rec);
        //console.log('editstyle', rec)
    },

    onDeleteStyleClick: function(btn){
        var me = this,
            grid = me.lookupReference('details'),
            selection = grid.getSelectionModel().getSelection()[0],
            store = grid.getStore();

        //store.remove(grid.getSelection()[0]);
        selection.drop();
        grid.getSelectionModel().deselectAll();

    },

    onExportStyleClick: function(btn){
        var me = this,
            grid = me.lookupReference('details'),
            selection = grid.getSelectionModel().getSelection()[0],
            store = grid.getStore(),
            index = store.indexOf(selection),
            rec = store.getAt(index);

        //console.log(rec.modified.powhId)
        this.redirectTo('product/import/' + rec.modified.powhId + index)
    },

    onSaveStyleClick: function(){
        // Save the changes pending in the win's child session back to the
        // parent session.
        var me = this,
            session = me.getSession(),
            win = me.win,
            vm = win.getViewModel(),
            view = me.getView(),
            form = me.lookupReference('form-edit'),
            grid = me.lookupReference('details'),
            isEdit = this.isEdit,
            id, rec;

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
            }

            id = vm.get('theStyle').id;
            win.getSession().save();

            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store
                rec = session.getRecord('Powd', id);
                grid.getStore().add(rec);

            }
            else {
                rec = session.peekRecord('Powd', id);
            }

            var data = [];
            vm.get('theStyle').powms(function(powms){
                powms.each(function(item){
                    data.push(item.data);
                })
            });

            rec.set('mats', data);
            //console.log(view.imagesQueue);
            if(view.imagesQueue && view.imagesQueue.length > 0){
                Ext.each(view.imagesQueue, function(item, idx, self){
                    //console.log('FormController', item);
                    view.getViewModel().getStore('fileStore').add({
                        FID: item.imageKey == ('bodyimg' + '-' + rec.id) ? 1 : 2,
                        F_NAME: item.imageFile.name,
                        F_TYPE: item.imageFile.type,
                        F_SIZE: item.imageFile.size,
                        F_LINK: item.imageKey == ('bodyimg' + '-' + rec.id) ? 'DLIB/BLU-ILLUSTRATIONS/' : 'DLIB/BLU-PRINTCAD/',
                        F_CATEGORY: item.imageKey == ('bodyimg' + '-' + rec.id) ? 'Body' : 'Prints',
                        F_EXT: '.' + item.imageFile.type.split('/').pop(),
                        F_BFLAG: true,
                        F_APPLICATION: 'POW',
                        F_LOCATION: item.imageFile.name + '_' + item.imageFile.size,
                        F_USERID: Vega.user.data.Userid,
                        F_CREATED_ON: new Date()
                    });
                });
                //console.log(view.imagesQueue, view.getViewModel().getStore('fileStore'));

                view.getViewModel().getStore('fileStore').sync({
                    success: function(batch, opt){
                        var response = JSON.parse(batch.operations[0].getResponse().responseText);
                        //console.log(batch.operations[0].getResponse().responseText)

                        if(view.imagesQueue && view.imagesQueue.length > 0){
                            view.send({
                                url: '/api/Files/Powd/upload',
                                success: function(resp){
                                    //console.log(response);
                                    var d = new Date(),
                                        path = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();

                                    Ext.each(response.data, function(item, idx, self){
                                        var fieldId = item.FID == 1 ? 'bodyimgsrc' : 'printimgsrc';
                                        rec.set(fieldId, item.F_LINK + path + "/" + item.ID + "/" + item.F_NAME);
                                    })

                                    grid.getView().refresh();
                                    me.onCancelStyleClick();
                                    //Ext.Msg.alert('Success', resp);
                                },
                                failure: function(resp) {
                                    Ext.Msg.alert('Failure', resp);
                                }
                            }, {
                                Media: JSON.stringify(response.data)
                            });
                        }

                    },
                    failure: function(batch, opt){
                        Ext.Msg.alert(response.statusText, response.status + ' - ' + response.responseText );
                    },
                    callback: function(batch, opt){

                    }
                });
            }
            else {
                grid.getView().refresh();
                me.onCancelStyleClick();
            }
        }
    },

    onCancelStyleClick: function (btn) {
        //this.win = Ext.destroy(this.win);
        this.win.close();
    },

    showTNAWindow: function(comp, rec){
        var me = this,
            view = me.getView();

        //console.log('TNA', rec);
        me.tna = view.add({
            xtype: 'window',
            reference: 'tnaWindow',
            //alignTarget: '',
            width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 1280,
            //maxWidth: 1366,
            height: window.innerHeight < 760 ? (view.getHeight() * 0.94) : 580,
            //modal: true,
            layout: 'fit',
            monitorResize: true,
            maximizable: true,
            //alwaysOnTop: true,
            constrain: true,
            //maximized: true,
            scrollable: 'y',
            closable: true,
            padding: 4,

            bind: {
                title: '{title}'
            },

            session: true,

            viewModel: {
                data: {
                    title: 'T & A - ' + rec.get('bodyref') + (rec.get('style') && rec.get('color') ? ' (' + rec.get('style') + ' / ' + rec.get('color') + ')' : '')
                },

                links: {
                    otherStyle: rec
                },

                stores: {
                    planTypes: {
                        fields: ['roleId', 'name'],
                        data: [{
                            roleId: 1,
                            name: 'Type A'
                        },{
                            roleId: 2,
                            name: 'Type B'
                        }]
                    }
                }
            },

            items: [{
                xtype: 'tna-grid',
                reference: 'tnapsgrid',
                bind: '{otherStyle.tnaps}',
                //padding: '0 0 10 0',

                tbar: [{
                    xtype: 'button',
                    text: 'Add',
                    width: 70,
                    iconCls: 'x-fa fa-plus',
                    handler: 'onAddActivityClick'
                },{
                    xtype: "button",
                    text: 'Add All',
                    iconCls: "x-fa fa-gear",
                    //scope: this.controller,
                    menu: {
                        items: [{
                            text: "T&A - A",
                            iconCls: "x-fa fa-gear",
                            type: 1,
                            itemId: "a"
                        },{
                            text: "T&A - B",
                            iconCls: "x-fa fa-gear",
                            type: 2,
                            itemId: "b"
                        }],
                        listeners: {
                            click: {
                                fn: 'onAddAllMenuClick'
                            }
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'x-fa fa-remove',
                    bind: {
                        disabled: '{!tnapsgrid.selection}'
                    },
                    handler: 'onRemoveActivityClick'
                },{
                    xtype: 'button',
                    text: 'Remove All',
                    iconCls: 'x-fa fa-remove',
                    handler: 'onRemoveAllActivityClick'
                }]

            }],

            buttons: [{
                text: 'Save',
                handler: 'onSaveTNAClick',
                scope: this
            }, {
                text: 'Cancel',
                handler: 'onCancelTNAClick',
                scope: this
            }]
        });

        me.tna.on('close', function(p){
            me.getView().up('viewer').up('maincontainerwrap').unmask();
        });

        me.tna.show('', function(){
            me.getView().up('viewer').up('maincontainerwrap').mask();
        });
    },

    onAddAllMenuClick: function(menu, item, e){

        var me = this,
            win = menu.up('window'),
            style = win.getViewModel().get(win.reference == 'editWindow' ? 'theStyle' : 'otherStyle'),
            store = me.getViewModel().getStore('tnaOrders');

        //console.log(me.win, me.tna)
        store.on('load', function(s){
            //console.log(store, style);
            if(style.tnaps().getCount() > 0){
                style.tnaps().removeAll();
            }

            store.sort('priority', 'ASC');

            store.each(function(r){
                style.tnaps().add(r.data);
            });
        }, this, {
            single: true
        });

        store.filter({
            operator: "eq",
            value: item.type,
            property: "roleId"
        });

    },

    onGridWidgetClick: function(comp, rec){
        this.showTNAWindow(comp, rec);
    },

    onTNAClick: function(btn, e){
        this.showTNAWindow(btn, null);
    },

    onSaveTNAClick: function(btn){

        var win = this.tna,
            style = win.getViewModel().get('otherStyle'),
            srcStore = win.getViewModel().getStore('tnaOrders');
            //destStore = this.lookupReference('activities').getStore();

        /*
        this.getViewModel().get('header').powds(function(powds){
            powds.each(function(item){

                if(style == null || style == item){
                    srcStore.each(function(r){
                        var rec = r.copy();
                        item.tnaps().add(rec.data);
                    });
                }
            })
        });
        */

        win.getSession().save();
        win.close();
    },

    onCancelTNAClick: function(btn){
        this.tna.close();
    },

    onAddActivityClick: function(btn){
        //var store = this.lookupReference('planactivities').getStore();
        var win = btn.up('window'),
            style = win.getViewModel().get(win.reference == 'editWindow' ? 'theStyle' : 'otherStyle');

        style.tnaps().add({

        });

        style.tnaps().each(function(rec,idx){
            rec.set('priority', (idx+1) * 10);
        })
    },

    onRemoveActivityClick: function(btn){
        var grid = btn.up('tna-grid'),
            //grid = this.lookupReference('planactivities'),
            store = grid.getStore(),
            sm = grid.getSelectionModel(),
            selected = sm.getSelection();

        Ext.Array.each(selected, function(rec, index, self){
            rec.drop();
        })

        store.each(function(rec,idx){
            rec.set('priority', (idx+1) * 10);
        })
    },

    onRemoveAllActivityClick: function(btn){
        var grid = btn.up('tna-grid');

        grid.getStore().removeAll();

    },

    onActivitySelect: function(combo, rec) {
        //console.log('onActivitySelect')
        var grid = combo.up('tna-grid'),
            sm = grid.getSelectionModel(),
            selected = sm.getSelection();

        Ext.Array.each(selected, function(record, index, self){
            //console.log(record, rec)
            record.set('descript', rec.data.text);
        })
    },


    // Materials...
    onAddMaterialClick: function(btn){
        //var selection = this.lookupReference('details').getSelection()[0];
        var powd = this.win.getViewModel().get('theStyle'),
            store = powd.powms();
        //var store = this.lookupReference('materials').getStore(),

        var rec = store.add({
            lineseq: store.getCount() + 1
        });

        store.each(function(rec,idx){
            rec.set('lineseq', idx + 1);
        })

        var data = [];
        if(powd.get('mats') != undefined){
            data = powd.get('mats');
        }
        data.push(rec[0].data);
        powd.set('mats', data);

        //console.log(store, rec[0])
        //detail.powms().add(rec);
    },

    onRemoveMaterialClick: function(btn){
        var grid = this.lookupReference('materials'),
            selection = grid.getSelection()[0],
            store = grid.getStore();

        selection.getPowd(function(powd,i){
            var data = [];
            if(powd.get('mats') != undefined){
                //var idx = powd.get('mats').indexOf(selection.data);
                if(i != -1){
                    powd.get('mats').splice(i,1);
                }
            }
        });

        selection.drop();
        //store.remove(selection);
        store.each(function(rec, idx){
            rec.set('lineseq', idx + 1);
        })
    },

    onAddLogClick: function(btn){
        var me = this,
            vm = me.getViewModel(),
            powh = vm.get('header'),
            logview = me.lookupReference('logview'),
            input = logview.down('textarea'),
            store = logview.down('dataview').getStore(),
            rec = new Ext.create('Vega.model.Powlog', {
                powno: vm.get('header').data.powno,
                powhId: vm.get('header').data.powhId,
                powdId: 0,
                //status: 'Open',
                content: input.getValue(),
                userId: Vega.user.data.Userid
            });

        if(input.getValue().length > 0){
            store.add(rec);
            input.setValue('');
        }
        else {
            //Vega.util.Util.showErrorMsg('Please input first!');
            Vega.util.Utils.showNotification('It cannot be empty.' +
                ' Please input value.');
        }
    },

    onRemoveLogClick: function(btn){
        var me = this,
            vm = me.getViewModel(),
            powh = vm.get('header'),
            dataview = me.lookupReference('logview').down('dataview'),
            store = dataview.getStore(),
            rec = dataview.selection;
        console.log(powh);

        if(Vega.user.userOwn(rec.data.userId && rec.phantom)){
            store.remove(rec);
        }
        else{
            Vega.util.Utils.showNotification("You can't delete this post.");
        }

    },

    onViewItemAdd: function(recs, idx, node, view){
        //console.log('onViewItemAdd')
    },

    onViewItemRemove: function(recs, idx, item, view){
        //console.log('onViewItemRemove')
    },

    onToogleAttach: function(btn, pressed){

        var me = this,
            refs = me.getReferences();

        if(refs.attachments){
            var panel = refs.attachments;

            panel.setVisible(pressed);
            if(!pressed){
                panel = refs.information;
                button = refs.attach;
                //button.getEl().setCls('delete-focus-bg');
                button.setHidden(!pressed);
            }
            btn.setIconCls(pressed ? 'x-fa fa-toggle-on' : 'x-fa fa-toggle-off');

            var header = panel.getDockedItems('header[dock="left"]')[0];
            header.fireEvent('click', header);
        }
    },

    onHandleAction: function(btn, e){
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            action = btn.nextStep,
            msg = 'To <strong>' + Ext.String.capitalize(action) + '</strong> this, please enter a justification below.';

        /*
        switch(action){
            case 'submit':
                msg = 'To <strong>' + Ext.String.capitalize(action) + '</strong> this, please enter a justification below.';
                break;
            case 'audit':
                msg = 'To <strong>' + Ext.String.capitalize(action) + '</strong> this for record, please enter a justification below.';
                break;
        }
        */

        if(action != 'save'){
            var win = view.add({
                xtype: 'window',
                title: 'Confirmation',
                width: 520,
                minHeight: 260,
                alignTarget: view.up('viewer').up('maincontainerwrap').ownerCt,
                //defaultAlign: 'c-c',
                //animateTarget: btn.id,

                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                bodyPadding: 10,
                referenceHolder:  true,

                items: [{
                    xtype: 'displayfield',
                    value: msg
                },{
                    xtype: 'textarea',
                    //reference: 'txtNote',  // component's name in the ViewModel
                    publishes: ['value'], // value is not published by default
                    flex: 1
                }],
                // Creates a child session that will spawn from the current session
                // of this view.
                buttons: [{
                    text: 'Save',
                    bind: {
                        //disabled: '{!txtNote.value}'
                    },
                    handler: function(btn){

                        var input = btn.up('window').down('textarea');
                        if(input.getValue()){
                            var logview = me.lookupReference('logview'),
                                store = logview.down('dataview').getStore(),
                                log = Ext.create('Vega.model.Powlog', {
                                    powno: vm.get('header').data.powno,
                                    powhId: vm.get('header').data.powhId,
                                    powdId: 0,
                                    //status: 'Open',
                                    content: input.getValue(),
                                    userId: Vega.user.data.Userid
                                });

                            store.add(log);
                        }

                        win.close();
                        me.onSave(action);
                        //return false;
                    },
                    scope: this
                }, {
                    text: 'Cancel',
                    handler: function(btn){
                        win.close();
                    },
                    scope: this
                }]
            });

            win.on('close', function(p){
                view.up('viewer').up('maincontainerwrap').unmask();
            });

            win.show('', function(){
                view.up('viewer').up('maincontainerwrap').mask();
            });
        }
        else {
            me.onSave(action);
        }

        /*
        Ext.Msg.show({
            title: 'Attention!',
            width: 400,
            message: msg,
            prompt: true,
            //icon: Ext.Msg.QUESTION,
            multiline: true,
            buttons: Ext.Msg.OKCANCEL,
            fn: function(button, text, opt){
                if(button === 'ok'){
                    if(Ext.isEmpty(text)){

                        Ext.create('Ext.ux.window.Notification', {
                            position: 'br',
                            useXAxis: true,
                            cls: 'ux-notification-light',
                            iconCls: 'ux-notification-icon-information',
                            closable: false,
                            title: 'Warning!',
                            padding: '0 5px 0 5px',
                            html: '<p>Please enter a justification for your action.</p>',
                            slideInDuration: 800,
                            slideBackDuration: 1500,
                            autoCloseDelay: 4000,
                            slideInAnimation: 'elasticIn',
                            slideBackAnimation: 'elasticIn'
                        }).show();
                        return false;
                    }

                    this.onSave(action);
                }
            }
        })
        */
    },

    onSave: function(action){
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            rec = vm.get('header'),
            session = vm.getSession(),
            changes = session.getChanges();

        //console.log('onSave', action, session, changes);

        /*
         if(refs.merchandise){
         var panel = refs.merchandise,
         lineItems = panel.items.items;
         }

         for(var i = 0; i < lineItems.length; i++){
         //console.log(lineItems[i].getForm());
         }

         console.log(view.getForm().getValues(), lineItems);
         */

        if(view.isValid()){
            if(changes && changes.Powh && changes.Powh.C){
                var saving = action == 'save' ? true : false;
                //submitting = action == 'submit' ? true : false;

                /*
                 switch (view.up('viewer').getXType()){
                 case 'pow':
                 break;
                 case 'request':
                 progress = 'review';
                 break;
                 case 'review':
                 if(!saving){
                 //powStatus = 'PENDING';
                 progress = 'pending';
                 }
                 break;
                 case 'pending':
                 progress = submitting ? 'approved' : 'review';
                 powStatus = submitting ? 'CONFIRMED NEW' : 'PENDING';
                 break;
                 }
                 */

                var powStatus = rec.data.status;
                if(!saving){

                    switch(action){
                        case 'review':
                            //powStatus = 'PRE-ADVISE';
                            rec.set('confirmon', Ext.Date.format(new Date(), 'Y-m-d'));
                            break;
                        case 'pending':
                            powStatus = 'REVISED';
                            break;
                        case 'approved':
                            powStatus = 'CONFIRMED NEW';
                            break;
                        case 'audit':
                            powStatus = 'PENDING';
                            break;
                    }

                    rec.set('progress', action == 'audit' ? 'review' : action);
                    rec.set('status', powStatus);
                }
                else {
                    if(rec.data.progress == 'review' && rec.data.revision == 0){
                        rec.set('confirmon', Ext.Date.format(new Date(), 'Y-m-d'));
                    }

                    if(rec.data.progress == 'approved' && powStatus == 'CONFIRMED NEW'){
                        rec.set('status', 'REVISED');
                    }
                }
            }

            if(changes && changes.Powh && changes.Powh.U){
                rec.set('updatedby', Vega.user.data.Userid);
            }

            rec.powds().each(function(powd){
                var sv = null;
                if(typeof powd.data.status == 'boolean' && powd.data.status == true){
                    sv = 'true';
                }
                powd.set('status', sv);
            });

            var batch = session.getSaveBatch(),
                field = view.lookupReference('attachments').down('viewupload').fileUpload;

            //changes = session.getChanges();
            //console.log(changes, batch);

            me.processBatch(batch, field, {
                url: '/api/Files/Powh/upload',
                success: function(response){
                    Ext.Msg.alert('Success', response);
                },
                failure: function(response) {
                    Ext.Msg.alert('Failure', response);
                }
            });

            /*
             var headerRec = session.peekRecord('Powh', vm.get('header').id);
             //var detailRec = this.win.getViewModel().get('theStyle');
             var newRec = session.createRecord('Powh', headerRec.copy(null).getData());

             headerRec.powds(function(powds){
             powds.each(function(detail){
             session.createRecord('Powd', detail.copy(null).getData());
             detail.powms(function(powms){
             powms.each(function(mat){
             session.createRecord('Powm', mat.copy(null).getData());
             })
             })
             })
             });
             */

            /*
             if(batch !== undefined){
             batch.on({
             complete: function(batch, op){

             //var response = JSON.parse(op.getResponse().responseText);
             //console.log(response);

             var viewer = view.up('viewer'),
             tab = viewer.lookupReference(viewer.getXType() + '-' + vm.get('header').id);

             // refresh review tab...
             if(tab){
             var iframe = tab.getComponent('contentIframe');
             if(iframe){
             iframe.getEl().dom.contentWindow.location.reload();
             }
             }
             //refresh In-Review
             viewer.getViewModel().getStore(viewer.getXType() + 's').reload();

             me.onClose();

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
             },
             exception: function(){
             Ext.Msg.alert('Error', 'Error occurred');
             }
             });
             //console.log(batch, changes);
             //batch.start();
             }
             else {
             Ext.Msg.alert('No Changes', 'There are no changes to the session.');
             }

             //var changes = me.getView().getSession().getChanges();
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
             } else {
             Ext.Msg.alert('No Changes', 'There are no changes to the session.');
             }
             */
        }
    },

    processBatch: function(batch, field, options){
        var me = this,
            vm = this.getViewModel(),
            view = me.getView(),
            viewer = view.up('viewer'),
            changes = view.getSession().getChanges();

        if(batch !== undefined){
            var processMask = new Ext.LoadMask({
                msg: 'Saving... Please wait',
                target: viewer
            });

            batch.on({
                operationcomplete: function(batch, op){
                    //console.log(op, op.getResultSet(), field);
                    var objResp = op.getResponse();

                    if(!Ext.isEmpty(objResp)){
                        var response = JSON.parse(objResp.responseText);
                        //console.log(response, response.data.hasOwnProperty('powhId'), response.data.hasOwnProperty('powdId'))
                        if(!Ext.isEmpty(response) && response.data.hasOwnProperty('powhId') && !response.data.hasOwnProperty('powdId')){
                            var s = view.getViewModel().getStore('powlogs');

                            s.each(function(r){
                                r.set('powhId', response.data.powhId);
                                r.set('powno', response.data.powno);
                            });

                            s.sync({
                                success: function (batch, options) {
                                    // messageProperty accessing code
                                },
                                failure: function (batch, options) {

                                },
                                callback: function (records, operation, success) {
                                    // messageProperty accessing code
                                }
                            });

                            if(field && field.getFilesQueue().length > 0){
                                field.send(options, {
                                    Pow: JSON.stringify(response.data)
                                });
                            }
                        }
                    }
                },

                complete: function(batch, op){
                    //console.log(op, op.getResponse());
                    //refresh In-Review
                    viewer.getViewModel().getStore(viewer.getXType() + 's').reload();

                    var objResp = op.getResponse();
                    if(!Ext.isEmpty(objResp)){
                        var response = JSON.parse(objResp.responseText);
                        /*
                        if(!Ext.isEmpty(response) && response.data.hasOwnProperty('powhId') && !response.data.hasOwnProperty('powdId')){

                        }
                        */
                    }

                    var powhId = vm.get('srcPowhId');
                    if(Ext.isEmpty(powhId)){
                        powhId =  vm.get('header').id;
                    }

                    var tab = viewer.lookupReference(viewer.getXType() + '-' + powhId);
                    // refresh review tab...
                    if(tab){
                        /*
                         var iframe = tab.getComponent('contentIframe');
                         if(iframe){
                         iframe.getEl().dom.contentWindow.location.reload();
                         }
                         */
                        viewer.remove(tab);
                    }

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

                exception: function(batch, op){
                    processMask.hide('', function(){
                        //Ext.Msg.alert('Error', 'Error occurred');
                        var objResp = op.error.response;
                        console.log(objResp)
                        if(!Ext.isEmpty(objResp)){
                            var response = JSON.parse(objResp.responseText);
                            Ext.Msg.alert(objResp.statusText, objResp.responseText);
                        }

                    });
                }
            });

            processMask.show();
            batch.start();
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }

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
        } else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
        */

    },

    onClose: function(btn, e){
        var me = this,
            viewer = me.getView().up('viewer');

        viewer.remove(me.getView());
    }

    /*
     onMerchandRender: function(panel){

     },

     onMerchandExpand: function(panel){
     this.setBtnVisible(panel);
     },

     onMerchandCollapse: function(panel){
     this.setBtnVisible(panel);
     },

     onAttachExpand: function(panel){
     this.setBtnVisible(panel);
     },

     onAttachCollapse: function(panel){
     this.setBtnVisible(panel);
     },

     setBtnVisible: function(panel){
     var me = this,
     view = me.getView(),
     refs = view.getReferences(),
     btn = refs.groupCrud;

     if(panel.reference == 'attachments'){
     btn = refs.attach;
     }

     btn.setHidden(panel.collapsed);
     },

     */
    /*
     onGridSelectionChange: function(sm, rec, e){
     var me =  this,
     refs = me.getView().getReferences();

     refs.edit.setDisabled(sm.selected.length == 0);
     refs.remove.setDisabled(sm.selected.length == 0);
     },

     onAddStyle: function(btn ,e){
     var me = this,
     view = me.getView(),
     refs = me.getReferences();


     if(refs.merchandise){
     var panel = refs.merchandise;

     panel.add({
     xtype: 'edit-lineitem'
     });

     panel.updateLayout();
     }
     },

     onCopyStyle: function(btn, e){
     var me = this,
     view = me.getView(),
     refs = me.getReferences();

     if(refs.merchandise){

     }
     },
     */
    
});
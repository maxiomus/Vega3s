/**
 * Created by tech on 8/25/2015.
 */
Ext.define('Vega.controller.Root', {
    extend: 'Vega.controller.Base',

    routes: {
        //':node': 'onRouteChange',

        'login': {
            before: 'onBeforeLogin',
            action: 'onLogin'
        },

        ':node:viewmode:id': {
            before: 'onBeforeRoute',
            action: 'onRoute',
            conditions: {
                //':node': '([%a-zA-Z0-9\\-\\_\\s,.\+]+)',
                //':node': '(^(?!.*login).*$)',
                //':node': '(dashboard|notice|sales|dal|inventory|reports)',
                ':viewmode':'(?:(?:/){1}(default|medium|tiles))?',
                //':id':'(?:(?:/){1}([%a-zA-Z0-9\\-\\_\\s,]+))?'
                ':id':'(?:(?:/){1}([0-9]+))?'
            }
        },

        ':node/tab:id': {
            before: 'onBeforeRoute',
            action: 'onRouteTab',
            conditions: {
                //':op': '(?:(?:/){1}(new|edit))?',
                ':id':'(?:(?:/){1}([0-9]+))?'
            }
        },

        ':node/:op:id': {
            before: 'onBeforeRoute',
            action: 'onRouteOp',
            conditions: {
                //':node': '([%a-zA-Z0-9\\-\\_\\s,.\+]+)',
                ':op': '(new|edit|copy)',
                ':id':'(?:(?:/){1}([0-9]+))?'
            }
        }
        /*
        ':node:viewmode/srch/:prop/:val': {
            before: 'onBeforeRoute',
            action: 'onRouteSrch',
            conditions: {
                ':viewmode':'(?:(?:/){1}(default|medium|tiles))?'
            }
        }
        */
    },

    init: function(){
        this.listen({
            component: {
                'grid': {
                    afterrender: 'onGridAfterRender',
                    reconfigure: 'onGridReconfigure'
                },
                'dataview': {
                    afterrender: 'onViewAfterRender'
                }
            }
        });
    },

    onGridAfterRender: function(grid){
        //grid.setLoading(true);
        //console.log('Main - grid after render', grid)
    },

    onGridReconfigure: function(grid){
        //grid.setLoading(false);
    },

    onViewAfterRender: function(view){
        //view.setLoading(true);
    },

    onViewReady: function(view){
        //view.setLoading(false);
    },

    onBeforeLogin: function(){
        var me = this,
            args = Ext.Array.slice(arguments),
            node = args[0],
            action = args[args.length - 1];

        if(Vega.user){
            action.stop();
            this.redirectTo('dashboard');
        }
        else{
            action.resume();
        }
    },

    onLogin: function(){
        var loginWin = Ext.ComponentQuery.query('login')[0];
        if(!loginWin){
            loginWin = Ext.widget('login');
        }

        loginWin.show();
    },

    secureNavigate: function (tree, rid) {
        var items = tree.itemMap;

        Ext.Object.each(items, function(key,value,myself){
            //var roles = items[i].config.node.data.granted;
            var granted = true,
                roles = value.config.node.data.granted;
            //console.log('snav', node, roles);
            if(roles != undefined){
                granted = false;
                Ext.Array.each(roles, function(role){
                    //console.log('roles', Vega.user.inRole(role));
                    if(Vega.user.inRole(role)){
                        granted = true;
                        return false;
                    }

                });
            }

            //if(items[i].config.node.data.read == false){
            if(!granted){
                //console.log('not g', node, value)
                value.config.node.data.read = false;
                value.destroy();
            }
        });
    },

    setCurrentView: function(args, action) {

        var me = this,
            hashTag = (args[0] || '').toLowerCase(),
        //refs = me.getReferences(),
            main = Vega.app.getMainView().getController(),
            refs = main.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            viewModel = main.getViewModel(),
            vmData = viewModel.getData(),
            treelist = refs.navigationTreeList,
            store = treelist.getStore(),
            node = store.findNode('routeId', hashTag),
            view = (node && node.get('read')) ? node.get('view') : null,
            lastView = vmData.currentView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']');

        viewModel.set('currentUser', Vega.user);

        // method for security...
        me.secureNavigate(treelist, hashTag);

        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        var newView, notLoad = false;

        if (!existingItem) {
            newView = Ext.create('Vega.view.' + (view || 'pages.Error404Window'), {
                hideMode: 'offsets',
                routeId: hashTag
            });

            var nvm = newView.getViewModel();
            //console.log('setCurrentView', hashTag, view, nvm);
            if(nvm){
                var listStore = nvm.getStore(hashTag.replace('-','')+'s');
                //console.log('Got Store?', listStore)
                if(listStore != null){
                    var currentPage = 1,
                        id = args[2];

                    if(id && Ext.isNumeric(id)){
                        Ext.Ajax.request({
                            //url: Ext.String.urlAppend(listStore.getProxy().url + id),
                            url: '../api/Paging/' + hashTag.replace('-','') + 's/' + id,
                            method: 'GET',
                            success: function(response, options) {
                                // decode response
                                var result = Ext.decode(response.responseText);
                                //console.log('checkLogin', result.data);
                                // check if success flag is true
                                if(result.success) {
                                    //console.log('success', result.index, listStore.getPageSize(), result.index / listStore.getPageSize());
                                    currentPage = Math.ceil(result.index / listStore.getPageSize());
                                }
                                // couldn't login...show error
                                else {
                                    //console.log('login failed');
                                }
                            },
                            failure: function(response, options) {
                                Ext.Msg.alert(response.status.toString(), response.statusText + ', an error occurred during your request. Please try again.' );
                            },
                            callback: function(response, opotions) {
                                listStore.loadPage(currentPage);
                            }
                        });
                    }
                    else {
                        if(!id){
                            listStore.loadPage(currentPage);
                        }
                        else {
                            notLoad = true;
                        }

                    }
                }
            }
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                //console.log('Got View?', newView)
                Ext.suspendLayouts(false);
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        vmData.currentView = newView;

        var cvm = vmData.currentView.getViewModel(),
            settings = null,
            store = null;

        if(cvm != null && !notLoad) {
            //console.log('not null', vm.getData().currentView);
            store = cvm.getStore(hashTag.replace('-', '')+'s');
        }

        if(store != null && !store.isLoaded()){
            store.on('load', action.resume, action, {single:true});
        }
        else{
            action.resume();
        }

        treelist.suspendEvents(true);
        treelist.setSelection(node);
        treelist.resumeEvents(true);

        Ext.getBody().unmask();
    },

    onBeforeRoute: function(){

        var me = this,
            args = Ext.Array.slice(arguments),
            action = args[args.length - 1];

        //console.log('onBeforeRoute', Vega.app.getAppready());
        if(Vega.app.getAppready()) {
            if(Vega.user){

                if(!Vega.app.getMainView()){
                    Vega.app.setMainView('Vega.view.main.Main');
                }
                /*
                var viewport = Vega.app.getMainView(),
                vc = viewport.getController();

                vc.setCurrentView('notice');
                */

                /*
                settingStore.on('beforeload', function(s){
                    s.getProxy().setUrl('/api/Settings/development');
                }, this)
                */

                var setting = Vega.app.getMainView().getViewModel().getStore('setting');
                if(!setting.isLoaded()){
                    setting.on('load', Ext.Function.bind(me.onBeforeRoute, me, args), me);
                }
                else {
                    console.log('onBeforeRoute', args);
                    me.setCurrentView(args, action);
                }
            }
            else {
                //Set previous location...
                if(Ext.util.History.getToken() !== 'login'){
                    Vega.app.setPrevNode(Ext.util.History.getToken());
                }
                action.stop();
                //console.log('Not ready', Ext.Object.toQueryString({previous: node}));
                //console.log('Not ready', node.replace(/\//g, '+'));
                me.redirectTo('login');
            }
        }
        else {
            Vega.app.on(
                'appready',
                Ext.Function.bind(me.onBeforeRoute, me, args),
                me,
                {
                    single: true
                }
            );
        }
    },

    onRouteSrch: function(node, viewmode, prop, val){
        var mainView = Vega.app.getMainView(),
            vm = mainView.getViewModel(),
            view = vm.get('currentView'),
            multiview = view.lookupReference('multiview');

        if(multiview != null){
            var grid = multiview.lookupReference('grid'),
                topbar = multiview.lookupReference('topbar'),
                category = topbar.lookupReference('filterSelection'),
                search = topbar.lookupReference('searchfield');

            view.suspendEvents(false);
            view.setActiveTab(multiview);
            view.resumeEvents(true);

            if(viewmode) {
                var segmented = topbar.lookupReference('viewselection'),
                    ctn = multiview.lookupReference('center'),
                    value = 0;

                switch(viewmode){
                    case 'default':
                        value = 0;
                        break;
                    case 'medium':
                        value = 1;
                        break;
                    case 'tiles':
                        value = 2;
                        break;
                }

                if(segmented){
                    segmented.setValue(value);
                    ctn.getLayout().setActiveItem(segmented.getValue());
                }
            }

            console.log(grid.getPlugin('gridfilters'))
            //grid.getPlugin('gridfilters').clearFilters();
            category.setValue(prop);
            search.paramName = prop;
            search.setValue(val);

            //var store = view.getViewModel().getStore(node.replace('-','')+'s');
            //grid.getPlugin('gridfilters').bindStore(store);

            search.onSearchClick();


            //this.waitForBinding(grid);


        }

        console.log('onRouteSrch', grid.rendered);
    },

    waitForBinding: function(grid){
        var me = this,
            multiview = grid.up('multiview'),
            topbar = multiview.lookupReference('topbar'),
            search = topbar.lookupReference('searchfield');

        if(grid.getStore().isEmptyStore && grid.hasView){
            //grid.on('afterrender', Ext.Function.bind(me.waitForBinding, me));
            Ext.defer(function () {
                me.waitForBinding(grid);
            }, 10);
        }
        else {
            search.onSearchClick();
        }

    },

    onRoute: function(node, viewmode, id){
        /*var me = this,
         args = Ext.Array.slice(arguments),
         node = args[0], viewmode = args[1],
         id = args[args.length - 1];

         if(args.length > 0){

         }*/
        var mainView = Vega.app.getMainView(),
            vm = mainView.getViewModel(),
            view = vm.get('currentView'),
            multiview = view.lookupReference('multiview'),
            store = view.getViewModel().getStore(node.replace('-','')+'s');

        //console.log('onRoute', node, viewmode, id, Vega.app.getPrevNode())
        if(multiview != null){

            console.log('onRoute', node, viewmode, id, Vega.app.getPrevNode())
            var grid = multiview.lookupReference('grid'),
                topbar = multiview.lookupReference('topbar');

            view.suspendEvents(false);
            view.setActiveTab(multiview);
            view.resumeEvents(true);

            if(viewmode) {
                var segmented = topbar.lookupReference('viewselection'),
                    ctn = multiview.lookupReference('center'),
                    value = 0;

                switch(viewmode){
                    case 'default':
                        value = 0;
                        break;
                    case 'medium':
                        value = 1;
                        break;
                    case 'tiles':
                        value = 2;
                        break;
                }

                if(segmented){
                    segmented.setValue(value);
                    ctn.getLayout().setActiveItem(segmented.getValue());
                }

            }

            if (id) {
                var grid = ctn.getLayout().getActiveItem(),
                    fieldname = store.first().getIdProperty(),
                    record = store.findRecord(fieldname, id);

                if(record != null){
                    Ext.defer(function () {
                        var sm = grid.getSelectionModel();

                        if (viewmode != 'default') {

                            sm.suspendEvents(false);
                            sm.select([record], false, true);
                            sm.resumeEvents(true);
                            //console.log('Root - view selection', sm.selected)
                            if(topbar.actCopy){
                                topbar.actCopy.setDisabled(!record);
                            }
                            if(topbar.actEdit){
                                console.log('MOYAC', record)
                                //topbar.actEdit.setDisabled(!record);
                                topbar.actEdit.setDisabled(!(Vega.user.userOwn(record.data.userId) || Vega.user.inRole('administrators')) || !record);
                            }
                            if(topbar.actDelete){
                                topbar.actDelete.setDisabled(!record);
                            }
                        }
                        else {
                            grid.suspendEvents(true);
                            //grid.getSelectionModel().select([record]);

                            grid.ensureVisible(store.indexOf(record), {
                                animate: true,
                                highlight: true,
                                select: true,
                                focus: true,
                                callback: function (success, record, node) {
                                    //console.log(recordIdx, record, node);
                                    if(topbar.actCopy){
                                        topbar.actCopy.setDisabled((record.get('Status') == 'Complete') || !record);
                                    }
                                    if(topbar.actEdit){
                                        topbar.actEdit.setDisabled((record.get('Status') == 'Complete') || !record);
                                    }
                                    if(topbar.actDelete){
                                        topbar.actDelete.setDisabled((record.get('Status') == 'Complete') || !record);
                                    }
                                    if(topbar.actComplete){
                                        topbar.actComplete.setHidden((record.get('Status') == 'Complete') || !record);
                                    }
                                    if(topbar.actActive){
                                        topbar.actActive.setHidden((record.get('Status') != 'Complete') || !record);
                                    }
                                    //console.log('ensureVisible callback', grid.getSelection())
                                }
                            });
                            //console.log('Root - grid selection', sm.selected)
                            grid.resumeEvents(true);
                        }
                    }, 100);
                }
            }
        }
        else {
            switch(node){
                case 'receiving':
                    this.inventoryReceiving(view, node, id);
                    break;
                case 'allocation':
                    this.inventoryAllocation(view, node, id);
                    break;
                case 'settings':
                    this.navigateSettings(view, node, id);
                    break;
            }
        }
    },

    onRouteTab: function(node, id) {
        //this.selectItem(node, 'medium', id);
        /*var me = this,
         args = Ext.Array.slice(arguments),
         node = args[0],
         id = args[args.length - 1];

         if(args.length > 0){

         }*/
        this.openTab(node, id);
    },

    openTab: function(node, id){

        var me = this,
            //refs = me.getReferences(),
            mainView = Vega.app.getMainView(),
            main = mainView.getController(),
            refs = main.getReferences(),
            mainCard = refs.mainCardPanel,
            view = mainCard.child('component[routeId=' + node + ']'),
            vm = view.getViewModel(),
            store = vm.get(node.replace('-','')+'s'),
            fieldname = store.first().getIdProperty(),
            rec = store.findRecord(fieldname, id.toString()),
            items = [], item,
            innerTab, prefix = node + '-',
            xf = Ext.util.Format;

        //console.log('Route - openTab', node, id, fieldname, rec)
        //console.log(store.isLoaded(), store.isLoading())
        if (rec) {
            switch(node) {
                case 'dal':
                    var title = rec.data.Title;
                    if(Ext.isEmpty(rec.data.Title)){
                        switch (rec.data.F_CATEGORY.toLowerCase()) {
                            case 'body':
                                title = rec.data.F_DESC5;
                                break;
                            case 'photos':
                                title = (rec.data.F_OWNER != null ? rec.data.F_OWNER + ' ' : '') + rec.data.F_STYLE;
                                break;
                            default:
                                title = rec.data.F_DESC6;
                                break;
                        }
                    }

                    var srcPath = '';
                    if(!Ext.isEmpty(rec.data.F_NAME) && !Ext.isEmpty(rec.data.F_TYPE)){
                        srcPath = '../' + rec.data.F_LINK + rec.data.F_PATH + '/' + rec.data.ID + '/' + rec.data.F_NAME;
                    }
                    else {
                        srcPath = '../' + rec.data.F_LINK + rec.data.F_PATH + '/' + rec.data.F_LOCATION + rec.data.F_EXT;
                    }

                    //prefix = 'nDisplay-';
                    innerTab = {
                        inTab: true,
                        node: node,
                        xtype: 'display',
                        reference: prefix + rec.get(fieldname),
                        title: 'No. ' + xf.ellipsis(title, 18),
                        closable: true,
                        scrollable: true,
                        //active: rec,
                        items: [{
                            xtype: 'image',
                            src: srcPath,
                            margin: 10,
                            style: {
                                position: 'absolute',
                                cursor: 'zoom-in',
                                top: 0,
                                left: 0
                            },
                            listeners: {

                                render: function (img) {
                                    var panel = img.ownerCt.body;

                                    img.getEl().on({
                                        click: function (event, element) {
                                            var position = img.getEl().dom.style.position,
                                                cursor = img.getEl().dom.style.cursor;

                                            position = position == 'absolute' ? 'relative' : 'absolute';
                                            cursor = cursor == 'zoom-in' ? 'zoom-out' : 'zoom-in';
                                            img.setStyle({
                                                'position': position,
                                                'cursor': cursor
                                            });
                                        }
                                    });
                                }
                            }
                        }/*,{
                         xtype: 'component',
                         itemId: 'contentIframe',
                         autoEl: {
                         tag: 'iframe',
                         scrolling: 'no',
                         style: 'width: 100%; height: 100%; border: none;',
                         src: 'M152646_BLUE GROTTO WHITE_front.jpg'
                         //src: xf.format('PDFHandler.ashx?index={0}&date={1}&file={2}', 2, xf.date(rec.data.CreateOn, 'm/d/Y'), rec.data.Link)
                         }
                         }*/]
                    };
                    break;
                case 'request':
                case 'review':
                case 'pending':
                case 'pow':
                    //prefix = 'nDisplay-';
                    var srcPath = xf.format('../services/PDFHandler.ashx?index={0}&date={1}&file={2}', 2, xf.date(rec.data.createdon, 'm/d/Y'), rec.data.link);

                    if(rec.data.revision != -1){
                        srcPath = xf.format('../services/PowPreviewPrint.ashx?ID={0}', rec.data.powhId)
                    }

                    console.log('Root - POW', srcPath)
                    innerTab = {
                        inTab: true,
                        node: node,
                        xtype: 'display',
                        reference: prefix + rec.data.powhId,
                        title: 'P.O.W #' + xf.ellipsis(rec.data.powno, 18),
                        iconCls: 'fa fa-file-text-o',
                        closable: true,
                        //active: rec,
                        //session: true,
                        viewModel: {
                            data: {
                                thePow: rec
                                //progress: rec.data.progress,
                                //status: rec.data.status
                            }
                            /*
                            links: {
                                thePow: {
                                    type: 'Powh',
                                    id: parseInt(rec.data.powhId,10)
                                }
                            }
                            */
                        },
                        items: [{
                            xtype: 'component',
                            itemId: 'contentIframe',
                            autoEl: {
                                tag: 'iframe',
                                style: 'height: 100%; width: 100%; border: none',
                                //src: 'QuickGuideforIllustratorCS6-Basics.pdf'
                                src: srcPath
                            }
                        }]
                    };
                    break;
                case 'notice':
                    //prefix = 'nPost-';
                    rec.filesInArticles(function(files){
                        files.each(function(file){
                            //console.log(file)
                        })
                    });
                    innerTab = {
                        inTab: true,
                        node: node,
                        xtype: 'notice-post',
                        reference: prefix + rec.get(fieldname),
                        title: xf.ellipsis(rec.data.Title, 18),
                        closable: true
                    };
                    break;

            }

            item = view.lookupReference(prefix + rec.get(fieldname));

            if (!item) {
                item = view.add(innerTab);
                item.setActive(rec);
            }

            view.suspendEvents(false);
            view.setActiveTab(item);
            view.resumeEvents(true);

            //var el = item.getComponent('contentIframe').getEl().down('html');
        }
    },

    onRouteOp: function(node, op, id) {
        var me = this,
        //refs = me.getReferences(),
            mainView = Vega.app.getMainView(),
            main = mainView.getController(),
            refs = main.getReferences(),
            mainCard = refs.mainCardPanel,
            view = mainCard.child('component[routeId=' + node + ']');
            //viewModel = view.getViewModel(),
            //isEdit = id ? true : false

        //console.log('onRouteOp', view, node, op, id);

        var title = Ext.String.capitalize(op),
            //title = (!id ? 'New' : 'Edit'),
            alias;

        switch(node){
            case 'request':
            case 'review':
            case 'pending':
            case 'pow':
                title += ' P.O.W';
                alias = 'sales-edit-form';
                break;
            case 'sample':
                title += ' Sample';
                alias = 'sample-edit-form';
                break;
            case 'physical':
                title += ' P.I';
                alias = 'pi-form';
                break;
        }

        var form = view.lookupReference(alias);

        if (!form) {
            form = view.add({
                xtype: alias,
                iconCls: 'fa fa-plus-circle',
                reference: alias,
                //opMode: op,
                closable: true,
                //isEdit: isEdit,
                viewModel: {
                    type: alias,
                    data: {
                        title: title
                    }
                }
            });
        }

        form.opMode = op;

        var fvm = form.getViewModel();
        fvm.set('title', title);

        switch(node){
            case 'request':
                var statusCombo = form.lookupReference('information').down('combo[name="status"]');
                //statusCombo.getStore().loadData([['DRAFT'],['PRE-ADVISE']]);
                fvm.getStore('status').on('load', function(s){
                    s.loadData([{
                        "text": "DRAFT",
                        "id": "DRAFT"
                    },{
                        "text": "PRE-ADVISE",
                        "id": "PRE-ADVISE"
                    }])
                }, this);
            case 'review':
            case 'pending':
            case 'pow':
                this.processSales(fvm, node, op, id);
                break;
            case 'sample':
                this.processSamples(fvm, node, id);
                break;
            case 'physical':
                this.processPIs(fvm, node, id);
                break;
        }

        view.suspendEvents(false);
        view.setActiveTab(form);
        view.resumeEvents(true);
    },

    processSales: function(vm, node, op, id){
        var session = vm.getSession(),
            record;

        if(!id){
            /*
             var powhRec = Ext.create('Vega.model.Powh', {
             userId: Vega.user.get('Userid'),
             revision: 0,
             division: 'MISSY',
             status: 'PRE-ADVISE',
             pack: 'HANGING',
             progress: node
             });

             fvm.set('header', powhRec);
             */

            if(vm.get('srcPowhId') != null){
                vm.set('srcPowhId', null);
            }

            vm.linkTo('header', {
                type: 'Powh',
                create: {
                    userId: Vega.user.get('Userid'),
                    powno: 'TBD',
                    revision: 0,
                    division: 'MISSY',
                    status: node == 'request' ? 'DRAFT' : 'PRE-ADVISE',
                    pack: 'HANGING',
                    progress: node
                }
            });
        }
        else {
            /*
             isEdit =  true;
             //record.id = parseInt(id);
             //record.updatedby = Vega.user.get('Userid');
             //record.progress = nextProgress;
             console.log('onRouteOp', node, op, id)
             */
            if(node === 'request' && op === 'edit' && Vega.user.inRole('sales')){
                vm.set('srcPowhId', parseInt(id,10));

                vm.linkTo('header', {
                    type: 'Powh',
                    //reference: 'Vega.model.Powh',
                    id: parseInt(id,10)
                });
            }
            else {
                //console.log(session.peekRecord('Powh', -1))
                if(vm.get('srcPowhId') == null || vm.get('srcPowhId') != parseInt(id,10))
                {
                    vm.set('srcPowhId', parseInt(id, 10));
                    var cRec = vm.get('header');
                    if(cRec != null){
                        var mg = session.peekRecord('Powh', cRec.id);
                        if(mg != null){
                            mg.drop();
                        }
                    }

                    Vega.model.Powh.load(parseInt(id,10), {
                        success: function (rec, ope) {
                            //var session = item.getViewModel().getSession();
                            record = rec.copy(null, session);

                            switch(op){
                                case 'edit':
                                    record.data.revision = parseInt(id,10);
                                    if(node === 'review'){
                                        record.data.status = 'REVISED';
                                    }
                                    break;
                                case 'copy':
                                    record.data.revision = 0;
                                    if(node === 'review'){
                                        record.data.powno = '';
                                        record.data.status = 'PRE-ADVISE';
                                    }
                                    break;
                            }

                            //record.data.progress = nextProcess;
                            record.data.userId = Vega.user.data.Userid;
                            console.log(record.data.userId,Vega.user.data.Userid)
                            record.data.createdon = new Date();
                            record.data.updatedby = null;
                            record.data.updatedon = null;

                            rec.powds().each(function (d) {
                                var nd = d.copy(null, session);

                                nd.data.userId = record.data.userId;
                                nd.data.createdon = record.data.createdon;
                                nd.data.updatedby = null;
                                nd.data.updatedon = null;

                                var mat = record.powds().add(nd);

                                d.powms().sort('lineseq', 'ASC');
                                d.powms().each(function (m) {
                                    mat[0].powms().add(m.copy(null, session));
                                });

                                d.tnaps().each(function (p) {
                                    mat[0].tnaps().add(p.copy(null, session));
                                });

                                //console.log(nd, count);
                                /*
                                 d.filesInPowds().each(function(f){
                                 mat[0].filesInPowds().add(f.copy(null, session));
                                 })
                                 */
                            });

                            vm.set('header', record);
                            //console.log('New Record', fvm.get('srcPowhId'), fvm.get('header'), session.getChanges())

                        },
                        failure: function (rec, ope) {
                            //console.log('fail', rec, ope);
                        },
                        callback: function (rec, ope, success) {

                        }
                    });
                }
            }
        }
    },

    processSamples: function(vm, node, id){
        var session = vm.getSession();
            //boms = vm.getView().lookupReference('boms'),
            //store = boms.getViewModel().getStore('boms'),
            //bomStore = vm.getStore('boms'),
            //center = boms.lookupReference('center');

        if(id){
            /*
            Vega.model.Product.load(parseInt(id,10), {
                success: function(rec, ope){

                    vm.set('theStyle', rec);

                    var bomIdx = 0;
                }
            });
            */
            vm.linkTo('theStyle', {
                type: 'Product',
                //reference: 'Vega.model.Powh',
                id: parseInt(id,10)
            });

            var bomStore = vm.linkData.theStyle.boms();
            //bomStore.setGroupField('rawMatType');
            //console.log(vm.linkData.theStyle.boms())
            //console.log('bomStore', bomStore.isLoaded(), bomStore.isGrouped())

            vm.linkData.theStyle.boms().each(function(bom){
                //s.boms().add(rec);
                //console.log('each', bom);
            });
        }
        else {
            /*
            var product = Ext.create('Vega.model.Product', {
                userId: Vega.user.get('Userid'),
                type: 'Style',
                rawMatType: 'Style',
                processtype: 'DS SAMPLE',
                division: 'MISSY',
                status: 'ACTIVE',
                lowestno: 1
            });
            */
            vm.linkTo('theStyle', {
                type: 'Product',
                create: {
                    type: 'Style',
                    rawMatType: 'Style',
                    processtype: 'DS SAMPLE',
                    status: 'ACTIVE',
                    sizeCat: 'ONESIZE',
                    userName: Vega.user.get('Userid'),
                    lowestno: 1
                }
            });
        }

    },

    processPIs: function(vm, node, id){
        var session = vm.getSession();
        //boms = vm.getView().lookupReference('boms'),
        //store = boms.getViewModel().getStore('boms'),
        //bomStore = vm.getStore('boms'),
        //center = boms.lookupReference('center');

        if(id){
            vm.linkTo('thePhysical', {
                type: 'Vega.model.PIH',
                //reference: 'Vega.model.Powh',
                id: parseInt(id,10)
            });

            var piStore = vm.linkData.thePhysical.pis();
            //bomStore.setGroupField('rawMatType');
            //console.log(vm.linkData.theStyle.boms())
            //console.log('bomStore', bomStore.isLoaded(), bomStore.isGrouped())

            //vm.linkData.thePhysical.pis().each(function(pis){
                //s.boms().add(rec);
                //console.log('each', bom);
            //});
        }
    },

    inventoryReceiving: function(view, node, id){

        var vc = view.getController(),
            form = vc.lookupReference('poheader').getForm(),
            store = vc.getViewModel().getStore('podetails'),
            grid = vc.lookupReference('orders-list'),
            selection = grid.getSelectionModel(),
            field = vc.lookupReference('search');

        if(id){
            field.setValue(id);

            var proxy = store.getProxy();
            proxy.encodeFilters = function(filters){
                return filters[0].getValue();
            };

            if (selection.selected) {
                selection.deselectAll(false);
            }

            if(store.loadCount == 0){

                Vega.model.Poh.load(id, {
                    callback: function(poh){
                        form.loadRecord(poh);
                        console.log(poh);
                        //console.log('POH #' + poh.get('pono'), poh);

                        poh.podetails(function(podetails){
                            grid.bindStore(podetails);
                            /*pods.each(function(pod){
                             console.log('POD #' + pod.get('id'), pod);
                             });*/
                        });
                    }
                });
            }
        }
        else {
            field.setValue('');

            form.reset();

            if(selection.selected){
                selection.deselectAll();
            }

            grid.getStore().removeAll();
        }


    },

    inventoryAllocation: function(view, node, id){
        var vc = view.getController(),
            store = vc.getViewModel().getStore('fabricrequirements'),
            grid = vc.lookupReference('requirements'),
            selection = grid.getSelectionModel(),
            field = vc.lookupReference('search');

        if(id){
            field.setValue(id);

            var proxy = store.getProxy();
            proxy.encodeFilters = function(filters){
                return filters[0].getValue();
            };

            if (selection.selected) {
                selection.deselectAll(false);
            }

            store.filter('cutno', id);
        }
        else {
            field.setValue('');

            if(selection.selected){
                selection.deselectAll();
            }

            grid.getStore().removeAll();
        }
    },

    inventoryRolls: function(view, node, id){
        var vc = view.getController(),
            store = vc.getViewModel().getStore('rolls'),
            grid = vc.lookupReference('rolls-grid'),
            selection = grid.getSelectionModel(),
            field = vc.lookupReference('search');
    },

    navigateSettings: function(view, node, id){
        if(!id){
            id = 'base';
        }

        var vm = view.getViewModel(),
            //vc = view.getController(),
            store = vm.get('areas'),
            item = view.lookupReference('settings-'+id),
            center = view.lookupReference('center-base'),
            navi = view.lookupReference('navigate-menu');

        if(navi.getStore() == null){
            navi.setStore(store);
        }

        var nd = store.findNode('routeId', id);
        //Breadcrumb setSelection only accept Node not Record...
        navi.setSelection(nd);

        if (!item) {
            item = Ext.widget(id, {
                reference: 'settings-' + id
            })
        }

        center.getLayout().setActiveItem(item);
        console.log('navigateSetting', view, node, id);
    }
});

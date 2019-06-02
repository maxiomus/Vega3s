Ext.define('Vega.view.development.LineController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.line',

    mixins: [
        'Ext.app.route.Base'
    ],

    init: function(g){
        var multiview = g.lookupReference("multiview"),
            refs = multiview.getReferences(),
            //j = refs.topbar.lookupReference("paneselection"),
            k = refs.topbar.lookupReference("viewselection");
            //m = refs.topbar.lookupReference('togglerowedit'),
            //i = j.getActiveItem();

        //this.getViewModel().set('viewMode', k.getValue());

        refs.center.getLayout().setActiveItem(k.getValue());
    },

    onClearFilters: function(b){
        var me = this,
            layout = me.view.lookupReference("multiview"),
            topbar = layout.lookupReference("topbar"),
            searchcombo = topbar.lookupReference('searchcombo'),
            searchfield = topbar.down('searchfield'),
            store = me.getViewModel().getStore('lines');

        searchcombo.setValue('');
        searchcombo.getTrigger('clear').hide();
        searchfield.setValue('');
        searchfield.getTrigger('clear').hide();

        // Clear Sort...
        store.getSorters().clear();
        // Clear Grid filters...
        store.clearFilter();
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

        k[0] = "line";
        k[1] = q.value == 0 ? "default" : q.value == 1 ? "medium" : "icons";
        k[2] = rec.get("id");

        this.redirectTo(k.join("/"));
    },

    onFilterItemChange: function(combo, h, g, l){

        var toolbar = combo.up("toolbar"),
            m = toolbar.down("searchfield"),
            n = toolbar.lookupReference('searchcombo'),
            j = combo.getValue(),
            st = '';

        switch(j){
            case "grp":
                if (st === '') {
                    st = 'groups';
                }
            case "subcategory":
                if (st === '') {
                    st = 'subcategories';
                }
            case "stone":
                if(st === ''){
                    st = 'vendors';
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

        //console.log(st);
        var view = this.getView(),
            k = view.getViewModel().getStore(st);

        if(k != null){
            k.load();
            n.bindStore(k);
        }
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var mv = this.lookupReference('multiview'),
            list = mv.refs.list,
            sm = h.getSelectionModel();

        if(!sm.isSelected(g)){
            sm.select(g);
        }

        this.view.contextmenu.items.items[2].setDisabled(list.getSelection().length == 0);

        this.view.contextmenu.showAt(l.getXY());
    },

    onListOpenSheet: function(item, e){
        var mv = this.lookupReference('multiview'),
            list = mv.refs.list,
            rec = list.getSelection()[0];

        this.redirectTo('line/tab/' + rec.data.lineId);
    },

    onListRefresh: function(item, e){
        var mv = this.lookupReference('multiview'),
            list = mv.refs.list;

        list.getStore().reload();
    },

    onListItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        h.grid.contextmenu.showAt(l.getXY());
    },

    onMonthPickOkClick: function(mp, value){
        var me = this,
            store = me.getViewModel().getStore('lines'),
            filters = store.getFilters();

        var year = value[1],
            month = value[0] + 1;

        month = (month < 10 ? '0' : '') + month;

        var filter = new Ext.util.Filter({
            property: 'user3',
            value: year+month
        });

        filters.add(filter);
    },

    onMonthPickCancelClick: function(mp, value){
        var me = this,
            store = me.getViewModel().getStore('lines'),
            filters = store.getFilters();

        var year = value[1],
            month = value[0]+ 1;

        month = (month < 10 ? '0' : '') + month;

        var filter = new Ext.util.Filter({
            property: 'user3',
            value: year+month
        });

        filters.remove(filter);
    },

    onTgrClearClick: function(c){
        var value = c.getValue(),
            store = this.getViewModel().getStore('lines'),
            filters = store.getFilters();

        var filter = new Ext.util.Filter({
            property: c.paramName,
            operator: 'st',
            value: value,
            type: 'string'
        });

        filters.remove(filter);
    },

    onTgrSearchClick: function(c){
        var value = c.getValue(),
            store = this.getViewModel().getStore('lines'),
            filters = store.getFilters();

        if (value.length > 0) {
            // Param name is ignored here since we use custom encoding in the proxy.
            // id is used by the Store to replace any previous filter
            var filter = new Ext.util.Filter({
                property: c.paramName,
                operator: 'st',
                value: value,
                type: 'string'
            });

            //console.log(filter)

            filters.add(filter);
        }
    },

    /**
     * Handles a mouseenter event on a task grid item.
     * Shows the item's action icons.
     * @param {Ext.grid.View} view
     * @param {SimpleTasks.model.Task} task
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.EventObject} e
     */
    showActions: function(view, task, node, rowIndex, e) {

        var icons = Ext.fly(node).query('.x-action-col-icon');
        Ext.each(icons, function(icon){
            Ext.get(icon).removeCls('x-hidden');
        });
    },

    /**
     * Handles a mouseleave event on a task grid item.
     * Hides the item's action icons.
     * @param {Ext.grid.View} view
     * @param {SimpleTasks.model.Task} task
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.EventObject} e
     */
    hideActions: function(view, task, node, rowIndex, e) {
        var icons = Ext.fly(node).query('.x-action-col-icon');
        Ext.each(icons, function(icon){
            Ext.get(icon).addCls('x-hidden');
        });
    },

    onYearSelectorRender: function(btn){

        var store = this.getViewModel().getStore('years'),
            menu = btn.getMenu(),
            items = [];

        //console.log('onYearRefresh', btn, menu)
        store.each(function(rec){
            items.push({
                text: rec.data.year,
                //iconCls: Ext.baseCSSPrefix + 'menu-item-indent-right-icon',
                //width: 70,
                flex: 1,
                group: btn.id,
                //plain: true,
                checkHandler: btn.checkHandler,
                scope: btn,
                checked: rec.data.year == (new Date()).getFullYear()
            });
        });

        menu.add(items);
        btn.setActiveItem(items[1]);
    },

    onChangeYearSelect: function(btn, selected){
        //console.log(this.getViewModel().getStore('months').getRoot());

        var store = this.getViewModel().getStore('markets');

        store.each(function(rec){
            rec.set('id',selected.text+(rec.data.id.length <= 2 ? rec.data.id : rec.data.id.substring(4)));
            rec.set('year', selected.text);
        });

    },

    /**
     *
     * @param c Ext.menu.Item
     * @param e Event
     */
    onAddToLineSheet: function(c, e){
        var mv = this.lookupReference('multiview'),
            view = mv.refs.tiles,
            selected = view.getSelection(),
            memStore = this.getViewModel().getStore('memSils'),
            list = mv.refs.list,
            linesheet = list.getSelection()[0];

        Ext.each(selected, function(rec){
            linesheet.samplesInLines().add(
                Ext.create('Vega.model.sample.Sil', {
                    sid: rec.data.id,
                    lineId: linesheet.id
                })
            );
        });

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: view
        });
        processMask.show();

        linesheet.samplesInLines().sync({
            success: function(batch, op){
                processMask.hide('', function() {
                    Ext.Msg.alert('Status', 'Changes saved successfully.');
                });
            },
            failure: function(batch, op){
                processMask.hide('', function() {
                    Ext.Msg.alert('Status', 'Error occurs!. Changes did not saved!');
                });
            },
            callback: function(batch, op){
                processMask.hide('', function() {

                });
            }
        });
    },

    onActEditClick: function(b, c){
        //console.log(b, c);

        var mv = this.lookupReference('multiview'),
            view = mv.refs.tiles,
            rec = view.getSelection()[0];

        //this.showWindow(grid.getSelection()[0]);
        this.redirectTo("sample/edit/" + rec.data.id);
    },

    onActRefreshClick: function(b, c){

        this.getStore("lines").reload();
    },

    /**
     *
     * @param btn
     */
    onAddLineSheetClick: function(btn){
        var field = btn.previousSibling('textfield[name=title]'),
            picker = field.previousSibling('button').menu.items.items[0];

        if(field){
            this.newLineSheet(field, picker);
        }
    },

    /**
     *
     * @param btn
     */
    onRefreshLineSheet: function(btn){
        btn.up('grid').getStore().reload();
    },

    handleSpecialKey: function(field, e) {
        var picker = field.previousSibling('button').menu.items.items[0];

        if(e.getKey() === e.ENTER) {
            if(field){
                this.newLineSheet(field, picker);
            }
        }
    },

    newLineSheet: function(field, picker){
        var store = this.getViewModel().getStore('linesheets'),
            v = picker.getValue(),
            rec = Ext.create('Vega.model.sample.Linesheet', {
                title: field.getValue(),
                season: Ext.Date.format(new Date((v[0] + 1) + '/1/' + v[1]), 'Ym'),
                userId: Vega.user.data.Userid,
                userTime: new Date()
            });

        field.focus();
        // require title field to have a value
        if(!field.getValue()) {
            return;
        }

        field.setValue('');
        store.insert(0, rec);
    }

});

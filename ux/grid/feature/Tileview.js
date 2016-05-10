Ext.define('Ext.ux.grid.feature.Tileview', {
    extend: 'Ext.grid.feature.Feature',

    alias: 'feature.tileview',

    metaTableTplOrig: null, // stores the original template
    viewMode: null,
    viewTpls: {},
    viewOuterTpl: [
        '<table id="{rowId}" ',
        'data-boundView="{view.id}" ',
        'data-recordId="{record.internalId}" ',
        'data-recordIndex="{recordIndex}" ',
        'class="{[values.itemClasses.join(" ")]} tileview" cellPadding="0" cellSpacing="0" {ariaTableAttr}>',

        // Do NOT emit a <TBODY> tag in case the nextTpl has to emit a <COLGROUP> column sizer element.
        // Browser will create a tbody tag when it encounters the first <TR>
        '{%',
        'this.nextTpl.applyOut(values, out, parent)',
        '%}',
        '</table>', {
            priority: 0
        }
    ],

    init: function(grid) {

        var me = this,
            view = me.view = grid.getView();

        //grid.view.tableTpl.html = grid.view.tableTpl.html.replace(/ class=\"(.*?)\" border/, ' class="$1 tileview" border');
        //grid.view.tableTpl.html = grid.view.tableTpl.html.replace(/\{\[view.renderColumnSizer\(out\)\]\}/, '');

        //me.metaTableTplOrig = me.view.tableTpl;
        view.tileViewFeature = me;

        //view.addRowTpl(Ext.XTemplate.getTpl(this, 'viewOuterTpl'));

        Ext.Object.each(this.viewTpls, function(key, rowTpl) {
            view.addRowTpl(new Ext.XTemplate(rowTpl));
        });

        // Extjs 5+
        view.addRowTpl(Ext.XTemplate.getTpl(this, 'viewOuterTpl'));

        me.callParent(arguments);
    },

    getColumnValues: function(columns, record) {
        var columnValues = {};
        Ext.each(columns, function(column) {
            var key = column.dataIndex,
                value = record.data[column.dataIndex];

            columnValues[key] = value;
        });
        return columnValues;
    },

    getRowBody: function(values, viewMode)
    {
        if(this.viewTpls[viewMode])
        {
            return this.viewTpls[viewMode];
        }
    },

    setView: function(mode)
    {
        var me = this;

        if(me.viewMode != mode)
        {
            me.viewMode = mode;
            /**
             * adding for version 5
             */
            if (mode!='default') {
                //me.view.addTableTpl(new Ext.XTemplate(me.tableTpl))
            } else {
                //me.view.addTableTpl(me.metaTableTplOrig)
            }

            me.view.refresh();
        }
    }
});
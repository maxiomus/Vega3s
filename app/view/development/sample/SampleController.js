Ext.define('Vega.view.development.sample.SampleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sample',

    init: function(){

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

        display.setActive(rec);

        console.log(rec);
        this.redirectTo('sample/default/' + rec.get('id'));
    }
    
});

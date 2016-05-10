/**
 * Created by tech on 9/23/2015.
 */

Ext.define('Vega.model.Media', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'ID', type: 'int'},
        { name: 'FID', type: 'int'},
        { name: 'F_NAME', type: 'string'},
        { name: 'F_CATEGORY', type: 'string'},
        { name: 'F_LOCATION', type: 'string'},
        { name: 'F_APPLICATION', type: 'string'},
        { name: 'F_LINK', type: 'string'},
        { name: 'F_EXT', type: 'string'},
        { name: 'F_BFLAG', type: 'boolean'},
        { name: 'F_OWNER', type: 'string'},
        { name: 'F_USERID', type: 'string'},
        { name: 'F_MOD_USER_ID', type: 'string'},
        { name: 'F_CREATED_ON', type: 'date'},
        { name: 'F_UPDATED_ON', type: 'date'},
        { name: 'F_DESC1', type: 'string'},
        { name: 'F_DESC2', type: 'string'},
        { name: 'F_DESC3', type: 'string'},
        { name: 'F_DESC4', type: 'string'},
        { name: 'F_DESC5', type: 'string'},
        { name: 'F_DESC6', type: 'string'},
        { name: 'F_DESC7', type: 'string'},
        { name: 'F_DESC8', type: 'string'},
        { name: 'F_DESC9', type: 'string'}
    ],

    idProperty: 'ID',

    proxy: {
        type: "rest",
        url: "/api/Dals",
        reader: {
            type: "json",
            rootProperty: "data"
        },
        listeners: {

        }
    }
});

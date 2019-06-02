/**
 * Created by tech on 7/18/2016.
 */
Ext.define('Ext.ux.form.field.UploadFile', {
    extend: 'Ext.form.field.File',

    alias: 'widget.uploadfiles',

    //url: '',
    //method: 'POST',

    /**
     * Array of all selected files
     */
    filesQueue: [],

    /**
     * Allow selecting multiple files
     */
    multiselect: false,

    /**
     * XMLHttpRequest object
     */
    xhr: new XMLHttpRequest(),

    /**
     * FormData object
     */
    formData: null,

    initComponent: function(config){
        if(!Ext.isEmpty(this.filesQueue)){
            this.filesQueue.length = 0;
        }

        this.on('afterrender', function() {
            /**
             * If multifile = true then multiple select of files is allowed
             */
            if(this.multiselect) {
                this.fileInputEl.dom.setAttribute('multiple', '1');
            }
        });
        this.initConfig(config);
        this.callParent(arguments);
        this.formData = new FormData();
    },

    listeners: {
        change: function(field, path) {
            /*
            console.log('inside filefield', path)
            if(path) {
                var files = this.fileInputEl.dom.files;
                this.addFilesToQueue(files);
                this.fireEvent('fileselected', this, files);
                this.reset();
                if (this.multiselect) {
                    this.fileInputEl.dom.setAttribute('multiple', '1');
                }
            }
            */
        }
    },

    /**
     * add files to queue
     */
    addFilesToQueue: function(files) {
        if(files && this.filesQueue && this.filesQueue instanceof Array) {
            if(!files.length) {
                return;
            }

            if(!this.multiselect) {
                this.filesQueue = new Array();
                this.filesQueue.push(files[0]);
            }
            else {
                for(var i=0;i<files.length;i++) {
                    this.filesQueue.push(this.setIdToFile(files[i]));
                }
            }
        }
    },

    /**
     * remove file from queue by provided id or File
     */
    removeFileFromQueue: function(file) {
        if(file instanceof File) {
            var id = file.id;
        }
        else {
            id = file;
        }

        for(var i=0;i<this.filesQueue.length;i++) {
            if(this.filesQueue[i].id == id) {
                this.filesQueue.splice(i,1);
            }
        }
    },

    /**
     * Set id to file to be uniquely identified
     */
    setIdToFile: function(file) {
        file.id = this.generateUniqueId();
        return file;
    },

    /**
     * Generates unique id for file
     */
    generateUniqueId: function() {
        var id = 0;
        var length = this.filesQueue.length;
        if(length > 0) {
            for(var i=0;i<length;i++) {
                var element = this.filesQueue[i];
                if(id <= element.id) {
                    id = element.id + 1;
                }
            }
        }
        return id;
    },

    /**
     * Returns a queue of files
     */
    getFilesQueue: function() {
        return this.filesQueue;
    },

    /**
     * Sets request headers for xhr
     */
    setRequestHeaders: function(filename, filesize, filetype){
        this.xhr.setRequestHeader('X-File-Name', filename);
        this.xhr.setRequestHeader('X-File-Size', filesize);
        this.xhr.setRequestHeader('X-File-Type', filetype);
    },


    /**
     * Adds elements that should be submitted to form
     */
    addElementToForm: function(elem) {
        if(elem instanceof Array) {
            for(var i=0;i<elem.length;i++) {
                this.formData.append(elem[i].name, elem[i].value);
            }
        } else if(elem instanceof Object) {
            this.formData.append(elem.name, elem.value);
        }
    },

    /**
     * Set callback function for response. Response returns object with states(readyState):
     * 0 - not initialized
     * 1 - opened
     * 2 - sending data
     * 3 - receiving data
     * 4 - data received
     */
    setCallBack: function(func) {
        if(func instanceof Function) {
            this.xhr.onreadystatechange = func;
        }
    },

    /**
     * Method to send only one file with headers
     */
    sendFileWithHeader: function() {
        if(this.filesQueue.length > 0) {
            var file = this.filesQueue[0];
            this.formData.append(this.name, file);
            this.xhr.open(this.method, this.url, true);
            this.setRequestHeaders(file.name,file.size,file.type);
            this.xhr.send(this.formData);
            this.formData = new FormData();
        }
    },

    /**
     * Sends request
     */
    send: function(options, extraData) {
        var url = options.url,
            method = method = options.method || 'POST',
            success = options.success,
            failure = options.failure,
            params = options.params,
            waitMsg = options.waitMsg;

        for (var attr in params) {
            this.formData.append(attr, params[attr]);
        }

        if(extraData){
            for (var item in extraData) {
                this.formData.append(item, extraData[item]);
                //console.log(item, extraData[item]);
            }
        }

        for(var i=0;i<this.filesQueue.length;i++) {
            this.formData.append(this.name, this.filesQueue[i]);
        }

        this.xhr.open(method, url, true);

        this.xhr.addEventListener('loadstart', function (e) {
            Ext.Msg.show({
                msg: waitMsg,
                progressText: 'Saving...',
                width: 300,
                wait: true,
                waitConfig: {
                    interval: 200
                }
            });
        }, false);

        this.xhr.addEventListener('loadend', function (evt) {
            Ext.Msg.hide();
            /*
            if (evt.target.status === 200) {
                var obj = Ext.decode(evt.target.responseText);
                if (obj.success) {
                    success(obj);
                } else {
                    failure(obj);
                }
            } else {
                failure(obj);
            }
            */

        }, false);

        // notice that the event handler is on xhr and not xhr.upload
        this.xhr.addEventListener('readystatechange', function(evt) {
            if(this.readyState === 4 && this.status === 200 ) {
                // the transfer has completed and the server closed the connection.
                var obj = Ext.decode(evt.target.responseText);
                if(obj.success){
                    success(obj);
                }
                else {
                    failure(obj);
                }
            }

        }, false);

        this.xhr.send(this.formData);

        //this.filesQueue = []; Array empty not working
        this.filesQueue.length = 0;

        this.formData = new FormData();
        this.xhr = new XMLHttpRequest();
    }
})

define([
], function(){
    // create alert service
    alt.factory('$alert', ['$log', '$timeout', function($log, $timeout){
        return {
            items: [],
            warning: 'warning',
            danger: 'danger',
            info: 'info',
            success: 'success',
            ismultiple: false,
            add: function(message, type, skip){
                message = message || '';
                type = type || this.warning;
                skip = skip || 0;

                if(!this.ismultiple)
                    this.items = [];

                var self = this,
                    i = this.items.length;
                this.items.push({
                    type: type,
                    message: message,
                    skip: skip,
                    isshow: false,
                    close: function(){
                        self.hide(i);
                    }
                });
                return this.show(i);
            },
            hide: function(i){
                if(this.items[i] && this.items[i].isshow){
                    this.items[i].isshow = false;
                    this.items.splice(i, 1);
                }
                return this;
            },
            show: function(i){
                var self = this;
                if(this.items[i] && this.items[i].skip == 0 && !this.items[i].isshow){
                    this.items[i].isshow = true;
                    $timeout(function(){
                        self.hide(i);
                    }, 5000);
                }
                return this;
            },
            check: function(){
                for(var i=0; i<this.items.length; i++){
                    if(this.items[i] && this.items[i].skip > 0) this.items[i].skip--;
                    if(this.items[i]) this.show(i);
                }
                return this;
            }
        };
    }]);
});
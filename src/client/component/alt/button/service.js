define([
], function(){
    // service for creating button
    alt.factory('$button', ['$log', function($log){
        return function(type, data){
            type = type || '';
            data = data || {};

            var buttons = {
                'login'             : {
                    'title'         : 'Login',
                    'title_clicked' : 'Logging in...',
                    'description'   : 'Login',
                    'class'         : 'btn btn-primary btn-large btn-block',
                    'type'          : 'submit',
                    'style'         : 'width: 100%;'
                },
                'excel'             : {
                    'title'         : 'Excel',
                    'description'   : 'Download Excel',
                    'icon'          : 'fa fa-cloud-download',
                    'class'         : 'btn btn-info hidden-xs'
                },
                'reset'             : {
                    'title'         : 'Reset',
                    'description'   : 'Reset',
                    'icon'          : 'fa fa-refresh',
                    'class'         : 'btn btn-warning'
                },
                'reload'            : {
                    'title'         : 'Reload',
                    'description'   : 'Reload',
                    'icon'          : 'fa fa-rotate-left'
                },
                'add'               : {
                    'title'         : 'Add',
                    'description'   : 'Add',
                    'icon'          : 'fa fa-plus-circle'
                },
                'back'              : {
                    'title'         : 'Back',
                    'description'   : 'Back',
                    'icon'          : 'fa fa-circle-arrow-left',
                    'class'         : 'btn btn-default'
                },
                'save'              : {
                    'title'         : 'Save',
                    'description'   : 'Save',
                    'icon'          : 'fa fa-save',
                    'class'         : 'btn btn-success'
                },
                'print'             : {
                    'title'         : 'Print',
                    'description'   : 'Print',
                    'icon'          : 'fa fa-print',
                    'class'         : 'btn btn-default'
                },
                'email'             : {
                    'title'         : 'Email',
                    'description'   : 'Email',
                    'icon'          : 'fa fa-envelope',
                    'class'         : 'btn btn-success'
                },
                'view'              : {
                    'title'         : 'View',
                    'description'   : 'View',
                    'icon'          : 'fa fa-search',
                    'class'         : 'btn btn-info'
                },
                'edit'              : {
                    'title'         : 'Edit',
                    'description'   : 'Edit',
                    'icon'          : 'fa fa-edit',
                    'class'         : 'btn btn-warning'
                },
                'remove'            : {
                    'title'         : 'Remove',
                    'description'   : 'Remove',
                    'icon'          : 'fa fa-trash',
                    'class'         : 'btn btn-danger'
                },
                'yes'               : {
                    'title'         : 'Ya',
                    'description'   : 'Ya',
                    'onclick'       : angular.noop,
                    'href'          : '',
                    'icon'          : 'fa fa-ok',
                    'class'         : 'btn btn-success',
                    'disabled'      : false
                },
                'no'                : {
                    'title'         : 'Tidak',
                    'description'   : 'Tidak',
                    'onclick'       : angular.noop,
                    'href'          : '',
                    'icon'          : 'fa fa-remove',
                    'class'         : 'btn btn-danger',
                    'disabled'      : false
                },
                'cancel'            : {
                    'title'         : 'Cancel',
                    'description'   : 'Cancel',
                    'icon'          : 'fa fa-remove',
                    'class'         : 'btn btn-danger'
                },
                'approve'           : {
                    'title'         : 'Approve',
                    'description'   : 'Approve',
                    'icon'          : 'fa fa-ok'
                },
                'reject'            : {
                    'title'         : 'Reject',
                    'description'   : 'Reject',
                    'icon'          : 'fa fa-remove',
                    'class'         : 'btn btn-danger'
                },
                'search'            : {
                    'title'         : 'Search',
                    'description'   : 'Search',
                    'icon'          : 'fa fa-search'
                },
                'preview'           : {
                    'title'         : 'Preview',
                    'description'   : 'Preview',
                    'icon'          : 'fa fa-file-text-alt',
                    'class'         : 'btn btn-info'
                },
                'open'              : {
                    'title'         : 'Open',
                    'description'   : 'Open',
                    'icon'          : 'fa fa-folder-open'
                },
                'close'             : {
                    'title'         : 'Close',
                    'description'   : 'Close',
                    'class'         : 'btn btn-default'
                },
                'next'              : {
                    'title'         : 'Next',
                    'description'   : 'Next',
                    'icon_position' : 'right',
                    'icon'          : 'fa fa-chevron-right'
                },
                'prev'              : {
                    'title'         : 'Previous',
                    'description'   : 'Previous',
                    'icon'          : 'fa fa-chevron-left'
                },
                'zoomin'            : {
                    'title'         : 'Zoom In',
                    'description'   : 'Zoom In',
                    'icon'          : 'fa fa-search-plus'
                },
                'zoomout'           : {
                    'title'         : 'Zoom Out',
                    'description'   : 'Zoom Out',
                    'icon'          : 'fa fa-search-minus'
                },
                'start'             : {
                    'title'         : 'Start',
                    'description'   : 'Start'
                },
                'finish'            : {
                    'title'         : 'Finish',
                    'description'   : 'Finish'
                },
                'choose'            : {
                    'title'         : 'Pilih',
                    'description'   : 'Pilih',
                    'icon'          : 'fa fa-check',
                    'class'         : 'btn btn-primary'
                },
                'unchoose'            : {
                    'icon'          : 'fa fa-check-empty',
                    'class'         : 'btn btn-default'
                },
                'up'                : {
                    'title'         : 'Naik',
                    'description'   : 'Naik',
                    'icon'          : 'fa fa-arrow-up',
                    'class'         : 'btn btn-default'
                },
                'down'              : {
                    'title'         : 'Turun',
                    'description'   : 'Turun',
                    'icon'          : 'fa fa-arrow-down',
                    'class'         : 'btn btn-default'
                },
                'generate'          : {
                    'title'         : 'Generate',
                    'description'   : 'Generate',
                    'icon'          : 'fa fa-cogs',
                    'class'         : 'btn btn-success'
                },
                'billing'           : {
                    'title'         : 'Tagihan',
                    'description'   : 'Tagihan',
                    'icon'          : 'fa fa-money',
                    'class'         : 'btn btn-success'
                },
                'invoice'           : {
                    'title'         : 'Tagihan',
                    'description'   : 'Tagihan',
                    'icon'          : 'fa fa-money',
                    'class'         : 'btn btn-primary'
                },
                'bast'           : {
                    'title'         : 'BAST',
                    'description'   : 'BAST',
                    'icon'          : 'fa fa-file-text'
                },
                'barcode'           : {
                    'title'         : 'Barcode',
                    'description'   : 'Barcode',
                    'icon'          : 'fa fa-barcode'
                },
                'qrcode'            : {
                    'title'         : 'QR code',
                    'description'   : 'QR code',
                    'icon'          : 'fa fa-qrcode'
                },
                'inventarisasi'     : {
                    'title'         : 'Inventarisasi',
                    'description'   : 'Inventarisasi',
                    'icon'          : 'fa fa-map-marker'
                },
                'export'            : {
                    'title'         : 'Export',
                    'description'   : 'Export',
                    'icon'          : 'fa fa-upload',
                    'class'         : 'btn btn-info'
                },
                'import'            : {
                    'title'         : 'Import',
                    'description'   : 'Import',
                    'icon'          : 'fa fa-download',
                    'class'         : 'btn btn-info'
                },
                'download'          : {
                    'title'         : 'Download',
                    'description'   : 'Download',
                    'icon'          : 'fa fa-cloud-download'
                },
                'upload'            : {
                    'title'         : 'Upload',
                    'description'   : 'Upload',
                    'icon'          : 'fa fa-cloud-upload'
                },
                ''                  : {
                    'title'         : '',
                    'description'   : '',
                    'onclick'       : angular.noop,
                    'class'         : 'btn btn-primary',
                    'href'          : '',
                    'icon'          : '',
                    'icon_position' : 'left',
                    'style'         : '',
                    'disabled'      : false
                }
            };
            return alt.extend(alt.extend(buttons[''], buttons[type]), data);
        };
    }]);
});
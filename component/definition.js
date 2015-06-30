define([
], function(){
    return {
        type: [
            {
                label: 'Layout',
                components: ['container', 'row', 'span1', 'span2', 'span3', 'span4', 'span5', 'span6', 'span7', 'span8', 'span9', 'span10', 'span11', 'span12']
            },
            {
                label: 'Chart',
                components: ['fusioncharts']
            },
            {
                label: 'Form',
                components: []
            },
            {
                label: 'Map',
                components: []
            }
        ],
        component: {
            // layout
            container: {
                thumbnail: '',
                label: 'CONTAINER',
                html: '<div class="container-fluid"></div>'
            },
            row: {
                thumbnail: '',
                label: 'ROW',
                html: '<div class="row-fluid"></div>',
                target: '.container-fluid'
            },
            span1: {
                thumbnail: '',
                label: 'SPAN 1',
                html: '<div class="span1"></div>',
                target: '.row-fluid'
            },
            span2: {
                thumbnail: '',
                label: 'SPAN 2',
                html: '<div class="span2"></div>',
                target: '.row-fluid'
            },
            span3: {
                thumbnail: '',
                label: 'SPAN 3',
                html: '<div class="span3"></div>',
                target: '.row-fluid'
            },
            span4: {
                thumbnail: '',
                label: 'SPAN 4',
                html: '<div class="span4"></div>',
                target: '.row-fluid'
            },
            span5: {
                thumbnail: '',
                label: 'SPAN 5',
                html: '<div class="span5"></div>',
                target: '.row-fluid'
            },
            span6: {
                thumbnail: '',
                label: 'SPAN 6',
                html: '<div class="span6"></div>',
                target: '.row-fluid'
            },
            span7: {
                thumbnail: '',
                label: 'SPAN 7',
                html: '<div class="span7"></div>',
                target: '.row-fluid'
            },
            span8: {
                thumbnail: '',
                label: 'SPAN 8',
                html: '<div class="span8"></div>',
                target: '.row-fluid'
            },
            span9: {
                thumbnail: '',
                label: 'SPAN 9',
                html: '<div class="span9"></div>',
                target: '.row-fluid'
            },
            span10: {
                thumbnail: '',
                label: 'SPAN 10',
                html: '<div class="span10"></div>',
                target: '.row-fluid'
            },
            span11: {
                thumbnail: '',
                label: 'SPAN 11',
                html: '<div class="span11"></div>',
                target: '.row-fluid'
            },
            span12: {
                thumbnail: '',
                label: 'SPAN 12',
                html: '<div class="span12"></div>',
                target: '.row-fluid'
            },

            // chart
            fusioncharts: {
                thumbnail: '',
                label: 'FUSIONCHARTS',
                html: '<div data-alt-fusioncharts=\'{config}\'>{label}</div>',
                target: '[class^="span"]',
                config: {
                    type: "pie2d",
                    height: "400px",
                    dataSource: {
                        data: [
                            {label:"a", value: 10},
                            {label:"b", value: 20}
                        ]
                    }
                }
            }
        }
    };
});
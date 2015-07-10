define([
], function(){
    return {
        type: [
            {
                label: 'Layout',
                components: ['container', 'row', 'span1', 'span2', 'span3', 'span4', 'span5', 'span6', 'span7', 'span8', 'span9', 'span10', 'span11', 'span12']
            },
            {
                label: 'Typography',
                components: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
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

            // typography
            h1: {
                thumbnail: '',
                label: 'H1',
                html: '<h1>H1</h1>',
                target: '[class^="span"]'
            },
            h2: {
                thumbnail: '',
                label: 'H2',
                html: '<h2>H2</h2>',
                target: '[class^="span"]'
            },
            h3: {
                thumbnail: '',
                label: 'H3',
                html: '<h3>H3</h3>',
                target: '[class^="span"]'
            },
            h4: {
                thumbnail: '',
                label: 'H4',
                html: '<h4>H4</h4>',
                target: '[class^="span"]'
            },
            h5: {
                thumbnail: '',
                label: 'H5',
                html: '<h5>H5</h5>',
                target: '[class^="span"]'
            },
            h6: {
                thumbnail: '',
                label: 'H6',
                html: '<h6>H6</h6>',
                target: '[class^="span"]'
            },
            p: {
                thumbnail: '',
                label: 'Paragraph',
                html: '<p>Paragraph</p>',
                target: '[class^="span"]'
            },

            // chart
            fusioncharts: {
                dependency: 'component/alt/fusioncharts/controller',
                thumbnail: '',
                label: 'FUSIONCHARTS',
                html: '<div data-alt-fusioncharts=\'{config}\' contenteditable="false">{label}</div>',
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
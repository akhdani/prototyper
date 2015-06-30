define([
], function(){
    return {
        type: [
            {
                label: 'Layout',
                components: ['container', 'row', 'span']
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
            span: {
                thumbnail: '',
                label: 'SPAN6',
                html: '<div class="span6"></div>',
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
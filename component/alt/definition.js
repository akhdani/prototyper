define([
], function(){
    return {
        type: {
            'chart': {
                label: 'Chart',
                components: ['amcharts', 'fusioncharts']
            },
            'form': {
                label: 'Form',
                components: []
            },
            'map': {
                label: 'Map',
                components: []
            }
        },
        component: {
            'alt-fusioncharts': {
                thumbnail: '',
                label: 'FUSIONCHARTS',
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
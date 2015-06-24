define([
    'component/alt/button/controller',
    'asset/js/pdfjs/pdf'
], function(){
    return alt.component({
        name: 'altPdfviewer',
        templateUrl: 'component/alt/pdfviewer/view.html',
        scope: {
            setting: '=?altPdfviewer'
        },
        link: ['$scope', '$log', '$element', '$button', '$timeout', '$alert', '$validate', function($scope, $log, $element, $button, $timeout, $alert, $validate){
            $scope.setting      = alt.extend({
                title: '',
                location: '',
                elementid: 'pdfviewer' + $scope.$id,
                canvasid: 'canvas' + $scope.$id,
                thumbnailid: 'thumbnail' + $scope.$id,
                maxheight: '500px',
                currentpage: 1,
                currentscale: 1.5,
                scalemin: 0.4,
                scalemax: 2.5,
                scalestep: 0.1,
                pages: [],
                pdf: {},
                next: function(){
                    $scope.setting.page($scope.setting.currentpage+1);
                    $scope.setting.redraw($scope.setting.currentpage);
                },
                prev: function(){
                    $scope.setting.page($scope.setting.currentpage-1);
                    $scope.setting.redraw($scope.setting.currentpage);
                },
                page: function(page){
                    if(page <= 1){
                        page = 1;
                    }else if(page >= $scope.setting.pages.length){
                        page = $scope.setting.pages.length;
                    }

                    $scope.setting.currentpage = page;
                },
                zoomin: function(){
                    $scope.setting.scale($scope.setting.currentscale + $scope.setting.scalestep);
                    $scope.setting.redraw($scope.setting.currentpage);
                },
                zoomout: function(){
                    $scope.setting.scale($scope.setting.currentscale - $scope.setting.scalestep);
                    $scope.setting.redraw($scope.setting.currentpage);
                },
                scale: function(scale){
                    if(scale < $scope.setting.scalemin){
                        scale = $scope.setting.scalemin;
                    }else if(scale > $scope.setting.scalemax){
                        scale = $scope.setting.scalemax;
                    }

                    $scope.setting.currentscale = scale;
                },
                redraw: function(page){
                    var canvas = document.getElementById($scope.setting.canvasid + parseInt(page-1)),
                        context = canvas.getContext('2d'),
                        viewport = $scope.setting.pages[page-1].getViewport($scope.setting.currentscale);

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    $scope.setting.pages[page-1].render({
                        canvasContext: context,
                        viewport: viewport
                    });
                },
                thumbnail: function(page){
                    var canvas = document.getElementById($scope.setting.thumbnailid + parseInt(page-1)),
                        context = canvas.getContext('2d'),
                        parentElm = canvas.parentNode,
                        desiredWidth = parentElm.offsetWidth,
                        viewport = $scope.setting.pages[page-1].getViewport(1),
                        scale = (desiredWidth - 10) / viewport.width,
                        scaledViewport = $scope.setting.pages[page-1].getViewport(scale);

                    canvas.height = scaledViewport.height;
                    canvas.width = scaledViewport.width;

                    $scope.setting.pages[page-1].render({
                        canvasContext: context,
                        viewport: scaledViewport
                    });
                },
                retrieve: function(){
                    PDFJS.getDocument($scope.setting.location).then(function(pdf) {
                        $scope.setting.pdf = pdf;
                        $scope.setting.pages = [];
                        for(var i=0; i<pdf.numPages; i++){
                            $scope.setting.pages.push({});
                        }

                        // applying setting pages so canvas created
                        $scope.$apply();
                        $timeout(function(){
                            for(var i=0; i<pdf.numPages; i++){
                                // fetch the page
                                pdf.getPage(i+1).then(function(page) {
                                    $scope.setting.pages[page.pageIndex] = page;
                                    $scope.$apply();

                                    $timeout(function(){
                                        $scope.setting.scale($scope.setting.currentscale);
                                        $scope.setting.redraw(page.pageIndex + 1);
                                        $scope.setting.thumbnail(page.pageIndex + 1);
                                    });
                                });
                            }
                        });
                    });
                },
                print: function(){
                    var wnd = window.open($scope.setting.location);
                    wnd.focus();
                    wnd.print();
                },
                download: function(){
                    window.open($scope.setting.location, '_blank');
                },
                buttons: function(){
                    return [
                        $scope.setting.button.prev(),
                        $scope.setting.button.next(),
                        $scope.setting.button.zoomin(),
                        $scope.setting.button.zoomout(),
                        $scope.setting.button.print(),
                        $scope.setting.button.download()
                    ]
                },
                button: {
                    next: function(){
                        return $button('next', {title:'', icon: 'icon-chevron-right', class:'btn btn-default', onclick: $scope.setting.next});
                    },
                    prev: function(){
                        return $button('prev', {title:'', icon: 'icon-chevron-left',onclick: $scope.setting.prev});
                    },
                    zoomin: function(){
                        return $button('zoomin', {title:'', icon: 'icon-zoom-in', onclick: $scope.setting.zoomin});
                    },
                    zoomout: function(){
                        return $button('zoomout', {title:'', icon: 'icon-zoom-out', onclick: $scope.setting.zoomout});
                    },
                    print: function(){
                        return $button('print', {title:'', onclick: $scope.setting.print});
                    },
                    download: function(){
                        return $button('download', {title:'', class:'btn btn-default', onclick: $scope.setting.download});
                    }
                }
            }, $scope.setting);

            $scope.$watch('setting.currentpage', function(newvalue, oldvalue){
                if(newvalue != oldvalue && $scope.setting.pages.length > 0){
                    if(newvalue < 1 || newvalue > $scope.setting.pages.length) $scope.setting.page(newvalue);
                }
            });

            PDFJS.imageResourcesPath = 'asset/js/pdfjs/images/';
            PDFJS.workerSrc = 'asset/js/pdfjs/pdf-worker.js';
            $scope.setting.retrieve();
            $scope.buttons = $scope.setting.buttons();
        }]
    });
});
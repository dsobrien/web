'use strict';

angular.module('kaptureApp')
  .controller('DownloadsCtrl', function ($scope, $http, $timeout, $location) {

    (function getDownloads() {
      $http({
        method: 'GET',
        url: '/api/download',
        timeout: 30000  // in ms
      }).then( function( resp ) {
        $scope.downloads = resp.data;
      }).finally( function() {
        if( $location.path() === '/downloads' ) {          
          $timeout( getDownloads, 3000 );
        }
      })
    })();

  });
'use strict';

angular.module('kaptureApp')
  .service('searchService', function( $http, $filter, popup, mockSearchResults, serverEndpoint ) {
    var SEARCH_URI = `${serverEndpoint}/api/search`;
    console.log('using search uri', SEARCH_URI)

    if( mockSearchResults ) {
      SEARCH_URI = '/assets/mock/search/black.json';
    }

    var state = {
      loading:  false,
      query:    null,
      results:  []
    };

    this.isLoading = function() {
      return state.loading;
    };

    this.getResults = function() {
      return state.results;
    };

    this.search = function( query ) {
      state.loading  = true;
      state.results  = null;
      state.query    = query;

      return $http({
        url: SEARCH_URI,
        method: 'GET',
        params: {
          q: query
        }
      }).then( function( results ) {
        state.results = $filter('orderBy')( results.data, 'score', true );
        state.loading = false;

        return state.results;
      }, function( failed ) {
        state.loading = false;
        popup.error( 'Search failed: ' + failed.status + ' ' + failed.statusText );
      });
    };


    return this;
  });

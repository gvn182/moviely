var app = angular.module("myApp", ['ui.bootstrap']);

app.controller("IndexCtrl", function ($scope, $modal, $http) {
    var modalInstance = $modal.open({
        templateUrl: 'movie-detail.html',
        animation: true,
        controller: 'ModalUpdateCtrl',
        size: 'lg',
        resolve: {
            movieID: function () {
              return 1;
            }
        }
    });
    modalInstance.result.then(function (data) {

    });
});


app.controller('ModalUpdateCtrl', function ($scope, $http, $modalInstance, movieID) {
    $scope.movieID = movieID;
    

});
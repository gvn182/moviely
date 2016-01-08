var app = angular.module("myApp", ['ui.bootstrap','angucomplete-alt']);

app.controller("IndexCtrl", function ($scope, $modal, $http) {
    $scope.currentPage = 0;
    $scope.maxSize = 30;
    $scope.filter = "";

    $scope.getData = function (filter) {
        var filter = filter != "" ? "&title=" + filter : "";
        $http.get("/index/search?currentPage=" + $scope.currentPage + "&maxSize=" + $scope.maxSize + filter).success(function (data, status, headers, config) {
            $scope.movie_list = data.data;
            $scope.totalItems = data.total_items;
        });
    };

    $scope.openModal = function (movieID) {
        var modalInstance = $modal.open({
            templateUrl: 'movie-detail.html',
            animation: true,
            controller: 'ModalCtrl',
            size: 'lg',
            resolve: {
                movieID: function () {
                    return movieID;
                }
            }
        });
        modalInstance.result.then(function (id) {
            var payload = {
                'id': id
            };

            $http.post("/index/create", payload).success(function (data, status, headers, config) {
                $scope.getData("");
            });

        });
    };

    $scope.ShowMovieDetail = function (id) {
        $scope.openModal(id);
    };

    $scope.filterChanged = function (filter) {
        $scope.getData(filter);
    };

    $scope.filterSelected = function (filter)
    {
        if (filter != null)
        {
            $scope.openModal(filter.originalObject.id);
        }
    };

    $scope.getData("");

});


app.controller('ModalCtrl', function ($scope, $http, $modalInstance, movieID) {
    $scope.movieID = movieID;

    $http.get("/index/" + movieID).success(function (data, status, headers, config) {
        $scope.movie = data.data;
    });

    $scope.AddNewMovie = function (id) {

        $modalInstance.close(id);

    };


});
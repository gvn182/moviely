var app = angular.module("myApp", ['ui.bootstrap','angucomplete-alt']);

app.controller("IndexCtrl", function ($scope, $modal, $http) {
    $scope.currentPage = 0;
    $scope.maxSize = 200;
    $scope.creatingList = false;
    $scope.listCreatingName = '';
    $scope.customList = '';
    $scope.filter = '';
    $scope.getData = function () {
        var filter = $scope.filter != "" ? "&title=" + $scope.filter : "";
        $http.get("/index/search?currentPage=" + $scope.currentPage + "&maxSize=" + $scope.maxSize + "&custom_list_id=" + $scope.selectedList + filter).success(function (data, status, headers, config) {
            $scope.movie_list = data.data;
            $scope.totalItems = data.total_items;
        });
    };

    $scope.getClass = function (id) {
        return $scope.selectedList == id;
    };

    $scope.changeList = function (id) {
        $scope.selectedList = id;
    };

    $scope.getLists = function ()
    {
        $http.get("/custom_list").success(function (data, status, headers, config) {
            $scope.customList = data.data;
            $scope.selectedList = $scope.customList[0].id;
            $scope.getData();
        });
    };

    $scope.cleanAddList = function () {
        $scope.creatingList = false;
        $scope.listCreatingName = '';
    };

    $scope.addList = function () {
        var payload = {
            'name': $scope.listCreatingName
        };
        $http.post("/custom_list", payload).success(function (data, status, headers, config) {
            $scope.customList = data.data;
            $scope.cleanAddList();
        });
    };


    $scope.$watch('selectedList', function() {
        if($scope.selectedList != null)
            $scope.getData();
    });

    $scope.openModal = function (movieID) {
        var modalInstance = $modal.open({
            templateUrl: 'movie-detail.html',
            animation: true,
            controller: 'ModalCtrl',
            size: 'lg',
            resolve: {
                movieID: function () {
                    return movieID;
                },
                customListId: function() {
                    return $scope.selectedList;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.$broadcast('angucomplete-alt:clearInput');
            $scope.filter = "";
            $scope.getData();
        });
    };

    $scope.ShowMovieDetail = function (id) {
        $scope.openModal(id, $scope.selectedList);
    };

    $scope.filterChanged = function (filter) {
        $scope.filter = filter;
        $scope.getData();
    };

    $scope.filterSelected = function (filter)
    {
        if (filter != null)
        {
            $scope.openModal(filter.originalObject.id);
        }
    };

    $scope.RemoveMovie = function (id, $event)
    {
        $http.delete("/index/" + id).success(function (data, status, headers, config) {
            $scope.getData();
        });
        $event.stopPropagation();
    };

    $scope.openListModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'lists-detail.html',
            animation: true,
            controller: 'ModalListCtrl',
            size: 'md',
            resolve: {
                movie_list: function () {
                    return $scope.customList;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.$broadcast('angucomplete-alt:clearInput');
            $scope.filter = "";
            $scope.getLists();
        });
    };

    $scope.getLists();
});


app.controller('ModalListCtrl', function ($scope, $http, $modalInstance, movie_list) {
    $scope.movie_list = movie_list;

    $scope.RemoveList = function (id) {

        $http.delete("/custom_list/" + id).success(function (data, status, headers, config) {

            $modalInstance.close();

        });
    }
});


app.controller('ModalCtrl', function ($scope, $http, $modalInstance, movieID, customListId) {
    $scope.movieID = movieID;


    $http.get("/index/find?id=" + movieID + "&custom_list_id=" + customListId).success(function (data, status, headers, config) {
        $scope.movie = data.data;
    });

    $scope.AddNewMovie = function (id) {
        var payload = {
            'id': id,
            'custom_list_id': customListId
        };

        $http.post("/index/create", payload).success(function (data, status, headers, config) {
            $modalInstance.close();

        });
    };


});
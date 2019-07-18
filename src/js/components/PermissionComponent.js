angular
    .module('permission')
    .component('permissionBlock', {
        templateUrl: 'views/perm-block.template.html',
        controller : function ($scope, $http, $q) {

            $scope.permissions = [];

            var permissions = localStorage.getItem('permissions');

            if (permissions) {
                $scope.permissions = angular.fromJson(permissions);
            } else {
                getData().then(function(response) {
                    $scope.permissions = response.data;
                });
            }

            $scope.checkAll = function (action) {
                var isChecked = event.target.checked;
                angular.forEach($scope.permissions, function (item) {
                    angular.forEach(item.permission, function (i, name) {
                        if (action === name && isChecked) {
                            if (name === 'Remove' && item.permission.Edit === true) {
                                item.permission[name] = true;
                            } else if (name === 'Edit' && item.permission.View === true) {
                                item.permission[name] = true;
                            } else if (name === 'View') {
                                item.permission[name] = true;
                            }
                            $scope.checkedAction(item.section, name);
                        } else if (action === name && !isChecked) {
                            item.permission[name] = false;
                            $scope.checkedAction(item.section, name);
                        }
                    })
                });
            };

            $scope.checkedAction = function (section, val) {
                var isChecked = event.target.checked;
                angular.forEach($scope.permissions, function (item) {
                    if (item.section === section) {
                        angular.forEach(item.permission, function (i, name) {
                            if (val === 'View' && isChecked === false) {
                                item.permission['Edit'] = false;
                                item.permission['Remove'] = false;
                            }
                            if (val === 'Edit' && isChecked === false) {
                                item.permission['Remove'] = false;
                            }
                        })
                    }
                });
                $scope.count();
            };

            $scope.saveData = function () {
                localStorage.setItem('permissions', angular.toJson($scope.permissions));
                alert("Permissions successfully saved!");
            };

            $scope.count = function () {
                $scope.allView = false;
                $scope.allEdit = false;
                $scope.allRemove = false;

                $scope.editDisable = true;
                $scope.removeDisable = true;

                var countView = 0,
                    countEdit = 0,
                    countRemove = 0;

                angular.forEach($scope.permissions, function (item) {
                    angular.forEach(item.permission, function (i, name) {
                        if (i === true && name === 'View') {
                            countView++;
                        }
                        if (i === true && name === 'Edit') {
                            countEdit++;
                        }
                        if (i === true && name === 'Remove') {
                            countRemove++;
                        }
                    })
                });

                var objLength = $scope.permissions.length;

                if (countView >= 1) {
                    $scope.editDisable = false;
                }
                if (countEdit >= 1) {
                    $scope.removeDisable = false;
                }
                if (countView === objLength) {
                    $scope.allView = true;
                }
                if (countEdit === objLength) {
                    $scope.allEdit = true;
                }
                if (countRemove === objLength) {
                    $scope.allRemove = true;
                }
            };

            function getData() {
                var deferred = $q.defer();
                $http.get('/json/permissions.json')
                    .then(function(response) {
                        deferred.resolve(response);
                    });
                return deferred.promise;
            }

            $scope.count();
        }
    });
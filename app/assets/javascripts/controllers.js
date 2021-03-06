var restkastenControllers = angular.module('restkastenControllers', []);

restkastenControllers.controller('UserListCtrl', function ($scope, User) {
    $scope.users = User.query();

    $scope.orderProp = 'id';

});


restkastenControllers.controller('UserCtrl', function ($scope, $routeParams, User, UserAccessObject, AccessObject, Access) {
    $scope.user = User.get({userId: $routeParams.userId});
    $scope.accesses = Access.query({userId: $routeParams.userId});

    var refresh = function(){
        $scope.userAccessObjects = UserAccessObject.query({userId: $routeParams.userId});
        $scope.accessObjects = AccessObject.query();
    };

    refresh();

    $scope.filteredAccessObjects = function(){
        var uObjects = $scope.userAccessObjects.map(function(o){ return o['id']; });

        var filteredObjects = $scope.accessObjects.filter(function(o){
            if(uObjects.indexOf(o.id) == -1) return true;
            else return false;
        });

        return filteredObjects;
    };

    $scope.addToUserAccessObjects = function(accessObject){
        UserAccessObject.add({access_object_id: accessObject.id, user_id: $routeParams.userId}, function(){
            refresh();
        });
    };

    $scope.removeFromUserAccessObjects = function(accessObject){
        UserAccessObject.remove({objectId: accessObject.id, userId: $routeParams.userId}, function(){
            refresh();
        });
    }
});


restkastenControllers.controller('AccessObjectListCtrl', function ($scope, AccessObject) {
    $scope.accessObjects = AccessObject.query();
    $scope.orderProp = 'id';
});

restkastenControllers.controller('AccessObjectCtrl', function ($scope, $routeParams, AccessObject, AccessObjectAccess) {
    $scope.accessObject = AccessObject.get({objectId: $routeParams.objectId});
    $scope.accesses = AccessObjectAccess.query({objectId: $routeParams.objectId});
});
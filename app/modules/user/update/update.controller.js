(function () {
    'use strict';

    angular
        .module('elogbooks.user')
        .controller('UserUpdateController', ['$http', '$state', 'userResponse', UserUpdateController]);

    function UserUpdateController($http, $state, userResponse) {
        var vm = this;
        vm.update = update;
        vm.user = userResponse;

        function update() {
            $http.put(
                'http://localhost:8001/user/' + vm.user.id,
                {
                    name: vm.user.name,
                    email: vm.user.email,
                }
            ).then(function (response) {
                $state.go('users.view', {id:response.data.id});
            }, function () {
                console.log('Request Failed');
            });
        }
    }
})();

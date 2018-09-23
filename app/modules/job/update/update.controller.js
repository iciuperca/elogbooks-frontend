(function () {
    'use strict';

    angular
        .module('elogbooks.job')
        .controller('JobUpdateController', ['$http', '$state', 'jobResponse', 'usersResponse', JobUpdateController]);

    function JobUpdateController($http, $state, jobResponse, usersResponse) {
        var vm = this;
        vm.availableStatuses = [
            {value: 0, name: 'Open'},
            {value: 1, name: 'Closed'},
        ];
        vm.update = update;
        vm.job = jobResponse;
        vm.job.user = jobResponse.user.id;
        vm.users = usersResponse.data;

        function update() {
            $http.put(
                'http://localhost:8001/job/' + vm.job.id,
                {
                    description: vm.job.description,
                    status: vm.job.status,
                    user: vm.job.user,
                }
            ).then(function (response) {
                $state.go('jobs.view', {id:response.data.id});
            }, function () {
                console.log('Request Failed');
            });
        }
    }
})();

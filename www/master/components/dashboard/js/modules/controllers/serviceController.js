/**=========================================================
 * Module: Services
 * Visualizer for services
 =========================================================*/

function ServiceController() {
}

ServiceController.prototype.getData = function(dataId) {
  this.scope.loading = true;
  this.k8sApi.getServices(dataId).success(angular.bind(this, function(data) {
    this.scope.service = data;
    this.scope.loading = false;
  })).error(angular.bind(this, this.handleError));
};

ServiceController.prototype.handleError = function(data, status, headers, config) {
  console.log("Error (" + status + "): " + data);
  this.scope.loading = false;
};

app.controller('ServiceCtrl', [
  '$scope',
  '$routeParams',
  'k8sv1Beta3Api',
  '$location',
  function($scope, $routeParams, k8sApi, $location) {
    $scope.controller = new ServiceController();
    $scope.controller.k8sApi = k8sApi;
    $scope.controller.scope = $scope;
    $scope.controller.getData($routeParams.serviceId);

    $scope.doTheBack = function() { window.history.back(); };
    $scope.go = function(d) { $location.path('/dashboard/services/' + d.metadata.name); }
    $scope.getSelectorUrlFragment = function(sel){ return _.map(sel, function(v, k) { return k + '=' + v }).join(','); };

  }
]);

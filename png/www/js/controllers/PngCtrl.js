app.controller('PngCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, $http, $q, $state) {


  console.log($state.params)
  $scope.servers = {};
  $scope.serverId = $state.params.serverId;

  function summary(data) {
    $scope.servers = {}
    data.forEach(function(sStat) {
      $scope.servers[sStat.id] = {
        id: sStat.id,
        title: sStat.title
      }
      sStat.categories.forEach(function(cStat) {
        if (!$scope.servers[sStat.id][cStat.categoryId]) {

          if (!cStat.statuses) {
            cStat.statuses = [];
          }

          cStat.statuses.forEach(function(s) {
            if (!$scope.servers[sStat.id].total) {
              $scope.servers[sStat.id].total = {}
            }
            if (!$scope.servers[sStat.id].total[s.status]) {
              $scope.servers[sStat.id].total[s.status] = 0;
            }
            $scope.servers[sStat.id].total[s.status] += parseInt(s.total);
          })
        }
        $scope.servers[sStat.id].rawCategories = sStat.categories;
      })
    })
    console.log($scope.servers)
  }

  $scope.getStats = function() {
    $http.get("https://raw.githubusercontent.com/arieend/fedex2018/master/data/png/categories/categories.json").success(
      function(res) {
        $scope.rawCategories = res
        summary(res);
      }
    ).
    error(function(err) {
      $scope.error = "Failed to get Categories";
    })
  }

  function createDetails(data) {
    $scope.serverCategoryDetails = {}

    data.forEach(function(d) {
      var key = d.serverName + d.alertCategory;
      if (!$scope.serverCategoryDetails[key])
        $scope.serverCategoryDetails[key] = [];
      $scope.serverCategoryDetails[key].push(d);
    })

    console.log("serverCategoryDetails:", $scope.serverCategoryDetails)
  }

  $scope.getDetails = function() {
    $http.get("https://raw.githubusercontent.com/arieend/fedex2018/master/data/png/server/details.json").success(
      function(res) {
        $scope.details = res
        createDetails(res);
      }
    ).
    error(function(err) {
      $scope.error = "Failed to get details";
    })
  }

  if ($state.params.serverId && $state.params.categoryId) {
    $scope.serverCategoryId = $state.params.serverId + $state.params.categoryId;
    $scope.getDetails()
  }

  function createAlerts(data) {
    $scope.serverAlerts = {}

    data.forEach(function(d) {
      var key = d.alertNo;
      if (!$scope.serverAlerts[key])
        $scope.serverAlerts[key] = [];
      $scope.serverAlerts[key].push(d);
    })

    console.log("serverAlerts :", $scope.serverAlerts)
  }
  $scope.getAlerts = function() {
    $http.get("https://raw.githubusercontent.com/arieend/fedex2018/master/data/png/server/alerts.json").success(
      function(res) {
        $scope.alerts = res
        createAlerts(res);
      }
    ).
    error(function(err) {
      $scope.error = "Failed to get details";
    })
  }

  if ($state.params.serverId && $state.params.alertNo) {
    $scope.serverAlertNo = $state.params.serverId + $state.params.alertNo;
    $scope.getAlerts()
  }

  $scope.getStats();

});

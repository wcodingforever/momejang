
angular.module('myIonicPopUpApp', ['ionic'])
    .controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {



      // showpopup method code
      $scope.showPopup = function() {
        $scope.data = {}

        var myPopup = $ionicPopup.show({
          template: ' Repetitions<input type="number" ng-model="data.userPassword">   <br> Sets  <input type="number" ng-model="data.confirmPassword" > ',
          title: 'Make Your Plan',
          subTitle: 'Please type your excersice plan',

          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                var messageObj = {
                     event: "saveuserstats"
                     , payload: {
                          userid: "1"
                         , exercise: "Bicep Curls"
                         , repetitions: "8"
                         , sets: "3"
                     }
                };
                sendWS(messageObj)
              }
            },
          ]
        });

      };

    });

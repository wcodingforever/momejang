from 'js/utils.js' import sendWS

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
                         , Metric: "Bicep Curls"
                         , Value: "8"
                     }
                };
                sendWS(messageObj)
                {
                  ws.send("{ \"Event\" : \"saveuserstats:\"}, \"Payload\" : [ \"Metric\" : \"Reps\", \"Value\" : \"8\"""]");
                }
              }
            },
          ]
        });
        myPopup.then(function(res) {

          if(res){

              if(res.userPassword==res.confirmPassword)
              {
                console.log('Password Is Ok');
              }
              else
              {
                console.log('Password not matched');
              }
          }
          else
          {
            console.log('Enter password');
          }


        });

      };

    });

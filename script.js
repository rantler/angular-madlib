// Define a new module for our app
var madLibApp = angular.module('madLib', []);
madLibApp.replacementWords = [];

// The controller

madLibApp.controller('WordController', function($scope) {

  $scope.replaceWord = function(word) {
    madLibApp.replacementWords[word] = $scope.replacement;
  }

});

function MadLibController($scope) {

  $scope.findWords = function() {
    var matcher = /_(\w+)_/g;

    if (!$scope.sentence || $scope.sentence.length <= 0) {
      return;
    }

    $scope.words = [];
    while (match = matcher.exec($scope.sentence)) {
      $scope.words.push(match[1]);
    }

    return;
  }
  
  $scope.result = function() {
    var madLib = $scope.sentence;

    if (!madLib || madLib.length <= 0) {
      return;
    }

    angular.forEach($scope.words, function(value, key) {
      var replacement = madLibApp.replacementWords[value];

      if (replacement === undefined) {
        replacement = '_' + value + '_';
      }

      madLib = madLib.replace('_' + value + '_', replacement);
    });

    return madLib;
  }

  $scope.resultPresent = function() {
    return $scope.result() === undefined ? 'hidden' : '';
  }

}

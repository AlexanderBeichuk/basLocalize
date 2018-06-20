var basLocalizeModule = angular.module('basLocalize', []);

basLocalizeModule.directive("ngLocalize", function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      function resolveObject(path, obj) {
        return path.split('.').reduce(function(prev, curr) {
          return prev ? prev[curr] : undefined
        }, obj || self);
      }

      function changeLanguage(language) {
        element.html(resolveObject(attrs.ngLocalize, window.translations[window.translations[language] ? language : localStorage.getItem('_basDefaultLanguage')]));
      }

      var language = localStorage.getItem('language');

      changeLanguage(language);

      scope.$on('baslanguage:change', function (event, data) {
        changeLanguage(data);
      })

       /*scope.$watch(attrs.ngLocalize, function (path) {
        element.html(resolveObject(path, window.translations[localStorage.getItem("language") || 'en']));
        });*/

    }
  };
});

basLocalizeModule.factory('basLocalizeService', ['$rootScope', function ($rootScope) {

  return {
    setDefaultLanguage: function(defaultLanguage) {
      localStorage.setItem('_basDefaultLanguage', defaultLanguage);
    },

    changeLanguage: function (currentLanguage) {
      $rootScope.$broadcast('baslanguage:change', currentLanguage);
    }
  }

}]);
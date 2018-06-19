var basLocalizeModule = angular.module('basLocalize', []);

basLocalizeModule.directive("ngLocalize", function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      function resolveObject(path, obj) {
        return path.split('.').reduce(function(prev, curr) {
          return prev ? prev[curr] : undefined
        }, obj || self);
      };
      var language = localStorage.getItem('language');

      function changeLanguage(language) {
        element.html(resolveObject(attrs.ngLocalize, window.translations[window.translations[language] ? language : localStorage.getItem('defaultLanguage')]));
      }

      changeLanguage(language);

      scope.$on('baslanguage:change', function (event, data) {
        if (data.defaultLanguage) {
          localStorage.setItem('defaultLanguage', data.defaultLanguage);
        }
        changeLanguage(data.currentLanguage);
      })

       /*scope.$watch(attrs.ngLocalize, function (path) {
        element.html(resolveObject(path, window.translations[localStorage.getItem("language") || 'en']));
        });*/

    }
  };
});

basLocalizeModule.factory('basLocalizeService', ['$rootScope', function ($rootScope) {

  return {
    changeLanguage: function (currentLanguage, defaultLanguage) {
      $rootScope.$broadcast('baslanguage:change', {
        currentLanguage: currentLanguage,
        defaultLanguage: defaultLanguage
      });
    },
  }

}]);
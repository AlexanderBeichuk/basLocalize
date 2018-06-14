var basLocalizeModule = angular.module('basLocalize', []);

basLocalizeModule.directive("ngLocalize", function() {
   return {
      restrict: 'A',
      link: function (scope, element, attrs) {

         var language = localStorage.getItem("language") || 'en';

         function resolveObject(path, obj) {
            return path.split('.').reduce(function(prev, curr) {
               return prev ? prev[curr] : undefined
            }, obj || self);
         };

         element.html(resolveObject(attrs.ngLocalize, window.translations[language]));

         scope.$on('baslanguage:change', function (event, data) {
            element.html(resolveObject(attrs.ngLocalize, window.translations[data]));
         });

         /*scope.$watch(attrs.ngLocalize, function (path) {
            element.html(resolveObject(path, window.translations[localStorage.getItem("language") || 'en']));
         });*/

      }
   };
});

basLocalizeModule.factory('basLocalizeService', ['$rootScope', function ($rootScope) {
   return {
      changeLanguage: function (language) {
         $rootScope.$broadcast('baslanguage:change', language);
      }
   }

}]);
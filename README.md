How use:
Include this module in your application module:
```js
var app = angular.module('appModule', [
    'basLocalize'
]);
```
For get current language:
```js
var language = localStorage.getItem("language") || 'en';
```

We have variable for each languages with content:
```js
window.translations.cn = {
    "eth": {
        "collected": "筹募的ETH "
    }
};
```

Use your variable in
```js
basLocalizeService.changeLanguage(currentLanguage)
```
in controller for change language:
```js
app.controller('homeController', [ '$scope', 'basLocalizeService', function ($scope, basLocalizeService) {
    $scope.changeLanguage = function(currentLanguage) {  //currentLanguage = cn
        basLocalizeService.changeLanguage(currentLanguage, defaultLanguage);
            };
    }])
```


Use in file.html:
```html
<span ng-localize="eth.collected">template text</span>
```

GOOD LUCK!
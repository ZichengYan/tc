var htp='http://robert196.com:4000';
    htp='';
var start=true;
// 控制器模块
angular.module('Controllers', [])

// 处理导航
.controller('NavsController', ['$scope', function($scope) {
    $scope.navs = [
        { link: '#/today', text: '今日一刻', icon: 'icon-home' },
        { link: '#/older', text: '往期内容', icon: 'icon-file-empty' },
        { link: '#/hot', text: '热门作者', icon: 'icon-pencil' },
        { link: '#/', text: '栏目浏览', icon: 'icon-menu' },
        { link: '#/', text: '我的喜欢', icon: 'icon-heart' },
        { link: '#/', text: '设置', icon: 'icon-cog' },
    ];
}])

// 今日一刻
.controller('TodayController', ['$scope', '$http', '$rootScope', '$filter', function($scope, $http, $rootScope, $filter) {
    // 加载状态
    $rootScope.loaded = false;
    
    $rootScope.title = '今日一刻';

    $rootScope.index = 0;

    var today = new Date;

    var date = $filter('date');

    today = date(today, 'yyyy-MM-dd'); // 2016-11-05

    // 异步请求
    $http({
        url: htp+'/api/today',
        method: 'get',
        params: { today: today }
    }).success(function(info) {
        //启动动画
        $rootScope.start=false;
        // info 返回的数据
        // 获取到的数据
        $scope.posts = info.posts;
        
        $scope.date = info.date;

        $rootScope.loaded = true;
    });

}])

// 往期内容
.controller('OlderController', ['$scope', '$http', '$rootScope','$filter', function($scope, $http, $rootScope,$filter) {

    $rootScope.loaded = false;

    $rootScope.title = '往期内容';

    $rootScope.index = 1;

    //  
    $scope.day = 1;
    var now = Date.parse(new Date()) - 86400000;
    now = $filter('date')(new Date(now), 'yyyy-MM-dd');
    // 
    $http({
        url: htp+'/api/older',
        method: 'get',
        params: { day: now }
    }).success(function(info) {
        // info 返回的数据
        console.log(info);

        $scope.day = info.day;

        $scope.posts = info.posts;

        $scope.date = info.date;

        $rootScope.loaded = true;
    });

}])

// 执门作者
.controller('HotController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

    $rootScope.title = '热门作者';

    $rootScope.index = 2;

    $rootScope.loaded = false;

    $http({
        url: htp+'/api/author'
    }).success(function(info) {
        // info 返回数据
        console.log(info);

        $scope.rec = info.authors;

        $scope.all = info.authors;

        $rootScope.loaded = true;
    });

}])


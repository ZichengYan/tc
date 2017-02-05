var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var $ = require('cheerio');
var index = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/Yike/')));

 


/*主程序开始=============================================================================================*/


// console.log((new Date()).substr(10));

//获取今日资讯
app.get('/api/today', function(req, res) {
    var optionsNews = {
        url: 'https://moment.douban.com/api/stream/date/' + req.query.today + '?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6',
        headers:{
            'Access-Control-Allow-Origin':'*'
        }

    };
    request(optionsNews, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body)
            res.send(body);
        }
    })
})

// 推荐作者
app.get('/api/author', function(req, res) {
    var optionsNews = {
        url: 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6',
        headers:{
            'Access-Control-Allow-Origin':'*'
        }
    };
    request(optionsNews, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body)
                res.send(body)
        }
    })
})

//往期资讯
app.get('/api/older', function(req, res) {
        var optionsNews = {
            url: 'https://moment.douban.com/api/stream/date/' + req.query.day + '?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6',
            headers:{
            'Access-Control-Allow-Origin':'*'
        }
        };
        request(optionsNews, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                    res.send(body)
            }
        })
    })
    /*======================路由======================*/








/*主程序结束=============================================================================================*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

console.log("启动成功...");
app.listen(4000);

module.exports = app;

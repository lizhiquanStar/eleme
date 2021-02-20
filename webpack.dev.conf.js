const express = require('express')
const app = express()
var appData = require('./data.json') //加载本地数据文件
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings
var apiRoutes = express.Router();

app.use('/api', apiRoutes);


module.exports = {
    devServer: {
        before(app) {
            app.get('/api/appData', (req, res) => {
                    res.json({
                        errno: 0,
                        data: appData
                    }) //接口返回json数据，上面配置的数据appData就赋值给data请求后调用
                }),
                app.get('/api/seller', (req, res) => {
                    res.json({
                        // 这里是你的json内容
                        errno: 0,
                        data: seller
                    })
                }),
                app.get('/api/goods', (req, res) => {
                    res.json({
                        // 这里是你的json内容
                        errno: 0,
                        data: goods
                    })
                }),
                app.get('/api/ratings', (req, res) => {
                    res.json({
                        // 这里是你的json内容
                        errno: 0,
                        data: ratings
                    })
                })
        },
        proxy: 'http://localhost:8080'
    }
}
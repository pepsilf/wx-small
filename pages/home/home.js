//home.js
//获取应用实例
const app = getApp()
const utils = require("../../utils/util");

Page({
    data: {
        imgUrls:[],
        filmListIng:[],
        filmListSoon:[]
    },
    onReady(){
        //获取轮播图片
        let bannerUrl="https://m.maizuo.com/v4/api/billboard/home"
        let bannerData={"__t":1532398799119}
        this.getData(bannerUrl,bannerData,this.getBanner);

        //获取正在热映影片
        let filmsIngUrl="https://m.maizuo.com/v4/api/film/now-playing"
        let filmsIngData={"__t":1532431672438,"count":5,"page":1}
        this.getData(filmsIngUrl,filmsIngData,this.getFilmsIng);

        //获取即将上映影片
        let filmsSoonUrl="https://m.maizuo.com/v4/api/film/coming-soon"
        let filmsSoonData={"__t":1532431672450,"count":5,"page":1}
        this.getData(filmsSoonUrl,filmsSoonData,this.getFilmsSoon);
    },
    //请求数据函数
    getData(url,data,success){ //请求地址/请求参数/回调函数
        wx.request({
            url,
            data,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success,
        })
    },
    //获取轮播图片
    getBanner(res){
        this.setData({
            imgUrls:[...res.data.data.billboards]
        })
    },
    //获取正在热映影片
    getFilmsIng(res){
        //时间戳转换
        res.data.data.films.map(item=>{
            item.premiereAt=utils.formatTime(new Date(item.premiereAt))
            return item
        })
        this.setData({
            filmListIng:[...res.data.data.films]
        })
    },
    //获取即将上映影片
    getFilmsSoon(res){
        //时间戳转换
        res.data.data.films.map(item=>{
            item.premiereAt=utils.formatTime(new Date(item.premiereAt))
            return item
        })
        this.setData({
            filmListSoon:[...res.data.data.films]
        })
    },
    //跳转至更多影片页面
    onclick(e){
        wx.reLaunch({
            url: '../film/film?id='+e.target.id
        })
    },
    //跳转详情页
    getDetails(e){
        wx.reLaunch({
        url: '../cinema/cinema?id='+e.currentTarget.dataset.id
        })
    }
})

//cinema.js
//获取应用实例
const app = getApp()
const utils = require("../../utils/util");

Page({
  data: {
   film:{},
   id:4272,
  },
  onLoad(option){
    //获取路由传递的参数,初始化filmType类型
    if(option.id){
      this.setData({
        id:option.id,
      })
    }
  },
  //https://m.maizuo.com/v4/api/film/4272?__t=1532498453301
  onReady(){
    //获取影片数据
    let filmUrl="https://m.maizuo.com/v4/api/film/"+this.data.id
    let filmData={"__t":1532498453301}
    this.getData(filmUrl,filmData,this.getFilm);
  },
  //请求数据函数
  getData(url,data,success){ //请求地址/请求参数/回调函数
    wx.request({
        url,
        data,
        header: {
            'content-type': 'application/json' //默认值
        },
        success,
    })
  },
  //获取影片回调函数
  getFilm(res){
    //时间戳转换
    let data=res.data.data.film
    res.data.data.film.premiereAt=utils.formatTime(new Date(data.premiereAt))
    this.setData({
      film:res.data.data.film
    })
  },
})

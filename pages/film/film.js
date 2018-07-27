//film.js
//获取应用实例
const app = getApp()
const utils = require("../../utils/util");
Page({
  data: {
    filmType:"now-playing",
    filmsList:[],
    page:1,
    flage:true
  },
  onLoad(option){
    //获取路由传递的参数,初始化filmType类型
    if(option.id){
      this.setData({
        filmType:option.id 
      })
    }
  },
  onReady(){
    //获取影片数据
    let filmsUrl="https://m.maizuo.com/v4/api/film/"+this.data.filmType
    let filmsData={"page":1,"count":7}
    this.getData(filmsUrl,filmsData,this.getFilms);
  },
  //影片类型切换
  switchTab(e){
    let newType=e.target.dataset.type
    this.setData({
      filmType:newType,
      page:1,
      flage:true,
    })
    //切换类型重新获取数据
    let filmsUrl="https://m.maizuo.com/v4/api/film/"+this.data.filmType
    let filmsData={"page":1,"count":7}
    this.getData(filmsUrl,filmsData,this.getFilms);
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
  getFilms(res){
    //时间戳转换
    res.data.data.films.map(item=>{
      item.premiereAt=utils.formatTime(new Date(item.premiereAt))
      return item
    })
    this.setData({
      filmsList:[...res.data.data.films]
    })
  },

  //获取更多影片数据
  getMore(){
    if(this.data.flage){
      this.setData({
        page:++this.data.page
      })
      let filmsUrl="https://m.maizuo.com/v4/api/film/"+this.data.filmType
      let filmsData={"page":this.data.page,"count":7}
      this.getData(filmsUrl,filmsData,this.getMoreFilms);
    }
  },
  //获取更多影片回调函数
  getMoreFilms(res){
    if(res.data.data.films.length<7){
      this.setData({
        flage:false
      })
    }
    //时间戳转换
    res.data.data.films.map(item=>{
      item.premiereAt=utils.formatTime(new Date(item.premiereAt))
      return item
    })
    this.setData({
      filmsList:[...this.data.filmsList,...res.data.data.films]
    })
  },
  //跳转详情页
  getDetails(e){
    wx.reLaunch({
      url: '../cinema/cinema?id='+e.currentTarget.dataset.id
    })
  }
})

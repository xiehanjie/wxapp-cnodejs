//index.js
//获取应用实例
const tabs = [
    {title: '全部', value: 'all'},
    {title: '精华', value: 'good'},
    {title: '分享', value: 'share'},
    {title: '问答', value: 'ask'},
    {title: '招聘', value: 'job'},
]
const app = getApp()
Page({
    data: {
        tabs: tabs,
        type: 0, //tab下标
        value: 'all', //tab值
        list: [],
        page: 1,
        switch: 0, //下拉刷新开关
    },
    onLoad() {
        //初始化数据
        this.list()
    },
    onHide(){
        //清除跳转时的loading
        wx.hideLoading()
    },
    //组件选择卡切换事件
    tabs(e){
        this.setData({
            type: e.detail.target.dataset.type, //主题分类下标
            value: e.detail.target.dataset.tab //主题分类主键
        })
        this.list()
    },
    //获取列表数据
    list(page = 1){
        console.log(page)
        this.setData({
            switch: 0
        })
        const data = { tab: this.data.value, page: page, limit: 10 }
        wx.showLoading({ title: '加载中...' });
        wx.request({
            url: 'https://cnodejs.org/api/v1/topics',
            type: 'get',
            data: data,
            success: res => {
                wx.hideLoading()
                const list = res.data.data;
                //重置时间格式
                list && list.map(data => {
                    data['time'] = `
                        ${data.last_reply_at.split("T")[0]} 
                        ${data.last_reply_at.split("T")[1].split(".")[0]}
                    `
                })
                list && this.setData({
                    //不是分页set数据，分页concat数据
                    list: page == 1 ? list : this.data.list.concat(list) ,
                    switch: 1,
                    page: page
                })
            }
        }) 
    },
    //
    detail(e){
        //跳转详情页
        //垃圾小程序跳转有延迟 加个loading防止跳转期间点击其他导致报错
        wx.showLoading({ title: '加载中...' });
        wx.navigateTo({
            url: `../detail/index?id=${e.detail.currentTarget.dataset.num}`
        })
    },
    //下拉加载更多
    scroll(){
        const page = this.data.page + 1
        this.data.switch > 0 && this.list(page)
    }
})
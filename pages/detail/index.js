import Towxml from '../towxml/main.js';
Page({
    data: {
        data: [],
        md: {},
        TopSwitch: 'none'
    },
    onLoad(props) {
        this.detail(props.id)
    },
    onReady(){
        wx.hideLoading();
    },
    onPageScroll(e) {
        e.scrollTop > 200 ? this.setData({ TopSwitch: 'show' }) : this.setData({ TopSwitch: 'none' })
    },
    topbtn(){
        wx.pageScrollTo({
            scrollTop: 0
        })
    },
    towxml: new Towxml(),
    detail(id){
        wx.showLoading({ title: '加载中...' });
        wx.request({
            url: `https://cnodejs.org/api/v1/topic/${id}`,
            type: 'get',
            data: { mdrender : false},
            success: res => {

                res.data && (res.data.data['time'] = `
                    ${res.data.data.create_at.split("T")[0]}
                `)

                res.data && 
                res.data.data.replies.length > 0 && 
                res.data.data.replies.map(i => {
                    i.create_at = `
                        ${i.create_at.split("T")[0]} 
                        ${i.create_at.split("T")[1].split(".")[0]}
                    `
                    i.content = this.towxml.toJson(i.content, 'markdown');
                })

                let html = this.towxml.toJson(res.data.data.content, 'markdown');

                res.data && this.setData({
                    data: res.data.data,
                    md: html
                })
            },
            fail: res => {
                wx.hideLoading();
            }
        }) 
    }
})
// pages/component/List/index.js
Component({
    ready(){
        
    },
    properties: {
        list: {
            type: Array,
            value: []
        }
    },
    
    data: {
        TopSwitch: 'none',
        top: null
    },
    methods: {
        btn: function (e) {
            this.triggerEvent('btn', e)//点击选择主题数据传到父组件
        },
        scroll: function(e){
            this.triggerEvent('scroll', e)
        },
        top(e) {
            e.detail.scrollTop > 100 ? 
            this.setData({ TopSwitch: 'block' }) :
            this.setData({ TopSwitch: 'none' })
        },
        topbtn(){
            console.log(1)
            this.setData({
                top: 0
            })
        }
    }
})

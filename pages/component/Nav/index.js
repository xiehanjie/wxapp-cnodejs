Component({
    properties: {
        //获取父组件传递的数据
        type: {
            type: String,
            value: '0'
        },
        tabs: {
            type: Array,
            value: []
        }
    },
    methods: {
        btn: function(e){
            this.triggerEvent('btn', e)//点击选择主题数据传到父组件
        }
    }
})

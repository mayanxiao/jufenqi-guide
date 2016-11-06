<template>
<div class="content">
  <div class="order" v-for="order in zcList" v-tap="viewDetail('zc',order.orderNo)">
    <img :src="order.customerImage">
    <div class="tel" onclick="location.href='tel:{{order.customerMobile}}'">{{order.customerMobile}}</div>
    <div class="name">{{order.customerName}}</div>
    <div class="status">{{zcStatusList[order.status].name}}</div>
</div>
<div v-if="zcList.length==0">
    <div class="no-data"><img src="no-data.png"><span>暂无订单</span></div>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
try{
  axios.defaults.headers.common['x-user-token'] = JSON.parse(localStorage.getItem("user")).token
}catch(e){
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
    data() {
        return {
            index: 0,
            zcStatusList: [{
              status: 0,
              name: "订单已删除"
            }, {
              status: 1,
              name: "已预约"
            }, {
              status: 2,
              name: "待确认"
            }, {
              status: 3,
              name: "待付款"
            }, {
              status: 4,
              name: "待收货"
            }, {
              status: 5,
              name: "已收货"
            }, {
              status: 6,
              name: "退款中"
            }, {
              status: 7,
              name: "已退款"
            }, {
              status: 8,
              name: "已取消"
            }],
            zcList: [],
        }
    },
    components: {
    },
    ready() {
      axios.get(`${Lib.C.mOrderApi}materialSubOrders`, {
        params: {
          filter: `guideId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:[1,2]`
        }
      }).then((res) => {
        res.data.data.map((e) => {
          this.zcList.push(e)
        })
      }).catch((res) => {
        alert("获取订单失败，请稍候再试QAQ")
      })
    },
    methods: {
        getTime(timeStamp) {
            var d = new Date(timeStamp*1000);
            var Y = d.getFullYear() + '-';
            var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
            var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
            return Y + M + D
        },
        viewDetail(type, orderNo) {
            eval(`window.location.href='${type}-order.html?orderNo=${orderNo}'`)
        }
    }
}
</script>

<style>
html {
    height: 100%;
}

body {
    background-color: #eee;
    height: 100%;
}
</style>
<style scoped lang="less">
.content {
    padding-bottom: 45px;
}
.order {
    width: calc(~"100% - 15px");
    height: 80px;
    background-color: #fff;
    padding-left: 15px;
    position: relative;
    border-bottom: 1px solid #eee;
    img{
      position: absolute;
      top:10px;
      left:15px;
      width: 60px;
      height: 60px;
    }
    .status{
      position: absolute;
      font-size: 12px;
      color:#393939;
      bottom:10px;
      left: 85px;
    }
    .name{
      position: absolute;
      font-size: 12px;
      color:#393939;
      top:10px;
      left:86px;
    }
    .tel{
      position: absolute;
      right: 15px;
      top: 0;
      height: 80px;
      line-height: 80px;
      color:#3BA794;
    }
}
.no-data {
    position: relative;
    width: 100%;
    img {
        position: absolute;
        top: 220px;
        left: calc( ~"50% - 35.5px" );
        height: 71px;
        width: 71px;
    }
    span {
        display: block;
        position: absolute;
        width: 100%;
        height: 16px;
        font-size: 16px;
        line-height: 16px;
        left: 0;
        top: 307px;
        color: #DADADA;
        text-align: center;
    }
}
</style>

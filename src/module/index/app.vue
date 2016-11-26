<template>
<div class="content">
    <j-order-block v-for="order in zcList" v-tap="viewDetail('zc',order.orderNo)" :img="order.customerImage" :name="order.customerName" :tel="order.customerMobile" :status="Status.zc[order.status].name"></j-order-block>
    <no-data v-if="zcList.length==0"></no-data>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import JOrderBlock from 'common/components/j-order-block'
import Status from 'common/status'
import NoData from 'common/components/no-data'
try {
    axios.defaults.headers.common['x-user-token'] = JSON.parse(localStorage.getItem("user")).token
} catch (e) {
    localStorage.clear()
    window.location.href = `./wxAuth.html?url=index.html`
}
export default {
    data() {
        return {
            index: 0,
            zcList: [],
            Status
        }
    },
    components: {
        JOrderBlock,
        NoData
    },
    ready() {
        axios.get(`${Lib.C.mOrderApi}materialSubOrders`, {
            params: {
                filter: `guideId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:1`,
                sort: "createdAt,desc"
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
            var d = new Date(timeStamp * 1000);
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
</style>

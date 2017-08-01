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
    padding-top: 45px;
}
header {
    position: fixed;
    height: 44px;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 30;
}
.tab-active {
    color: #88C929 !important;
    border-color: #88C929 !important;
}
.tab {
    font-size: 12px!important;
}
.operate {
    height: 30px;
    width: calc(~"100% - 30px");
    padding: 7px 15px;
    background-color: #fff;
    text-align: right;
    margin-bottom: 5px;
    div {
        display: inline-block;
        height: 30px;
        width: 70px;
        line-height: 30px;
        text-align: center;
        color: #999;
        border: 1px solid #999;
        border-radius: 5px;
        font-size: 12px;
        margin-left: 20px;
    }
}
.none {
    height: 0!important;
    padding: 0 !important;
}

// 合订单的商店

.stores {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    .store {
        position: relative;
        height: 55px;
        width: calc(~"100% - 15px");
        margin-left: 15px;
        border-bottom: 1px solid #eee;
        .store-name {
            position: absolute;
            left: 0;
            top: 0;
            height: 55px;
            line-height: 55px;
            font-size: 12px;
            color: #393939;
        }
        .store-amount {
            position: absolute;
            right: 15px;
            top: 0;
            height: 55px;
            line-height: 55px;
            font-size: 12px;
            color: #ec5835;
        }
    }
    .stores-amount {
        height: 30px;
        line-height: 30px;
        padding-right: 15px;
        text-align: right;
        font-size: 12px;
        color: #ec5835;
    }
}

.operate {
    height: 30px;
    width: calc(~"100% - 30px");
    padding: 7px 15px;
    text-align: right;
    .bottom {
        display: inline-block;
        height: 30px;
        width: 70px;
        line-height: 30px;
        text-align: center;
        color: #999;
        border: 1px solid #999;
        border-radius: 5px;
        font-size: 12px;
        margin-left: 20px;
    }
}
</style>

<template>
<div>
    <header>
        <tab active-color='#88C929' :index.sync="index">
            <tab-item class="tab" active-class="tab-active" :selected="index === 0" v-tap="index = 0">已预约</tab-item>
            <tab-item class="tab" active-class="tab-active" :selected="index === 1" v-tap="index = 1">待支付</tab-item>
            <tab-item class="tab" active-class="tab-active" :selected="index === 2" v-tap="index = 2">待确认</tab-item>
            <tab-item class="tab" active-class="tab-active" :selected="index === 3" v-tap="index = 3">待收货</tab-item>
            <!-- <tab-item class="tab" active-class="tab-active" :selected="index === 4" v-tap="index = 4">继续支付</tab-item> -->
        </tab>
    </header>

    <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
        <swiper-item height="100%">
            <div class="tab-swiper vux-center content">
                <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y v-ref:lista>
                    <div>
                        <no-data v-if="list0.length==0"></no-data>
                        <div v-else v-for="order in list0">
                            <j-order-block :img="order.appt.customerImage" :name="order.appt.customerName" :tel="order.appt.customerMobile" :time="getTime(order.appt.createdAt)"></j-order-block>
                            <!-- 在待支付时暂未分单，使用的是appointment -->
                            <div class="stores" style="margin-bottom: 10px;">
                                <div class="store">
                                    <div class="store-name">{{order.storeName}}</div>
                                    <div class="store-amount">{{order.totalAmount|currency '￥' 2}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
        </swiper-item>
        <swiper-item height="100%">
            <div class="tab-swiper vux-center content">
                <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y v-ref:listb>
                    <div>
                        <no-data v-if="list1.length==0"></no-data>
                        <div v-else v-for="order in list1">
                            <j-order-block :img="order.appt.customerImage" :name="order.appt.customerName" :tel="order.appt.customerMobile" :time="getTime(order.appt.createdAt)"></j-order-block>
                            <!-- 在待支付时暂未分单，使用的是appointment -->
                            <div class="stores">
                                <div class="store" v-for="store in order.orders">
                                    <div class="store-name">{{store.storeName}}</div>
                                    <div class="store-amount">{{store.totalAmount|currency '￥' 2}}</div>
                                </div>
                                <div class="stores-amount">总计:{{order.totalAmount|currency '' 2}}</div>
                            </div>
                            <div class="operate" v-if="order.appt.payMethod == 1">
                                <div class="bottom" v-tap="(this.tempOrderNo = order.orderNo,this.showConfirm.pay = true)">确认付款</div>
                            </div>
                            <div class="operate" v-if="order.appt.payMethod == 2">
                                <div class="bottom" v-tap="insPay(order.orderNo,order.customerId)">已付款</div>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
        </swiper-item>
        <swiper-item height="100%">
            <div class="tab-swiper vux-center content">
                <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y v-ref:listc>
                    <div>
                        <no-data v-if="list2.length==0"></no-data>
                        <div v-else v-for="order in list2">
                            <j-order-block :img="order.appt.customerImage" :name="order.appt.customerName" :tel="order.appt.customerMobile" :time="getTime(order.createdAt)"></j-order-block>
                            <!-- 在待支付时暂未分单，使用的是appointment -->
                            <div class="stores" style="margin-bottom: 10px;">
                                <div class="store">
                                    <div class="store-name">{{order.storeName}}</div>
                                    <div class="store-amount">{{order.totalAmount|currency '￥' 2}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
        </swiper-item>
        <swiper-item height="100%">
            <div class="tab-swiper vux-center content">
                <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y v-ref:listd>
                    <div>
                        <no-data v-if="list3.length==0"></no-data>
                        <div v-else v-for="order in list3">
                            <j-order-block :img="order.appt.customerImage" :name="order.appt.customerName" :tel="order.appt.customerMobile" :time="getTime(order.createdAt)"></j-order-block>
                            <!-- 在待支付时暂未分单，使用的是appointment -->
                            <div class="stores" style="margin-bottom: 10px;">
                                <div class="store">
                                    <div class="store-name">{{order.storeName}}</div>
                                    <div class="store-amount">{{order.totalAmount|currency '￥' 2}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
        </swiper-item>
 <!--        <swiper-item height="100%">
            <div class="tab-swiper vux-center content">
                <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y v-ref:liste>
                    <div>
                        <no-data v-if="list4.length==0"></no-data>
                        <div v-else v-for="order in list4">
                            <j-order-block :img="order.appt.customerImage" :name="order.appt.customerName" :tel="order.appt.customerMobile" :time="getTime(order.createdAt)"></j-order-block>
                            在待支付时暂未分单，使用的是appointment
                            <div class="stores" style="margin-bottom: 10px;">
                                <div class="store">
                                    <div class="store-name">{{order.storeName}}</div>
                                    <div class="store-amount">{{order.totalAmount|currency '￥' 2}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
        </swiper-item> -->
    </swiper>
    <confirm :show.sync="showConfirm.pay" title="" confirm-text="是" cancel-text="否" @on-confirm="pay(tempOrderNo)">
        <p style="text-align:center;">是否确认用户已支付?</p>
    </confirm>
</div>
<loading :show="showLoading" text="正在加载..."></loading>
<popup-picker title="分期数" :data="insNumberList" :show.sync="showInsNumberPicker" :columns="1" :show-cell="false" :value.sync="insNumberSelect" @on-hide="onHideInsSelect" show-name v-ref:insNumber></popup-picker>

<j-footer></j-footer>
</template>

<script>
import Lib from 'assets/Lib.js'
import {
    Tab,
    TabItem
} from 'vux-components/tab'
import JFooter from 'components/JFooter'
import Confirm from 'vux-components/confirm'
import Swiper from 'vux-components/swiper'
import SwiperItem from 'vux-components/swiper-item'
import Scroller from 'vux-components/scroller'
import JOrderBlock from 'common/components/j-order-block'
import Loading from 'vux-components/loading'
import NoData from 'common/components/no-data'
import axios from 'axios'
import PopupPicker from 'vux-components/popup-picker'
import Status from 'common/status'

try {

    // let now = Number(new Date().getTime())
    // if (Number(JSON.parse(localStorage.getItem('user')).expiredAt) < now) {
    //     alert('超时！')
    //     localStorage.removeItem('user')
    //     location.href = './wxAuth.html?url=' + encodeURIComponent(location.href)
    // }

    axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('user')).tokenType + ' ' + JSON.parse(localStorage.getItem('user')).token
    // window.location.href = `./wxAuth.html?url=index.html`
} catch (e) {
   alert('失败！')
   localStorage.clear()
   window.location.href = `./wxAuth.html?url=index.html`

}
export default {
    data() {
        return {
            index: 0,
            list0: [],
            list1: [],
            list2: [],
            list3: [],
            list4: [],
            Status,
            tempOrderNo: null,
            showConfirm: {
                pay: false
            },
            showLoading: false,
            showInsNumberPicker: false,
            insNumberList: [],
            insNumberSelect: [],
            tempOrderNo: null
        }
    },
    components: {
        Tab,
        TabItem,
        Swiper,
        Loading,
        SwiperItem,
        Scroller,
        JOrderBlock,
        PopupPicker,
        JFooter,
        NoData,
        Confirm
    },
    ready() {
        let suc_count = 0
        this.index = 1
        axios.get(`${Lib.C.mOrderApi}materialOrders`, {
            params: {
                filter: `guideId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:[1,6]`,
                sort: 'createdAt,DESC',
                size: 100
            }
        }).then((res) => {
            console.log(res)
            res.data.data.map((order) => {
                switch (order.status) {
                    case 1:
                        this.list0.push(order)
                        break;
                    case 2:
                        this.list4.push(order)
                        break;
                    case 3:
                        this.list1.push(order)
                        break;
                    case 4:
                        this.list2.push(order)
                        break;
                    case 5:
                        this.list3.push(order)
                        break;
                    case 6:
                        this.list4.push(order)
                        break;
                    default:
                        break;
                }
            })
            this.$nextTick(() => {
                this.$refs.lista.reset()
                this.$refs.listb.reset()
                this.$refs.listc.reset()
                this.$refs.listd.reset()
                // this.$refs.liste.reset()
            })
        }).catch((err) => {
            throw err
            console.log(err)
        })
    },
    methods: {
        getScreenHeight() {
            return document.body.clientHeight
        },
        getTime(timeStamp) {
            var d = new Date(timeStamp * 1000);
            var Y = d.getFullYear() + '-';
            var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
            var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
            return Y + M + D
        },
        viewDetail(orderNo) {
            window.location.href = `zc-order.html?orderNo=${orderNo}`
        },
        getStoresAmount(stores) {
            let result = 0
            stores.map((store) => {
                result += store.totalAmount
            })
            return result
        },
        pay(orderNo) {
            this.showLoading = true
            axios.post(`${Lib.C.mOrderApi}materialOrders/${orderNo}/confirmPayment`, {
                params: {}
            }).then((res) => {
                alert('确认收款成功！')
                location.reload()
            }).catch((err) => {
                alert('网络连接失败，请重试')
                this.showLoading = false
                throw err
            })
        },
        insPay(orderNo, customerId) {
            this.showLoading = true
            axios.get(`${Lib.C.loanApi}loan-applications/`, {
                params: {
                    filter: `userId:${customerId}|statusEnum:3`
                }
            }).then((res) => {
                if (res.data.data[0].bankBranchPeriod == null) {
                    axios.get(`${Lib.C.loanApi}bank-branches/${res.data.data[0].bankBranch.id}`, {
                        params: {
                            expand: 'bankBranchPeriods'
                        }
                    }).then((res) => {
                        this.insNumberList = []
                        res.data.data.bankBranchPeriods.map((e) => {
                            this.insNumberList.push({
                                name: e.name,
                                value: String(e.id),
                            })
                        })
                        this.tempOrderNo = orderNo
                        this.showInsNumberPicker = true
                        this.showLoading = false
                        console.log(this.insNumberList, this.showInsNumberPicker)
                    }).catch((err) => {
                        alert('网络连接失败，请重试...')
                        this.showLoading = false
                        throw err
                    })
                } else {
                    let bbpId = res.data.data[0].bankBranchPeriod.id
                    axios.post(`${Lib.C.mOrderApi}materialOrders/${orderNo}/confirmPayment?bankBranchPeriodId=${bbpId}`).then((res) => {
                        alert('确认分期成功！')
                        location.reload()
                    }).catch((err) => {
                        alert('网络连接失败，请重试。。。')
                        this.showLoading = false
                        throw err
                    })
                }
            }).catch((err) => {
                alert('网络连接失败，请重试')
                this.showLoading = false
                throw err
            })
            // axios.post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${JSON.parse(localStorage.getItem('user')).token}`,{}).then((res) => {}).catch((err) => {})

        },
        onHideInsSelect() {
            if (this.insNumberSelect.length) {
                axios.post(`${Lib.C.mOrderApi}materialOrders/${this.tempOrderNo}/confirmPayment?bankBranchPeriodId=${this.insNumberSelect[0]}`).then((res) => {
                    alert('确认分期成功！')
                    location.reload()
                }).catch((err) => {
                    alert('网络连接失败，请重试')
                    this.showLoading = false
                    throw err
                })
            }
        }
    }
}
</script>

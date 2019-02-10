<template>
	<div>
        <div>
            <Message ref="pushMessage1" :parentComponent="parentComponent" @fatherMethod="handlerPush"></Message>
        </div> 
		<div class="message-wrap">
			<div class="top">
				<span class="left">
					共有留言<span class="fontOrange">{{messageCount}}</span>条
					<Icon type="ios-chatboxes-outline" />
				</span>
				<span class="right pointer radius5" :class="changeActive==0?'organe':''" @click="changeMessage(0)">
					最新留言
				</span>
				<span class="right pointer radius5" :class="changeActive==1?'organe':''" @click="changeMessage(1)">
					最热留言
				</span>
			</div>
			<div class="message-top shadow radius5">
				<div class="zhiding">置顶评论</div>
				<ul class="message">
					<div class="img">
						<span>
							<Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
						</span>
					</div>
					<div class="img-right">
						<div class="user">
							口角
						</div>
						<div class="content eclipes2">
							fdf还是几号放假还是几号放假都是粉红
							色的还是几号放假都是粉红色的还是几号放假都是粉红色的都是粉红色的 发货后付款是发
							还是几号放假都是粉红色的还是几号放假都是粉红色的还是几号放假都是粉红色的
							还是几号放假都是粉红色的还是几号放假都是粉红色的还是几号放假都是粉红色的
						</div>
						<div class="time-agrue">
							<span class="time">2019-02-08 16:39:37</span>
							<span class="zan gost">
								<Icon class="red tubiao pointer" type="md-thumbs-up" /> 23
							</span>
							<span class="pinglun gost">
								<Icon class='tubiao pointer' @click="pinlun1 = !pinlun1;"  type="ios-chatboxes-outline" /> 23
							</span>
							<span class="huifu blue">
								<span v-show="!repy1" class="pointer" @click="repy1 = true;repy2=false;">回复</span>
								<span v-show="repy1" class="pointer" @click="repy1 = false;repy2=false;">取消回复</span>
							</span>
						</div>
						<div v-if='repy1'>
							<Message ref="pushMessage2" :parentComponent="parentComponent" @fatherMethod="handlerPush"></Message>
						</div>
						<div class="bgccc mrt20" v-show='pinlun1'>
							<ul class="message">
								<div class="img">
									<span>
										<Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
									</span>
								</div>
								<div class="img-right">
									<div class="userReply">
										<span class="user">士大夫</span>
										回复
										<span class="user">口角</span>
									</div>
									<div class="contentReply eclipes21">
										fdf还是几号放假还是几号放假都是粉红
										色的还是几号放假都是粉红色的还是几号放假都是粉红色的都是粉红色的 发货后付款是发
										还是几号放假都是粉红色的还是几号放假都是粉红色的还是几号放假都是粉红色的
										还是几号放假都是粉红色的还是几号放假都是粉红色的还是几号放假都是粉红色的
									</div>
									<div class="time-agrue">
										<span class="timeReply">2019-02-08 16:39:37</span>
										<span class="zanReply gost">
											<Icon class="red tubiao pointer" type="md-thumbs-up" /> 23
										</span>
										<span class="huifu blue">
											<span v-show="!repy2" class="pointer" @click="repy2 = true;repy1=false;">回复</span>
											<span v-show="repy2" class="pointer" @click="repy2 = false;repy1=false;">取消回复</span>
										</span>
									</div>
									<div v-if='repy2' class="reply">
										<Message ref="pushMessage3" @fatherMethod="handlerPush" :parentComponent="parentComponent"></Message>
									</div>
								</div>
							</ul>
						</div>
					</div>
				</ul>
			</div>
			<div class="message-bottom shadow radius5">
				12
			</div>
		</div>
	</div>
</template>

<script>
import Message from "@/components/beforeLogin/props/message.vue";
export default {
  name: 'message-board',
  data () {
    return {
		messageCount:3434,
		changeActive:-1,
		repy1:false,
		repy2:false,
		pinlun1:false,
		parentComponent:1,
    }
  },
  watch:{
	repy1: {
		handler: function (val, oldVal) { 
			  // DOM 更新了
			  if(this.repy1 && ! this.repy2){
				  this.parentComponent = 2;
			  }else if(!this.repy1 && this.repy2){
				  this.parentComponent = 3;
			  }else{
				  this.parentComponent = 1;
			  }
	  },
      immediate: true
    },
	repy2: {
		handler: function (val, oldVal) { 
		  if(this.repy1 && ! this.repy2){
			  this.parentComponent = 2;
		  }else if(!this.repy1 && this.repy2){
			  this.parentComponent = 3;
		  }else{
			  this.parentComponent = 1;
		  }
	  },
	  immediate: true
	},
  },
  components: {
	Message
  },
  methods:{
	  //最新最热留言切换
	  changeMessage(num){
		  this.changeActive = num;
	  },
	  //子组件点击发布调用
	  handlerPush(num){
		  if(num == 2){
			  this.push2();
		  }else if(num == 3){
			  this.push3();
		  }else{
			  this.push1();
		  }
	  },
	  //发布留言方法1
	  push1(){
		  alert(1)
	  },
	  //发布留言方法2
	  push2(){
		  alert(2)
	  },
	  //发布留言方法3
	  push3(){
		  alert(3)
	  },
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
    @import "../../assets/css/common.less";
	.message-wrap{
		border-radius: 5px;
		.top{
			height: 50px;
			line-height: 50px;
			padding: 0 10px;
			font-size: 14px;
			.left{
				float: left;
				height: 50px;
				line-height: 50px;
			}
			.right{
				float: right;
				height: 26px;
				border: #ccc 1px solid;
				line-height: 26px;
				text-align: center;
				margin: 14px 10px;
				width: 80px;
				color: #ccc;
				&.organe{
					border: orange 1px solid;
					color: orange;
				}
			}
			.right:hover{
				border: orange 1px solid;
				color: orange;
			}
		}
		.message-top{
			margin-bottom: 20px;
			.zhiding{
				text-align: left;
				padding:10px 0;
				margin: 0 20px;
				font-size: 16px;
				color: orange;
				border-bottom: #ccc 1px dashed;
			}
		}
		.message{
			padding:10px 0;
			margin: 0 20px;
			border-bottom: #ccc 1px dashed;
			display: flex;
			&:last-child{
				border: none;
			}
			.img{
				width: 40px;
				height: 30px;
				line-height: 30px;
				margin-right: 20px;
				flex: none
			}
			.img-right{
				flex: 1;
				text-align: left;
				font-size: 14px;
				.user{
					height:30px;
					line-height: 30px;
					color: orange;
				}
				.userReply{
					height:30px;
					line-height: 30px;
				}
				.content{
					line-height: 25px;
					height: 50px;
				}
				.contentReply{
					line-height: 25px;
					height: 25px;
				}
				.time-agrue{
					margin: 10px 0;
					height: 20px;
					line-height: 20px;
					font-size: 13px;
					.time{
						width: 40%;
					}
					.timeReply{
						width: calc(40% - 40px);
					}
					.timeReply,.zanReply,.time,.zan,.pinglun,.huifu{
						display: inline-block;
						text-align: left;
					}
					.zanReply{
						width: calc(30% + 33px);
					}
					.zan,.pinglun,.huifu{
						width: 15%;
					}
					.red{
						color: orangered;
					}
					.tubiao{
						font-size: 16px;
						vertical-align:text-top;
					}
					.gost{
						color:#ccc;
					}
					.blue{
						color: lightskyblue;
					}
				}
			}
		}
	}
</style>
<style lang="less">
</style>

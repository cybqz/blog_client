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
				<ul class="message" v-for="(item,index) in messageList">
					<div class="img">
						<span>
							<Avatar :src="baseURL+item.userImage" />
						</span>
					</div>
					<div class="img-right">
						<div class="user">
							{{item.userName}}
						</div>
						<div class="content eclipes2">
							{{item.message}}
						</div>
						<div class="time-agrue">
							<span class="time">{{item.createtime | formTime}}</span>
							<span class="zan gost">
								<Icon class=" tubiao pointer" :class="logined?(item.fablous?'gost':'red') :'gost'" type="md-thumbs-up" /> 
								{{item.fablousCount}}
							</span>
							<span class="pinglun gost">
								<Tooltip v-if="!item.commentCount" content="暂无回复消息" placement="bottom">
									<Icon class='tubiao' type="ios-chatboxes-outline" />
								</Tooltip>
								<Icon v-else class='tubiao pointer' @click="showReplyList(item.id)"  type="ios-chatboxes-outline" />
								{{item.commentCount}}
							</span>
							<span class="huifu blue">
								<span v-show="!repy1 || blogId!=item.id" class="pointer" @click="showReply(1,item.id)">回复</span>
								<span v-show="repy1 && blogId==item.id" class="pointer" @click="repy1 = false;repy2=false;">取消回复</span>
							</span>
						</div>
						<div v-if='repy1 && blogId==item.id'>
							<Message ref="pushMessage2" :parentComponent="parentComponent" @fatherMethod="handlerPush"></Message>
						</div>
						<div class="bgccc mrt20" v-show='pinlun1 && blogId==item.id'>
							<ul class="message" v-for="item in replyList">
								<div class="img">
									<span>
										<Avatar :src="baseURL+item.commentUserImage" />
									</span>
								</div>
								<div class="img-right">
									<div class="userReply">
										<span class="user">{{item.commentUserName}}</span>
										回复
										<span class="user">{{item.userName}}</span>
									</div>
									<div class="contentReply eclipes21">
										{{item.commentContaint}}
									</div>
									<div class="time-agrue">
										<span class="timeReply">{{item.commentDate | formTime}}</span>
										<span class="zanReply gost">
											<Icon :class="logined?(item.fablous?'gost':'red') :'gost'" class="red tubiao pointer" type="md-thumbs-up" /> 
											{{item.fablousCount}}
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
		baseURL:'',
		logined:false,
		messageCount:0,
		changeActive:-1,
		repy1:false,
		repy2:false,
		pinlun1:false,
		parentComponent:1,
		messageList:[],
		replyList:[],
		blogId:0,
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
	  //点击回复1展示回复框
	  showReply(blogId){
		  debugger
		  this.repy1 = true;
		  this.repy2=false;
		  this.blogId = blogId;
		  
	  },
	  //点击评论展示回复列表
	  showReplyList(blogId){
		  this.pinlun1 = !this.pinlun1;
		  this.blogId = blogId;
		  this.getReplyList();
	  },
	  //回复列表数据
	  getReplyList(){
		  let baseURL = this.$axios.defaults.baseURL;
		  let url = baseURL + "commentController/getList";
		  let params = {
		  			  blogId:this.blogId
		  };
		  this.$axios({method:'post', url:url, params:params})
		  .then((response) => {
		      let data = response.data;
		      if( response.status == 200){
				   this.replyList = data.pageDatas;
				  
		      }else{
		      }
		  }).catch((error) => {
		      console.log(error)
		  });
	  },
	  //留言列表数据
	  getMessageList(){
		  let baseURL = this.$axios.defaults.baseURL;
		  let url = baseURL + "messageController/getList";
		  this.$axios({method:'post', url:url, data:null})
		  .then((response) => {
		      let data = response.data;
		      if( response.status == 200){
				  this.messageList = data.pageDatas;
				  
				  this.messageCount = data.dataCount;
		      }else{
		      }
		  }).catch((error) => {
		      console.log(error)
		  });
	  },
	  //子组件点击发布调用
	  handlerPush(num,message){
		  if(num == 2){
			  this.push2(message);
		  }else if(num == 3){
			  this.push3(message);
		  }else{
			  this.push1(message);
		  }
	  },
	  //发布留言方法1
	  push1(message){
		  let baseURL = this.$axios.defaults.baseURL;
		  let url = baseURL + "messageController/publish";
		  let params = {
			 message:message
		  };
		  this.$axios({method:'post', url:url, params:params})
		  .then((response) => {
		      let data = response.data;
		      if( response.status == 200){
				  this.$Message.success(response.data.msg);
		      }else{
		          this.$Message.error(response.data.msg);
		      }
		  }).catch((error) => {
		      console.log(error)
		  });
	  },
	  //发布留言方法2
	  push2(message){
		  console.log(this.$refs.pushMessage2)
		  let baseURL = this.$axios.defaults.baseURL;
		  let url = baseURL + "messageController/reply";
		  let params = {
			  commentContaint:message,
			  blogId:this.blogId
		  };
		  this.$axios({method:'post', url:url, params:params})
		  .then((response) => {
		      let data = response.data;
		      if( response.status == 200){
		  		  this.$Message.success(response.data.msg);
				  this.getReplyList();
		      }else{
		          this.$Message.error(response.data.msg);
		      }
		  }).catch((error) => {
		      console.log(error)
		  });
	  },
	  //发布留言方法3
	  push3(message){
		  alert(3)
	  },
	  
  },
  filters:{
	  //时间转换
	  formTime(shijianchuo){
		let time = new Date(shijianchuo);
		let y = time.getFullYear();
		let m = time.getMonth()+1;
		let d = time.getDate();
		let h = time.getHours();
		let mm = time.getMinutes();
		let s = time.getSeconds();
		return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
	  },
  },
  beforeMount(){
      this.logined= !localStorage.getItem('user')?false:true;
	  this.baseURL = this.$axios.defaults.baseURL;
  },
  mounted() {
	  this.getMessageList();
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

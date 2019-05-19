<template>
	<div class="containt">
		<div class="left">
			<!-- 导航模块组件 -->
			<Interest v-if='$route.path == "/home/beforeLogin/interesting"'></Interest>
			<Read v-if='$route.path == "/home/beforeLogin/reading"'></Read>
			<Learn v-if='$route.path == "/home/beforeLogin/learning"'></Learn>
			<MessageBoard v-if='$route.path == "/home/beforeLogin/messageBoard"'></MessageBoard>
			
		</div>
		<div class="right shadow">
			<!-- 右侧简介部分 -->
			<div  class="user">
				<div class="touxiang">
					<span>
						<img :src="this.$axios.defaults.baseURL+user.image" >
					</span>
				</div>
				<div v-if="user" class="about">
					<div class="name">{{user.name}}</div>
					<div v-if="user.introduce" class="introduce" @click="changeIntroduce(1)">
						{{user.introduce}} 
						<Icon class='ml10' type="ios-create-outline" />
					</div>
					<div v-else class="introduce" @click="changeIntroduce(2)">
						文字，让我们更懂你让我们更懂你让我们更懂你让我们更懂你...
						<Icon class='ml10' type="ios-nutrition" />
					</div>
				</div>
				<div v-else class="about">
					456
				</div>
				<div class="blog">
					
				</div>
			</div>
			
		</div>
		<div>
			<Modal v-model="introduceModel" width="550" :title="introduce">
			    <div style="text-align:center">
					<Input class="textarea shadow" v-model="introduceMessage" type="textarea" placeholder="介绍一下吧.........."
					       :autosize="{minRows: 2,maxRows: 2}" />
			    </div>
			    <div slot="footer" style="text-align:center;">
			        <Button style="margin:0 20px;" @click="introduceCancel">取消</Button>
			        <Button type="primary" style="margin:0 20px;" @click="introduceConfirm">发布</Button>
			    </div>
			</Modal>
		</div>
	</div>
</template>

<script>
import Interest from "@/components/beforeLogin/interesting.vue";
import Read from "@/components/beforeLogin/reading.vue";
import Learn from "@/components/beforeLogin/learning.vue";
import MessageBoard from "@/components/beforeLogin/message-board.vue";
export default {
  name: 'beforeLogin',
  data () {
    return {
		user:{},
		introduceModel:false,
		introduce:'添加简介',
		introduceMessage:'',
    }
  },
  watch:{

  },
  methods:{
		changeIntroduce(num){
			this.Introduce = num == 1?'添加简介':'编辑简介';
			this.introduceModel = true;
		},
		introduceCancel(){
			this.introduceMessage = this.user.introduce;
			this.introduceModel = false;
		},
		introduceConfirm(){
			this.introduceModel = false;
		},
		test(){
			let url = this.$axios.defaults.baseURL + "messageController/reply";
			let param = {
				blogId:'03a4fd08-d2ad-4a36-a079-32469f3d4ecc',
                commentContaint:'CYB&GFJ2018CYB&GFJ2018CYB&GFJ2018CYB&GFJ2018CYB&GFJ2018CYB&GFJ2018CYB&GFJ2018CYB&GFJ2018'
			};
			this.$axios.get(url, {params: param})
			.then((response) => {
					if( response.status == 200){
                        this.$Message.info(response.data.msg);
					}
			}).catch((error) => {
					console.log(error)
			})
		},
  },
  created() {
  	this.user = JSON.parse(localStorage.getItem('user'));
	debugger
	if(this.user){
		if(this.user.introduce){
			this.introduceMessage = this.user.introduce;
		}else{
			this.introduceMessage = '';
		}
	}else{
		this.user = {image:'headportrait/boy.png'};
	}
  },
  components: {
	Interest,
	Read,
	Learn,
	MessageBoard
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
	@import "../../assets/css/common.less";
	.containt{
		width: 100%;
		display: flex;
		.left{
			flex: 1;
			margin-right:360px ;
		}
		.right{
			margin-left: 30px;
			flex: none;
			width: 310px;
			height: 500px;
			position: fixed;
			top: 80px;
			right: 10%;
		}
	}
	.user{
		.touxiang{
			padding: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			span{
				display: flex;
				width: 90px;
				height: 90px;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				box-shadow: 0 0 3px 0 #ccc;
				img{
					width: 80px;
					height: 80px;
					border-radius: 50%;
				}
			}
		}
		.about{
			text-align: center;
			.name{
				font-size: 20px;
				color: orange;
			}
			.introduce{
				padding: 20px 40px;
				font-size: 14px;
				&:hover{
					color: orange;
					cursor: pointer;
				}
			}
		}
	}
</style>

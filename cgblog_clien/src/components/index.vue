<template>
	<div class="containt">
		<div class="left">
			<!-- 导航模块组件 -->
			<Interest v-if='$route.path == "/index/interesting"'></Interest>
			<Read v-if='$route.path == "/index/reading"'></Read>
			<Learn v-if='$route.path == "/index/learning"'></Learn>
			<MessageBoard v-if='$route.path == "/index/messageBoard"'></MessageBoard>

		</div>
		<div class="right shadow">
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
				<div class="blog"></div>
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
import Interest from "@/components/interesting.vue";
import Read from "@/components/reading.vue";
import Learn from "@/components/learning.vue";
import MessageBoard from "@/components/messageBoard";
export default {
  name: 'index',
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
			if(this.user != null && this.user.name){
				this.Introduce = num == 1?'添加简介':'编辑简介';
				this.introduceModel = true;
			}else{
				this.$Message.error('登陆哟，等你哟！');
			}
		},
		introduceCancel(){
			this.introduceMessage = this.user.introduce;
			this.introduceModel = false;
		},
		introduceConfirm(){
			let url = this.$axios.defaults.baseURL + "userController/updateIntroduce";
			this.user.introduce = this.introduceMessage;
			let param = this.user;
			this.$axios({method:'post', url:url, data:this.$qs.stringify(param)})
			.then((response) => {
				if( response.status == 200){
					let data = response.data;
					if(data.validate){
						this.introduceModel = false;
						this.$Message.success(data.msg);
						localStorage.setItem('user',JSON.stringify(this.user));
					}else{
						this.$Message.error(data.msg);
					}
				}else{
					this.$Message.error('Fail!');
				}
			}).catch((error) => {
					console.log(error);
			});
		}
  },
  created() {
  	this.user = JSON.parse(localStorage.getItem('user'));
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
	@import "../assets/css/common.less";
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

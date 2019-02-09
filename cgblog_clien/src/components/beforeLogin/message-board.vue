<template>
	<div>
        <div>
            <Message></Message>
        </div> 
		<div class="message-wrap">
			<div class="top">
				<span class="left">
					共有留言<span class="fontOrange">{{messageCount}}</span>条
					<Icon type="ios-chatboxes-outline" />
					<Icon type="md-thumbs-up" />
					<Icon type="ios-thumbs-up-outline" />
				</span>
				<span class="right pointer radius5" :class="changeActive==0?'organe':''" @click="changeMessage(0)">
					最新留言
				</span>
				<span class="right pointer radius5" :class="changeActive==1?'organe':''" @click="changeMessage(1)">
					最热留言
				</span>
			</div>
			<div class="message-top shadow radius5">
				置顶评论 
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
    }
  },
  watch:{
  },
  components: {
	Message
  },
  methods:{
	  changeMessage(num){
		  this.changeActive = num;
	  },
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
    @import "../../assets/css/common.less";
	.message-wrap{
		margin-top: 30px;
		border-radius: 5px;
		.top{
			height: 50px;
			line-height: 50px;
			padding: 0 20px;
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
			height: 200px;
		}
	}
</style>
<style lang="less">
</style>

<template>
	<div class="containt">
		<div class="left">
			<!-- 导航模块组件 -->
			<Interest v-if='$route.query.tabId == 0'></Interest>
			<Read v-if='$route.query.tabId == 1'></Read>
			<Learn v-if='$route.query.tabId == 2'></Learn>
			<MessageBoard v-if='$route.query.tabId == 3'></MessageBoard>
			
		</div>
		<div class="right shadow">
			<!-- 右侧简介部分 -->
			<span @click="test()" style="display: inline-block;width: 40px;height:30px; background: skyblue;cursor: pointer;">按钮</span>
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
    }
  },
  watch:{
// 	    fromTab: {
// 		  handler: function (val, oldVal) { 
// 			  this.fromTab = val;
// 		  },
// 		  immediate: true
// 		},
  },
  methods:{
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
  components: {
	Interest,
	Read,
	Learn,
	MessageBoard
  },
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
</style>

<template>
	<div class="containt">
		<div class="left">
			<!-- 导航模块组件 -->
			<Interest v-if='$route.path == "/index/interesting"'></Interest>
			<Read v-if='$route.path == "/index/reading"'></Read>
			<Learn v-if='$route.path == "/index/learning"'></Learn>
			<MessageBoard v-if='$route.path == "/index/messageBoard"'></MessageBoard>

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
		
    }
  },
  watch:{

  },
  methods:{
		
  },
  created() {
  	
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
	}
</style>

<template>
	<div>
        <div>
            <Message></Message>
        </div> 
	</div>
</template>

<script>
import Message from "@/components/beforeLogin/props/message.vue";
export default {
  name: 'message-board',
  data () {
    return {
    }
  },
  watch:{
  },
  components: {
	Message
  },
  methods:{
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
    @import "../../assets/css/common.less";
</style>
<style lang="less">
</style>

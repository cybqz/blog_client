<template>
	<div class="user_center">
        <Form :model="userInfo" label-position="right" :label-width="100">
            <FormItem label="昵称">
                <Input v-model="userInfo.userNam "></Input>
            </FormItem>
            <FormItem label="姓名">
                <Input v-model="userInfo.name"></Input>
            </FormItem>
            <FormItem label="邮箱">
                <Input v-model="userInfo.email"></Input>
            </FormItem>
            <FormItem label="联系方式">
                <Input v-model="userInfo.phone"></Input>
            </FormItem>
            <FormItem label="头像">
                <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
            </FormItem>
            <FormItem>
            <Button type="primary">修改</Button>
            <Button style="margin-left: 8px">清空</Button>
        </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
  name: 'UserCenter',
  data () {
    return {
        userInfo:{
            name:'',
            email:'',
            phone:'',
            image:'',
            userName:''
        }
    }
  },
  watch:{
  },
  methods:{
  },
  beforeMount(){
      var user = JSON.parse(localStorage.getItem('user'));
      for(var i in  this.userInfo){
          this.userInfo[i] = user[i];
      }
      debugger
  }
}
</script>

<style scoped lang="less">
	@import "../assets/css/common.less";
	.user_center{
		width: 100%;
		display: flex;
	}
</style>

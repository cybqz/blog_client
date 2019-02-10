<template>
	<div class="user_center">
        <Form :model="userInfo" label-position="right" :label-width="100">
            <FormItem label="昵称">
                <Input v-model="userInfo.userName">{{userInfo.userName}}</Input>
            </FormItem>
            <FormItem label="姓名">
                <Input v-model="userInfo.name">{{userInfo.name}}</Input>
            </FormItem>
            <FormItem label="邮箱">
                <Input v-model="userInfo.email">{{userInfo.email}}</Input>
            </FormItem>
            <FormItem label="联系方式">
                <Input v-model="userInfo.phone">{{userInfo.phone}}</Input>
            </FormItem>
            <FormItem label="头像">
                <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultAvatarList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    :action=avatarAction
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
                <Modal title="View Image" v-model="visible">
                    <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                </Modal>
            </FormItem>
            <FormItem>
                <Button type="primary">修改</Button>
                <Button style="margin-left: 8px" @click="reset()">重置</Button>
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
        },
        defaultAvatarList: [],
        avatarAction: this.$axios.defaults.baseURL + 'userController/updateImage',
        imgName: '',
        visible: false,
        uploadList: []
    }
  },
  watch:{
  },
  methods: {
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload () {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        },
        //重置用户基本信息
      reset(){
          var user = JSON.parse(localStorage.getItem('user'));
          for(var i in  this.userInfo){
              this.userInfo[i] = user[i];
          }
          this.defaultAvatarList[0] = {name:'default',url:this.$axios.defaults.baseURL+user.image}
          console.log(this.defaultAvatarList[0]);
      }
  },
  beforeMount(){
      this.reset();
  }
}
</script>

<style scoped lang="less">
	@import "../assets/css/common.less";
	.user_center{
		width: 100%;
		display: flex;
    }
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>

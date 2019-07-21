<template>
	<div>
		<div class="title-top">
			 <Input style="width: 450px;" class="rightline" v-model="title" placeholder="告诉我你的标题是啥子.........." />
		</div>
		<div class="message-top">
			<div class="comments rightline">
			    <Input style="width: 450px;" class="textarea" v-model="message" type="textarea"
				 placeholder="告诉我你的内容是啥子.........."
			           :autosize="{minRows: 4,maxRows: 4}" />
			    <div class="info">
			        <span class="left">
			            <Poptip placement="bottom-start" width="400">
			                <div class="api" slot="content">
			                    <Tabs size="small">
			                        <TabPane label="表情一">
			                            <div class="" v-for="item in emoticonsA">
			                                <img v-bind:src="item" alt="表情" @click="selectEmoticon(item)">
			                            </div>
			                        </TabPane>
			                        <TabPane label="表情二">
			                            <div class="" v-for="item in emoticonsB">
			                                <img v-bind:src="item" alt="表情" @click="selectEmoticon(item)">
			                            </div>
			                        </TabPane>
			                        <TabPane label="表情三">
			                            <div class="" v-for="item in emoticonsC">
			                                <img v-bind:src="item" alt="表情" @click="selectEmoticon(item)">
			                            </div>
			                        </TabPane>
			                    </Tabs>
			                </div>
			                <span><Button class='icon red pointer' type="text" ghost size="small" icon="md-happy" title="表情"></Button></span>
			                &nbsp;&nbsp;&nbsp;
			            </Poptip>
			            <Poptip placement="bottom-start" width="300">
			                <div class="api" slot="content">
			                    <Tabs size="small">
			                        <TabPane label="表情一">标签一的内容</TabPane>
			                        <TabPane label="表情二">标签二的内容</TabPane>
			                        <TabPane label="表情三">标签三的内容</TabPane>
			                    </Tabs>
			                </div>
			                <span><Button class='icon red pointer' type="text" ghost size="small" icon="md-image" title="图片"/></Button></span>
			            </Poptip>
			        </span>
			    </div>
			</div>
				
		</div>
        <div class="footer">
			<span class="pushText" @click="cancel()">取消</span>
			<span class="pushText" @click="confirom()">确认</span>
		</div>
	</div>
</template>

<script>
export default {
  name: 'message-board',
  data () {
    return {
		title:'',
        message:'',
        emoticonsA:[],
        emoticonsB:[],
        emoticonsC:[],
		islogined:false,
    }
  },
  props:{
		parentComponent:{
			type:Number,
			default:1
		},
  },
  props:{
      eventUrl: {
      type: String,
      default: '',
    }
  },
  watch:{
  },
  methods:{
	  //取消发布并参数重置
	  cancel(){
          this.$emit('fatherClose',false);
      },
      //发布
      confirom(){
          this.$emit('fatherClose',false);
          let params = {title: this.title,containt: this.message};
		  this.$axios({method:'post', url:this.eventUrl, params:params})
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
	  //获取表情
      getEmoticon(){
          let baseURL = this.$axios.defaults.baseURL;
          let url = baseURL + "emoticonController/getEmoticonList";
          this.$axios({method:'post', url:url, data:null})
          .then((response) => {
              let data = response.data;
              if( response.status == 200){
                  for(var i in  data[0]){
                      for(var j in  data[0][i]){
                          this.emoticonsA.push(baseURL + data[0][i][j]);
                      }
                  }
                  for(var i in  data[1]){
                      for(var j in  data[1][i]){
                          this.emoticonsB.push(baseURL + data[1][i][j]);
                      }
                  }
                  for(var i in  data[2]){
                      for(var j in  data[2][i]){
                          this.emoticonsC.push(baseURL + data[2][i][j]);
                      }
                  }
              }else{
                  console.log("getEmoticon error!");
              }
          }).catch((error) => {
              console.log(error)
          });
      },
      selectEmoticon(image){
          this.message += '['+image+']';
      }
  },
  mounted() {
      this.getEmoticon();
	  this.islogined = !localStorage.getItem('user')?false:true;
  }
}
</script>

<style scoped lang="less">
    @import "../../assets/css/common.less";
	.footer{
		margin-top: 40px;
		text-align: center;
		.pushText{
			cursor: pointer;
			display: inline-block;
			width: 100px;
			height: 40px;
			line-height: 40px;
			border-radius: 3px;
			margin: 0 20px;
			text-align: center;
			font-size: 16px;
			&:first-child{
				background: #ccc;
			}
			&:last-child{
				background: lightblue;
				color: white;
			}
		}
	}
	.title-top,.message-top{
		margin-top: 20px;
		text-align: center;
	}
	.rightline{
		display: inline-block;
	}
    .comments{
        position: relative;
        height: auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        .info{
            flex: 1;
            display: flex;
            border: none;
            border-top: 1px solid #ccc;
			.right{
				text-align: right;
				padding-right: 40px;
			}
            .right, .left{
                flex: 1;
                font-size: 16px;
				line-height: 40px;
            }
            .organe{
                color: orange;
            }
            .left{
                display: flex;
                img{
                    cursor:pointer;
                    width: 40px;
                    height: 40px;
                    float: left;
                    margin: 5px;
                }
                span{
                    flex: 1;
                    .icon{
                        font-size: 22px;
                        vertical-align: middle;
                        margin-right: 5px;
                        &.gost{
                            color: #ccc;
                        }
                        &.red{
                            color: coral;
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="less">
    textarea.ivu-input {
        border: none;
    }
</style>

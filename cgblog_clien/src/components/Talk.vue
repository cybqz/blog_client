<template>
	<div class="talk">
        <div class="talk-wrap">
            <ul class="shadow content">
                <li v-for="(item,index) in voiceList">
                    <div :class="'img ' + item[0]">
						<Avatar :src="baseURL+'/headportrait/gril.png'" />
					</div>
                    <div :class="item[0]">
                        <div class="record-play">
                            <audio controls style="height:40px" :src="baseURL+'/'+item[1]"></audio>
                        </div>
                    </div>
                </li>
                <li v-show="isFinished">
                    <div class="img right">
						<Avatar :src="baseURL+'/headportrait/gril.png'" />
					</div>
                    <div class="right">
                        <div class="record-play">
                            <audio class="try-hear" controls autoplay style="height:40px"></audio>
                        </div>
                    </div>
                </li>
                
            </ul>
        </div>
        <div class="record talk-bottom">
            <ButtonGroup>
                <Button @click="startRecord">录音</Button>
                <Button @click="play">试听</Button>
                <Button @click="send">发送</Button>
            </ButtonGroup>
        </div>
    </div>
</template>
 
<script>
    import Record from "../myjs/recorder/record-sdk";
    import Socket from "../myjs/socket";
	export default {
		name: "Record",
		data() {
			return {
                baseURL:'',
		        logined:false,
				isFinished: false,
                audio: "",
                socket: new Socket(),
                recorder: new Record(),
                voice: null,
                voiceList: []
			};
		},
		methods: {
            getVoices: function() {
                let baseURL = this.$axios.defaults.baseURL;
                let url = baseURL + "talkController/getVoices";
                this.$axios({method:'post', url:url, data:null})
                .then((response) => {
                    let data = response.data;
                    if( response.status == 200){
                        if(data.validate){
                            this.voiceList = data.data;
                        }else{
                            this.$Message.error(data.msg);
                        }
                    }else{
                    }
                }).catch((error) => {
                    console.log(error)
                });
            },
			startRecord: function() {
				let self = this;
				self.isFinished = false;
				self.recorder.startRecord({
					success: res => {
						console.log("start record successfully.");
					},
					error: res => {
						console.log("start record failed.");
					}
				});
			},
			stopRecord: function() {
				let self = this;
				self.isFinished = false;
				self.recorder.stopRecord({
					success: res => {
						self.voice = res;
                        this.$Message.success('录制成功！');
					},
					error: res => {
						this.$Message.error('error');
					}
				});
			},
			play: function() {
                this.stopRecord();
				let self = this;
				self.isFinished = true;
				self.audio = document.querySelector(".try-hear");
				self.recorder.play(self.audio);
            },
            send: function() {
                this.stopRecord();
                if(this.voice == null){
                    this.$Message.error('没有声音呀！');
                    return false;
                }
                let self = this;
                let url = this.$axios.defaults.baseURL + 'talkController/reciveVoice';
                let formdata = new FormData();
                formdata.append('file',self.voice);
                formdata.append('name','cyb');
                const instance=this.$axios.create({
                    withCredentials: true
                });
                instance.post(url,formdata).then((response)=>{
                    if( response.status == 200){
                        let data = response.data;
                        if(data.validate){
                            this.$Message.success(data.msg);
                        }else{
                            this.$Message.error(data.msg);
                        }
                    }
                }).catch((error) => {
                    console.log(error)
                });
            }
        },
        beforeMount(){
            this.logined= !localStorage.getItem('user')?false:true;
            this.baseURL = this.$axios.defaults.baseURL;
            this.socket.initWebSocket(this.socket.urlTalk);
        },
        mounted(){
            this.getVoices();
            let that = this;
            //实时刷新消息
            this.$nextTick(function () {
                let getVoicesTimer = window.setInterval(function(){
                    that.getVoices();
                },3000);
                that.$once('hook:beforeDestroy', () => {       
                    window.clearInterval(getVoicesTimer);                                    
                });
            });
        }
	};
</script>

<style scoped lang="less">
	@import "../assets/css/common.less";
	.talk{
		width: 100%;
        display: flex;
        position: relative;
    }
    .talk-wrap{
        width: 100%;
        height: 520px;
    }
    .talk-bottom{
        position: absolute;
        top: 530px;
        left: 0;
        right: 0;
    }
    .content{
        width: 50%;
        height: 520px;
        margin: 0 auto;
        // background:red;
        overflow-y: auto;
        li{
            height: 60px;
            line-height: 40px;
            width: 100%;
            .img{
                margin: 0 20px;
            }
            .left{
                float: left;
            }
            .right{
                float: right;
            }
        }
    }
</style>

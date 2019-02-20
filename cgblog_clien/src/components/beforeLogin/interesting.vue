<template>
	<div>
        <div class="eventModel">
            <Modal v-model="eventModel" width="550" title="添加趣事">
                <div style="text-align:center">

                </div>
                <div slot="footer" style="text-align:center;">
                    <!-- <Button style="margin:0 20px;" @click="eventCancel">取消</Button>
                    <Button type="primary" style="margin:0 20px;" @click="eventConfirm">发布</Button> -->
                </div>
            </Modal>
        </div>
        <div class="addIcon">
           <span class="pointer" @click="addevent()">
                <span class="addtext">添加</span>
                <Icon type="md-add" />   
           </span> 
        </div>
		<div class="shadow ptb20">
			<Scroll :on-reach-bottom="handleReachBottom" :height="600">
				<div class="intereting-wrap" v-for="item in data">
					<div class="containDiv">
						<div :title="item.title" class="title pointer eclipes1">
							{{item.title}}
						</div>
						<div class="msg eclipes2">
							{{item.containt}}
						</div>
						<div class="about">
							<div class="spaceR">
								<span class="left">
									作者：<span class="organe pointer">{{item.author}}</span>
								</span>
								<span class="right">
									<span><Icon @click="doComment(item.id)" :class="logined?(item.comment?'gost':'red') :'gost'" class='icon pointer' type="ios-text" />{{item.commentCount}}</span>
									<span><Icon @click="doFablous(item.id)" :class="logined?(item.fablous?'gost':'red') :'gost'" class='icon pointer' type="ios-heart" />{{item.fablousCount}}</span>
								</span>
							</div>
							<div v-if='true' class="space">
							</div>
						</div>
					</div>
					<div v-if='true' class="imgDiv pointer">
					</div>
				</div>
			</Scroll>
		</div>
	</div>
</template>

<script>
export default {
    name: 'intersting',
    data () {
        return {
            //添加
            eventModel: false,
            controllrt:'blogController/',
            tatal:0,
            pageSize:10,
            pageNo:1,
            data:[],
            continueGetData:true,
            parentComponent:1,
            logined:false,
        }
    },
    watch:{
    },
    methods:{
        //添加事件
        addevent(){
            this.eventModel = !this.eventModel;
        }, 
        //取消添加事件
        eventCancel(){
            this.eventModel = false;
        },
        //发布事件
        eventConfirm(){
             this.eventModel = false;
        },
        getData(){
            if(this.continueGetData){
				let url = this.$axios.defaults.baseURL + this.controllrt + "getList";
				let param = {
					pageIndex:this.pageNo
				};
				this.$axios({method:'post', url:url, data:this.$qs.stringify(param)})
				.then((response) => {
					let data = response.data;
					if( response.status == 200){
						this.continueGetData = data.pageIndex<=data.pageCount;
						for(var i in data.pageDatas){
							this.data.push(data.pageDatas[i]);
						}
					}else{
						console.log("getData error!");
					}
				}).catch((error) => {
					console.log(error)
				})
			}else{
				this.$Message.info('已经到底啦！');
			}
        },
        handleReachBottom(){
            this.pageNo += 1;
            this.getData();
        },
        doComment(id){
            alert(id);
        },
        doFablous(id){
            let url = this.$axios.defaults.baseURL + this.controllrt + "doFablous";
            let param = {
                id:id
            };
            this.$axios({method:'post', url:url, data:this.$qs.stringify(param)})
            .then((response) => {
                let data = response.data;
                if( response.status == 200){
                    if(data.validate){
                        for(var i in this.data){
                            if(this.data[i].id == id){
                                if(this.data[i].fablous){
                                    this.data[i].fablous = false;
                                    ++this.data[i].fablousCount;
                                }else{
                                    this.data[i].fablous = true;
                                    --this.data[i].fablousCount;
                                }
                                return;
                            }
                        }
                        this.$Message.success(data.msg);
                    }else{
                        this.$Message.error(data.msg);
                    }
                }else{
                    console.log("getData error!");
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    components: {
    },
    beforeMount(){
        this.logined= !localStorage.getItem('user')?false:true;
    },
    mounted() {
        this.getData();
    }
}
</script>
<style lang="less">
    .ivu-modal-footer{
        border:none;
    }
</style>

<style scoped lang="less">
    @import "../../assets/css/common.less";
    .addIcon{
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        text-align: left;
        color: orange;
        span{
            font-size: 18px;
            &.addtext{
                font-size: 14px;
            }
        }
    }
    .push-text{
        text-align: left;
        .text-title{
            display: inline-block;
            vertical-align: top;
        }
    }
	.intereting-wrap{
		padding: 40px 0;
		border-top: 1px dashed #ccc;
		width: 100%;
		display: flex;
		height: 220px;
		&:first-child{
			border-top:none;
		}
		.imgDiv{
			width: 210px;
			height: 140px;
			margin-right: 20px;
			background: url(../../assets/img/sy_img1.jpg);
			background-size: cover;
			flex: none;
		}
		.containDiv{
			flex: 1;
			.title{
				height: 40px;
				line-height: 40px;
				text-align: left;
				width: 80%;
				font-size: 14px;
				font-weight: bold;
			}
			.msg{
				text-align: left;
				width: 100%;
				padding-right: 20px;
				font-size: 14px;
				height: 60px;
				line-height: 30px;
			}
			.about{
				margin-top: 20px;
				height: 20px;
				line-height: 20px;
				text-align: left;
				font-size: 13px;
				display: flex;
				.space{
					flex: none;
					width: 210px;
					margin-right: 20px;
				}
				.spaceR{
					flex: 1;
					display: flex;
					.right, .left{
						flex: 1;
					}
					.organe{
						color: orange;
					}
					.right{
						display: flex;
						span{
							flex: 1;
							.icon{
								font-size: 20px;
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
		}
	}
</style>

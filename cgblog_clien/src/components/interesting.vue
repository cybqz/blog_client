<template>
	<div>
        <div class="eventModel">
            <Modal v-model="eventModel" width="500" title="添加趣事">
                <div style="text-align:center">
					<AddEvent @fatherClose="closeEventModel" :eventUrl='eventUrl'></AddEvent>
                </div>
                <div slot="footer" style="text-align:center;">
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
									<span class=" span1 organe pointer">{{item.authorName}}</span>
									<span class="span2 organe pointer">{{item.createtime | formatDate}}</span>
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
					<div class="aboutPhone">
						<div class="spaceR">
							<span class="left">
								<span class=" span1 organe pointer">{{item.authorName}}</span>
								<span class="span2 organe pointer">{{item.createtime | formatDate}}</span>
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
			</Scroll>
		</div>
	</div>
</template>

<script>
	import AddEvent from "@/components/props/addEvent.vue";
export default {
    name: 'intersting',
    data () {
        return {
            //添加
            eventModel: false,
            controllrt:'blogController/',
            baseURL: '',
            tatal:0,
            pageSize:10,
            pageNo:1,
            data:[],
            continueGetData:true,
            parentComponent:1,
            logined:false,
            eventUrl:''
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
        closeEventModel(flG){
            this.eventModel = flG;
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
		AddEvent,
    },
    beforeMount(){
        this.logined= !localStorage.getItem('user')?false:true;
        this.baseURL = this.$axios.defaults.baseURL;
        this.eventUrl = this.baseURL + "blogController/publish";
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
    @import "../assets/css/common.less";
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
	@media screen and (min-width: 900px) {
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
				background: url(../assets/img/sy_img1.jpg);
				background-size: cover;
				flex: none;
			}
			.aboutPhone{
				display: none;
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
						width: 0;
						margin-right: 20px;
					}
					.spaceR{
						flex: 1;
						display: flex;
						.right, .left{
							flex: 1;
							display: flex;
							.span1{
								width: 35%;
							}
							.span2{
								flex: 1;
							}
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
	}
	@media screen and (max-width: 900px) {
		/* 移动端 */
		.intereting-wrap{
			// padding: 40px 0;
			border-top: 1px dashed #ccc;
			width: 100%;
			&:first-child{
				border-top:none;
			}
			.imgDiv{
				width: 100%;
				height: 100PX;
				background: url(../assets/img/sy_img1.jpg);
				background-size: cover;
				background-repeat: no-repeat;
			}
			.aboutPhone{
				margin-top: 20px;
				height: 20px;
				line-height: 20px;
				font-size: 0.6rem;
				display: block;
				.space{
					flex: none;
					width: 0;
					margin-right: 20px;
				}
				.spaceR{
					flex: 1;
					display: flex;
					.left{
						flex: 1;
						display: flex;
						.span1{
							width: 35%;
							text-align: left;
						}
						.span2{
							flex: 1;
						}
					}
					.organe{
						color: orange;
					}
					.right{
						width: 40%;
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
			.containDiv{
				width: 100%;
				.title{
					height: 40px;
					line-height: 40px;
					text-align: left;
					width: 100%;
					font-size: 14px;
					font-weight: bold;
				}
				.msg{
					text-align: left;
					width: 100%;
					padding-right: 20px;
					font-size: 14px;
					line-height: 30px;
				}
				.about{
					display: none;
				}
			}
		}
	}	
</style>

<template>
	<div>
		<div class="topWrap">
			<div class="top" >
				<div class="logo">
				</div>
				<div class="nav">
					<div v-for="(item,index) in navTabs" :class="index == tabActive?'active':''">
						<span @click="changeNavTab(item.num)">
							{{item.name}}
						</span>
					</div>
				</div>
				<div class="search">
					<Input suffix="ios-search" placeholder="Enter text" style="width: auto" />
				</div>
				<div class="login">
					<div v-show="!logined">
						<span class="login-text" @click="loginModal = true">登录</span>
						<span class="login-text" @click="registerModal = true">注册</span>
					</div>
					<div v-show="logined">
                        <span class="login-text">
                            <Dropdown trigger="click" style="margin-left: 20px">
                                <a href="javascript:void(0)">
                                    <Avatar :src="this.$axios.defaults.baseURL+this.user.image" />&nbsp;
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem>欢迎：{{formLogin.userName}}</DropdownItem>
                                    <DropdownItem @click.native="userCenter()">个人中心</DropdownItem>
                                    <DropdownItem @click.native="openingVIP()">开通VIP</DropdownItem>
                                    <DropdownItem @click.native="talk()">聊天</DropdownItem>
                                    <DropdownItem @click.native="logout()">退出</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </span>
					</div>
				</div>
			</div>
		</div>
		<div class="containtWrap">
			<router-view/>
		</div>
		<div class="wrap-footer">
			<span class="text">Design by：CYB&nbsp;&&nbsp;GFJ</span>
			<span class="text">备案号：京ICP备19006623号-1</span>
		</div>
		<Modal
        v-model="loginModal"
        title=""
        width="400">
        <p slot="header" style="color:#f60;text-align:center">
            <span>欢迎登陆</span>
        </p>
        <div style="text-align:center">
            <Form ref="formLogin" :model="formLogin" :rules="rulesLogin" inline>
                <FormItem prop="user">
                    <Input type="text" v-model="formLogin.userName" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formLogin.password" placeholder="Password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button size="large" long :loading="login_loading" @click="handleLogin('formLogin')">登录</Button>
        </div>
    </Modal>
		<Modal
		    v-model="registerModal"
		    title=""
		    width="400">
		    <p slot="header" style="color:#f60;text-align:center">
		        <span>欢迎注册</span>
		    </p>
		    <div style="text-align:center">
                <Form ref="formRegister" :model="formRegister" :rules="rulesRegister" inline>
                    <FormItem prop="userName">
                        <Input type="text" v-model="formRegister.userName" placeholder="Username">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
					<div style="margin-bottom: 20px;text-align: center;">
						<span style="margin-right: 40px;vertical-align: middle;">性别：</span>
						<RadioGroup v-model="formRegister.sex">
								<Radio label="1">男</Radio>
								<Radio label="0">女</Radio>
						</RadioGroup>
					</div>
                    <FormItem prop="password">
                        <Input type="password" v-model="formRegister.password" prop="password" placeholder="Password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="confirmpassword">
                        <Input type="password" v-model="formRegister.confirmpassword" prop="confirmpassword" placeholder="Confirm Password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Form>
		    </div>
		    <div slot="footer">
		        <Button size="large" long :loading="register_loading" @click="handleRegister('formRegister')">注册</Button>
		    </div>
		</Modal>
	</div>
</template>

<script>
export default {
  name: 'home',
  data () {
		const validatePass = (rule, value, callback) => {
			if (value === '') {
					callback(new Error('请输入密码'));
			} else {
					if (this.formRegister.confirmpassword !== '') {
							// 对第二个密码框单独验证
							this.$refs.formRegister.validateField('confirmpassword');
					}
					callback();
			}
		};
		const validatePassCheck = (rule, value, callback) => {
			if (value === '') {
					callback(new Error('请输入密码'));
			} else if (value !== this.formRegister.password) {
					callback(new Error('两次密码不一致'));
			} else {
					callback();
			}
		};
    return {
            user:{id:'',name:'',phone:'',email:'',image:''},
			logined:false,
            tabActive:0,
			loginModal:false,
			login_loading:false,
			registerModal:false,
			register_loading:false,
			navTabs:[{
				name:'点趣',
				num:0
			},{
				name:'点悦',
				num:1
			},{
				name:'点知',
				num:2
			},{
				name:'留言板',
				num:3
			}],
			formLogin: {
					userName: '',
					password: ''
			},
			formRegister: {
					userName: '',
					password: '',
					confirmpassword:''
			},
			rulesLogin: {
				userName: [
						{ required: true, message: '请输入正确的用户名', trigger: 'blur' }
				],
				password: [
						{ required: true, message: 'Please fill in the password.', trigger: 'blur' },
						{ type: 'string', min: 1, message: '请输入正确的密码', trigger: 'blur' }
				]
			},
			rulesRegister: {
				userName: [
						{ required: true, message: '请输入正确的用户名', trigger: 'blur' }
				],
				password: [{ validator:validatePass, trigger: 'blur' }],
				confirmpassword: [{ validator:validatePassCheck, trigger: 'blur' }]
			}
    }
  },
  watch:{},
  methods:{
        userCenter(){
           this.$router.push({
			   path: '/home/userCenter',
		   })     
        },
        openingVIP(){
            this.$router.push({
			   path: '/home/openingVIP',
		    }) 
        },
        talk(){
            this.$router.push({
			   path: '/home/talk',
		    }) 
        },
		changeNavTab(num){
			this.tabActive = num;
			switch (num){
				case 0:
					this.$router.push({
						path: '/home/beforeLogin/interesting',
					})
					break;
				case 1:
					this.$router.push({
						path: '/home/beforeLogin/reading',
					})
					break;
				case 2:
					this.$router.push({
						path: '/home/beforeLogin/learning',
					})
					break;
				case 3:
					this.$router.push({
						path: '/home/beforeLogin/messageBoard',
					})
					break;		
				default:
					break;
			}
		},
		//登录事件
		handleLogin(formLogin) {
			this.$refs[formLogin].validate((valid) => {
					if(valid){
						this.login_loading = true;
						let url = this.$axios.defaults.baseURL + "loginController/login";
						let param = this.formLogin;
						this.$axios({method:'post', url:url, data:this.$qs.stringify(param)})
						.then((response) => {
							if( response.status == 200){
								let data = response.data;
								if(data.validate){
                                    this.loginModal=false;
                                    this.logined=true;
                                    this.user = data.data;
                                    localStorage.setItem('user',JSON.stringify(data.data));
									this.$Message.success(data.msg);
									let location = window.location;
									window.location.replace(location);
								}else{
									this.$Message.error(data.msg);
								}
							}else{
								this.$Message.error('Fail!');
							}
						}).catch((error) => {
								console.log(error)
						})
						this.login_loading = false;
					} else {
							this.$Message.error('Valid Fail!');
					}
			})
		},
		handleRegister(formRegister) {
			this.$refs[formRegister].validate((valid) => {
					if(valid){
						this.register_loading = true;
						let url = this.$axios.defaults.baseURL + "registerController/register";
						let param = this.formRegister;
						this.$axios({method:'post', url:url, data:this.$qs.stringify(param)})
						.then((response) => {
							if( response.status == 200){
								let data = response.data;
								if(data.validate){
									this.registerModal=false;
									this.$Message.success(data.msg);
								}else{
									this.$Message.error(data.msg);
								}
							}else{
								this.$Message.error('Fail!');
							}
						}).catch((error) => {
								console.log(error)
						})
						this.register_loading = false;
					} else {
							this.$Message.error('Valid Fail!');
					}
			})
		},
		//退出事件
		logout(){
			let url = this.$axios.defaults.baseURL + "loginController/logout";
			let param = this.formLogin;
			this.$axios({method:'post', url:url, data:this.$qs.stringify(param)})
			.then((response) => {
				if( response.status == 200){
					let data = response.data;
					if(data.validate){
                        this.logined=false;
                        localStorage.removeItem('user');
						this.$Message.success(data.msg);
						let location = window.location;
						window.location.replace(location);
					}else{
						this.$Message.error(data.msg);
					}
				}else{
					this.$Message.error('Fail!');
				}
			}).catch((error) => {
					console.log(error);
			});
		}
  },
  beforeMount(){
      //查询、设置用户登录状态
      let url = this.$axios.defaults.baseURL + "userController/getUser";
        let param = this.formLogin;
        this.$axios({method:'post', url:url, data:null})
        .then((response) => {
            if( response.status == 200){
                let data = response.data;
                if(data == null || data === ''){
                    localStorage.removeItem('user');
                }else{
                    this.logined=true;
                    this.user = data;
                    localStorage.setItem('user',JSON.stringify(data));
                }
            }else{
                this.$Message.error('Fail!');
            }
    }).catch((error) => {
        console.log(error);
    })
  },
  mounted(){
	this.changeNavTab(0);
  }
}
</script>

<style scoped lang="less">
	.wrap-footer{
		height: 40px;
		line-height: 40px;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #f1f1f0;
		color: black;
		font-size: 14px;
		.text{
			margin: 0 20px;
		}
	}
	.topWrap{
		height: 60px;
		margin-bottom: 20px;
	}
	.top{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: white;
		height: 60px;
		width: 100%;
		border-bottom: 1px solid #ccc;
		display: flex;
		z-index: 99;
		.logo{
			margin: 0 20px;
			width: 140px;
			height: 60px;
			border-radius: 50%;
			background: url(../assets/img/gclogo.png);
			background-size:contain;
			flex: none;
		}
		.nav{
			flex: 1;
			display: flex;
			div{
				width: 28%;
				height: 60px;
				line-height: 60px;
				font-size: 16px;
				text-align: center;
				margin: 0 20px;
				span{
					cursor: pointer;
				}
				&.active{
					color: orange;
				}
			}
		}
		.search{
			margin: 0 20px;
			width: 200px;
			height: 60px;
			line-height: 60px;
			flex: none;
		}
		.login{
			margin-left: 100px;
			width: 200px;
			flex: none;
			div{
				text-align: center;
				height: 60px;
				line-height: 60px;
				.login-text{
					margin: 0 30px;
					cursor: pointer;
					font-size: 16px;
				}
				.login-text:hover{
					color:orange;
				}
			}
		}
	}
	.containtWrap{
		width: 80%;
		margin: 0 auto;
		margin-bottom: 80px;
	}
</style>

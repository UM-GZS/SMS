<template>
	<el-container>
		<el-header>
			<div>
				<img src="../../assets/logo.png" />
				<span>学生管理系统</span>
			</div>
		</el-header>
		<el-container>
			<el-main>
				<div class="login_span">
					<p>不辜青春</p>
				</div>
				<div class="login_box">
					<p>登录账号</p>
					<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="10px" class="login_form">
						<el-form-item prop="username">
							<el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input v-model="loginForm.password" placeholder="请输入密码" type="password" prefix-icon="el-icon-lock"></el-input>
						</el-form-item>
						<el-form-item prop="code">
							<el-row :span="24">
								<el-col :span="12">
									<el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
								</el-col>
								<el-col :span="12">
									<div class="login-code" @click="refreshCode">
										<!--验证码组件-->
										<s-identify :identifyCode="identifyCode"></s-identify>
									</div>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item prop="resource">
							<el-radio-group v-model="loginForm.resource">
								<el-radio label="学生"></el-radio>
								<el-radio label="老师"></el-radio>
								<el-radio label="辅导员"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item class="btns">
							<el-button type="primary" @click="login">登录</el-button>
							<el-button type="infor" @click="restForm">重置</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-main>
		</el-container>
		<el-footer>
			<span>Copyright©2020 优咪工作室</span>
		</el-footer>
	</el-container> 
</template>

<script>
	import SIdentify from '../../components/tools/Code.vue'
	export default {
		data() {
			return {
				userInfo: {
					id: '201830621104',
					token: 'jfdjsiae54551',
					role: '学生'
				},
				loginForm: {
					username: '',
					password: '',
					resource: '',
					code: ''
				},
				loginRules: {
					username: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					code: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}],
					resource: [{
						required: true,
						message: '请选择身份',
						trigger: 'blur'
					}]
				},
				identifyCode: '',
				identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz'
			}
		},
		mounted() {
			this.identifyCode = ''
			this.makeCode(this.identifyCodes, 4)
		},
		methods: {
			login() {
				this.$refs.loginFormRef.validate(valid => {
					if (!valid) return this.$message.error("表单校验失败");
					if (this.loginForm.code.toLowerCase() !== this.identifyCode.toLowerCase()) {
						this.$message.error("请填写正确验证码")
						this.refreshCode()
						return
					}
					if (this.loginForm.username !== 'admin' || this.loginForm.password !== '123456') return this.$message.error(
						"账号或密码不正确")
					if (this.loginForm.resource !== '学生') return this.$message.error("请选择正确的身份")
					this.$message.success("登录成功")
					window.sessionStorage.setItem('token', this.userInfo.token)
					window.sessionStorage.setItem('id', this.userInfo.id)
					this.$router.push("/home")
				})
			},
			restForm() {
				this.$refs.loginFormRef.resetFields()
			},
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min)
			},
			refreshCode() {
				this.identifyCode = ''
				this.makeCode(this.identifyCodes, 4)
			},
			makeCode(o, l) {
				for (let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[
						this.randomNum(0, this.identifyCodes.length)
					]
				}
			}
		},
		components: {
			SIdentify
		}
	}
</script>

<style lang="less" scoped>
	.el-header,
	.el-footer {
		background-color: #fff;
		color: #333;
		text-align: center;
		line-height: 60px;
	}
	.el-footer>span {
		font-size: 10px;
	}
	.el-main {
		background: url(http://v.bootstrapmb.com/2019/4/o8ueb4141/css/images/profile-8/bg8.jpg) no-repeat center;
		background-size: 100% 100%;
		color: #333;
		text-align: center;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.el-header>div {
		display: flex;
		align-items: center;
	}

	.el-header>div>img {
		width: 40px;
		height: 40px;
	}

	.el-header>div>span {
		margin-left: 10px;
	}

	.login_box {
		width: 450px;
		height: 420px;
		background-color: #fff;
	}

	.login_box>p {
		padding: 20px 0px;
	}

	.login_form {
		width: 100%;
		padding: 0px 20px;
		box-sizing: border-box;
	}
</style>

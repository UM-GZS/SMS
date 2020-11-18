<template>
	<el-container>
		<el-header>
			<div>
				<img src="../../assets/logo.png" />
				<span>学生管理系统</span>
			</div>
			<div>
				<el-row>
					<el-dropdown @command="handleCommand">
						<span class="dropdown-link">
							<el-badge is-dot>
								<i class="el-icon-bell my_i"></i>
							</el-badge>
						</span>
						<el-dropdown-menu slot="dropdown">
							<div v-if="noticeList.length !== 0">
								<div class="dropdown-item" v-for="(item, index) in noticeList" :key="index">
									<div class="dropdown-item-list">
										<div><i class="el-icon-bell"></i></div>
										<div class="dropdown-item-content">
											<div>{{item.title}}</div>
											<span>{{item.time}}</span>
										</div>
									</div>
									<i class="el-icon-circle-close" @click="deleteNotice(index)"></i>
								</div>
							</div>
							<div class="dropdown-noting" v-else>
								暂时没有通知
							</div>
						</el-dropdown-menu>
					</el-dropdown>
					<el-dropdown @command="handleCommand">
						<span class="dropdown-link">
							<el-badge is-dot>
								<i class="el-icon-message my_i"></i>
							</el-badge>
						</span>
						<el-dropdown-menu slot="dropdown">
							<div v-if="messageList.length !== 0">
								<div class="dropdown-item" v-for="(item, index) in messageList" :key="index">
									<div class="dropdown-item-list">
										<div>
											<el-avatar :src="item.avatar" :size="35"></el-avatar>
										</div>
										<div class="dropdown-item-content">
											<div>{{item.name}}</div>
											<span>{{item.content}}</span>
											<span>{{item.time}}</span>
										</div>
									</div>
									<i class="el-icon-circle-close" @click="deleteMessage(index)"></i>
								</div>
							</div>
							<div class="dropdown-noting" v-else>
								暂时没有消息
							</div>
						</el-dropdown-menu>
					</el-dropdown>
					<el-dropdown @command="handleCommand">
						<span class="dropdown-link">
							<el-badge hidden>
								<i class="el-icon-setting my_i"></i>
							</el-badge>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item icon="el-icon-edit" command="edit">修改密码</el-dropdown-item>
							<el-dropdown-item icon="el-icon-switch-button" command="out">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-row>
			</div>
		</el-header>
		<el-dialog title="提示" :visible.sync="passDialogVisible" width="30%" @close="passClose">
			<el-form ref="passEditRef" :model="passEditForm" :rules="passEditRules" label-width="80px">
				<el-form-item label="旧密码:" prop="oldPassword">
					<el-input v-model="passEditForm.oldPassword"></el-input>
				</el-form-item>
				<el-form-item label="新密码:" prop="newPassword">
					<el-input v-model="passEditForm.newPassword"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="passDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editPassword">确 定</el-button>
			</span>
		</el-dialog>
		<el-container>
			<el-aside width="200px">
				<el-menu :collapse-transition="false" :router="true" unique-opened background-color="#2E3E4E" text-color="#fff"
				active-text-color="#409FFF" :default-active="activePath">
					<el-menu-item :index="item.path" v-for="(item, index) in menuList" :key="index">
						<i :class="item.icon"></i>
						<span slot="title" @click="navStatus(item.path)">{{item.name}}</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-main>
					<router-view></router-view>
				</el-main>
				<el-footer>
					<span>Copyright©2020 优咪工作室</span>
				</el-footer>
			</el-container>
		</el-container>

	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				activePath: '',
				menuList: [{
						name: '首页',
						path: '/welcome',
						icon: 'el-icon-s-home'
					},
					{
						name: '个人信息',
						path: '/userinfo',
						icon: 'el-icon-user-solid'
					},
					{
						name: '上课记录',
						path: '/classitem',
						icon: 'el-icon-s-marketing'
					}
				],
				passDialogVisible: false,
				passEditForm: {
					oldPassword: '',
					newPassword: ''
				},
				passEditRules: {
					oldPassword: [{
						required: true,
						message: '请输入旧密码',
						trigger: 'blur'
					}],
					newPassword: [{
						required: true,
						message: '请输入新密码'
					}]
				},
				noticeList: [{
					title: '上课通知',
					time: '2020-11-18 09:16'
				},
				{
					title: '上课通知',
					time: '2020-11-18 09:16'
				},
				{
					title: '上课通知',
					time: '2020-11-18 09:16'
				}],
				messageList: [{
					name: 'kolboy',
					avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
					content: '该叫作业了',
					time: '2020-11-18 09:40'
				},
				{
					name: 'kolboy',
					avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
					content: '该叫作业了',
					time: '2020-11-18 09:40'
				},
				{
					name: 'kolboy',
					avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
					content: '该叫作业了',
					time: '2020-11-18 09:40'
				}]
			}
		},
		created() {
			this.activePath = window.sessionStorage.getItem('activePath')
			console.log(this.activePath)
		},
		methods: {
			navStatus(statuP) {
				window.sessionStorage.setItem('activePath', statuP)
				this.activePath = statuP
				console.log(this.activePath)
			},
			async handleCommand(command) {
				if (command === 'edit') return this.passDialogVisible = true
				const confirmResult = await this.$confirm('确定退出当前账号吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).catch(err => err)
				if (confirmResult !== 'confirm') return
				window.sessionStorage.clear()
				this.$router.push("/login")
				this.$message.success('已退出账号')
			},
			editPassword() {
				this.$refs.passEditRef.validate(valid => {
					if (!valid) return this.$message.error('表单校验失败')
				})
			},
			passClose() {
				this.$refs.passEditRef.resetFields()
			},
			deleteNotice(index) {
				this.noticeList.splice(index, 1)
			},
			deleteMessage(index) {
				this.messageList.splice(index, 1)
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

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

	.el-aside {
		background-color: #2E3E4E;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
	}

	.el-header div {
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

	.el-menu {
		border: none;
		height: 100%;
	}

	.my_i {
		color: #2E3E4E;
		font-size: 20px;
	}

	.my_i:hover {
		color: #409EFF;
	}

	.el-dropdown {
		margin-left: 20px;
	}

	.dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}
	
	.dropdown-noting, .dropdown-item {
		padding: 10px;
		width: 300px;
		display: flex;
	}
	.dropdown-item {
		justify-content: space-between;
		border-bottom: 1px solid #f4f4f4;
		cursor: pointer;
	}
	.dropdown-noting {
		justify-content: center;
		align-items: center;
		font-size: 15px;
		padding: 15px 0px;
	}
	.dropdown-item>i {
		font-size: 15px;
	}

	.dropdown-item-list {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.dropdown-item-content {
		margin-left: 10px;
		line-height: 20px;
	}

	.dropdown-item-content div {
		font-size: 15px;
		font-weight: 600;
	}

	.dropdown-item-content span {
		font-size: 8px;
		color: #AAAAA9;
		display: block;
	}

	.dropdown-item-list i {
		font-size: 15px;
		padding: 10px;
		background-color: #409EFF;
		border-radius: 50%;
		color: #ffffff;
	}

	.el-dropdown-menu {
		padding: 0px;
	}
</style>

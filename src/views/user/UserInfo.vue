<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>个人信息</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row :gutter="24">
			<el-col :span="8">
				<el-card :body-style="{ padding: '0px' }">
					<el-row class="user_left_info_row">
						<el-col :span="8">
							<el-avatar :size="80" :src="userInfo.avatar"></el-avatar>
						</el-col>
						<el-col :span="8">
							<div>{{userInfo.name}}<i class="el-icon-user-solid" :style="{color: userInfo.gender === 0 ? iColorG : iColorB}"></i></div>
							<p>{{userInfo.id}}</p>
						</el-col>
					</el-row>
					<ul class="user_left_info_list">
						<li>院系：{{userInfo.college}}</li>
						<li>专业：{{userInfo.major}}</li>
						<li>班级：{{userInfo.class}}</li>
						<li>简介：{{userInfo.introduction}}</li>
					</ul>
				</el-card>
			</el-col>
			<el-col :span="16">
				<el-card>
					<el-form label-width="80px" ref="editUserRef" :model="editUser" :rules="editUserRules" label-position="top">
						<el-row :gutter="24">
							<el-col :span="12">
								<el-form-item label="手机号" prop="phone">
									<el-input v-model="editUser.phone"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="邮箱" prop="email">
									<el-input v-model="editUser.email"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-form-item label="出生日期" prop="date">
								<el-date-picker v-model="editUser.date" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="简介">
									<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="editUser.introduction" maxlength="50">
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row class="edit_user_button">
							<el-button type="infor" @click="restForm">重置</el-button>
							<el-button type="primary" @click="editUserInfo">提交</el-button>
						</el-row>
					</el-form>
				</el-card>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	export default {
		data() {
			var checkEmail = (rule, value, callBack) => {
				const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
				if (regEmail.test(value)) {
					return callBack()
				}
				callBack(new Error('请输入正确的邮箱'))
			}
			var checkMobile = (rule, value, callBack) => {
				const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
				if (regMobile.test(value)) {
					return callBack()
				}
				callBack(new Error('请输入正确的手机号码'))
			}
			return {
				userInfo: {
					name: '陈尚城',
					gender: 1,
					avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
					id: '201830621104',
					college: '信息工程系',
					major: '计算机应用技术',
					class: '1班',
					role: '学生',
					introduction: '烦得很'
				},
				editUser: {
					phone: '',
					email: '',
					date: '',
					introduction: ''
				},
				iColorG: '#F73B75',
				iColorB: '#409EFF',
				editUserRules: {
					phone: [{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					},
					{
						validator: checkMobile,
						trigger: 'blur'
					}],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							validator: checkEmail,
							trigger: 'blur'
						}],
						date: [{
							required: true,
							message: '请选择出生日期',
							trigger: 'blur'
						}]
				}
			}
		},
		methods: {
			editUserInfo() {
				this.$refs.editUserRef.validate(valid => {
					if (!valid) return
					this.$message.success('修改用户信息成功！')
					this.$refs.editUserRef.resetFields()
				})
			},
			restForm() {
				this.$refs.editUserRef.resetFields()
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-card {
		margin-top: 15px;
	}

	.el-icon-user-solid {
		margin-left: 10px;
		color: #63B0FF;
	}

	.edit_user_button {
		display: flex;
		justify-content: flex-end;
	}

	.user_left_info_row {
		color: #fff;
		padding: 20px 10px;
		background-color: rgba(46, 62, 78, 0.9);
	}

	.user_left_info_row div {
		font-size: 20px;
		margin-top: 12px;
	}

	.user_left_info_row p {
		font-size: 14px;
	}

	.user_left_info_list {
		padding: 0px 10px;
		text-align: left;
		line-height: 50px;
	}

	.user_left_info_list li {
		border-bottom: 1px solid #E4E4E4;
	}

	.user_left_info_row i {
		font-size: 15px;
	}
</style>

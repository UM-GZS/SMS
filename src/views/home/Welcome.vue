<template>
	<div>
		<el-card>
			<el-row>
				<el-col :span="2">
					<el-avatar :size="80" :src="userInfo.avatar"></el-avatar>
				</el-col>
				<el-col :span="22">
					<div class="user_info">
						<p>{{userInfo.name}}<i class="el-icon-user-solid" :style="{color: userInfo.gender === 0 ? iColorG : iColorB}"></i> </p>
						<p>院系：{{userInfo.college}} 专业：{{userInfo.major}} 班级：{{userInfo.class}}</p>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<el-row :gutter="24">
			<el-col :span="8">
				<el-card>
					<el-row>
						<el-col :span="8">
							<img src="../../assets/img/home_item01.jpg" />
						</el-col>
						<el-col :span="16">
							<div class="home_item_box">
								<p>本学期课程</p>
								<span>{{classInfo.classTotal}}</span>
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card>
					<el-row>
						<el-col :span="8">
							<img src="../../assets/img/home_item02.jpg" />
						</el-col>
						<el-col :span="16">
							<div class="home_item_box">
								<p>今日课程</p>
								<span>{{classInfo.classNew}}</span>
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card>
					<el-row>
						<el-col :span="8">
							<img src="../../assets/img/home_item03.jpg" />
						</el-col>
						<el-col :span="16">
							<div class="home_item_box">
								<p>学分</p>
								<span>{{classInfo.credit}}</span>
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="24">
			<el-col :span="12">
				<el-card>
					<div>今日课程</div>
					<div class="home_class_box" v-for="(item, index) in classList" :key="index">
						<div>
							<i class="el-icon-s-flag"></i>
							<span>{{item.className}}</span>
						</div>
						<span>{{item.time}}</span>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card>
					<div>上课报到</div>
					<div class="home_class_item">
						<div>
							<p>刘老师正在课室上课，尽快进入课室报到</p>
							<span style="font-size: 10px;">课程：【UI】快速掌握产品流程图设计</span>
						</div>
						<div class="home_class_button">
							<el-button type="primary" size="small" @click="goClass">进入课室</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				classTime: 1506680927785,
				userInfo: {
					name: '陈尚城',
					gender: 1,
					avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
					id: '201830621104',
					college: '信息工程系',
					major: '计算机应用技术',
					class: '1班',
					role: '学生'
				},
				classInfo: {
					classTotal: 14,
					classNew: 3,
					credit: 98
				},
				classList: [
					{
						className: '【UI】快速掌握产品流程图设计',
						time: '8:10~9:50'
					},
					{
						className: '【Java】函数式编程',
						time: '10:10~11:50'
					},
					{
						className: '【大数据】轻松掌握Spark3.0新特性',
						time: '14:10~14:50'
					}
				],
				iColorG: '#F73B75',
				iColorB: '#409EFF',
			}
		},
		created() {
			
		},
		methods: {
			async goClass() {
				const confirmResult = await this.$confirm('确定进入课室吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).catch(err => err)
				if (confirmResult !== 'confirm') return
				const nowTime = new Date()
				if (nowTime.getTime() < this.classTime) {
					return this.$message.error('课程还没有开始，请稍后再试！')
				}
				this.$router.push("/myclass")
			}
		}
	}
</script>

<style lang="less" scoped>
	.user_info>p:first-child {
		font-weight: 600;
	}
	.user_info>p:last-child {
		font-size: 15px;
	}

	.el-card {
		margin-bottom: 15px;
	}

	.home_item_box>span:last-child {
		font-size: 20px;
		font-weight: 600;
	}
	.home_class_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 15px;
		font-size: 15px;
	}
	.el-icon-user-solid {
		margin-left: 10px;
		color: #63B0FF;
	}
	.home_class_item {
		font-size: 13px;
		margin-top: 15px;
	}
	.home_class_button {
		margin-top: 10px;
		display: flex;
		justify-content: flex-end;
	}
</style>

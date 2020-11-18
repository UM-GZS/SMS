<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>上课记录</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-row :gutter="24">
				<el-col :span="10">
					<el-input placeholder="请输入内容" v-model="sosInput" class="input-with-select">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
				<el-col :span="14">
					<el-date-picker v-model="dateSelect" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-col>
			</el-row>
			<el-table :data="rightList" stripe border>
				<el-table-column prop="className" label="课程名" width="250px">
				</el-table-column>
				<el-table-column prop="teacher" label="老师">
				</el-table-column>
				<el-table-column prop="classType" label="类型">
				</el-table-column>
				<el-table-column prop="status" label="状态">
				</el-table-column>
				<el-table-column prop="date" label="日期">
				</el-table-column>
				<el-table-column prop="time" label="时间">
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
			:page-sizes="[1, 2, 5, 10]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				classData: [{
						className: '【UI】快速掌握产品流程图设计',
						teacher: '刘老师',
						classType: '必修',
						status: '准时',
						date: '2020-11-13',
						time: '20:45'
					},
					{
						className: '【Java】函数式编程',
						teacher: '张老师',
						classType: '必修',
						status: '准时',
						date: '2020-10-15',
						time: '12:45'
					},
					{
						className: '【大数据】轻松掌握Spark3.0新特性',
						teacher: '郑老师',
						classType: '必修',
						status: '准时',
						date: '2020-10-19',
						time: '10:45'
					},
					{
						className: '【UI】快速掌握产品流程图设计',
						teacher: '刘老师',
						classType: '必修',
						status: '准时',
						date: '2020-11-13',
						time: '20:45'
					},
					{
						className: '【Java】函数式编程',
						teacher: '张老师',
						classType: '必修',
						status: '准时',
						date: '2020-10-15',
						time: '12:45'
					},
					{
						className: '【大数据】轻松掌握Spark3.0新特性',
						teacher: '郑老师',
						classType: '必修',
						status: '准时',
						date: '2020-10-19',
						time: '10:45'
					}
				],
				pagenum: 1,
				pagesize: 2,
				total: 0,
				rightList: [],
				sosInput: '',
				dateSelect: ''
			}
		},
		created() {
			this.total = this.classData.length
			this.setPage(this.pagesize, this.pagenum)
		},
		methods: {
			handleSizeChange(newSize) {
				this.pagesize = newSize
				this.setPage(this.pagesize, this.pagenum)
			},
			handleCurrentChange(newPage) {
				this.pagenum = newPage
				this.setPage(this.pagesize, this.pagenum)
			},
			setPage(size, page) {
				this.rightList = []
				if (this.total % size === 0) {
					for (var i = (page - 1) * size; i < size * page; i++) {
						this.rightList.push(this.classData[i])
					}
					return
				}
				var pageCount = Math.ceil(this.total / size)
				if (pageCount === page) {
					for (var j = (page - 1) * size; j < this.total; j++) {
						this.rightList.push(this.classData[j])
					}
					return
				}
				for (var z = (page - 1) * size; z < size * page; z++) {
					this.rightList.push(this.classData[z])
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-card {
		margin-top: 15px;
	}

	.el-pagination {
		margin-top: 15px;
	}

	.el-table {
		margin-top: 15px;
	}
</style>

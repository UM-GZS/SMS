<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>我的课室</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="el-card-top">
			<el-row class="el-row-top">
				<el-col :span="2">
					<i class="iconfont icon-ketang"></i>
				</el-col>
				<el-col :span="22">
					<el-row>
						<el-col :span="8">
							<div class="user_info">
								<p>老师：<span>{{classInfo.teacher}}</span></p>
								<p>课程：<span>{{classInfo.className}}</span></p>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="user_info">
								<p>本课程共：</p>
								<p><span>{{classInfo.classTotal}}</span>节</p>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="user_info">
								<p>本节课第：</p>
								<p><span>{{classInfo.classSize}}</span>节</p>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="user_info">
								<p>你已上课：</p>
								<p><span>{{classInfo.classNum}}</span>节</p>
							</div>
						</el-col>
						<el-col :span="4">
							<el-button type="primary" class="user_info_button">报到</el-button>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</el-card>
		<el-row :gutter="24">
			<el-col :span="14">
				<el-card>
					<div>互动记录</div>
					<div class="chat_item">
						<hd-scroll>
							<ul class="chat_list">
								<li :class="[item.status===0 ? 'chat_list_left' : 'chat_list_right']" v-for="(item, index) in msgList" :key="index">
									<el-avatar :size="50" :class="[item.status===0 ? 'chat_list_left_img' : 'chat_list_right_img']" :src="item.avatarUrl"></el-avatar>
									<div :class="[item.status=== 0 ? 'chat_list_left_text' : 'chat_list_right_text']">
										<p>
											<span class="chat_list_span">{{item.time}}</span>
											{{item.msg}}
										</p>
									</div>
								</li>
							</ul>
						</hd-scroll>
					</div>
				</el-card>
			</el-col>
			<el-col :span="10">
				<el-card>
					<div>留言</div>
					<el-row>
						<el-button class="chat_button" icon="el-icon-picture-outline"></el-button>
						<el-button class="chat_button" icon="el-icon-folder-opened"></el-button>
					</el-row>
					<el-form class="chat_form">
						<el-form-item>
							<el-input :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入内容"
							v-model="textarea" maxlength="100" show-word-limit>
							</el-input>
						</el-form-item>
						<el-button class="chat_form_button" size="small" type="primary">发送消息</el-button>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import hdScroll from '../../components/tools/hdScroll.vue'
	export default {
		data() {
			return {
				textarea: '',
				classInfo: {
					teacher: '刘老师',
					className: '【大数据】轻松掌握Spark3.0新特性',
					classTotal: 20,
					classSize: 14,
					classNum: 14
				},
				msgList: [
					{
						avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						time: '2020-11-11 14:31',
						msg: 'fkjdsklajfkld',
						status: 0
					},
					{
						avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						time: '2020-11-11 14:31',
						msg: 'fk45454545kld',
						status: 1
					},
					{
						avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						time: '2020-11-11 14:31',
						msg: 'fkjds5454545klajfkld',
						status: 0
					},
					{
						avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						time: '2020-11-11 14:31',
						msg: 'lajfkld',
						status: 0
					},
					{
						avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						time: '2020-11-11 14:31',
						msg: 'lajfkld',
						status: 0
					}
				]
			}
		},
		components: {
			hdScroll
		}
	}
</script>

<style lang="less" scoped>
	.el-card {
		margin-top: 15px;
	}

	.el-row-top {
		display: flex;
		align-items: center;
	}

	.icon-ketang {
		font-size: 40px;
		color: #409EFF;
		position: relative;
		left: 20px;
	}

	.user_info_button {
		position: absolute;
		top: 30%;
		left: 90%;
	}

	.chat_item {
		margin-top: 10px;
		height: 240px;
	}

	.chat_list {
		margin-top: 2%;
		padding: 3%;
		padding-bottom: 70px;
		list-style: none;
	}

	.chat_list_left,
	.chat_list_right {
		width: 100%;
		margin-bottom: 20px;
	}

	.chat_list_left {
		float: left;
	}

	.chat_list_right {
		float: right;
	}

	.chat_list_right_text,
	.chat_list_left_text {
		max-width: 70%;
		word-wrap: break-word;
		word-break: normal;
	}

	.chat_list_left_text {
		margin-left: 4%;
		float: left;
	}

	.chat_list_right_text {
		margin-right: 4%;
		float: right;
	}

	.chat_list_span {
		display: inline-block;
		font-size: 13px;
		line-height: 10px;
	}

	.chat_list_left p,
	.chat_list_right p {
		display: block;
		border-radius: 5px;
		padding: 10px;
		background-color: #EAEAEA;
		border: 0.5px;
		position: relative;
		line-height: 25px;
		font-size: 15px;
	}
	.chat_list_right p {
		background-color: #9CDFD8;
	}

	.chat_list_left p span,
	.chat_list_right p span {
		position: absolute;
		top: -15px;
		width: 150px;
		display: block;
		font-size: 10px;
	}

	.chat_list_left p span {
		left: 0;
	}

	.chat_list_right p span {
		right: 0;
		text-align: right;
	}

	.chat_list_left_img {
		float: left;
	}

	.chat_list_right_img {
		float: right;
	}

	.chat_list_left_text p:before {
		content: '';
		position: absolute;
		right: 100%;
		top: 8px;
		width: 0;
		height: 0;
		border-width: 10px;
		border-style: solid;
		border-color: transparent;
		border-right-width: 16px;
		border-right-color: currentColor;
		color: #EAEAEA;
	}

	.chat_list_right_text p:after {
		content: '';
		position: absolute;
		left: 100%;
		top: 8px;
		width: 0;
		height: 0;
		border-width: 10px;
		border-style: solid;
		border-color: transparent;
		border-left-width: 16px;
		border-left-color: currentColor;
		color: #9CDFD8;
	}
	.el-form {
		margin-top: 15px;
	}
	.chat_form_button {
		position: relative;
		left: 335px;
	}
	.chat_button {
		padding: 5px 10px;
		margin-top: 10px;
		font-size: 20px;
	}
	.user_info p span {
		font-weight: 600;
	}
</style>

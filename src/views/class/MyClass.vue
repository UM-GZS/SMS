<template>
	<div>
		<el-row :gutter="24">
			<el-col :span="8">
				<el-card class="el-card-top">
						<el-row :gutter="24">
							<el-col :span="4">
								<img v-if="classInfo.gender === 0" class="avatar"  src="../../assets/img/gril.png">
								<img v-else class="avatar" src="../../assets/img/boy.png">
							</el-col>
							<el-col :span="10">
								<p class="tName"><span>{{classInfo.teacher}}</span></p>
							</el-col>
						</el-row>
						<el-row>
							<p class="tName">课程：<span>{{classInfo.className}}</span></p>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="8">
							<div class="user_info">
								<p>本课程共：</p>
								<p><span>{{classInfo.classTotal}}</span>节</p>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="user_info">
								<p>本节课第：</p>
								<p><span>{{classInfo.classSize}}</span>节</p>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="user_info">
								<p>你已上课：</p>
								<p><span>{{classInfo.classNum}}</span>节</p>
							</div>
						</el-col>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="24">
							<el-button type="primary" class="user_info_button">报到</el-button>
						</el-col>
						</el-row>
				</el-card>
			</el-col>
			<el-col :span="16">
				<el-card>
					<div class="chat_item"> 
						<hd-scroll ref="scrollView">
							<ul class="chat_list">
								<li v-for="(item, index) in msgList" :key="index" :class="[item.status===0 ? 'chat_list_left' : 'chat_list_right']" ref="chatItem">
									<el-avatar :size="50" :class="[item.status===0 ? 'chat_list_left_img' : 'chat_list_right_img']" :src="item.avatarUrl"></el-avatar>
									<div :class="[item.status=== 0 ? 'chat_list_left_text' : 'chat_list_right_text']">
										<p v-if="item.type === 'text'" class="chat_item_list">
											<span class="chat_list_span">{{item.time}}</span>
											{{item.msg}}
										</p>
										<p v-else-if="item.type === 'img'" class="chat_item_list">
											<span class="chat_list_span">{{item.time}}</span>
											<img :src="item.msg">
										</p>
										<p v-else class="chat_item_list chat_item_file">
											<span class="chat_list_span">{{item.time}}</span>
											<i class="el-icon-document">{{item.msg}}</i>
										</p>
									</div>
								</li>
							</ul>
						</hd-scroll>
					</div>
						<el-row>
						<el-button class="chat_button" icon="el-icon-picture-outline" @click="upPictureDialog = true"></el-button>
						<el-button class="chat_button" icon="el-icon-folder-opened" @click="upFileDialog = true"></el-button>
					</el-row>
					<el-form ref="sendFormRef" :model="textarea" :rules="sendRules">
						<el-form-item prop="msg">
							<el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容"
							v-model="textarea.msg" maxlength="200">
							</el-input>
						</el-form-item>
					</el-form>
					<el-button class="chat_form_button" size="small" type="primary" @click="sendMessage">发送消息</el-button>
				</el-card>
			</el-col>
		</el-row>
		<el-dialog
		title="发送文件"
		:visible.sync="upFileDialog"
		width="30%"
		@close="upFileClose">
		<div class="upload">
			<input id="upFileInput" type="file" @change="getFile($event)">
			<span v-if="fileUrl" class="uploadFile">{{fileUrl}}</span>
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</div>
		<span slot="footer" class="dialog-footer">
		<el-button @click="upFileDialog = false">取 消</el-button>
		<el-button type="primary" @click="upFile">确 定</el-button>
		</span>
		</el-dialog>
		<el-dialog
		title="发送图片"
		:visible.sync="upPictureDialog"
		width="30%"
		@close="upPictureClose">
		<div class="upload">
			<input id="upPictureInput" type="file" @change="getPicture($event)" accept=".jpg,.png">
		<img  v-if="imageUrl" :src="imageUrl" class="avatarImage">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</div>
		<span slot="footer" class="dialog-footer">
		<el-button @click="upPictureDialog = false">取 消</el-button>
		<el-button type="primary" @click="upPicture">确 定</el-button>
		</span>
		</el-dialog>
	</div>
</template>

<script>
	import hdScroll from '../../components/tools/hdScroll.vue'
	export default {
		data() {
			return {
				fileUrl: '',
				imageUrl: '',
				upFileDialog: false,
				upPictureDialog: false,
				textarea: {
					msg: ''
				},
				classInfo: {
					teacher: '刘老师',
					gender: 0,
					className: '【大数据】轻松掌握Spark3.0新特性',
					classTotal: 20,
					classSize: 14,
					classNum: 14
				},
				msgList: [
					{
						avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						time: '2020-11-11 14:31',
						msg: 'fkjdsklajfkldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
						status: 0,
						type: 'text'
					},
					{
						avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						time: '2020-11-11 14:31',
						msg: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065270247,3907795081&fm=111&gp=0.jpg',
						status: 1,
						type: 'img'
					},
					{
						avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						time: '2020-11-11 14:31',
						msg: '学习成绩表.xml',
						status: 0,
						type: 'file'
					},
					{
						avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						time: '2020-11-11 14:31',
						msg: 'lajfklddsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
						status: 0,
						type: 'text'
					},
					{
						avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						time: '2020-11-11 14:31',
						msg: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2369017631,3935728806&fm=26&gp=0.jpg',
						status: 0,
						type: 'img'
					}
				],
				sendRules: {
					msg: [{
						required: true,
						message: '内容不能为空',
						trigger: 'blur'
					}]
				},
				itemH: 0
			}
		},
		mounted() {
			this.goPageBottom()
		},
		beforeDestroy() {
			clearTimeout(this.timer);
		},
		methods: {
			goPageBottom() {
				let chatItem = this.$refs.chatItem
			for (var i = 0; i < chatItem.length; i++) {
				this.itemH += chatItem[i].offsetHeight
				}
				if (this.itemH > 400) {
					this.$refs.scrollView.$refs.box.scrollTop = this.itemH
				}
				this.itemH = 0
			},
			sendMessage() {
				this.$refs.sendFormRef.validate(valid => {
					if (!valid) return this.$message.error("内容不能为空");
					let obj = {
						avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
							time: '2020-11-22 22:12',
							msg: this.textarea.msg,
							status: 1,
							type: 'text'
					}
					this.msgList.push(obj)
					this.timer = setTimeout(this.goPageBottom, 100)
					this.textarea.msg = ""
				})
			},
			upPictureClose() {
				document.getElementById("upPictureInput").value = ''
				this.imageUrl = ''
			},
			upFileClose () {
				document.getElementById("upFileInput").value = ''
				this.fileUrl = ''
			},
			upPicture() {
				let obj = {
					avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
					time: '2020-11-22 22:12',
					msg: this.imageUrl,
					status: 1,
					type: 'img'
				}
				this.msgList.push(obj)
				this.timer = setTimeout(this.goPageBottom, 100)
				this.upPictureDialog = false
			},
			upFile() {
				let obj = {
					avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
					time: '2020-11-22 22:12',
					msg: this.fileUrl,
					status: 1,
					type: 'file'
				}
				this.msgList.push(obj)
				this.timer = setTimeout(this.goPageBottom, 100)
				this.upFileDialog = false
			},
			getPicture(event) {
				var that= this
				var file = event.target.files;
				if (file.length !== 0) {
					const isPicture = (file[0].type === 'image/jpeg' || file[0].type === 'image/png');
				const isLt2M = file[0].size / 1024 / 1024 < 2;
				if (!isPicture) {
					document.getElementById("upPictureInput").value = ''
				return that.$message.error('上传图片只能是 JPG 或 PNG 格式!')
				}
				if (!isLt2M) {
					document.getElementById("upPictureInput").value = ''
				return that.$message.error('上传头像图片大小不能超过 2MB!');
				}
				let reader = new FileReader()
				reader.readAsDataURL(file[0])
				reader.onload = function(e) {
					that.imageUrl = e.target.result
				}
			} else {
				that.imageUrl = ''
			}
			},
			getFile (event) {
				var that =this
				console.log("event is ", event)
				var file = event.target.files;
				if (file.length !== 0) {
					// let reader = new FileReader()
					// reader.readAsDataURL(file[0])
					// reader.onload = function(e) {
					// that.fileUrl = e.target.result
					// }
					that.fileUrl = file[0].name
				} else {
					that.fileUrl = ''
				}
			}
		},
		components: {
			hdScroll
		}
	}
</script>

<style lang="less" scoped>
	.avatar {
		width: 50px;
		height: 50px;
	}

	.user_info_button {
		margin-top: 15px;
		width: 100%;
	}

	.tName span{
		font-weight: 600;	
	}
	.chat_item {
		background-color: #f4f4f4;
		height: 300px;
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
		background-color: #FEFCFF;
		border: 0.5px;
		position: relative;
		line-height: 25px;
		font-size: 15px;
	}
	.chat_list_right p {
		background-color: #95CE59;
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
		color: #FEFCFF;
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
		color: #95CE59;
	}
	.chat_form_button {
		position: relative;
		left: 90%;
	}
	.chat_button {
		border: none;
		padding: 5px 0px;
		font-size: 20px;
	}
	.user_info p span {
		font-weight: 600;
	}
	.chat_item_list img {
		max-width: 200px;
		height: auto;
	}
	.avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatarImage {
    max-width: 100%;
    height: 178px;
    display: inline-block;
  }
	.chat_item_file i{
	cursor: pointer;
	}
	.chat_item_file i:hover {
		color: #409EFE;
	}
	.upload {
		width: 90%;
		height: 150px;
		margin: 0 auto;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		text-align: center;
	}
	.upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 150px;
		line-height: 150px;
	}
	.upload input {
		opacity: 0;
		width: 100%;
		position: absolute;
		right: 0;
		top: 0;
		line-height: 150px;
	}
	.uploadFile {
		display: inline-block;
		line-height: 150px;
	}
</style>
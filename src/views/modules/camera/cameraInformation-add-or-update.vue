<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="相机SN码" prop="cameraSn">
      <el-input v-model="dataForm.cameraSn" placeholder="相机SN码"></el-input>
    </el-form-item>
    <el-form-item label="相机地址" prop="cameraAddress">
      <el-input v-model="dataForm.cameraAddress" placeholder="相机地址"></el-input>
    </el-form-item>
    <el-form-item label="相机类型ID" prop="cameraTypeId">
      <el-input v-model="dataForm.cameraTypeId" placeholder="相机类型ID"></el-input>
    </el-form-item>
    <el-form-item label="对应企业ID" prop="companyId">
      <el-input v-model="dataForm.companyId" placeholder="对应企业ID"></el-input>
    </el-form-item>
    <el-form-item label="内置SIM卡卡号" prop="simCardNumber">
      <el-input v-model="dataForm.simCardNumber" placeholder="内置SIM卡卡号"></el-input>
    </el-form-item>
    <el-form-item label="相机IP地址" prop="ipAddress">
      <el-input v-model="dataForm.ipAddress" placeholder="相机IP地址"></el-input>
    </el-form-item>
    <el-form-item label="相机用户名" prop="cameraUsername">
      <el-input v-model="dataForm.cameraUsername" placeholder="相机用户名"></el-input>
    </el-form-item>
    <el-form-item label="相机密码" prop="cameraPassword">
      <el-input v-model="dataForm.cameraPassword" placeholder="相机密码"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          cameraId: 0,
          cameraSn: '',
          cameraAddress: '',
          cameraTypeId: '',
          companyId: '',
          simCardNumber: '',
          ipAddress: '',
          cameraUsername: '',
          cameraPassword: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          cameraSn: [
            { required: true, message: '相机SN码不能为空', trigger: 'blur' }
          ],
          cameraAddress: [
            { required: true, message: '相机地址不能为空', trigger: 'blur' }
          ],
          cameraTypeId: [
            { required: true, message: '相机类型ID不能为空', trigger: 'blur' }
          ],
          companyId: [
            { required: true, message: '对应企业ID不能为空', trigger: 'blur' }
          ],
          simCardNumber: [
            { required: true, message: '内置SIM卡卡号不能为空', trigger: 'blur' }
          ],
          ipAddress: [
            { required: true, message: '相机IP地址不能为空', trigger: 'blur' }
          ],
          cameraUsername: [
            { required: true, message: '相机用户名不能为空', trigger: 'blur' }
          ],
          cameraPassword: [
            { required: true, message: '相机密码不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.cameraId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.cameraId) {
            this.$http({
              url: this.$http.adornUrl(`/camera/cameraInformation/info/${this.dataForm.cameraId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.cameraSn = data.cameraInformation.cameraSn
                this.dataForm.cameraAddress = data.cameraInformation.cameraAddress
                this.dataForm.cameraTypeId = data.cameraInformation.cameraTypeId
                this.dataForm.companyId = data.cameraInformation.companyId
                this.dataForm.simCardNumber = data.cameraInformation.simCardNumber
                this.dataForm.ipAddress = data.cameraInformation.ipAddress
                this.dataForm.cameraUsername = data.cameraInformation.cameraUsername
                this.dataForm.cameraPassword = data.cameraInformation.cameraPassword
                this.dataForm.createTime = data.cameraInformation.createTime
                this.dataForm.updateTime = data.cameraInformation.updateTime
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/camera/cameraInformation/${!this.dataForm.cameraId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'cameraId': this.dataForm.cameraId || undefined,
                'cameraSn': this.dataForm.cameraSn,
                'cameraAddress': this.dataForm.cameraAddress,
                'cameraTypeId': this.dataForm.cameraTypeId,
                'companyId': this.dataForm.companyId,
                'simCardNumber': this.dataForm.simCardNumber,
                'ipAddress': this.dataForm.ipAddress,
                'cameraUsername': this.dataForm.cameraUsername,
                'cameraPassword': this.dataForm.cameraPassword,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.message)
              }
            })
          }
        })
      }
    }
  }
</script>

<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="企业名称" prop="companyName">
      <el-input v-model="dataForm.companyName" placeholder="企业名称"></el-input>
    </el-form-item>
    <el-form-item label="企业所在地址" prop="companyAddress">
      <el-input v-model="dataForm.companyAddress" placeholder="企业所在地址"></el-input>
    </el-form-item>
    <el-form-item label="企业统一社会信用编码" prop="taxNumber">
      <el-input v-model="dataForm.taxNumber" placeholder="企业统一社会信用编码"></el-input>
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
          companyId: 0,
          companyName: '',
          companyAddress: '',
          taxNumber: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          companyName: [
            { required: true, message: '企业名称不能为空', trigger: 'blur' }
          ],
          companyAddress: [
            { required: true, message: '企业所在地址不能为空', trigger: 'blur' }
          ],
          taxNumber: [
            { required: true, message: '企业统一社会信用编码不能为空', trigger: 'blur' }
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
        this.dataForm.companyId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.companyId) {
            this.$http({
              url: this.$http.adornUrl(`/camera/companyInformation/info/${this.dataForm.companyId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.companyName = data.companyInformation.companyName
                this.dataForm.companyAddress = data.companyInformation.companyAddress
                this.dataForm.taxNumber = data.companyInformation.taxNumber
                this.dataForm.createTime = data.companyInformation.createTime
                this.dataForm.updateTime = data.companyInformation.updateTime
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
              url: this.$http.adornUrl(`/camera/companyInformation/${!this.dataForm.companyId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'companyId': this.dataForm.companyId || undefined,
                'companyName': this.dataForm.companyName,
                'companyAddress': this.dataForm.companyAddress,
                'taxNumber': this.dataForm.taxNumber,
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

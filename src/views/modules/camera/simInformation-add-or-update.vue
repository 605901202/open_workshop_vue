<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="SIM号码" prop="simNumber">
      <el-input v-model="dataForm.simNumber" placeholder="SIM号码"></el-input>
    </el-form-item>
    <el-form-item label="运营商" prop="operator">
      <el-input v-model="dataForm.operator" placeholder="运营商"></el-input>
    </el-form-item>
    <el-form-item label="IP地址" prop="ipAddress">
      <el-input v-model="dataForm.ipAddress" placeholder="IP地址"></el-input>
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
          simId: 0,
          simNumber: '',
          operator: '',
          ipAddress: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          simNumber: [
            { required: true, message: 'SIM号码不能为空', trigger: 'blur' }
          ],
          operator: [
            { required: true, message: '运营商不能为空', trigger: 'blur' }
          ],
          ipAddress: [
            { required: true, message: 'IP地址不能为空', trigger: 'blur' }
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
        this.dataForm.simId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.simId) {
            this.$http({
              url: this.$http.adornUrl(`/camera/simInformation/info/${this.dataForm.simId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.simNumber = data.simInformation.simNumber
                this.dataForm.operator = data.simInformation.operator
                this.dataForm.ipAddress = data.simInformation.ipAddress
                this.dataForm.createTime = data.simInformation.createTime
                this.dataForm.updateTime = data.simInformation.updateTime
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
              url: this.$http.adornUrl(`/camera/simInformation/${!this.dataForm.simId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'simId': this.dataForm.simId || undefined,
                'simNumber': this.dataForm.simNumber,
                'operator': this.dataForm.operator,
                'ipAddress': this.dataForm.ipAddress,
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

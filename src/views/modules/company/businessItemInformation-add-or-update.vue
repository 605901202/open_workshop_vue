<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="经营项目名称" prop="businessItemName">
      <el-input v-model="dataForm.businessItemName" placeholder="经营项目名称"></el-input>
    </el-form-item>
    <el-form-item label="父项目ID" prop="fatherId">
      <el-input v-model="dataForm.fatherId" placeholder="父项目ID"></el-input>
    </el-form-item>
    <el-form-item label="权重" prop="sort">
      <el-input v-model="dataForm.sort" placeholder="权重"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
          businessItemId: 0,
          businessItemName: '',
          fatherId: '',
          sort: '',
          remark: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          businessItemName: [
            { required: true, message: '经营项目名称不能为空', trigger: 'blur' }
          ],
          fatherId: [
            { required: true, message: '父项目ID不能为空', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '权重不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.businessItemId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.businessItemId) {
            this.$http({
              url: this.$http.adornUrl(`/company/businessItemInformation/info/${this.dataForm.businessItemId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.businessItemName = data.businessItemInformation.businessItemName
                this.dataForm.fatherId = data.businessItemInformation.fatherId
                this.dataForm.sort = data.businessItemInformation.sort
                this.dataForm.remark = data.businessItemInformation.remark
                this.dataForm.createTime = data.businessItemInformation.createTime
                this.dataForm.updateTime = data.businessItemInformation.updateTime
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
              url: this.$http.adornUrl(`/company/businessItemInformation/${!this.dataForm.businessItemId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'businessItemId': this.dataForm.businessItemId || undefined,
                'businessItemName': this.dataForm.businessItemName,
                'fatherId': this.dataForm.fatherId,
                'sort': this.dataForm.sort,
                'remark': this.dataForm.remark,
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

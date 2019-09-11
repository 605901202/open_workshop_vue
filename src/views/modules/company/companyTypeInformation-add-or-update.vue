<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="企业性质名称" prop="companyTypeName">
        <el-input v-model="dataForm.companyTypeName" placeholder="企业性质名称"></el-input>
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
          companyTypeId: 0,
          companyTypeName: '',
          sort: '',
          remark: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          companyTypeName: [
            {required: true, message: '企业性质名称不能为空', trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '权重不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '备注不能为空', trigger: 'blur'}
          ],
          createTime: [
            {required: true, message: '创建时间不能为空', trigger: 'blur'}
          ],
          updateTime: [
            {required: true, message: '更新时间不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.companyTypeId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.companyTypeId) {
            this.$http({
              url: this.$http.adornUrl(`/company/companyTypeInformation/info/${this.dataForm.companyTypeId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.companyTypeName = data.companyTypeInformation.companyTypeName
                this.dataForm.sort = data.companyTypeInformation.sort
                this.dataForm.remark = data.companyTypeInformation.remark
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
              url: this.$http.adornUrl(`/company/companyTypeInformation/${!this.dataForm.companyTypeId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'companyTypeId': this.dataForm.companyTypeId || undefined,
                'companyTypeName': this.dataForm.companyTypeName,
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

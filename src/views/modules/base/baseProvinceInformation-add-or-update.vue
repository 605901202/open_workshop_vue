<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="省份代码" prop="provinceCode">
      <el-input v-model="dataForm.provinceCode" placeholder="省份代码"></el-input>
    </el-form-item>
    <el-form-item label="省份名称" prop="provinceName">
      <el-input v-model="dataForm.provinceName" placeholder="省份名称"></el-input>
    </el-form-item>
    <el-form-item label="简称" prop="shortName">
      <el-input v-model="dataForm.shortName" placeholder="简称"></el-input>
    </el-form-item>
    <el-form-item label="经度" prop="longitude">
      <el-input v-model="dataForm.longitude" placeholder="经度"></el-input>
    </el-form-item>
    <el-form-item label="纬度" prop="latitude">
      <el-input v-model="dataForm.latitude" placeholder="纬度"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="修改时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="修改时间"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="状态 0:停用 1:启用" prop="useStatus">
      <el-input v-model="dataForm.useStatus" placeholder="状态 0:停用 1:启用"></el-input>
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
          provinceId: 0,
          provinceCode: '',
          provinceName: '',
          shortName: '',
          longitude: '',
          latitude: '',
          sort: '',
          createTime: '',
          updateTime: '',
          remark: '',
          useStatus: ''
        },
        dataRule: {
          provinceCode: [
            { required: true, message: '省份代码不能为空', trigger: 'blur' }
          ],
          provinceName: [
            { required: true, message: '省份名称不能为空', trigger: 'blur' }
          ],
          shortName: [
            { required: true, message: '简称不能为空', trigger: 'blur' }
          ],
          longitude: [
            { required: true, message: '经度不能为空', trigger: 'blur' }
          ],
          latitude: [
            { required: true, message: '纬度不能为空', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '修改时间不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          useStatus: [
            { required: true, message: '状态 0:停用 1:启用不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.provinceId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.provinceId) {
            this.$http({
              url: this.$http.adornUrl(`/base/baseprovinceinformation/info/${this.dataForm.provinceId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.provinceCode = data.baseprovinceinformation.provinceCode
                this.dataForm.provinceName = data.baseprovinceinformation.provinceName
                this.dataForm.shortName = data.baseprovinceinformation.shortName
                this.dataForm.longitude = data.baseprovinceinformation.longitude
                this.dataForm.latitude = data.baseprovinceinformation.latitude
                this.dataForm.sort = data.baseprovinceinformation.sort
                this.dataForm.createTime = data.baseprovinceinformation.createTime
                this.dataForm.updateTime = data.baseprovinceinformation.updateTime
                this.dataForm.remark = data.baseprovinceinformation.remark
                this.dataForm.useStatus = data.baseprovinceinformation.useStatus
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
              url: this.$http.adornUrl(`/base/baseprovinceinformation/${!this.dataForm.provinceId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'provinceId': this.dataForm.provinceId || undefined,
                'provinceCode': this.dataForm.provinceCode,
                'provinceName': this.dataForm.provinceName,
                'shortName': this.dataForm.shortName,
                'longitude': this.dataForm.longitude,
                'latitude': this.dataForm.latitude,
                'sort': this.dataForm.sort,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime,
                'remark': this.dataForm.remark,
                'useStatus': this.dataForm.useStatus
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

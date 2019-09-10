<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="市代码" prop="cityCode">
      <el-input v-model="dataForm.cityCode" placeholder="市代码"></el-input>
    </el-form-item>
    <el-form-item label="市名称" prop="cityName">
      <el-input v-model="dataForm.cityName" placeholder="市名称"></el-input>
    </el-form-item>
    <el-form-item label="简称" prop="shortName">
      <el-input v-model="dataForm.shortName" placeholder="简称"></el-input>
    </el-form-item>
    <el-form-item label="省代码" prop="provinceCode">
      <el-input v-model="dataForm.provinceCode" placeholder="省代码"></el-input>
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
          cityId: 0,
          cityCode: '',
          cityName: '',
          shortName: '',
          provinceCode: '',
          longitude: '',
          latitude: '',
          sort: '',
          createTime: '',
          updateTime: '',
          remark: '',
          useStatus: ''
        },
        dataRule: {
          cityCode: [
            { required: true, message: '市代码不能为空', trigger: 'blur' }
          ],
          cityName: [
            { required: true, message: '市名称不能为空', trigger: 'blur' }
          ],
          shortName: [
            { required: true, message: '简称不能为空', trigger: 'blur' }
          ],
          provinceCode: [
            { required: true, message: '省代码不能为空', trigger: 'blur' }
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
          useStatus: [
            { required: true, message: '状态 0:停用 1:启用不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.cityId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.cityId) {
            this.$http({
              url: this.$http.adornUrl(`/base/baseCityInformation/info/${this.dataForm.cityId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.cityCode = data.baseCityInformation.cityCode
                this.dataForm.cityName = data.baseCityInformation.cityName
                this.dataForm.shortName = data.baseCityInformation.shortName
                this.dataForm.provinceCode = data.baseCityInformation.provinceCode
                this.dataForm.longitude = data.baseCityInformation.longitude
                this.dataForm.latitude = data.baseCityInformation.latitude
                this.dataForm.sort = data.baseCityInformation.sort
                this.dataForm.createTime = data.baseCityInformation.createTime
                this.dataForm.updateTime = data.baseCityInformation.updateTime
                this.dataForm.remark = data.baseCityInformation.remark
                this.dataForm.useStatus = data.baseCityInformation.useStatus
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
              url: this.$http.adornUrl(`/base/baseCityInformation/${!this.dataForm.cityId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'cityId': this.dataForm.cityId || undefined,
                'cityCode': this.dataForm.cityCode,
                'cityName': this.dataForm.cityName,
                'shortName': this.dataForm.shortName,
                'provinceCode': this.dataForm.provinceCode,
                'longitude': this.dataForm.longitude,
                'latitude': this.dataForm.latitude,
                'sort': this.dataForm.sort,
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

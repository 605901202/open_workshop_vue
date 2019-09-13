<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="区代码" prop="regionCode">
      <el-input v-model="dataForm.regionCode" placeholder="区代码"></el-input>
    </el-form-item>
    <el-form-item label="父级市代码" prop="cityCode">
      <el-input v-model="dataForm.cityCode" placeholder="父级市代码"></el-input>
    </el-form-item>
    <el-form-item label="市名称" prop="areaName">
      <el-input v-model="dataForm.areaName" placeholder="市名称"></el-input>
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
    <el-form-item label="状态" prop="useStatus">
      <el-input v-model="dataForm.useStatus" placeholder="状态"></el-input>
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
          areaId: 0,
          regionCode: '',
          cityCode: '',
          areaName: '',
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
          regionCode: [
            { required: true, message: '区划代码不能为空', trigger: 'blur' }
          ],
          cityCode: [
            { required: true, message: '父级市代码不能为空', trigger: 'blur' }
          ],
          areaName: [
            { required: true, message: '市名称不能为空', trigger: 'blur' }
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
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.areaId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.areaId) {
            this.$http({
              url: this.$http.adornUrl(`/base/baseareainformation/info/${this.dataForm.areaId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.regionCode = data.baseareainformation.regionCode
                this.dataForm.cityCode = data.baseareainformation.cityCode
                this.dataForm.areaName = data.baseareainformation.areaName
                this.dataForm.shortName = data.baseareainformation.shortName
                this.dataForm.longitude = data.baseareainformation.longitude
                this.dataForm.latitude = data.baseareainformation.latitude
                this.dataForm.sort = data.baseareainformation.sort
                this.dataForm.createTime = data.baseareainformation.createTime
                this.dataForm.updateTime = data.baseareainformation.updateTime
                this.dataForm.remark = data.baseareainformation.remark
                this.dataForm.useStatus = data.baseareainformation.useStatus
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
              url: this.$http.adornUrl(`/base/baseareainformation/${!this.dataForm.areaId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'areaId': this.dataForm.areaId || undefined,
                'regionCode': this.dataForm.regionCode,
                'cityCode': this.dataForm.cityCode,
                'areaName': this.dataForm.areaName,
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

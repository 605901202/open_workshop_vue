<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :inline="true" :label-position="top" label-width="150px" :model="dataForm" :rules="dataRule" ref="dataForm"
             @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="企业名称" prop="companyName">
        <el-input v-model="dataForm.companyName" placeholder="企业名称"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="companyAddress">
        <el-input v-model="dataForm.companyAddress" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item label="地区代码" prop="addressCode">
        <el-input v-model="dataForm.addressCode" placeholder="地区代码"></el-input>
      </el-form-item>
      <el-form-item label="法人" prop="corporate">
        <el-input v-model="dataForm.corporate" placeholder="法人"></el-input>
      </el-form-item>
      <el-form-item label="社会信用代码" prop="taxNumber">
        <el-input v-model="dataForm.taxNumber" placeholder="统一社会信用代码"></el-input>
      </el-form-item>
      <el-form-item label="许可证号" prop="roadLicenseNumber">
        <el-input v-model="dataForm.roadLicenseNumber" placeholder="道路运输经营许可证号"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="principal">
        <el-input v-model="dataForm.principal" placeholder="主要负责人"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="principalNumber">
        <el-input v-model="dataForm.principalNumber" placeholder="负责人身份证号码"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="principalPhone">
        <el-input v-model="dataForm.principalPhone" placeholder="负责人联系电话"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="principalMail">
        <el-input v-model="dataForm.principalMail" placeholder="负责人邮箱"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="企业性质" prop="companyTypeId">
        <el-select v-model="dataForm.companyTypeId" placeholder="企业性质">
          <el-option
            v-for="companyTypeEntity in companyTypeEntityList"
            :key="companyTypeEntity.companyTypeId"
            :label="companyTypeEntity.companyTypeName"
            :value="companyTypeEntity.companyTypeId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用" prop="useStatus">
        <el-radio-group v-model="dataForm.useStatus">
          <el-radio-button v-model="dataForm.useStatus" label="1">启用</el-radio-button>
          <el-radio-button v-model="dataForm.useStatus" label="2">停用</el-radio-button>
        </el-radio-group>
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
          addressCode: '',
          corporate: '',
          taxNumber: '',
          roadLicenseNumber: '',
          principal: '',
          principalNumber: '',
          principalPhone: '',
          principalMail: '',
          remark: '',
          companyTypeId: '',
          useStatus: ''
        },
        dataRule: {
          companyName: [
            {required: true, message: '经营者(企业)名称不能为空', trigger: 'blur'}
          ],
          companyAddress: [
            {required: true, message: '企业地址不能为空', trigger: 'blur'}
          ],
          addressCode: [
            {required: true, message: '地区代码不能为空', trigger: 'blur'}
          ],
          corporate: [
            {required: true, message: '法定代表人不能为空', trigger: 'blur'}
          ],
          taxNumber: [
            {required: true, message: '统一社会信用代码不能为空', trigger: 'blur'}
          ],
          principal: [
            {required: true, message: '主要负责人不能为空', trigger: 'blur'}
          ],
          principalNumber: [
            {required: true, message: '负责人身份证号码不能为空', trigger: 'blur'}
          ],
          principalPhone: [
            {required: true, message: '负责人联系电话不能为空', trigger: 'blur'}
          ],
          principalMail: [
            {required: true, message: '负责人邮箱不能为空', trigger: 'blur'}
          ],
          companyTypeId: [
            {required: true, message: '企业性质(类型)不能为空', trigger: 'blur'}
          ],
          useStatus: [
            {required: true, message: '是否启用不能为空', trigger: 'blur'}
          ]
        },
        companyTypeEntityList: [{
          value: '1',
          label: '国有'
        }, {
          value: '2',
          label: '集体'
        }],
        value: ''
      }
    },
    methods: {
      init (id) {
        this.getCompanyTypeEntityList()
        console.log(this.companyTypeEntityList)
        this.dataForm.companyId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.companyId) {
            this.$http({
              url: this.$http.adornUrl(`/company/companyInformation/info/${this.dataForm.companyId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.companyName = data.companyInformation.companyName
                this.dataForm.companyAddress = data.companyInformation.companyAddress
                this.dataForm.addressCode = data.companyInformation.addressCode
                this.dataForm.corporate = data.companyInformation.corporate
                this.dataForm.taxNumber = data.companyInformation.taxNumber
                this.dataForm.roadLicenseNumber = data.companyInformation.roadLicenseNumber
                this.dataForm.principal = data.companyInformation.principal
                this.dataForm.principalNumber = data.companyInformation.principalNumber
                this.dataForm.principalPhone = data.companyInformation.principalPhone
                this.dataForm.principalMail = data.companyInformation.principalMail
                this.dataForm.remark = data.companyInformation.remark
                this.dataForm.companyTypeId = data.companyInformation.companyTypeId
                this.dataForm.useStatus = data.companyInformation.useStatus
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
              url: this.$http.adornUrl(`/company/companyInformation/${!this.dataForm.companyId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'companyId': this.dataForm.companyId || undefined,
                'companyName': this.dataForm.companyName,
                'companyAddress': this.dataForm.companyAddress,
                'addressCode': this.dataForm.addressCode,
                'corporate': this.dataForm.corporate,
                'taxNumber': this.dataForm.taxNumber,
                'roadLicenseNumber': this.dataForm.roadLicenseNumber,
                'principal': this.dataForm.principal,
                'principalNumber': this.dataForm.principalNumber,
                'principalPhone': this.dataForm.principalPhone,
                'principalMail': this.dataForm.principalMail,
                'remark': this.dataForm.remark,
                'companyTypeId': this.dataForm.companyTypeId,
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
      },
      getCompanyTypeEntityList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/company/companyTypeInformation/list'),
          method: 'post',
          data: this.$http.adornParams({
            'page': 1,
            'limit': 20
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.companyTypeEntityList = data.page.list
          } else {
            this.companyTypeEntityList = []
          }
        })
      }
    }
  }
</script>

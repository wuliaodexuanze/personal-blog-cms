<template>
  <div class="container">
    <div class="title">新建链接</div>
    <div class="wrap">
      <el-row>
        <el-col
          :lg="16"
          :md="20"
          :sm="24"
          :xs="24">
          <el-form
            :model="form"
            status-icon
            :rules="rules"
            ref="form"
            v-loading="loading"
            label-width="100px"
            @submit.native.prevent>
            <el-form-item label="链接名" prop="name">
              <el-input size="medium" clearable v-model="form.name" placeholder="请填链接名"></el-input>
            </el-form-item>
            <el-form-item label="链接地址" prop="path">
              <el-input size="medium" clearable v-model="form.path" placeholder="请填链接地址"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
              <el-input size="medium" clearable v-model="form.desc" placeholder="请填链描述"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import link from '@/models/link'

export default {
  data() {
    return {
      loading: false,
      form: {
        name: '',
        path: '',
        desc: '',
      },
      rules: {
        name: [
          {
            required: true, message: '请输入链接名称', trigger: ['blur', 'change'],
          },
        ],
        path: [
          {
            required: true, message: '请输入链接地址', trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const res = await link.addLink(this.form)
            if (res.error_code === 0) {
              this.$message.success(`${res.msg}`)
              this.resetForm(formName)
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          return false
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>

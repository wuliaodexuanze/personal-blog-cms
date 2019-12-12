<template>
  <div class="container">
    <div class="title">新建标签</div>
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
            ref="form"
            label-width="100px"
            @submit.native.prevent>
            <el-form-item
              label="标签名"
              prop="name"
              :rules="[
                { required: true, message: '请输入标签名', trigger: ['blur', 'change'] }
              ]"
            >
              <el-input size="medium" v-model="form.name" placeholder="请填标签名"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
              <el-input size="medium" v-model="form.desc" placeholder="请填描述"></el-input>
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
import tag from '@/models/tag'

export default {
  data() {
    return {
      form: {
        name: '',
        desc: '',
      },
    }
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const res = await tag.addTag(this.form)
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

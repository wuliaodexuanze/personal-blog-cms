<template>
  <div class="container">
    <div class="title">
      <span>修改分类</span>
      <span class="back" @click="back">
        <i class="iconfont icon-fanhui"></i> 返回
      </span>
    </div>
    <el-divider></el-divider>
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
              label="分类名"
              prop="name"
              :rules="[
                {required: true, message: '请输入分类名', trigger: ['blur', 'change'] }
              ]">
              <el-input size="medium" v-model="form.name" placeholder="请填分类名"></el-input>
            </el-form-item>
            <el-form-item
              label="路径"
              prop="path"
              :rules="[
                {required: true, message: '请输入路径', trigger: ['blur', 'change'] }
              ]">
              <el-input size="medium" v-model="form.path" placeholder="请填路径"></el-input>
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
import classify from '@/models/classify'

export default {
  props: {
    editClassifyID: {
      type: Number,
    },
  },
  data() {
    return {
      form: {
        name: '',
        path: '',
        desc: '',
      },
    }
  },
  async mounted() {
    this.loading = true
    this.form = await classify.getClassify(this.editClassifyID)
    this.loading = false
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await classify.editClassify(this.editClassifyID, this.form)
          if (res.error_code === 0) {
            this.$message.success(`${res.msg}`)
            this.$emit('editClose')
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
    back() {
      this.$emit('editClose')
    },
  },
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0
}

.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>

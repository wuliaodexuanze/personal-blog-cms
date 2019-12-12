<template>
  <div class="container">
    <div class="title">新建文章</div>
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
            <el-form-item label="文章封面图" prop="image">
              <upload-imgs
                ref="uploadCover"
                :rules="rules"
                :multiple="false"
                :minNum=0
                :maxNum=1 />
            </el-form-item>
            <el-form-item
              label="文章标题"
              prop="title"
              :rules="[
                { required: true, message: '请输入文章标题', trigger: ['blur', 'change'] }
              ]">
              <el-input size="medium" v-model="form.title" placeholder="请填文章标题"></el-input>
            </el-form-item>
            <el-form-item
              label="文章描述"
              prop="desc">
              <el-input size="medium" v-model="form.desc" placeholder="请填文章描述"></el-input>
            </el-form-item>
            <el-form-item
              label="文章分类"
              prop="classify_id"
              :rules="[
                { required: true, message: '请选择文章分类', trigger: 'blur' }
              ]">
               <el-select  size="medium" clearable v-model="form.classify_id" placeholder="请选择文章分类" style="width: 100%">
                  <el-option
                    v-for="item in classifys"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
              label="文章标签"
              prop="tags"
              :rules="[
                { required: true, message: '请选择标签', trigger: 'blur' }
              ]">
               <el-select
                size="medium"
                multiple
                v-model="form.tags"
                placeholder="请选择文章标签(可多选)"
                style="width: 100%">
                <el-option
                  v-for="item in tags"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="文章内容"
              prop="content"
              :rules="[
                { required: true, message: '请选择标签', trigger: 'blur' }
              ]">
              <tinymce ref="tinymce" @change="change" :fullpage="false" upload_url="/cms/file" />
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
import blog from '@/models/blog'
import tag from '@/models/tag'
import classify from '@/models/classify'
import Tinymce from '@/components/base/tinymce'
import UploadImgs from '@/components/base/upload-imgs'

export default {
  components: {
    Tinymce,
    UploadImgs,
  },
  data() {
    return {
      loading: false,
      form: {
        title: '',
        desc: '',
        image: '',
        content: '',
        classify_id: '',
        tags: [],
      },
      rules: {
        minWidth: 780,
        minHeight: 260,
        maxSize: 5,
      },
      tags: [],
      classifys: [],
    }
  },
  async mounted() {
    this.loading = true
    await this.getTags()
    await this.getClassifys()
    this.loading = false
  },
  methods: {
    change(val) {
      this.form.content = val
    },
    /**
     * 清空上传图片
     */
    clearUploadImg() {
      this.$refs.uploadCover.clear()
    },
    /**
     * 获取上传图片信息
     */
    async getValue() {
      const imgData = await this.$refs.uploadCover.getValue()
      return imgData
    },
    /**
     * 表单提交,添加文章
     */
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const coverImg = await this.getValue()
          if (coverImg && coverImg.length > 0) {
            this.form.image = coverImg[0].display
          } else {
            this.form.image = ''
          }
          try {
            const res = await blog.addBlog(this.form)
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
    /**
     * 重置表单
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.clearUploadImg()
      this.$refs.tinymce.clear()
    },
    /**
     * 获取标签
     * @returns {Promise<void>}
     */
    async getTags() {
      const tgs = await tag.getTags()
      this.tags = tgs
    },
    /**
     * 获取分类
     * @returns {Promise<void>}
     */
    async getClassifys() {
      const cls = await classify.getClassifys()
      this.classifys = cls
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

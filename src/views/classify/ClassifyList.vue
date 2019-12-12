<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">分类列表</div>
      </div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        v-loading="loading"></lin-table>
    </div>

    <!-- 编辑页面 -->
    <classify-edit v-else @editClose="editClose" :editClassifyID="editClassifyID"></classify-edit>

  </div>
</template>

<script>
import classify from '@/models/classify'
import LinTable from '@/components/base/table/lin-table'
import ClassifyEdit from './ClassifyEdit'

export default {
  components: {
    LinTable,
    ClassifyEdit,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'name', label: '分类名' },
        { prop: 'path', label: '路径' },
        { prop: 'desc', label: '描述' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editClassifyID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getClassifys()
    this.operate = [
      {
        name: '编辑',
        func: 'handleEdit',
        type: 'primary',
        auth: '编辑分类',
      },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        auth: '删除分类',
      },
    ]
    this.loading = false
  },
  methods: {
    async getClassifys() {
      try {
        const classifys = await classify.getClassifys()
        this.tableData = classifys
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      this.showEdit = true
      this.editClassifyID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await classify.deleteClassify(val.row.id)
        if (res.error_code === 0) {
          this.getClassifys()
          this.$message({
            type: 'success',
            message: `${res.msg}`,
          })
        }
      }, () => {})
    },
    editClose() {
      this.showEdit = false
      this.getClassifys()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>

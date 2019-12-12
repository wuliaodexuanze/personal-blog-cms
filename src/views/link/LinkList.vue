<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">链接列表</div>
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
    <link-edit v-else @editClose="editClose" :editLinkID="editLinkID"></link-edit>

  </div>
</template>

<script>
import link from '@/models/link'
import LinTable from '@/components/base/table/lin-table'
import LinkEdit from './LinkEdit'

export default {
  components: {
    LinTable,
    LinkEdit,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'name', label: '名称' },
        { prop: 'path', label: '地址' },
        { prop: 'desc', label: '描述' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editLinkID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getLinks()
    this.operate = [
      {
        name: '编辑',
        func: 'handleEdit',
        type: 'primary',
        auth: '编辑链接',
      },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        auth: '删除链接',
      },
    ]
    this.loading = false
  },
  methods: {
    async getLinks() {
      try {
        const links = await link.getLinks()
        this.tableData = links
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      this.showEdit = true
      this.editLinkID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该链接, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await link.deleteLink(val.row.id)
        if (res.error_code === 0) {
          this.getLinks()
          this.$message({
            type: 'success',
            message: `${res.msg}`,
          })
        }
      }, () => {})
    },
    editClose() {
      this.showEdit = false
      this.getLinks()
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

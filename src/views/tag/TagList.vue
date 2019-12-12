<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="header-left">
          <div class="title">标签列表</div>
        </div>
        <div class="header-right" v-auth="'搜索标签'">
          <lin-search @query="onQueryChange" ref="searchKeyword" />
        </div>
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
    <tag-edit v-else @editClose="editClose" :editTagID="editTagID"></tag-edit>

  </div>
</template>

<script>
import tag from '@/models/tag'
import LinTable from '@/components/base/table/lin-table'
import LinSearch from '@/components/base/search/lin-search'
import TagEdit from './TagEdit'

export default {
  components: {
    LinTable,
    TagEdit,
    LinSearch,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'name', label: '标签名' },
        { prop: 'desc', label: '描述' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editTagID: 1,
      searchKeyword: '',
    }
  },
  async created() {
    this.loading = true
    await this.getTags()
    this.operate = [
      {
        name: '编辑',
        func: 'handleEdit',
        type: 'primary',
        auth: '编辑标签',
      },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        auth: '删除标签',
      },
    ]
    this.loading = false
  },
  watch: {
    searchKeyword(newVal) {
      this.searchTags()
      if (!newVal) {
        this.$refs.searchKeyword.clear()
      }
    },
  },
  methods: {
    async getTags() {
      try {
        const tags = await tag.getTags()
        this.tableData = tags
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
    },
    async searchTags() {
      this.loading = true
      try {
        const tags = await tag.searchTags(this.searchKeyword)
        this.loading = false
        this.tableData = tags
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      this.showEdit = true
      this.editTagID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await tag.deleteTag(val.row.id)
        if (res.error_code === 0) {
          this.getTags()
          this.$message({
            type: 'success',
            message: `${res.msg}`,
          })
        }
      }, () => {})
    },
    editClose() {
      this.showEdit = false
      this.getTags()
    },
    onQueryChange(query) {
      // 处理带空格的情况
      this.searchKeyword = query.trim()
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
  }

  .header-left {
    float: left;

    .title {
      height: 59px;
      line-height: 59px;
      color: #4c76af;
      font-size: 16px;
      font-weight: 500;
    }
  }
  .header-right {
    float: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>

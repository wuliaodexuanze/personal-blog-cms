<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="header-left">
          <div class="title">文章列表</div>
        </div>
        <div class="header-right" v-auth="'搜索文章'">
          <lin-search @query="onQueryChange" ref="searchKeyword" />
        </div>
      </div>
      <!-- 表格 -->
      <el-table
          stripe
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
        <el-table-column
          label="标题"
          prop="title">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="desc">
        </el-table-column>
        <el-table-column
          label="封面图链接"
          prop="image">
        </el-table-column>
        <el-table-column
          label="点赞数量"
          prop="fav_nums"
          width="100">
        </el-table-column>
        <el-table-column
          label="分类"
          width="90">
          <template slot-scope="scope">
            <el-tag
              type="info"
              effect="dark">{{scope.row.classify.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="标签">
          <template slot-scope="scope">
            <el-tag
              v-for="item in scope.row.tags"
              size="mini"
              type="success"
              :key="item.id"
              effect="plain">{{item.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="作者"
          width="100">
          <template slot-scope="scope">
            {{ scope.row.user.nickname }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否顶置"
          width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.istop"
              @change="handleTop(scope.$index, scope.row)"
              active-text="是"
              inactive-text="否">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="175">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              v-auth="{auth: '编辑文章', type: 'disabled'}"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              v-auth="{auth: '删除文章', type: 'disabled'}"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="limit"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

    <!-- 编辑页面 -->
    <book-edit v-else @editClose="editClose" :editBookID="editBookID"></book-edit>

  </div>
</template>

<script>
import blog from '@/models/blog'
import LinSearch from '@/components/base/search/lin-search'
import BookEdit from './BlogEdit'

import Config from '@/config'

const {
  pageOffset,
  pageLimit,
} = Config

export default {
  components: {
    BookEdit,
    LinSearch,
  },
  data() {
    return {
      loading: false,
      tableData: [],
      showEdit: false,
      editBookID: 1,
      searchKeyword: '',
      currentPage: Number(pageOffset) + 1,
      total: 0,
      offset: pageOffset,
      limit: pageLimit,
    }
  },
  watch: {
    searchKeyword(newVal) {
      this.getBlogs()
      if (!newVal) {
        this.$refs.searchKeyword.clear()
      }
    },
  },
  async created() {
    this.offset = this.currentPage - 1
    await this.getBlogs()
  },
  methods: {
    initPageData() {
      this.offset = pageOffset
      this.limit = pageLimit
      this.currentPage = Number(pageOffset) + 1
    },
    /**
     * 点击页码
     */
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = Number(val) - 1
      this.getBlogs()
    },
    /**
     * 获取博客列表
     */
    async getBlogs() {
      this.loading = true
      try {
        const {
          rows,
          count,
          offset,
          limit,
        } = await blog.getBlogs(this.offset, this.limit, this.searchKeyword)
        this.loading = false
        this.tableData = rows
        this.offset = offset
        this.total = count
        this.limit = limit
        this.currentPage = Number(offset) + 1
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
    },
    /**
     * 置顶文章
     * @param index
     * @param row
     */
    handleTop(index, row) {
      const currentRow = row
      const top = currentRow.istop
      if (!row.image) {
        this.$message({
          type: 'error',
          message: '没有封面图的文章不能置顶',
        })
        currentRow.istop = !top
        return
      }
      let tip = '是否将此文章置顶?'
      if (!top) {
        tip = '是否取消此文章置顶?'
      }
      this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        let res = {}
        if (!top) {
          res = await blog.topBlogCancel(currentRow.id)
        } else {
          res = await blog.topBlog(currentRow.id)
        }
        if (res.error_code === 0) {
          this.$message({
            type: 'success',
            message: `${res.msg}`,
          })
          currentRow.istop = top
        } else {
          currentRow.istop = !top
        }
      }, () => {})
    },
    /**
     * 编辑文章
     * @param index
     * @param row
     */
    handleEdit(index, row) {
      this.editBookID = row.id
      this.showEdit = true
    },
    /**
     * 删除文章
     * @param index
     * @param row
     */
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await blog.delectBlog(row.id)
        if (res.error_code === 0) {
          this.getBlogs()
          this.$message({
            type: 'success',
            message: `${res.msg}`,
          })
        }
      }, () => {})
    },
    editClose() {
      this.showEdit = false
      this.getBlogs()
    },
    onQueryChange(query) {
      // 处理带空格的情况
      this.searchKeyword = query.trim()
      this.initPageData()
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

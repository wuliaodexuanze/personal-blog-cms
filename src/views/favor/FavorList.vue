<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
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
            {{scope.row.istop ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="175">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              plain
              v-auth="{auth: '取消收藏', type: 'disabled'}"
              @click="handleCancel(scope.$index, scope.row)">取消收藏</el-button>
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

  </div>
</template>

<script>
import favor from '@/models/favor'
import LinSearch from '@/components/base/search/lin-search'

import Config from '@/config'

const {
  pageOffset,
  pageLimit,
} = Config

export default {
  components: {
    LinSearch,
  },
  data() {
    return {
      loading: false,
      tableData: [],
      searchKeyword: '',
      currentPage: Number(pageOffset) + 1,
      total: 0,
      offset: pageOffset,
      limit: pageLimit,
    }
  },
  watch: {
    searchKeyword(newVal) {
      this.getFavors()
      if (!newVal) {
        this.$refs.searchKeyword.clear()
      }
    },
  },
  async created() {
    this.offset = this.currentPage - 1
    await this.getFavors()
    this.operate = [
      {
        name: '取消收藏',
        func: 'handleCancel',
        type: 'danger',
        auth: '取消收藏',
      },
    ]
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
      this.getFavors()
    },
    /**
     * 获取收藏文章列表
     * @returns {Promise<void>}
     */
    async getFavors() {
      this.loading = true
      try {
        const {
          rows,
          count,
          offset,
          limit,
        } = await favor.getFavors(this.offset, this.limit, this.searchKeyword)
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
    handleCancel(index, row) {
      this.$confirm('取消选中文章的收藏?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await favor.cancelFavor(row.id)
        if (res.error_code === 0) {
          this.getFavors()
          this.$message({
            type: 'success',
            message: `${res.msg}`,
          })
        }
      }, () => {})
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

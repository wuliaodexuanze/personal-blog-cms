/* eslint-disable class-methods-use-this */
import {
  post,
  get,
  put,
  _delete,
} from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Blog {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  async addBlog(info) {
    const res = await post('v1/blog', info, { showBackend: true })
    return res
  }

  /**
   * 删除博客
   * @param id
   * @returns {Promise<*>}
   */
  async delectBlog(id) {
    const res = await _delete(`v1/blog/${id}`, { showBackend: true })
    return res
  }

  /**
   * 置顶文章
   * @param id
   * @returns {Promise<*>}
   */
  async topBlog(id) {
    const res = await post(`v1/blog/${id}/top`, null, { showBackend: true })
    return res
  }
  /**
   * 取消置顶文章
   * @param id
   * @returns {Promise<*>}
   */

  async topBlogCancel(id) {
    const res = await post(`v1/blog/${id}/top/cancel`)
    return res
  }

  /**
   * 编辑文章
   * @param id
   * @param info
   * @returns {Promise<*>}
   */
  async editBlog(id, info) {
    const res = await put(`v1/blog/${id}`, info, { showBackend: true })
    return res
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象
  async getBlog(id) {
    const res = await get(`v1/blog/${id}`)
    return res
  }

  /**
   * 获取博客列表
   * @returns {Promise<*>}
   */
  async getBlogs(offset = 0, limit = 10, q = '') {
    const res = await get('v1/blog', { offset, limit, q })
    return res
  }
}

export default new Blog()

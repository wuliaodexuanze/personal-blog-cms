import {
  post,
  get,
  put,
  _delete,
} from '@/lin/plugins/axios'

class Tag {
  /**
   * 添加标签
   * @param info
   * @returns {*}
   */
  async addTag(info) {
    const res = await post('v1/tag', info, { showBackend: true })
    return res
  }

  /**
   * 删除标签
   * @param id
   * @returns {Promise<*>}
   */
  async deleteTag(id) {
    const res = await _delete(`v1/tag/${id}`, { showBackend: true })
    return res
  }

  /**
   * 修改标签
   * @param id
   * @param info
   * @returns {Promise<*>}
   */
  async editTag(id, info) {
    const res = await put(`v1/tag/${id}`, info, { showBackend: true })
    return res
  }

  /**
   * 获取标签列表
   * @returns {Promise<*>}
   */
  async getTags() {
    const res = await get('v1/tag')
    return res
  }

  /**
   * 通过id获取标签
   * @param id
   * @returns {Promise<*>}
   */
  async getTag(id) {
    const res = await get(`v1/tag/${id}`)
    return res
  }

  /**
   * 查询标签
   * @param q
   * @returns {Promise<*>}
   */
  async searchTags(q) {
    const res = await get('v1/tag/search', { q })
    return res
  }
}

export default new Tag()

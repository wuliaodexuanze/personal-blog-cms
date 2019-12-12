import {
  post,
  get,
  put,
  _delete,
} from '@/lin/plugins/axios'

class Link {
  /**
   * 添加链接
   * @param info
   * @returns {*}
   */
  async addLink(info) {
    const res = await post('v1/link', info, { showBackend: true })
    return res
  }

  /**
   * 删除链接
   * @param id
   * @returns {Promise<*>}
   */
  async deleteLink(id) {
    const res = await _delete(`v1/link/${id}`, { showBackend: true })
    return res
  }

  /**
   * 修改链接
   * @param id
   * @param info
   * @returns {Promise<*>}
   */
  async editLink(id, info) {
    const res = await put(`v1/link/${id}`, info, { showBackend: true })
    return res
  }

  /**
   * 获取链接列表
   * @returns {Promise<*>}
   */
  async getLinks() {
    const res = await get('v1/link')
    return res
  }

  /**
   * 通过id获取链接
   * @param id
   * @returns {Promise<*>}
   */
  async getLink(id) {
    const res = await get(`v1/link/${id}`)
    return res
  }
}

export default new Link()

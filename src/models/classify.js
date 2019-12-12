import {
  post,
  get,
  put,
  _delete,
} from '@/lin/plugins/axios'

class Classify {
  /**
   * 添加链接
   * @param info
   * @returns {*}
   */
  async addClassify(info) {
    const res = await post('v1/classify', info, { showBackend: true })
    return res
  }

  /**
   * 删除链接
   * @param id
   * @returns {Promise<*>}
   */
  async deleteClassify(id) {
    const res = await _delete(`v1/classify/${id}`, { showBackend: true })
    return res
  }

  /**
   * 修改链接
   * @param id
   * @param info
   * @returns {Promise<*>}
   */
  async editClassify(id, info) {
    const res = await put(`v1/classify/${id}`, info, { showBackend: true })
    return res
  }

  /**
   * 获取链接列表
   * @returns {Promise<*>}
   */
  async getClassifys() {
    const res = await get('v1/classify')
    return res
  }

  /**
   * 通过id获取链接
   * @param id
   * @returns {Promise<*>}
   */
  async getClassify(id) {
    const res = await get(`v1/classify/${id}`)
    return res
  }
}

export default new Classify()

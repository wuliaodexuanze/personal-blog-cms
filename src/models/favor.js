import {
  get,
  post,
} from '@/lin/plugins/axios'

class Favor {
  /**
   * 获取收藏列表
   * @returns {Promise<*>}
   */
  async getFavors(offset = 0, limit = 10, q = '') {
    const res = await get('v1/favor', { offset, limit, q })
    return res
  }

  /**
   * 取消收藏
   * @param id
   * @returns {Promise<*>}
   */
  async cancelFavor(id) {
    const res = await post('v1/favor/cancel', { id }, { showBackend: true })
    return res
  }
}

export default new Favor()

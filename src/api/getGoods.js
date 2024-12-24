import request from '@/utils/request'

export const getGoods = (type) => {
  return request.post('/api/goods', {
    type
  })
}

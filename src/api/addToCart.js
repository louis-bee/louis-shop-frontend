import request from '@/utils/request'

export const addToCart = (goodsId, userId, num, token) => {
  return request.post('/cart/add', {
    goodsId,
    userId,
    num
  }, {
    headers: {
      Authorization: token
    }
  })
}

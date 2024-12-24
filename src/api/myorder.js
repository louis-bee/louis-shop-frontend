import request from '@/utils/request'

export const getMyorder = (role, userId, token) => {
  return request.post('/myorder/getMyorder', {
    role,
    userId
  }, {
    headers: {
      Authorization: token
    }
  })
}
// 移除订单通用接口
export const removeBook = (role, bookId, token) => {
  return request.post('/myorder/remove', {
    role,
    bookId
  }, {
    headers: {
      Authorization: token
    }
  })
}
// 点击发货
export const Delivery = (bookId, token) => {
  return request.post('/myorder/delivery', {
    bookId
  }, {
    headers: {
      Authorization: token
    }
  })
}

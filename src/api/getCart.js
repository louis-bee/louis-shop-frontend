import request from '@/utils/request'

export const getCart = (id, token) => {
  return request.post('/cart/getCart', {
    id
  }, {
    headers: {
      Authorization: token
    }
  })
}

export const getCartNum = (id, token) => {
  return request.post('/cart/num', {
    id
  }, {
    headers: {
      Authorization: token
    }
  })
}

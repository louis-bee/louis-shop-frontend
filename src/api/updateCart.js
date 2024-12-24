import request from '@/utils/request'

export const updateCart = (userId, cartList, token) => {
  return request.post('/cart/updateCart', {
    userId,
    cartList
  }, {
    headers: {
      Authorization: token
    }
  })
}

export const updateSingleCart = (userId, bookinfo, token) => {
  // console.log(bookinfo)
  const bookId = bookinfo.book_id
  const bookNum = bookinfo.book_num
  return request.post('/cart/updateSingleCart', {
    userId,
    bookId,
    bookNum
  }, {
    headers: {
      Authorization: token
    }
  })
}

export const removeCart = (bookId, token) => {
  return request.post('/cart/remove', {
    bookId
  }, {
    headers: {
      Authorization: token
    }
  })
}

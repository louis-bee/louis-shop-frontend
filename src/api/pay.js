import request from '@/utils/request'

export const Pay = (userId, token) => {
  return request.post('/pay', {
    userId
  }, {
    headers: {
      Authorization: token
    }
  })
}

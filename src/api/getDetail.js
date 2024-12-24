import request from '@/utils/request'

export const getDetail = (id) => {
  return request.post('/api/detail', {
    id
  })
}

import request from '@/utils/request'

export const pwdLogin = (email, password) => {
  return request.post('/api/login', {
    form: {
      email,
      password
    }
  })
}

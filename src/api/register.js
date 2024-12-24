import request from '@/utils/request'

export const Register = (username, email, password) => {
  console.log(username, email, password)
  return request.post('/api/register', {
    form: {
      username,
      email,
      password
    }
  })
}

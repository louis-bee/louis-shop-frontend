import request from '@/utils/request'

export const Add = (name, price, description, image, type, token) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('price', price)
  formData.append('description', description)
  formData.append('image', image) // 确保image是文件对象
  formData.append('type', type)

  return request.post('/manage/add', formData, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  })
}

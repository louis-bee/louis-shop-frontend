import request from '@/utils/request'

export const Edit = (id, name, price, description, image, type, token) => {
  const formData = new FormData()
  formData.append('id', id)
  formData.append('name', name)
  formData.append('price', price)
  formData.append('description', description)
  formData.append('image', image) // 确保image是文件对象
  formData.append('type', type)

  return request.post('/manage/edit', formData, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const Delete = (goodsId, token) => {
  return request.post('/manage/delete', {
    goodsId
  }, {
    headers: {
      Authorization: token
    }
  })
}

export const EditnoImage = (id, name, price, description, type, token) => {
  const formData = new FormData()
  formData.append('id', id)
  formData.append('name', name)
  formData.append('price', price)
  formData.append('description', description)
  formData.append('type', type)

  return request.post('/manage/editnoimage', formData, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  })
}

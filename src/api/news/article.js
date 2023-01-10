import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/fcb-news/article/list',
    method: 'post',
    data: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/fcb-news/article/detail',
    method: 'get',
    params: {
      id
    }
  })
}
 
export const submit = (params) => {
  return request({
    url: '/api/fcb-news/article/submit',
    method: 'post',
    data: params
  })
}



export const remove = (id) => {
  return request({
    url: '/api/fcb-news/article/remove',
    method: 'get',
    params: {
      id,
    }
  })
} 

export const update = (row) => {
  return request({
    url: '/api/fcb-news/article/update',
    method: 'post',
    data: row
  })
}


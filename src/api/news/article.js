import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/fcb-news/article/list',
    method: 'get',
    params: {
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
    url: '/api/fcb-news/article/save-or-insert',
    method: 'post',
    data: params
  })
}

 


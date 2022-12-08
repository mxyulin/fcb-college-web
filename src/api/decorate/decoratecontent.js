import request from '@/router/axios';

export const getDetail = (decorateId) => {
  return request({
    url: '/api/fcb-decorate/content/detail',
    method: 'get',
    params: {
      decorateId
    }
  })
}

export const getList = (decorateId) => {
  return request({
    url: '/api/fcb-decorate/content/list',
    method: 'get',
    params: {
      decorateId
    }
  })
}

export const submit = (row) => {
  return request({
    url: '/api/fcb-decorate/content/submit',
    method: 'post',
    data: row
  })
}



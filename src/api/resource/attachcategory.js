import request from '@/router/axios';

export const getList = () => {
  return request({
    url: '/api/fcb-resource/attach-category/list',
    method: 'get',
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/fcb-resource/attach-category/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const getTree = (tenantId) => {
  return request({
    url: '/api/fcb-resource/attach-category/tree',
    method: 'get',
    params: {
      tenantId,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/fcb-resource/attach-category/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/fcb-resource/attach-category/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/fcb-resource/attach-category/submit',
    method: 'post',
    data: row
  })
}


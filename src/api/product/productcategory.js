import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/fcb-product/category/list',
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
    url: '/api/fcb-product/category/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const getTree = (tenantId) => {
  return request({
    url: '/api/fcb-product/category/tree',
    method: 'get',
    params: {
      tenantId,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/fcb-product/category/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/fcb-product/category/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/fcb-product/category/submit',
    method: 'post',
    data: row
  })
}


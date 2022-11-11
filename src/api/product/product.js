import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/fcb-product/product/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getListByCategory = (current, size, params) => {
  return request({
    url: '/api/fcb-product/product/page-bycategory-ids',
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
    url: '/api/fcb-product/product/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/fcb-product/product/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/fcb-product/product/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/fcb-product/product/submit',
    method: 'post',
    data: row
  })
}


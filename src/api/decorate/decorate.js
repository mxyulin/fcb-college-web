import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/fcb-decorate/list',
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
    url: '/api/fcb-decorate/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/fcb-decorate/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/fcb-decorate/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/fcb-decorate/submit',
    method: 'post',
    data: row
  })
}

export const setToUse = (param) => {
  return request({
    url: '/api/fcb-decorate/settouse',
    method: 'post',
    data: param
  })
}

export const copy = (param) => {
  return request({
    url: '/api/fcb-decorate/copy',
    method: 'post',
    data: param
  })
}

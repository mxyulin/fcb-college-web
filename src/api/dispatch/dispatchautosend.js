import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/fcb-dispatch/autosend/list',
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
    url: '/api/fcb-dispatch/autosend/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/fcb-dispatch/autosend/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/fcb-dispatch/autosend/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/fcb-dispatch/autosend/submit',
    method: 'post',
    data: row
  })
}


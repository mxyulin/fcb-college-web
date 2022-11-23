import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/fcb-questions/paperanswer/list',
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
    url: '/api/fcb-questions/paperanswer/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/fcb-questions/paperanswer/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/fcb-questions/paperanswer/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/fcb-questions/paperanswer/submit',
    method: 'post',
    data: row
  })
}


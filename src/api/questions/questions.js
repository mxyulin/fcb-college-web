import request from '@/router/axios';
 

export const getList = (current, size, params) => {
  // return request({
  //   url: '/api/fcb-questions/questions/list',
  //   method: 'get',
  //   params: {
  //     ...params,
  //     current,
  //     size,
  //   }
  // })
  return {};
}

export const getDetail = (id) => {
  return request({
    url: '/api/fcb-questions/questions/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/fcb-questions/questions/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/fcb-questions/questions/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/fcb-questions/questions/submit',
    method: 'post',
    data: row
  })
}

export const getViewList = (params) => {
  return request({
    url: '/api/fcb-questions/questions/import-view',
    method: 'get',
    params: {
      ...params 
    }
  })
}
 

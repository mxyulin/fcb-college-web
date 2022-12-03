import request from '@/router/axios';
 

export const getList = (current, size, params) => {
  return request({
    url: '/api/fcb-questions/questions/list',
    method: 'post',
    data: {
      ...params,
      current,
      size,
    }
  }); 
}

export const getDetail = (id) => {
  return request({
    url: '/api/fcb-questions/questions/detail',
    method: 'get',
    params: {
      id
    }
  });
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

export const checkImport = (form) => {
  return request({
    url: '/api/fcb-questions/questions/check-import',
    method: 'post',
    data: form
  })
}

export const getPreviewList = (params) => {
  return request({
    url: '/api/fcb-questions/questions/import-preview',
    method: 'get',
    params: {
      ...params 
    }
  })
}

export const doImport = (form) => {
  return request({
    url: '/api/fcb-questions/questions/do-import',
    method: 'post',
    data: form
  })
} 


export const doDeleteCacheById = (id) => {
  return request({
    url: '/api/fcb-questions/questions/delete-cache-by-id',
    method: 'get',
    params: {
      id :id 
    } 
  })
}

export const clearCache = () => {
  return request({
    url: '/api/fcb-questions/questions/clear-cache',
    method: 'get' 
  })
}

 

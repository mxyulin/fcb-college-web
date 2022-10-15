import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/fcb-system/menu/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getLazyList = (parentId, params) => {
  return request({
    url: '/api/fcb-system/menu/lazy-list',
    method: 'get',
    params: {
      ...params,
      parentId
    }
  })
}

export const getLazyMenuList = (parentId, params) => {
  return request({
    url: '/api/fcb-system/menu/lazy-menu-list',
    method: 'get',
    params: {
      ...params,
      parentId
    }
  })
}

export const getMenuList = (current, size, params) => {
  return request({
    url: '/api/fcb-system/menu/menu-list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getMenuTree = (tenantId) => {
  return request({
    url: '/api/fcb-system/menu/tree',
    method: 'get',
    params: {
      tenantId,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/fcb-system/menu/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/fcb-system/menu/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/fcb-system/menu/submit',
    method: 'post',
    data: row
  })
}

export const getMenu = (id) => {
  return request({
    url: '/api/fcb-system/menu/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

export const getTopMenu = () => request({
  url: '/api/fcb-system/menu/top-menu',
  method: 'get'
});

export const getRoutes = (topMenuId) => request({
  url: '/api/fcb-system/menu/routes',
  method: 'get',
  params: {
    topMenuId,
  }
});

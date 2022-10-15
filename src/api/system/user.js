import request from '@/router/axios';

export const getList = (current, size, params, deptId) => {
  return request({
    url: '/api/fcb-user/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
      deptId,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/fcb-user/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/fcb-user/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/fcb-user/update',
    method: 'post',
    data: row
  })
}

export const updatePlatform = (userId, userType, userExt) => {
  return request({
    url: '/api/fcb-user/update-platform',
    method: 'post',
    params: {
      userId,
      userType,
      userExt,
    }
  })
}

export const getUser = (id) => {
  return request({
    url: '/api/fcb-user/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

export const getUserPlatform = (id) => {
  return request({
    url: '/api/fcb-user/platform-detail',
    method: 'get',
    params: {
      id,
    }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/api/fcb-user/info',
    method: 'get',
  })
}

export const resetPassword = (userIds) => {
  return request({
    url: '/api/fcb-user/reset-password',
    method: 'post',
    params: {
      userIds,
    }
  })
}

export const updatePassword = (oldPassword, newPassword, newPassword1) => {
  return request({
    url: '/api/fcb-user/update-password',
    method: 'post',
    params: {
      oldPassword,
      newPassword,
      newPassword1,
    }
  })
}

export const updateInfo = (row) => {
  return request({
    url: '/api/fcb-user/update-info',
    method: 'post',
    data: row
  })
}

export const grant = (userIds, roleIds) => {
  return request({
    url: '/api/fcb-user/grant',
    method: 'post',
    params: {
      userIds,
      roleIds,
    }
  })
}

export const unlock = (userIds) => {
  return request({
    url: '/api/fcb-user/unlock',
    method: 'post',
    params: {
      userIds,
    }
  })
}

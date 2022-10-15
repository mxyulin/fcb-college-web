import request from '@/router/axios';

export const modelList = (current, size, params) => {
  return request({
    url: '/api/fcb-flow/model/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const managerList = (current, size, params) => {
  return request({
    url: '/api/fcb-flow/manager/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const followList = (current, size, params) => {
  return request({
    url: '/api/fcb-flow/follow/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}


export const removeModel = (ids) => {
  return request({
    url: '/api/fcb-flow/model/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const deployModel = (params) => {
  return request({
    url: '/api/fcb-flow/model/deploy',
    method: 'post',
    params
  })
}

export const changeState = (params) => {
  return request({
    url: '/api/fcb-flow/manager/change-state',
    method: 'post',
    params
  })
}

export const deployUpload = (category, tenantIds, files) => {
  const formData = new FormData();
  formData.append('category', category);
  formData.append('tenantIds', tenantIds);
  files.forEach(file => {
    formData.append('files', file);
  });
  return request({
    headers: {
      "Content-Type": "multipart/form-data"
    },
    url: '/api/fcb-flow/manager/deploy-upload',
    method: 'post',
    data: formData
  })
}

export const deleteDeployment = (deploymentIds) => {
  return request({
    url: '/api/fcb-flow/manager/delete-deployment',
    method: 'post',
    params: {
      deploymentIds,
    }
  })
}

export const deleteProcessInstance = (params) => {
  return request({
    url: '/api/fcb-flow/follow/delete-process-instance',
    method: 'post',
    params
  })
}

export const submitModel = (data) => {
  return request({
    url: '/api/fcb-flow/model/submit',
    method: 'post',
    data
  })
}

export const detail = (params) => {
  return request({
    url: '/api/fcb-flow/model/detail',
    method: 'get',
    params
  })
}

export const modelView = (params) => {
  return request({
    url: '/api/fcb-flow/process/model-view',
    method: 'get',
    params
  })
}

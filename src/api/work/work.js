import request from '@/router/axios';

export const startList = (current, size, params) => {
  return request({
    url: '/api/fcb-flow/work/start-list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const claimList = (current, size, params) => {
  return request({
    url: '/api/fcb-flow/work/claim-list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const todoList = (current, size, params) => {
  return request({
    url: '/api/fcb-flow/work/todo-list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const sendList = (current, size, params) => {
  return request({
    url: '/api/fcb-flow/work/send-list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}


export const doneList = (current, size, params) => {
  return request({
    url: '/api/fcb-flow/work/done-list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const claimTask = (taskId) => {
  return request({
    url: '/api/fcb-flow/work/claim-task',
    method: 'post',
    params: {
      taskId
    }
  })
}


export const completeTask = (data) => {
  return request({
    url: '/api/fcb-flow/work/complete-task',
    method: 'post',
    data
  })
}

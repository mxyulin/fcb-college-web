import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/fcb-news/article/list',
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
    url: '/api/fcb-news/article/detail',
    method: 'get',
    params: {
      id
    }
  })
}
 
export const submit = (params) => {
  return request({
    url: '/api/fcb-news/article/submit',
    method: 'post',
    data: params
  })
}

 
// {
// 	coverType: "封面类型",
// 	category: "2",
// 	title: "标题",
// 	body: {
// 		title: "标题",
// 		content: "文章内容",
// 		picUrls: "图片URL JSON数组",
// 		copyRight: "",
// 		author: ""

// 	},
// 	tags: "" 
// }

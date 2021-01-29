import ajax from './ajax'

export const addArticle = (data) => ajax('/api/v1/admin/article/add_article', {...data}, 'POST')

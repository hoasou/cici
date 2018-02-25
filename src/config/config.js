// export const baseUrl = 'http://testm.teacher.jiaofucloud.cn/'
// export const baseUrl2 = 'http://eapi.jiaofucloud.cn/'
// export const brandId = '524726977'
export const baseUrl = 'https://m.teacher.jiaofuyun.com/' // 'https://m.teacher.jiaofuyun.com/'
export const baseUrl2 = 'https://eapi.ciwong.com/'
export const brandId = '570678343' // 524726977
export const clientId = 20000
export const accessToken = '' // 61aec780229040c7830399bd65b60c5ece142bed

/**
 * 存储localStorage
 */
export function setStore (name, content) {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}
/**
 * 获取localStorage
 */
export function getStore (name, dataType = 'string') {
  if (!name) return
  let result = window.localStorage.getItem(name)
  if (dataType === 'json' && result) {
    result = JSON.parse(result)
  }
  return result
}
/**
 * 删除localStorage
 */
export function removeStore (name) {
  if (!name) return
  window.localStorage.removeItem(name)
}

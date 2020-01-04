import defaultSettings from '@/settings'

const title = defaultSettings.title || '家政预约服务云平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

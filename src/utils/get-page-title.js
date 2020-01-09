import defaultSettings from '@/settings'

const title = defaultSettings.title || '晋宝农商销售云平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

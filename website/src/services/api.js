import { GET, POST, PUT, DELETE, urlBase } from './base'

// 获取测定站信息
export async function getStationListService() {
  return await GET(urlBase + '/admin/dashboard/stationinfo/')
}

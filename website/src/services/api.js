import { GET, urlBase } from './base'

export async function getGraphData({ filename, yearDate }) {
  return await GET(urlBase + `/${yearDate}/${filename}`)
}

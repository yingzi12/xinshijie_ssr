import { api,tansParams } from 'boot/axios'

export function listAlbum(query) {
  return api.get("album/list"+'?' + tansParams(query))
}


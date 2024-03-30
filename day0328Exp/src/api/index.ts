import axios from 'axios'

// 抛出类型
export interface bannerItem {
  imageUrl: string;
  targetId: number;
}

interface BannerResponse {
  code: number;
  banners: bannerItem[]
}

export const getBanners = () => {
  // 定义接口返回值类型
  return axios.get<BannerResponse>('http://zyxcl.xyz/music_api/banner')
}


export interface GoodItem {
  "id": string;
  "name": string;
  "price": number;
  "imgUrl": string;
  "checked": boolean;
  "images": string[];
}
export const getGoods = () => {
  return axios.get<GoodItem[]>('/api/list')
}

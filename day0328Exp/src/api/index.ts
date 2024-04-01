import axios from 'axios'

// 抛出类型
export interface bannersItem {
  imageUrl: string;
  targetId: number;
}
interface BannerResponse {
  code: number;
  banners: bannersItem[];
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

interface mapRes {
  status: number;
  message: string;
  result: { name: string; address: string }[]
}

export const getDetailAddress = (query: string, region: string) => {
  return axios.get<mapRes>('/api/place/v2/search',{
    params: {
      query,
      region,
      city_limit: true,
      output:'json',
      ak:'SFhTxDNFcEzcJgD3hhf19xSd9z0ddFLy'
    }
  })
}

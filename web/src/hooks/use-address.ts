import { useEffect, useState } from "react"
import envConfig from '@/config/env.config';

type LocationItem = {
  code: string
  name: string
}

export function useAddress() {
  const [provinces, setProvinces] = useState<LocationItem[]>([])
  const [districts, setDistricts] = useState<LocationItem[]>([])
  const [wards, setWards] = useState<LocationItem[]>([])

  useEffect(() => {
    fetch(`${envConfig.NEXT_PUBLIC_SERVER_URL}/api/v1/address/province`)
    .then(res => res.json())
    .then(resData => {
      const data = resData.data.map((item: any) => ({
        code: String(item.id),
        name: item.name,
      }))
      setProvinces(data)
    })
      .catch(err => console.error("Lỗi khi load tỉnh:", err))
  }, [])

  const fetchDistricts = async (provinceCode: string) => {
    const res = await fetch(`/api/districts?provinceCode=${provinceCode}`)
    const data = await res.json()
    setDistricts(data)
    setWards([])
  }

  const fetchWards = async (districtCode: string) => {
    const res = await fetch(`/api/wards?districtCode=${districtCode}`)
    const data = await res.json()
    setWards(data)
  }

  return {
    provinces,
    districts,
    wards,
    fetchDistricts,
    fetchWards,
    setDistricts,
    setWards
  }
}

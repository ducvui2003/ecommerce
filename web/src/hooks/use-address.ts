import { useEffect, useState } from "react"

type LocationItem = {
  code: string
  name: string
}

export function useAddress() {
  const [provinces, setProvinces] = useState<LocationItem[]>([])
  const [districts, setDistricts] = useState<LocationItem[]>([])
  const [wards, setWards] = useState<LocationItem[]>([])

  useEffect(() => {
    fetch(`https://open.oapi.vn/location/provinces`)
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
    let provinceCodeNum = Number(provinceCode)
    const res = await fetch(`https://open.oapi.vn/location/districts/${provinceCodeNum}`)
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

import ghn from "./axiosGhn"

export const useGHN = {
    actions: {
        async layTinh() {
            const response = await ghn.post('shiip/public-api/master-data/province')
            return response
        },
        async layHuyen(payload) {
            return await ghn.post(`shiip/public-api/master-data/district`, {
                province_id: payload
            })
        },
        async layXa(payload) {
            return await ghn.post(`shiip/public-api/master-data/ward`, {
                district_id: payload
            })
        },
        async layGia(payload) {
            return await ghn.get(`shiip/public-api/v2/shipping-order/fee?service_id=53321&insurance_value=${payload.gia}&coupon=&from_district_id=1542&to_district_id=${payload.denHuyen}&to_ward_code=${payload.denXa}&height=15&length=15&weight=100&width=15`)
        },
    },
}

import GHNApi from "../GHNApi";

const AddressApi = {
  getProvinceData: () => {
    const url = "master-data/province";
    return GHNApi.get(url);
  },
  getDistrictByProvince: (provinceId) => {
    const url = "master-data/district";
    return GHNApi.get(url, {
      params: {
        province_id: provinceId,
      },
    });
  },
  getWardsByDistrict: (districtId) => {
    const url = "master-data/ward";
    return GHNApi.get(url, {
      params: {
        district_id: districtId,
      },
    });
  },
};
export default AddressApi;

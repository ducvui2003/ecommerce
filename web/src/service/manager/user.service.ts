import http from '@/lib/http.client';
import { toQueryString } from '@/lib/utils';
import { Paging, ResponseApi, ResponseApiPaging } from '@/types/api.type';
import {
  GetUserDetailResType,
  GetUserQueryReqType,
  GetUserResType,
} from '@/types/user.type';

const userManagerService = {
  getTable: async (
    req: GetUserQueryReqType,
  ): Promise<Paging<GetUserResType>> => {
    const query = toQueryString(req);
    const res = await http.get<ResponseApiPaging<GetUserResType>>(
      '/api/v1/manager/user/list?' + query,
    );
    const body = res.payload.data;
    return body;
  },

  getDetail: async (userId: number) => {
    const res = await http.get<ResponseApi<GetUserDetailResType>>(
      `/api/v1/manager/user/${userId}`,
    );
    const body = res.payload.data;
    return body;
  },
};

export default userManagerService;

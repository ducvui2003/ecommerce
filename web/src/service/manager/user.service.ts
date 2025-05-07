import http from '@/lib/http';
import { toQueryString } from '@/lib/utils';
import { Paging, ResponseApi, ResponseApiPaging } from '@/types/api.type';
import { GetUserQueryReqType, GetUserResType } from '@/types/user.type';

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
};

export default userManagerService;

import http from '@/lib/http';

const userApiRequest = {
  getInfo(sessionToken: string) {
    http.get('/api/v1/user/info', {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },
};

export default userApiRequest;

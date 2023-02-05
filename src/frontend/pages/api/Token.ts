import axios from '@src/frontend/pages/api/helpers/axios';

export interface Tokens {
  token: string,
  refreshToken: string
}

export const getTokens = async (
    authLoginLinkId: ParsedUrlQuery,
): Promise<Tokens> => {
  const res = await axios.get<Tokens>('/token', {
    params: {
      authLoginLinkId: authLoginLinkId,
    }
  });
  return res.data;
};

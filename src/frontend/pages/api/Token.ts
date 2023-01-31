import axios from "axios";

export interface Tokens {
  token: string,
  refreshToken: string
}

export const getTokens = async (
    authLoginLinkId: string,
): Promise<Tokens> => {
  const res = await axios.get<Tokens>('http://localhost:5100/token', {
    params: {
      authLoginLinkId: authLoginLinkId,
    }
  });
  return res.data;
};

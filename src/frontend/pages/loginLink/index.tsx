import React, {useEffect, useState} from 'react';
import { getTokens, Tokens } from "@src/frontend/pages/api/Token";
import {useRouter} from "next/router";

export interface Params {
  authLoginLinkId: string;
}

const loginLink = () => {
  const [tokens, setTokens] = useState<Tokens>();
  const router = useRouter();

  useEffect(() => {
    const query = router.query as unknown as Params;
    getTokens(query.authLoginLinkId).then((res) => { localStorage.setItem('tokens', JSON.stringify(res)) });
    setTokens(JSON.parse(localStorage.getItem('tokens') || ''))
  }, [])
  /*
    const authByLoginLink: ( authLoginLink: string ) => Promise<{ token: string, refreshToken: string }>
      = ( authLoginLink: string ) => Promise.resolve( { token: 'test', refreshToken: 'test' } )
  */

  async function authByLoginLink() {
    const resolve: ( { token: string, refreshToken: string } ) = await ( { token: 'test', refreshToken: 'test' } )
    return resolve
  }

  return (
    <div>
        token: {tokens?.token}
        <br/>
        refreshToken: {tokens?.refreshToken}
    </div>
  );
};

export default loginLink;
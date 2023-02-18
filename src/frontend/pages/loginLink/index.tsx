import React, {useEffect, useState} from 'react';
import { getTokens, Tokens } from "@src/frontend/pages/api/Token";
import { useRouter } from "next/router";

const loginLink = () => {
  const [tokens, setTokens] = useState<Tokens>();

  const router = useRouter();
  const authLoginLinkId = router.query.authLoginLinkId as unknown as string

  useEffect(() => {
    getTokens(authLoginLinkId).then((res) => { setTokens(res) });
  }, [authLoginLinkId])

  return (
    <div>
        token: {tokens?.accessToken}
        <br/>
        refreshToken: {tokens?.refreshToken}
    </div>
  );
};

export default loginLink;
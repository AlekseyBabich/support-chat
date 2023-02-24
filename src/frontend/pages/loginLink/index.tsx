import React, {useEffect, useState} from 'react';
import { getTokens, Tokens } from "@src/frontend/pages/api/Token";
import { useRouter } from "next/router";
import { setTokens } from "@src/frontend/store/Slice/authSlice";
import { useAppDispatch, useAppSelector } from "@src/frontend/store/Hooks/hook";

const loginLink = () => {
  //const [tokens, setTokens] = useState<Tokens>();
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { isAuth, token, refreshToken } = useAppSelector(state => state.auth)
  const authLoginLinkId = router.query.authLoginLinkId as unknown as string

  useEffect(() => {
/*
    debugger
*/
    getTokens(authLoginLinkId).then((res) =>  dispatch(setTokens(res)) );
    if (!isAuth) {
      router.push('/')
    }
  }, [authLoginLinkId])


  return (
    <div>
       {/* token: {tokens?.accessToken}*/}
        <br/>
        {/*refreshToken: {tokens?.refreshToken}*/}
    </div>
  );
};

export default loginLink;
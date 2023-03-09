import React, { useEffect } from 'react';
import { getTokens } from "@src/frontend/pages/api/Token";
import { useRouter } from "next/router";
import { setTokens } from "@src/frontend/store/Slice/authSlice";
import { useAppDispatch, useAppSelector } from "@src/frontend/store/Hooks/hook";

const loginLink = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(state => state.auth)
  const authLoginLinkId = router.query.authLoginLinkId as unknown as string

  useEffect(() => {
    getTokens(authLoginLinkId).then((res) => dispatch(setTokens(res)));
  }, [ authLoginLinkId ])

  useEffect(() => {
    if (!isAuth) {
      router.push('/')
    }
  }, [ isAuth ])


  return (
    <div>

    </div>
  );
};

export default loginLink;
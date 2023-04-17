import React, { useEffect } from 'react';
import { getTokens } from "@src/frontend/pages/api/Token";
import { useRouter } from "next/router";
import { setTokens } from "@src/frontend/store/Slice/authSlice";
import { useAppDispatch, useAppSelector } from "@src/frontend/store/Hooks/hook";
import { createClient, Session } from "@supabase/supabase-js";
import frontend from "@config/frontend";

const loginLink = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(state => state.auth)
  const authLoginLinkId = router.query.authLoginLinkId as unknown as string
  const supabase = createClient(frontend.supabase.supabaseUrl, frontend.supabase.apiKey)

  useEffect(() => {
    getTokens(authLoginLinkId).then((res) => {
        supabase.auth.setSession( { access_token: res.accessToken, refresh_token: res.refreshToken }).then((session) => {
          dispatch(setTokens({ accessToken: session.session?.access_token as string, refreshToken: session.session?.refresh_token as string}))
        })
    }
    );
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
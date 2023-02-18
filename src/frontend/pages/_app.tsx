import '@src/frontend/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Layout from "@component/Layout/Layout";
import { Provider } from "react-redux";
import store from '../store/index'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={ store }>
      <Layout>
        <Component { ...pageProps } />
      </Layout>
    </Provider>
  )
}

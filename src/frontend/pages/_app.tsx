import '@src/frontend/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Layout from "@component/Layout/Layout";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from '../store'
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <QueryClientProvider client={ queryClient }>
          <Layout>
            <Component { ...pageProps } />
          </Layout>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

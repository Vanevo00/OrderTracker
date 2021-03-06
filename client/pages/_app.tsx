import React, { FC } from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AppProps } from 'next/app'
import { useStore } from '../redux/store'
import { Provider } from 'react-redux'

const OrderTracker: FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState)

  return (
    <>
      <Head>
        <link href='./styles/styles.css' rel="stylesheet"/>
        <title>Správce objednávek</title>
      </Head>
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default OrderTracker

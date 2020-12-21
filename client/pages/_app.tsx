import React from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'

const OrderTracker = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <link href='./styles/styles.css' rel="stylesheet"/>
      </Head>
      <div className='main'>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default OrderTracker

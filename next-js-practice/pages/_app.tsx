import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  console.log(pageProps)
  return <Component {...pageProps} />
}

MyApp.getInitialProps = () => { // appContext: AppContext
  return {
    pageProps: {
      publishedBy: 'by 재영'
    }
  }
}

export default MyApp

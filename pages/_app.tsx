import '../styles/tailwind.css'
import { AppProps } from 'next/app'

function QuakerApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default QuakerApp

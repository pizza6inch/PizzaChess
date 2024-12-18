'use client'

import { store } from '@/redux/store'
import { Provider } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        {/* <WebSocketProvider url={process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080"}>{children}</WebSocketProvider> */}
        {children}
      </Provider>
    </>
  )
}

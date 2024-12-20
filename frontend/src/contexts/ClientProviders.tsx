'use client'

import { store } from '@/redux/store'
import { Provider, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import SignInModal from '@/components/SignInModal'
import SignUpModal from '@/components/SignUpModal'

const Modal = () => {
  const { showSignInModal, showSignUpModal } = useSelector((state: RootState) => state.modal)
  return (
    <>
      {showSignInModal && <SignInModal />}
      {showSignUpModal && <SignUpModal />}
    </>
  )
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <Modal />
        {children}
      </Provider>
    </>
  )
}

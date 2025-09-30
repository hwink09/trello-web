import { useState, useEffect } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { verifyUserAPI } from '~/apis'

function AccountVerification() {
  // Lấy giá trị token và email từ URL
  let [searchParams] = useSearchParams()
  // const token = searchParams.get('token')
  // const email = searchParams.get('email')
  const { email, token } = Object.fromEntries([...searchParams])

  // Tạo một state để lưu trữ trạng thái xác thực
  const [verified, setVerified] = useState(false)

  // Gọi API để xác thực tài khoản
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])
  // Nếu URL có vấn đề, không tồn tại 1 trong 2 tham số thì đá ra 404
  if (!email || !token) {
    return <Navigate to="/404" />
  }

  // Nếu chưa verified thì hiện loading
  if (!verified) {
    return <PageLoadingSpinner caption="Verifying your account..." />
  }

  // Nếu bình thường + verified thì điều hướng về trang login cùng giá trị verifiedEmail
  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification

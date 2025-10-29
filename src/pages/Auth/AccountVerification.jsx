import { useState, useEffect } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
// ===== TEMPORARILY COMMENTED: verifyUserAPI not called when verification is bypassed =====
// import { verifyUserAPI } from '~/apis'

// ===== DEPRECATED COMPONENT: Email verification bypassed =====
// NOTE: This component is kept for backward compatibility.
// Users accessing old verification links will be redirected to login.
// Accounts are now auto-activated on registration (isActive = true by default).
// This component may be re-enabled if email verification is restored in the future.

function AccountVerification() {
  // Lấy giá trị token và email từ URL
  let [searchParams] = useSearchParams()
  // const token = searchParams.get('token')
  // const email = searchParams.get('email')
  const { email, token } = Object.fromEntries([...searchParams])

  // Tạo một state để lưu trữ trạng thái xác thực
  const [verified, setVerified] = useState(false)

  // ===== TEMPORARILY BYPASSED: Verification API call =====
  // Since accounts are auto-activated, we skip the verification step
  // and redirect directly to login
  /*
  // Gọi API để xác thực tài khoản
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])
  */

  // Modified: Direct redirect to login instead of verification
  useEffect(() => {
    if (email && token) {
      // Skip verification, just mark as verified to trigger redirect
      setVerified(true)
    }
  }, [email, token])
  // ===== END OF BYPASSED VERIFICATION =====

  // Nếu URL có vấn đề, không tồn tại 1 trong 2 tham số thì đá ra 404
  if (!email || !token) {
    return <Navigate to="/404" />
  }

  // Nếu chưa verified thì hiện loading
  if (!verified) {
    return <PageLoadingSpinner caption="Redirecting to login..." />
  }

  // ===== UPDATED: Direct to login without verification message =====
  // Old: return <Navigate to={`/login?verifiedEmail=${email}`} />
  // New: Direct login redirect without verification params
  return <Navigate to="/login" />
}

export default AccountVerification
// ===== END OF DEPRECATED COMPONENT =====

import { ref, onMounted } from 'vue'

export function useLogin() {
  const email = ref('')
  const facebookName = ref('')
  const formEmail = ref('')
  const formPassword = ref('')
  const showPassword = ref(false)

  const images = [
    'https://i.pinimg.com/474x/a0/fb/38/a0fb38a030da2a14a39767bfd21d48d2.jpg',
    'https://i.pinimg.com/474x/d4/54/76/d45476a670996cd4ae936d99ad0b24e2.jpg',
    'https://i.pinimg.com/474x/f7/41/c8/f741c8636021870390f124e5acaa55e4.jpg'
  ]
  const currentImageIndex = ref(0)

  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }

  const emailLogin = () => {
    if (formEmail.value === 'admin@example.com' && formPassword.value === 'password') {
      // Lưu thông tin đăng nhập vào localStorage
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', formEmail.value)
      
      // Chuyển hướng sẽ được xử lý ở component
      return true
    } else {
      alert('Sai email hoặc mật khẩu!')
      return false
    }
  }

  const handleCredentialResponse = (response) => {
    const payload = JSON.parse(atob(response.credential.split('.')[1]))
    email.value = `Đăng nhập bằng Google: ${payload.email}`
    facebookName.value = ''
  }

  const facebookLogin = () => {
    FB.login((response) => {
      if (response.status === 'connected') {
        FB.api('/me', { fields: 'name,email' }, (userInfo) => {
          facebookName.value = `Đăng nhập Facebook: ${userInfo.name}`
          email.value = `Email: ${userInfo.email}`
        })
      } else {
        facebookName.value = 'Chưa đăng nhập Facebook'
      }
    }, { scope: 'email' })
  }

  onMounted(() => {
    setInterval(() => {
      currentImageIndex.value = (currentImageIndex.value + 1) % images.length
    }, 4000)

    // Google SDK
    const googleScript = document.createElement('script')
    googleScript.src = 'https://accounts.google.com/gsi/client'
    googleScript.async = true
    googleScript.defer = true
    document.head.appendChild(googleScript)

    googleScript.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '351177417132-r5tq1fs5729agapblj6gpmsh0f230f36.apps.googleusercontent.com',
        callback: handleCredentialResponse
      })
      window.google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        {
          theme: 'outline',
          size: 'large',
          text: 'signin_with'
        }
      )
    }

    // Facebook SDK
    window.fbAsyncInit = function () {
      FB.init({
        appId: '2066643873763098',
        cookie: true,
        xfbml: true,
        version: 'v12.0'
      })
    }

    const fbScript = document.createElement('script')
    fbScript.async = true
    fbScript.defer = true
    fbScript.crossOrigin = 'anonymous'
    fbScript.src = 'https://connect.facebook.net/en_US/sdk.js'
    document.head.appendChild(fbScript)
  })

  return {
    email,
    facebookName,
    formEmail,
    formPassword,
    images,
    currentImageIndex,
    showPassword,
    togglePassword,
    emailLogin,
    facebookLogin,
  }
}

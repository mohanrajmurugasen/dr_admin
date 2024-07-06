import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AuthAxios from '../../../intreceptor/authAxios'
import Logo from '../../../assets/images/logo1.jpg'

const Login = () => {
  const [value, setValue] = useState({
    email: '',
    pass: '',
  })

  const token = sessionStorage.getItem('token')
  useEffect(() => {
    if (token) {
      window.location.href = '/dashboard'
    }
  }, [])

  let first_page = () => {
    AuthAxios.post('admin-login', {
      email: value.email,
      password: value.pass,
    })
      .then((res) => {
        if (res.data.message === 'Login Successfully') {
          sessionStorage.setItem('token', res.data.access_token)
          window.location.href = '/dashboard'
        } else {
          alert('Invalid credentials')
        }
      })
      .catch((err) => {
        console.error(err.message)
        alert(err.message)
      })
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="text-white py-5">
                <CCardBody
                  className="text-center"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <div>
                    <img src={Logo} alt="logo" style={{ width: 200 }} />
                  </div>
                </CCardBody>
              </CCard>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        type="email"
                        value={value.email}
                        onChange={(e) => setValue((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={value.pass}
                        onChange={(e) => setValue((prev) => ({ ...prev, pass: e.target.value }))}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={first_page}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

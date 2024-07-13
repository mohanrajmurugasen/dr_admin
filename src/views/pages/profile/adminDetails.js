import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilPhone, cilUser } from '@coreui/icons'
import AuthAxios from '../../../intreceptor/authAxios'
import { useNavigate } from 'react-router-dom'

const AdminDetaails = () => {
  const [value, setValue] = useState({})
  useEffect(() => {
    AuthAxios.get('admin-profile/1')
      .then((res) => {
        if (res.data?.data) {
          setValue(res.data.data)
        } else {
          alert('Something went wrong!')
        }
      })
      .catch((err) => {
        alert(err.message)
        console.error(err.message)
      })
  }, [])
  const navigate = useNavigate()
  return (
    <div>
      <div className="d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4" style={{ position: 'relative' }}>
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Admin Details</h1>
                    <br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Name"
                        autoComplete="name"
                        value={value.name}
                        disabled
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={value.email}
                        disabled
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilPhone} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Mobile No."
                        autoComplete="phone"
                        value={value.mobile_number}
                        disabled
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" onClick={() => navigate('/profileUpdate')}>
                        Do you want to update?
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    color: '#0d6efd',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('/passwordUpdate')}
                >
                  Update Password?
                </div>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  )
}

export default AdminDetaails

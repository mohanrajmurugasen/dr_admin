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

const UpdateProfile = () => {
  const [value, setValue] = useState({
    id: 1,
    name: '',
    email: '',
    password: '',
    mobile_number: '',
  })
  const [checkList, setcheckList] = useState(false)
  useEffect(() => {
    AuthAxios.get('admin-profile/1')
      .then((res) => {
        if (res.data?.data) {
          setValue((pre) => ({
            ...pre,
            name: res.data.data.name,
            email: res.data.data.email,
            mobile_number: res.data.data.mobile_number,
          }))
        } else {
          alert('Something went wrong!')
        }
      })
      .catch((err) => {
        alert(err.message)
        console.error(err.message)
      })
  }, [checkList])
  const employeeCreate = () => {
    AuthAxios.post('admin/profile-update', value)
      .then((res) => {
        if (res.data.message === 'Admin Details Updated successfully') {
          alert('Admin Details Updated successfully!')
          setcheckList(!checkList)
        } else {
          alert('Internal Server Error!')
        }
      })
      .catch((err) => {
        alert(err.message)
        console.error(err.message)
      })
  }
  return (
    <div>
      <div className="d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Update Admin Details</h1>
                    <br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Name"
                        autoComplete="name"
                        value={value.name}
                        onChange={(e) => setValue((pre) => ({ ...pre, name: e.target.value }))}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={value.email}
                        onChange={(e) => setValue((pre) => ({ ...pre, email: e.target.value }))}
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
                        onChange={(e) =>
                          setValue((pre) => ({ ...pre, mobile_number: e.target.value }))
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={value.password}
                        onChange={(e) => setValue((pre) => ({ ...pre, password: e.target.value }))}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton
                        color="success"
                        disabled={
                          value.name === '' ||
                          value.email === '' ||
                          value.mobile_number === '' ||
                          value.password === ''
                        }
                        onClick={employeeCreate}
                      >
                        Update
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  )
}

export default UpdateProfile

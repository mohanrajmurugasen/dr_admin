import React, { useState } from 'react'
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

const CreateEmployee = () => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
    mobile_number: '',
    username: '',
  })
  const employeeCreate = () => {
    AuthAxios.post('leads/store', value)
      .then((res) => {
        if (res.data.message === 'Leads Created successfully') {
          alert('Leads Created successfully')
          setValue({
            name: '',
            email: '',
            password: '',
            mobile_number: '',
            username: '',
          })
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
                    <h1>Create New Employee</h1>
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
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={value.username}
                        onChange={(e) => setValue((pre) => ({ ...pre, username: e.target.value }))}
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
                          value.username === '' ||
                          value.mobile_number === '' ||
                          value.password === ''
                        }
                        onClick={employeeCreate}
                      >
                        Create
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

export default CreateEmployee

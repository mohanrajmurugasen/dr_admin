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
import { cilLockLocked } from '@coreui/icons'
import AuthAxios from '../../../intreceptor/authAxios'
import { useNavigate } from 'react-router-dom'

const UpdatePassword = () => {
  const [value, setValue] = useState({
    admin_id: 1,
    current_password: '',
    new_password: '',
    confirm_password: '',
  })
  const navigate = useNavigate()

  const employeeCreate = () => {
    AuthAxios.post('admin-change-password', value)
      .then((res) => {
        if (res.data.message === 'Password Updated Successfully') {
          alert('Password Updated Successfully!')
          navigate('/profile')
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
                    <h1>Update Password</h1>
                    <br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Current password"
                        value={value.current_password}
                        onChange={(e) =>
                          setValue((pre) => ({ ...pre, current_password: e.target.value }))
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="New password"
                        value={value.new_password}
                        onChange={(e) =>
                          setValue((pre) => ({ ...pre, new_password: e.target.value }))
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Confirm password"
                        value={value.confirm_password}
                        onChange={(e) =>
                          setValue((pre) => ({ ...pre, confirm_password: e.target.value }))
                        }
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton
                        color="success"
                        disabled={
                          value.current_password === '' ||
                          value.new_password === '' ||
                          value.confirm_password === ''
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

export default UpdatePassword

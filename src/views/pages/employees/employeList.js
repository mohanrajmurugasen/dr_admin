import React, { useEffect, useState } from 'react'
import '/src/UI_Css/Table.css'
import Table from 'react-bootstrap/Table'
import AuthAxios from '../../../intreceptor/authAxios'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilPhone, cilUser } from '@coreui/icons'
import ReactPaginate from 'react-paginate'

const EmployeList = () => {
  const [data, setData] = useState([])
  const [del_data, setDelData] = useState(true)
  const [delmsg, setdelmsg] = useState('')
  const [delId, setdelId] = useState(null)
  const [visible, setVisible] = useState(false)
  const [type, settype] = useState('edit')
  const [value, setValue] = useState({
    name: '',
    email: '',
    mobile_number: '',
    username: '',
    id: '',
  })

  let Lead_Heading = ['Name', 'Email', 'Mobile', 'UserName', 'Action']

  useEffect(() => {
    AuthAxios.get('leads')
      .then((res) => {
        if (res.data?.data) {
          setData(res.data.data)
        } else {
          alert('Internal Server Error!')
        }
      })
      .catch((err) => {
        console.error(err.message)
        alert('Internal Server Error!')
      })
  }, [del_data])

  let del = (v) => {
    if (type === 'edit') {
      AuthAxios.post(`leads/update`, value).then((res) => {
        if (res.data.message === 'Leads Details Updated successfully') {
          setDelData(!del_data)
          setVisible(false)
        } else {
          alert('Internal Server Error!')
        }
      })
    } else {
      AuthAxios.get(`leads/delete/${v.id}`).then((res) => {
        setDelData(!del_data)
        setdelmsg(res.data.message)
        setVisible(false)
      })
    }
  }

  const [itemOffset, setItemOffset] = useState(0)

  const endOffset = itemOffset + 15
  const currentItems = data.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(data.length / 15)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 15) % data.length
    setItemOffset(newOffset)
  }

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            {Lead_Heading.map((v, index) => {
              return <th key={index}>{v}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems?.map((v, index) => (
              <tr key={index} style={{ border: 'none' }}>
                <td style={{ border: 'none' }} key={index}>
                  {' '}
                  {v.name}
                </td>
                <td style={{ border: 'none' }} key={index}>
                  {' '}
                  {v.email}
                </td>
                <td style={{ border: 'none' }} key={index}>
                  {' '}
                  {v.mobile_number}
                </td>
                <td style={{ border: 'none' }} key={index}>
                  {' '}
                  {v.username}
                </td>
                <td style={{ border: 'none', textAlign: 'center' }}>
                  <i
                    className="fa-solid fa-pen"
                    style={{ marginRight: 15, cursor: 'pointer', color: '#0d6efd' }}
                    onClick={() => {
                      setdelId(v)
                      settype('edit')
                      setVisible(true)
                      setValue((pre) => ({
                        ...pre,
                        id: v.id,
                        name: v.name,
                        email: v.email,
                        mobile_number: v.mobile_number,
                        username: v.username,
                      }))
                    }}
                  ></i>
                  <i
                    className="fa-solid fa-trash"
                    style={{ cursor: 'pointer', color: 'red' }}
                    onClick={() => {
                      setdelId(v)
                      setVisible(true)
                      settype('delete')
                    }}
                  ></i>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        className="pags"
      />

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">
            {type === 'edit' ? 'Edit' : 'Delete'} Employee
          </CModalTitle>
        </CModalHeader>
        {type === 'edit' ? (
          <CModalBody>
            <CRow className="justify-content-center">
              <CCol md={12} lg={12} xl={12}>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CForm>
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
                          onChange={(e) =>
                            setValue((pre) => ({ ...pre, username: e.target.value }))
                          }
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
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CModalBody>
        ) : (
          <CModalBody>
            <p>Are you sure you want to delete employee?</p>
          </CModalBody>
        )}
        <CModalFooter>
          {type !== 'edit' && (
            <CButton color="secondary" onClick={() => setVisible(false)}>
              No
            </CButton>
          )}
          <CButton color="primary" onClick={() => del(delId)}>
            {type === 'edit' ? 'Update' : 'Yes'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default EmployeList

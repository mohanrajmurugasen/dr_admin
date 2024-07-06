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
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import './leads.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { CSVLink } from 'react-csv'
import ReactPaginate from 'react-paginate'

export default function LeadsList() {
  const [Leads, setLeade] = useState([])
  const [delId, setdelId] = useState(null)
  const [visible, setVisible] = useState(false)
  const [filtervisible, setfilterVisible] = useState(false)
  const [allEmployees, setAllEmployees] = useState([])
  const [type, settype] = useState('edit')
  const [value, setValue] = useState({
    id: 0,
    status: 0,
    lead_id: 0,
    remainder_date: moment(new Date()).format('YYYY-MM-DD'),
  })

  const [dates, setdates] = useState({
    from: moment(new Date()).format('YYYY-MM-DD'),
    to: moment(new Date()).format('YYYY-MM-DD'),
  })

  const [del_data, setDelData] = useState(true)
  const [delmsg, setdelmsg] = useState('')
  let Lead_Heading = [
    'Name',
    'Email',
    'Mobile',
    'Age',
    'Face Shape',
    'Hair Loss Stage',
    'Status',
    'Employee',
    'Reminder Date',
    'Action',
  ]

  const convertDate = (dateString) => {
    const date = moment(dateString, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)')

    return date.format('YYYY-MM-DD')
  }

  useEffect(() => {
    AuthAxios.get('leads')
      .then((res) => {
        if (res.data?.data) {
          setAllEmployees(res.data?.data)
        }
      })
      .catch((err) => {
        console.error(err.message)
        alert('Internal Server Error!')
      })
  }, [])

  const employeDetails = (x) => {
    return allEmployees && allEmployees.find((itm) => itm.id === Number(x))?.name
  }

  useEffect(() => {
    AuthAxios.get('enquiry')
      .then((res) => {
        if (res.data?.data) {
          setLeade(res.data.data)
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
    if (type === 'delete') {
      AuthAxios.get(`enquiry/delete/${v.id}`)
        .then((res) => {
          setDelData(!del_data)
          setdelmsg(res.data.message)
          setVisible(false)
        })
        .catch((err) => {
          console.error(err.message)
          alert('Internal Server Error!')
        })
    } else {
      const data =
        value.status === '4'
          ? value
          : {
              id: value.id,
              status: value.status,
              lead_id: value.lead_id,
            }
      AuthAxios.post(`enquiry/change-status`, data)
        .then((res) => {
          if (res.data?.message === 'Enquiry Details Updated successfully') {
            setDelData(!del_data)
            setVisible(false)
          } else {
            alert('Internal Server Error!')
          }
        })
        .catch((err) => {
          console.error(err.message)
          alert('Internal Server Error!')
        })
    }
  }

  const filtered = Leads?.filter((lead) => {
    const fromDate = new Date(`${dates.from}`)
    const toDate = new Date(`${dates.to}`)
    const remainderDate = new Date(lead.remainder_date)
    return remainderDate >= fromDate && remainderDate <= toDate
  })

  const getDatas = filtervisible ? filtered : Leads

  const [itemOffset, setItemOffset] = useState(0)

  const endOffset = itemOffset + 15
  const currentItems = getDatas.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(getDatas.length / 15)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 15) % getDatas.length
    setItemOffset(newOffset)
  }

  return (
    <div>
      <div>
        {filtervisible ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              From:
              <DatePicker
                selected={dates.from}
                onChange={(date) => {
                  setdates((pre) => ({ ...pre, from: convertDate(date) }))
                }}
              />
            </div>
            &nbsp;&nbsp;&nbsp;
            <div>
              To:
              <DatePicker
                selected={dates.to}
                onChange={(date) => {
                  setdates((pre) => ({ ...pre, to: convertDate(date) }))
                }}
              />
            </div>
            &nbsp;&nbsp;&nbsp;
            <div>
              <i
                className="fa-solid fa-close"
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => setfilterVisible(false)}
              ></i>
            </div>
          </div>
        ) : (
          <div>
            Filter{' '}
            <i
              className="fa-solid fa-chevron-down"
              style={{ cursor: 'pointer' }}
              onClick={() => setfilterVisible(true)}
            ></i>
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 15,
            marginTop: 15,
            alignItems: 'center',
          }}
        >
          <div></div>
          <div className="exportCSV">
            <CSVLink data={currentItems} filename={'Leads_List.csv'}>
              Export CSV
            </CSVLink>
          </div>
        </div>
      </div>
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
                  {v.customer_name}
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
                  {v.age}
                </td>
                <td style={{ border: 'none' }} key={index}>
                  {' '}
                  {v.face_shape}
                </td>
                <td style={{ border: 'none' }}>{v.hair_loss_stage}</td>
                <td style={{ border: 'none' }}>
                  {v.status === 1
                    ? 'Open'
                    : v.status === 2
                      ? 'Interested'
                      : v.status === 3
                        ? 'Not interested'
                        : v.status === 4
                          ? 'Remainder'
                          : ''}
                </td>
                <td style={{ border: 'none' }}>{employeDetails(v.lead_id)}</td>
                <td style={{ border: 'none' }}>{v.remainder_date}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>
                  <i
                    className="fa-solid fa-pen"
                    style={{ marginRight: 15, cursor: 'pointer', color: '#0d6efd' }}
                    onClick={() => {
                      setdelId(v)
                      setVisible(true)
                      settype('edit')
                      setValue((pre) => ({ ...pre, id: v.id }))
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
            {type === 'edit' ? 'Update' : 'Delete'} Leads
          </CModalTitle>
        </CModalHeader>
        {type === 'delete' ? (
          <CModalBody>
            <p>Are you sure you want to delete leads?</p>
          </CModalBody>
        ) : (
          <CModalBody>
            <CCol md={12} lg={12} xl={12}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <CInputGroup className="mb-3">
                      <CFormSelect
                        aria-label="Default select example"
                        onChange={(e) => setValue((pre) => ({ ...pre, lead_id: e.target.value }))}
                      >
                        <option>Select Employee</option>
                        {allEmployees.map((itm) => (
                          <option key={itm.id} value={itm.id}>
                            {itm.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CFormSelect
                        aria-label="Default select example"
                        options={[
                          'Select Status',
                          { label: 'Open', value: '1' },
                          { label: 'Interested', value: '2' },
                          { label: 'Not interested', value: '3' },
                          { label: 'Remainder', value: '4' },
                        ]}
                        onChange={(e) => setValue((pre) => ({ ...pre, status: e.target.value }))}
                      />
                    </CInputGroup>
                    {value.status === '4' && (
                      <CInputGroup className="mb-3" style={{ width: '100%' }}>
                        <div style={{ width: '100%' }}>
                          <div style={{ marginBottom: 5 }}>
                            <label>Reminder Date</label>
                          </div>
                          <div style={{ width: '100%' }}>
                            <DatePicker
                              selected={value.remainder_date}
                              onChange={(date) => {
                                setValue((pre) => ({ ...pre, remainder_date: convertDate(date) }))
                              }}
                            />
                          </div>
                        </div>
                      </CInputGroup>
                    )}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CModalBody>
        )}
        <CModalFooter>
          {type === 'delete' && (
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

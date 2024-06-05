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
  CRow,
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const RemindersList = () => {
  const [data, setData] = useState([])
  const [del_data, setDelData] = useState(true)
  const [delmsg, setdelmsg] = useState('')
  const [delId, setdelId] = useState(null)
  const [visible, setVisible] = useState(false)
  const [type, settype] = useState('edit')
  const [allEmployees, setAllEmployees] = useState([])
  const [value, setValue] = useState({
    lead_id: 0,
    remainder_date: moment(new Date()).format('YYYY-MM-DD'),
  })

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

  let Lead_Heading = ['Name', 'Email', 'Mobile', 'Age', 'Face Shape', 'Hair Loss Stage']

  useEffect(() => {
    if (value.lead_id !== 0) {
      AuthAxios.post('enquiry/remainder-list', {
        lead_id: Number(value.lead_id),
        remainder_date: value.remainder_date,
      })
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
    }
  }, [value])

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

  const [currentPage, setCurrentPage] = useState(1)

  const recordsPerPage = 3
  const lastIndex = currentPage * recordsPerPage

  const firstIndex = lastIndex - recordsPerPage
  const records = data?.slice(firstIndex, lastIndex)
  const npage = Math.ceil(data?.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  function prepage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
      console.log('hi', currentPage)
    }
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }

  function nextpage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage + 1)
      setDelData(!del_data)
    }
  }

  const convertDate = (dateString) => {
    const date = moment(dateString, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)')

    return date.format('YYYY-MM-DD')
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <DatePicker
            selected={value.remainder_date}
            onChange={(date) => {
              setValue((pre) => ({ ...pre, remainder_date: convertDate(date) }))
            }}
          />
        </div>
        <div>
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
        </div>
      </div>
      <br />
      <Table responsive>
        <thead>
          <tr>
            {Lead_Heading.map((v, index) => {
              return (
                <>
                  <th key={index}>{v}</th>
                </>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {records &&
            records?.map((v, index) => (
              <tr key={index} style={{ border: 'none' }}>
                <td style={{ border: 'none' }}> {v.customer_name}</td>
                <td style={{ border: 'none' }}> {v.email}</td>
                <td style={{ border: 'none' }}> {v.mobile_number}</td>
                <td style={{ border: 'none' }}> {v.age}</td>
                <td style={{ border: 'none' }}> {v.face_shape}</td>
                <td style={{ border: 'none' }}> {v.hair_loss_stage}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <nav id="nav_data">
        <ul className="pagenation_data text-center">
          <li
            className="page-item "
            onClick={() => {
              prepage()
            }}
          >
            <span href="#" className="page-link next px-2 py-1 ">
              <i className="fa-solid fa-less-than"></i>
            </span>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item  ${currentPage === n ? 'active_data ' : ''}`}
              onClick={() => changeCPage(n)}
              key={i}
            >
              <span>{n}</span>
            </li>
          ))}
          <li
            className="page-item"
            onClick={() => {
              nextpage()
            }}
          >
            <span className="page-link px-2 py-1 next">
              <i className="fa-solid fa-greater-than"></i>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default RemindersList

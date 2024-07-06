import React, { useEffect, useState } from 'react'
import '/src/UI_Css/Table.css'
import Table from 'react-bootstrap/Table'
import AuthAxios from '../../../intreceptor/authAxios'
import { CFormSelect } from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import './reminder.css'
import ReactPaginate from 'react-paginate'

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

  const [itemOffset, setItemOffset] = useState(0)

  const endOffset = itemOffset + 15
  const currentItems = data.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(data.length / 15)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 15) % data.length
    setItemOffset(newOffset)
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
              return <th key={index}>{v}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems?.map((v, index) => (
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
    </div>
  )
}

export default RemindersList

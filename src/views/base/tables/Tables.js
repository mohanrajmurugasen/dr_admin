import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '/src/UI_Css/Table.css'
import Table from 'react-bootstrap/Table'

const Tables = () => {
  const [Leads, setLeade] = useState('')

  const [del_data, setDelData] = useState(true)
  const [delmsg, setdelmsg] = useState('')
  let Lead_Heading = [
    'customer_name',
    'Email',
    'mobile_number',
    'age',
    'face_shape',
    'temple_correction',
    'hair_loss_stage',
    'status',
    'lead_id',
    'is_remainder',
    'Action',
  ]

  function leadGetData() {
    axios.get('https://test.drprabhakarht.com/api/api/enquiry').then((res) => {
      console.log(res.data.data)
      setLeade(res.data.data)
    })
  }

  useEffect(() => {
    leadGetData()
    console.log(delmsg)
  }, [del_data])

  let del = (v) => {
    axios.get(`https://test.drprabhakarht.com/api/api/enquiry/delete/${v.id}`).then((res) => {
      setDelData(!del_data)
      console.log(del_data)
      console.log(res.data.message)
      setdelmsg(res.data.message)
      alert(res.data.message)
    })
  }

  const [currentPage, setCurrentPage] = useState(1)

  const recordsPerPage = 3
  const lastIndex = currentPage * recordsPerPage

  const firstIndex = lastIndex - recordsPerPage
  const records = Leads?.slice(firstIndex, lastIndex)
  const npage = Math.ceil(Leads?.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  console.log(numbers)
  console.log(records)
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

  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            {Lead_Heading.map((v, index) => {
              return (
                <>
                  <th key={index} style={{ textAlign: 'center' }}>
                    {v}
                  </th>
                </>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {records &&
            records?.map((v, index) => (
              <tr key={index} style={{ border: 'none' }}>
                <td style={{ border: 'none', textAlign: 'center' }} key={index}>
                  {' '}
                  {v.customer_name}
                </td>
                <td style={{ border: 'none', textAlign: 'center' }} key={index}>
                  {' '}
                  {v.email}
                </td>
                <td style={{ border: 'none', textAlign: 'center' }} key={index}>
                  {' '}
                  {v.mobile_number}
                </td>
                <td style={{ border: 'none', textAlign: 'center' }} key={index}>
                  {' '}
                  {v.age}
                </td>
                <td style={{ border: 'none', textAlign: 'center' }} key={index}>
                  {' '}
                  {v.face_shape}
                </td>
                <td style={{ border: 'none', textAlign: 'center' }} key={index}>
                  {' '}
                  {v.temple_correction}
                </td>
                <td style={{ border: 'none', textAlign: 'center' }}>{v.hair_loss_stage}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{v.status}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{v.lead_id}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{v.is_remainder}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>
                  <i
                    className="fa-solid fa-trash "
                    onClick={() => {
                      del(v)
                    }}
                  ></i>
                </td>
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
    </>
  )
}

export default Tables

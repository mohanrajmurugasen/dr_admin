import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://drprabhakarht.com/" target="_blank" rel="noopener noreferrer">
          Kitkat
        </a>
        <span className="ms-1">© Copyright 2024</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://drprabhakarht.com/" target="_blank" rel="noopener noreferrer">
          All Right Reserved - Kitkat Software Solution
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

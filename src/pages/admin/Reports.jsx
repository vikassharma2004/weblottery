import React from 'react'
import { WithdrawalTable } from '../../components/WithdrawalTable'
import { ADMINCOLORS } from '../../constant'
import { ReportTable } from '../../components/ReportTable'
const Reports = () => {
  return (
   <main
        style={{
          flex: 1,
          overflow: "auto",
          borderRadius:"10px",
          padding: "24px",
          background: ADMINCOLORS.card,
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h1
              style={{
                color: ADMINCOLORS.foreground,
                fontSize: 32,
                fontWeight: 800,
              }}
            >
             Reports
            </h1>
  
            <p style={{ color: ADMINCOLORS.muted, marginTop: 6 }}>
              Manage and review all  reports
            </p>
          </div>
  
          <ReportTable />
        </div>
      </main>
  )
}

export default Reports
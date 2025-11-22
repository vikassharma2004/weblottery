import React from 'react'
import { UsersTable } from '../../components/UserTable'
import { ADMINCOLORS } from '../../constant'
const Users = () => {
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
               Users
             </h1>
   
             <p style={{ color: ADMINCOLORS.muted, marginTop: 6 }}>
               Manage all the users
             </p>
           </div>
   
           <UsersTable />
         </div>
       </main>
  )
}

export default Users
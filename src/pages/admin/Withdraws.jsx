'use client';



import { WithdrawalTable } from "../../components/WithdrawalTable";
import { ADMINCOLORS } from "../../constant";

export default function Withdrawas() {
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
            Withdraws
          </h1>

          <p style={{ color: ADMINCOLORS.muted, marginTop: 6 }}>
            Manage and review all withdrawal requests
          </p>
        </div>

        <WithdrawalTable />
      </div>
    </main>
  );
}

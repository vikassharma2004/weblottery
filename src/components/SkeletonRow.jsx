import React from 'react'

const SkeletonRow = () => {
  
    return (
    <tr style={{ borderBottom: "1px solid #2e2e2e" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <td key={i} style={{ padding: 16 }}>
          <div
            className="animate-pulse"
            style={{
              width: "100%",
              height: "14px",
              background: "#4b4b4b",
              opacity: 0.3,
              borderRadius: 6,
            }}
          ></div>
        </td>
      ))}
    </tr>
  );
  
}

export default SkeletonRow
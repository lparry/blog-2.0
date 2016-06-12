import React from "react"
export default () => (
  <div>
    <h1>Travel Map</h1>
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <iframe
        src="https://www.google.com/maps/d/embed?mid=za2R0_zM9Xe8.kYmZGpEx9bGA"
        style={{
          height: "50vh",
          width: "95%",
          border: "none",
        }}
      />
    </div>
  </div>
)

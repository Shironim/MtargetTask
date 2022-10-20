const Timer = ({ time, circle1, circle2, circle3 }) => {
  const getMinute = (time) => {
    let hour = Math.floor(time / 60);
    let minute = time % 60;
    if (hour > 0) {
      return `${hour} : ${minute}`
    }
  }
  return (
    <div className="rounded-circle d-flex align-self-center justify-content-center" style={{ border: "3px solid #cdcdcdbd", width: `${circle3}`, height: `${circle3}`, }}>
      <div className="rounded-circle d-flex align-self-center justify-content-center" style={{ width: `${circle2}`, height: `${circle2}`, backgroundColor: "#d86151", boxShadow: "0px 0px 8px 2px rgba(74,74,74,0.4)" }}>
        <div className="rounded-circle d-flex align-self-center justify-content-center" style={{ border: "3px solid #000", width: `${circle1}`, height: `${circle1}`, borderColor: "#cdcdcdbd" }}>
          <div style={{ alignSelf: "center" }}>
            <h1 className="p-4 text-light">
              {time}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timer;
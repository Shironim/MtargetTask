const Timer = ({ minutes, seconds, circle1, circle2, circle3 }) => {
  const clock = (number) => {
    if (number < 10) {
      return "0" + parseInt(number);
    }
    return number;
  }

  return (
    <div className="rounded-circle d-flex align-self-center justify-content-center" style={{ border: "3px solid #cdcdcdbd", width: `${circle3}`, height: `${circle3}`, }}>
      <div className="rounded-circle d-flex align-self-center justify-content-center" style={{ width: `${circle2}`, height: `${circle2}`, backgroundColor: "#d86151", boxShadow: "0px 0px 8px 2px rgba(74,74,74,0.4)" }}>
        <div className="rounded-circle d-flex align-self-center justify-content-center" style={{ border: "3px solid #000", width: `${circle1}`, height: `${circle1}`, borderColor: "#cdcdcdbd" }}>
          <div style={{ alignSelf: "center" }}>
            <h1 className="p-4 text-light">
              {`${clock(minutes)} : ${clock(seconds)}`}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timer;
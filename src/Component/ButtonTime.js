const ButtonTime = ({ tanda, addTime, minusTime }) => {
  return (
    <div onClick={tanda === "+" ? addTime : minusTime} className="rounded-circle bg-light d-flex justify-content-center align-self-center" style={{ width: "50px", height: "50px", marginRight: "16px", border: "1px solid white", boxShadow: "0px 2px 4px 1px rgba(74,74,74,0.3)" }}>
      <h2 className="text-dark">{tanda}</h2>
    </div>
  )
}
export default ButtonTime;
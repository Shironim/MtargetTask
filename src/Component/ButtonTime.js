const ButtonTime = ({ disabled, tanda, addTime, minusTime }) => {
  return (
    <button disabled={disabled} onClick={tanda === "+" ? addTime : minusTime} className="rounded-circle d-flex justify-content-center align-self-center" style={{ width: "50px", height: "50px", marginRight: "16px", border: "1px solid white", boxShadow: "0px 2px 4px 1px rgba(74,74,74,0.3)", backgroundColor: disabled ? "red" : "white" }}>
      <h2 className="text-dark m-0 p-0 align-self-center">{tanda}</h2>
    </button>
  )
}
export default ButtonTime;
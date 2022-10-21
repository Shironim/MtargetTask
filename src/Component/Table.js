
const Table = ({ logPomodoro }) => {
  return (
    <table className='table' >
      <thead>
        <tr>
          <td>#</td>
          <td>Started</td>
          <td>Duration</td>
          <td>Notes</td>
        </tr>
      </thead>
      <tbody>
        {
          logPomodoro && logPomodoro.map((l, key) => (
            <tr>
              <td key={key}>{key + 1}</td>
              <td>{l[0]}</td>
              <td>{l[1]}</td>
              <td>{l[2]}</td>
            </tr>
          ))
        }
      </tbody>
    </table >
  )
}

export default Table;
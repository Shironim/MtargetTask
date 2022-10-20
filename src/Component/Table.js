const Table = ({ history, durationTime, clock }) => {
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
          history && history.map((histo, key) => (
            <tr>
              <td key={key}>{key + 1}</td>
              <td>{histo.start}</td>
              <td>{`${clock(durationTime)} ${histo.duration}`}</td>
              <td>{histo.notes}</td>
            </tr>
          ))
        }
      </tbody>
    </table >
  )
}

export default Table;
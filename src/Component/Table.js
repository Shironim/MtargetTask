const Table = ({ history }) => {
  let d = Date();
  let a = d.toString();
  return (
    <table table className='table' >
      <thead>
        <tr>
          <td>#</td>
          <td>Started</td>
          <td>Duration</td>
          <td>Notes</td>
          <td>apa ya</td>
        </tr>
      </thead>
      <tbody>
        {
          history && history.map((histo, key) => (
            <tr>
              <td key={key}>{key + 1}</td>
              <td>{histo.start}</td>
              <td>{histo.duration}</td>
              <td>{histo.notes}</td>
            </tr>
          ))
        }
      </tbody>
    </table >
  )
}

export default Table;
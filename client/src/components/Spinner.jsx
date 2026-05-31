function Spinner(){
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "80vh"}}>
        <div className="p-3 text-center">
            <div className="spinner-grow text-primary m-1" role="status"></div>
            <div className="spinner-grow text-primary m-1" role="status"></div>
            <div className="spinner-grow text-primary m-1" role="status"></div>
            <p><strong role="status">Loading...</strong></p>
        </div>
      </div>
    )
}

export default Spinner;
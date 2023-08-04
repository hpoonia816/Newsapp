import React from 'react'
import noimage from './noimage.jpg'

const Newsitem =(props)=> {
  
    let {title, description, imgURL, newsURL,  date , author , source}=props;
    return (
      <>
        <div className="card" style={{width: "18rem"}}>
          <img src={imgURL?imgURL:noimage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} <span className="badge bg-danger">{source}</span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">by {!author?'unkown':author} on {new Date(date).toUTCString() }</small></p>
            <a href={newsURL} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </>
    )
  
}

export default Newsitem

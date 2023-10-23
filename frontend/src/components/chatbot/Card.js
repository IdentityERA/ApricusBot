import React from 'react'

const Card = (props) => {
  return (
    <div style={{float: 'left', paddingRight: 30, width: 270}}>
        <div className="card">
        <div className="card-image" style={{width: 240}}>
          <img alt={props.payload.fields.headers.stringValue} src={props.payload.fields.image.stringValue}/>
          <span className="card-title">{props.payload.fields.headers.stringValue}</span>
        </div>
        <div className="card-content">
          {props.payload.fields.description.stringValue}
          <p><a>{props.payload.fields.price.stringValue}</a></p>
        </div>
        <div className="card-action">
          <a href={props.payload.fields.link.stringValue}>GET NOW</a>
        </div>
      </div>
    </div>
  )
}

export default Card
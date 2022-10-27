import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let { title, discription, imageUrl, url, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                        <span className="badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>
                            {source}
                        </span>
                    </div>
                    <img src={!imageUrl ? "https://assets-prd.ignimgs.com/2022/09/05/thelordoftheringstheringsofpowerofficialtrailer-ign-blogroll-1661267872316-1662350056924.jpg?width=1280" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{discription}...</p>
                        <p className="card-text"><small className="text-danger">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem

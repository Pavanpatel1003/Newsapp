import React, { Component } from 'react'
import Spinner from '../Spinner';
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 5,
    categories: "general"
  }

  static PropTypo = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    categories: PropTypes.string,
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }
  async updateNews() {
    this.props.setProgress(10)

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48a551f407764caf9db3b141a807d640&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(35);
    let parsedData = await data.json()
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100)

  }
  async componentDidMount() {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  // handlePreviousClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }

  // handleNextClick = async () => {

  //   // this.setState({ page: this.state.page + 1 })
  //   this.updateNews();
  // }


  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48a551f407764caf9db3b141a807d640&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    })
  };

  render() {

    return (
      <div className='container my-3'>
        <h1 className="text-center">NewsMonkeys- Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner></Spinner>} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner></Spinner>}
        >

          <div className="row">
            {this.state.articles.map((Element) => {

              return <div className="col-md-4" key={Element?.url}>
                <Newsitem title={Element.title ? Element.title.slice(0, 45) : ""} discription={Element.description ? Element.description.slice(0, 88) : ""} imageUrl={Element.urlToImage} url={Element.url} author={Element.author} date={Element.publishedAt} source={Element.source.name}></Newsitem>
              </div>
            })}
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&#8592; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &#8594;</button>
        </div> */}
      </div >
    )
  }
}
export default News

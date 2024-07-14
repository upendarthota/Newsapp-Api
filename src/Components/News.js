import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
//import Spinner from './Spinner';
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  //const capitalizeFirstletter=(string)=>{
  //   return string.charAt(0).toUppercase()+string.slice(1)
  //  // return string.charAt(0).toUppercase() + string.slice(1);
  // }

  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  //  // setLoading(true);
  //   let data = await fetch(url);
  //   let parsedata = await data.json();
  //   //console.log(parsedata);
  //   setArticles(parsedata.articles);
  //   setTotalresults(parsedata.setTotalresults);
  //  // setLoading(false);
  //   props.setProgress(100);

  try {
    let data = await fetch(url);
    let parsedata = await data.json();
    
    // console.log(parsedata);
    setArticles(parsedata.articles);
    
    // Fix the typo in method name
    setTotalResults(parsedata.totalResults);
    
    // setLoading(false);
    props.setProgress(100);
  } catch (error) {
    console.error('Error fetching news:', error);
    // Handle the error as needed
    // setLoading(false);
    props.setProgress(100);
  }
  };

  useEffect(() => {
    //document.title=`${capitalizeFirstletter(props.category)}-NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  // const handleNextClick = async () => {
  //   setPage(page+1);
  //   updateNews();
  // };

  //  const handlePrevClick = async () => {
  //    setPage(page-1);
  //    updateNews();
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    //this.setState({ loading: true });
    
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    setArticles(articles.concat(parsedata.articles));
    setTotalResults(parsedata.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsMonkey-Top {props.category} HeadLines
      </h1>

      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={articles && articles.length !== totalResults}
        loader={<h4>Loading...</h4>}
      >
        <div className="container">
          <div className="row">
            {articles?.map((element) => {
              return (
                <div className="col-md-4" key={element.key}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

import React ,{useEffect,useState} from "react";
import Newsitem from "./Newsitem";
//import Spinner from './Spinner';
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalresults]=useState(0)
  //document.title=`${this.props.category}-NewsMonkey`;

  //const capitalizeFirstletter=(string)=>{
  //   return string.charAt(0).toUppercase()+string.slice(1)
  //  // return string.charAt(0).toUppercase() + string.slice(1);
  // }
  
     
  }

  const updateNews= async ()=> {
     props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${state.page}&pageSize=${props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    setArticles(parsedata.articles);
    setTotalresults(parsedata.setTotalresults);
    setLoading(false);
    this.props.setProgress(100);
  }


useEffect(() => {
  this.updateNews();
 
}, [ ])

 
  const handleNextClick = async () => {
    // if(!(this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize))){
    //  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a3b6314f3cfb40218bf8451ccfe57004&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

    //   this.setState({loading:true});
    //   let data= await fetch(url);
    //   let parsedata=await data.json()
    //   // this.setState({loading:false});
    //   this.setState({articles:parsedata.articles})

    // this.setState({
    //   page:this.state.page+1,
    //   articles:parsedata.articles,
    //   loading:false
    // })
    // }

    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

   const handlePrevClick = async () => {
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a3b6314f3cfb40218bf8451ccfe57004&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data= await fetch(url);
    //   let parsedata=await data.json()
    //   console.log(parsedata)
    //   this.setState({articles:parsedata.articles})

    // this.setState({
    //   page:this.state.page-1,
    //   articles:parsedata.articles,
    //   loading:false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
     this.setState ({page:this.state.page+1})
     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
     this.setState({ loading: true });
     let data = await fetch(url);
     let parsedata = await data.json();
     console.log(parsedata);
     this.setState({
       articles:this.state.articles.concat(parsedata.articles),
       totalResults: parsedata.totalresults,
       loading: false,
     });
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px" }}>
        NewsMonkey-Top {this.props.category} HeadLines
      </h1>
  
      <InfiniteScroll
        dataLength={this.state.articles ? this.state.articles.length : 0}
        next={this.fetchMoreData}
        hasMore={this.state.articles && this.state.articles.length !== this.state.totalResults}
        loader={<h4>Loading...</h4>}
      >
        <div className="container">
          <div className="row">
            {this.state.articles && this.state.articles.map((element) => (
              <div className="col-md-4" key={element.key}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
  
      
    
      
export default News;

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
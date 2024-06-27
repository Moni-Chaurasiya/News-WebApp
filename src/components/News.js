//rce
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  // articles=  [
  //   {
  //  "source": {
  //   "id": null,
  //   "name": "Xataka.com"
  //   },
  //   "author": "Javier Pastor",
  //   "title": "Apple Intelligence apunta a ser la excusa perfecta para algo crucial para el futuro: vender más iPhone",
  //   "description": "La inteligencia artificial de Apple pronto llegará a las versiones beta de iOS 18, iPadOS 18 y macOS Sequoia, pero solo  una parte de los actuales propietarios de un iPhone podrán probarla. ¿La  razón? Para poder hacerlo necesitarás un iPhone 15 Pro o un iPho…",
  //   "url": "https://www.xataka.com/moviles/apple-intelligence-apunta-a-ser-excusa-perfecta-para-algo-crucial-para-futuro-vender-iphone",
  //   "urlToImage": "https://i.blogs.es/6c75de/ap1/840_560.jpeg",
  //   "publishedAt": "2024-06-12T06:21:12Z",
  //   "content": "La inteligencia artificial de Apple pronto llegará a las versiones beta de iOS 18, iPadOS 18 y macOS Sequoia, pero solo  una parte de los actuales propietarios de un iPhone podrán probarla. ¿La  razó… [+3814 chars]"
  //   },
  //   {
  //     "source": {
  //      "id": null,
  //      "name": "Apple Newsroom"
  //      },
  //      "author": null,
  //      "title": "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) 2024",
  //      "description": "Apple is sponsoring the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), which is taking place in person from June 17…",
  //      "url": "https://machinelearning.apple.com/updates/apple-at-cvpr-2024",
  //      "urlToImage": "https://mlr.cdn-apple.com/media/Home_1200x630_48225d82e9.png",
  //      "publishedAt": "2024-06-12T03:00:00Z",
  //      "content": "Apple is sponsoring the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), which is taking place in person from June 17 to 21 in Seattle, Washington. CVPR is the annual computer v… [+3871 chars]"
  //      },
  //     {
  //      "source": {
  //       "id": "the-verge",
  //       "name": "The Verge"
  //       },
  //       "author": "Jay Peters",
  //       "title": "The AI upgrade cycle is here",
  //       "description": "The new Apple Intelligence features coming to iOS 18 could be impressive, but they might also just be driving another upgrade cycle.",
  //       "url": "https://www.theverge.com/2024/6/12/24176494/apple-intelligence-ai-upgrade-cycle-here",
  //       "urlToImage": "https://cdn.vox-cdn.com/thumbor/P5dOxew0xBSysV0lIfow9ik4eso=/0x0:2040x1360/1200x628/filters:focal(1309x713:1310x714)/cdn.vox-cdn.com/uploads/chorus_asset/file/24931973/236794_iPhone_15_pro_pro_Max_VPavic_0017.jpg",
  //       "publishedAt": "2024-06-12T12:00:00Z",
  //       "content": "The AI upgrade cycle is here\r\nThe AI upgrade cycle is here\r\n / Will it be worth upgrading your iPhone for Apple Intelligence?\r\nByJay Peters, a news editor who writes about technology, video games, an… [+4024 chars]"
  //       },
  //     {
  //      "source": {
  //       "id": null,
  //       "name": "MacRumors"
  //       },
  //       "author": "Joe Rossignol",
  //       "title": "Apple Passes Microsoft to Become World's Most Valuable Company Again",
  //       "description": "Apple's stock price continues to surge following its WWDC keynote this week, where it introduced an Apple Intelligence suite of AI features coming to the iPhone, iPad, and Mac. In intraday trading today, Apple overtook Microsoft to become the world's most val…",
  //       "url": "https://www.macrumors.com/2024/06/12/apple-is-the-worlds-most-valuable-company-again/",
  //       "urlToImage": "https://images.macrumors.com/t/f3VEEbWYtJRKFzkdAIZytTWXIpg=/2676x/article-new/2022/01/Apple-Logo-Cash-Feature-Mint.jpg",
  //       "publishedAt": "2024-06-12T13:53:06Z",
  //       "content": "Apple's stock price continues to surge following its WWDC keynote this week, where it introduced an Apple Intelligence suite of AI features coming to the iPhone, iPad, and Mac. In intraday trading to… [+898 chars]"
  //       }
  //  ]

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",

  };
  PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.capitalFirstLetter(
      this.props.category
    )}-NewsMonkey`;
  }
  handleNextClick = async () => {
    this.setState({ loading: true });

    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    // this.setState({articles:parsedData.articles})

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  handlePrevClick = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apiKey}&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    // this.setState({articles:parsedData.articles})

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  fetchMoreData=async()=>{
   this.setState({page:this.state.page+1})
   this.setState({ loading: true });
 
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
   
    this.setState({ 
                    articles: this.state.articles.concat(parsedData.articles),
                    loading: false ,
                    totalResults:parsedData.totalResults,
                   
                  });
  }

  async componentDidMount() {
    this.props.setProgress(0);
    this.setState({ loading: true });
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({ 
                    articles: parsedData.articles,
                    loading: false ,
                    totalResults:parsedData.totalResults,
                   
                  });
    this.props.setProgress(100);

  }
  render() {
    return (
      <>
        <h1 className="text-center my-3 " style={{ margin: "40px 0px" }}>
          NewsMonkey - Top {this.capitalFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.totalResults}
          loader={<Spinner/>}
        
        >
        <div className="container">
            
         
          <div className="row">
            {/* {!this.state.loading && this.state.articles.map((element,index)=>{ */}
            {this.state.articles.map((element, index) => {
              return (
                <div className="col-md-4" key={element.url + index}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 50)
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

            {/* <div className="col-md-4">
           <NewsItem title="mytitle" description="mydescription"/>
           </div>
           <div className="col-md-4">
           <NewsItem title="mytitle" description="mydescription"/>
           </div> */}
          </div>
         </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevClick}
            className="btn btn-danger"
          >
            {" "}
            &larr; Previous{" "}
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>  */}
      </>
    );
  }
}

export default News;

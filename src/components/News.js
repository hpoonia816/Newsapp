import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import  PropTypes  from 'prop-types';
const News =(props)=> {
    const capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    if (props.category==='general'){
        document.title = "HIMS' News - Home";
    }
    else{
        document.title = "HIMS' News - " +  capitalizeFirstLetter( props.category);
    }
    
    const updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=12`;
         props.setProgress(10);
        //  setState({ loading: true })
        let data = await fetch(url);
        let parsedata = await data.json();
         props.setProgress(100);
         setArticles(parsedata.articles)
         setTotalResults(parsedata.totalResults)
    }
    useEffect(() => {
        updateNews();
        //eslint-disable-next-line
    },[]);
    const fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=12`;
        setPage(page+1);
        setLoading(true);
        let data = await fetch(url);
        let parsedata = await data.json();
        setLoading(false);
        setArticles(articles.concat(parsedata.articles));
        setTotalResults(parsedata.totalResults);
        
    }
        return (
            <>

                <>
                    <h1 className='text-center' style={{marginTop : '90px'}}>Top Headlines from { capitalizeFirstLetter(props.category)} category </h1>
                    <div className="containner text-center">{loading && <Spinner />}</div>
                    <InfiniteScroll
                        dataLength={articles?.length}
                        next={fetchMoreData}
                        hasMore={articles?.length !== totalResults}
                        loader={<div className="container text-center">{<Spinner />}</div>}
                    >
                        <div className="container"><div className="row my-3" >
                            {  articles?.map((element) => {
                                return (
                                    <div className="col md-3 my-3" key={element.url}>
                                        <Newsitem title={element.title} source={element.source.name} description={element.description} imgURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} />
                                    </div>
                                );
                            })}
                        </div>
                        </div>

                    </InfiniteScroll>

                    {/* <div className="container d-flex justify-content-between">
                        <button type="button" className="btn btn-primary" onClick={ previous} disabled={  page === 1 ? true : false}>&larr; Previous</button>
                        <button type="button" className="btn btn-primary" onClick={ next} disabled={  page + 1 > Math.ceil(  totalResults / 12) ? true : false}>Next &rarr;</button>
                    </div> */}
                </>
            </>
        )
    
}
News.defaultProps={
    country : 'in',
    category : 'general'
  }
  News.propTypes={
    country : PropTypes.string,
    caategory : PropTypes.string
  }
export default News

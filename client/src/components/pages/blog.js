import React , { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

//component
import Articles from './blog/articles';
import Categories from './blog/categories';

export default class Blog extends Component{
    constructor(props) {
        super(props);
        this.state = {
            articles : [],
            categories : [],
            nextPage : 1,
            hasMore : true
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:8000/api/v1/categories')
        .then(res => {
            const { data } = res.data;
            console.log(data);
            this.setState({
                categories : data
            })
        })
        .catch(err => console.log(err))
    }

    handlerLoadMore(){
        axios.get(`http://localhost:8000/api/v1/articles?page=${this.state.nextPage}`)
        .then(res => {
            const { data } = res.data;
            this.setState( prevState => ({
                articles : [...prevState.articles , ...data.articles],
                hasMore : data.page !== data.pages,
                nextPage : data.page + 1
            }))
        })
        .catch(err => console.log(err))
    }

    render() {
        const { articles , categories } = this.state;
      return (
            <div className="row blog">
                <div className="col-md-9">
                    <div className="row">
                    <InfiniteScroll className="row" pageStart={0} loadMore={this.handlerLoadMore.bind(this)} hasMore={this.state.hasMore} loader={<div className="loader" key={0}>Loading ...</div>}>
                        {articles.map((article,index) => <Articles article={article} key={index} />)}
                    </InfiniteScroll>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-box">
                        <h4 className="header-title m-t-0 m-b-30">Categories</h4>
                        <ul className="list-group m-b-0 user-list">
                            {categories.map((category , index) => <Categories category={category} key={index}/> )}
                        </ul>
                    </div>
                </div>
            </div>
      )
    }
}
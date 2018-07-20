import React , { Component }  from 'react';
import axios from 'axios';

//component
import Articles from './category/articles';

export default class Category extends Component{
    constructor(props) {
        super(props);
        this.state = {
            category : {},
            articles : []
        }
    }
    componentDidMount(){
        const { params } = this.props.match;
        axios.get(`http://localhost:8000/api/v1/categories/${params.url}`)
        .then(res=>{
            const { data } = res.data;
            this.setState({
                category : data,
                articles : data.articles
            })
        })
        .catch(err=>console.log(err));
    }
    render() {
        const { category , articles } = this.state;
      return (
        <div>
            <div className="row">
                <div className="col-sm-12">
                    <h4 className="page-title">{category.title}</h4>
                </div>
            </div>
            <div className="row">
                {articles.map((article,index)=><Articles article={article} key={index} />)}
            </div>
        </div>
      )
    }
}
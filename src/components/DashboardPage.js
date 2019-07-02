import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
axios.defaults.headers.common['access_token'] = sessionStorage.getItem('access_token');

class DashboardPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      newComment: '',
      numOfPages: [1,2,3,4,5],
      comments: [
      ]
    }
    this.pageChange = this.pageChange.bind(this);
    this.doComment = this.doComment.bind(this);
    // this.pageChange(this.state.currentPage);
  }

  componentWillMount() {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isLoggedIn = this.props.login.email &&
      emailRegex.test(String(this.props.login.email).toLowerCase());
    if (!isLoggedIn) {
      browserHistory.push('/');
    }
  }

  componentDidMount() {
    this.pageChange(this.state.currentPage)
  }

  async pageChange(pageNumber){
    let currentPage = pageNumber;
    let comments = await axios.get('http://localhost:5000/api/comment/'+currentPage)
    .then((response)=>{
      return response.data;
    }).catch((err)=>{
      return [];
    });

    this.setState({
      currentPage: currentPage,
      comments: comments
    })

  }

  async doComment(){
    let comments = this.state.comments;
    let newComment = await axios.post('http://localhost:5000/api/comment',{
      comment: this.state.newComment,
      pageNumber: this.state.currentPage
    }).then((response)=>{
      return [response.data]
    }).catch((err)=>{
      return([])
    })

    comments = comments.concat(newComment);
    this.setState({comments: comments, newComment: ''})
  }

  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard Page</h1>
        <div className="inputs" style={{paddingTop: '4%'}}>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-2">
              <label>Select page</label>
              <select className="form-control" onChange={(e)=>this.pageChange(e.target.value)} value={this.state.currentPage}>
              {this.state.numOfPages.map((pageNumber)=>{
                return <option key={pageNumber} value={pageNumber}
                  >{pageNumber}</option>
              })}
              </select>
            </div>
            <div className="col-md-2">3</div>
            <div className="col-md-2">4</div>
            <div className="col-md-3"></div>
          </div>
        </div>
        <div className="screen" style={{paddingTop: '4%'}}>
          <br />
          <br />
          <img width="400" height="200" src={'http://localhost:5000/'+this.state.currentPage + '.png'} />
        </div>

        {
          this.state.comments.length ?
          <div className="comments" style={{paddingTop: '4%'}}>
            {
              this.state.comments.map((comment, commentIndex)=>{
                return(
                  <div key={commentIndex} style={
                    {
                      paddingTop: '20px',
                      border: '1px solid lightgrey'
                    }
                  }>
                    <div className="user" style={{paddingTop: '5px', paddingLeft: '10px' }}>
                      <span style={{fontWeight: '100'}}>{comment.firstName + ' ' + comment.lastName}</span>
                      <span> {comment.role == 'developer' ? 'developer': 'user'}</span>
                    </div>
                    <div className="comment" style={{paddingTop: '5px', paddingLeft: '10px', paddingBottom: '10px'}}>{comment.comment}</div>
                  </div>
                )
              })
            }
          </div>
          :
          <div className="no-comment" style={{paddingTop: '4%'}}>
            No comments yet. Be the first one to comment.
          </div>
        }

        <div className="do-comment">
          <br />
          <br />
          <textarea value={this.state.newComment} 
            onChange={(e)=>this.setState({newComment: e.target.value})}>
          </textarea>
          <br/>
          <button className="btn btn-sm" disabled={!this.state.newComment} 
            onClick={(e)=>this.doComment()} >
            Comment
          </button> 
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
  };
}

export default connect(mapStateToProps)(DashboardPage);


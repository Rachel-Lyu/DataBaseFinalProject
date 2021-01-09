import React from "react";
import {postFetch} from "../function/fetch";
import {Button} from 'antd';
import Checkbox from '@material-ui/core/Checkbox';
import {FormControlLabel } from "@material-ui/core";
import PropTypes from 'prop-types'

class CommentInput extends React.Component{
    constructor () {
        super()
        this.state = {
          uid: null,
          tid: null,
          content: '',
          anony: 0,
          data: null
        }
    }

    handleContentChange (event) {
        this.setState({
          content: event.target.value
        })
    }

    handleBoxChange = (event) => {
        // this.setState({
        //     anony: event.target.value
        // })
    };
    
    handleSubmit () {
        if (this.props.onSubmit && this.state.content != '') {
          let body = new Object();
          body.uid = localStorage.getItem('id')
          body.tid = this.props.ticketId
          body.tid = 1
          body.comment = this.state.content
          body.anony = this.state.anony
          if (body.comment == '') return alert('请输入评论内容')
          this.props.onSubmit(body)
        }
        this.setState({ content: '' })
    }
    
    render() {
        return (
            <div className='comment-input'>
              <div className='comment-field'>
                <span className='comment-field-name'>评论内容：</span>
                <div className='comment-field-input'>
                  <textarea 
                  ref={(textarea) => this.textarea = textarea}
                  value={this.state.content}
                  onChange={this.handleContentChange.bind(this)}
                  />
                </div>
              </div>
              <div>
                  <FormControlLabel
                    control = {<Checkbox
                        onChange={this.handleBoxChange}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />}
                    label = "匿名"
                />
              </div>
              <div className='comment-field-button'>
                 <Button type="primary" onClick={this.handleSubmit.bind(this)}>发布</Button>
                 {/* <Button type="primary" onClick={()=>this.buy(localStorage.getItem('id'),this.props.match.params.ticketId)}>购买</Button> */}
              </div>
            </div>
        )
    }    
}

class Comment extends React.Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func,
        index: PropTypes.number
    }
    
    constructor () {
        super()
        this.state = { timeString: '' }
    }
    
    componentWillMount () {
        this._updateTimeString()
        this._timer = setInterval(
          this._updateTimeString.bind(this),
          5000
        )
    }

    _updateTimeString () {
        const comment = this.props.comment
        var time = new Date(comment.time.replace("T", " "))
        var timestr = time.getTime()
        console.log(comment.time.replace("T", " "), timestr)
        const duration = (+Date.now() - time) / 1000
        this.setState({
          timeString: duration > 120 
          ? (comment.time.replace("T", " ")) 
          : ( duration > 60
            ? `${Math.round(duration / 60)} 分钟前`
            : `${Math.round(Math.max(duration, 1))} 秒前`)
        })
    }

    _getProcessedContent (content) {
        return content
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
          .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }
    
    handleDeleteComment () {
        if (this.props.onDeleteComment) {
          this.props.onDeleteComment(this.props.comment.cid, this.props.comment.uid)
        }
    }
    
    render () {
      return (
        <div className='comment'>
          <div className='comment-username'>
            <span>{this.props.comment.uid} </span>：
          </div>
          <p dangerouslySetInnerHTML={{
            __html: this._getProcessedContent(this.props.comment.content)
          }} />
          <span className='comment-createdtime'>
            {this.state.timeString}
          </span>
          <span 
          onClick={this.handleDeleteComment.bind(this)}
          className='comment-delete'>
            删除
          </span>
        </div>
      )
    }
}

class CommentList extends React.Component{
    static propTypes = {
        onDeleteComment: PropTypes.func
      }
    
    handleDeleteComment (cid, uid) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(cid, uid)
        }
    }

    render() {
        return (
            <div>
                {this.props.comments.map((comment, i) => 
                    <Comment
                    comment={comment}
                    onDeleteComment={this.handleDeleteComment.bind(this)} />
                )}
            </div>
        )
    }
}



class CommentApp extends React.Component{
    constructor(){
        super()
        this.state = {
            data: null
        }
    }

    handleSubmitComment (body) {
        postFetch("/api/createComment", body, (rsp) =>{
            this.setState({data:rsp})
        })
    }

    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func
    }

    handleDeleteComment (cid, uid) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(cid, uid)
        }
    }

    render(){
        console.log(this.props.comments)
        return(
        <div>
            <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
            <CommentList 
                comments={this.props.comments}
                onDeleteComment={this.handleDeleteComment.bind(this)}/>
        </div>
        )
    }
}

export default CommentApp
import React, { useState, useEffect, useContext } from "react"

import CommentsContext from "../CommentsProvider"
import { ISOToFull } from "../../lib"
import Reply from "../Reply"
import { IComment, ISubcomment } from "../CommentsProvider"

export interface CommentProps {
  data: IComment,
  subcommentsLength: Number,
}


const Comment = ({ data, subcommentsLength }: CommentProps) => {
  const { collapseReplies, user } = useContext(CommentsContext)
  const [showFormReply, setShowFormReply] = useState(false)
  const [showReplies, setShowReplies] = useState(collapseReplies !== true)
  const renderReplies = () => {
    if (data.subcomments && data.subcomments.length) {
      const repliesJSX = data.subcomments.map(replyData => {
        return <Reply
          data={replyData}
          key={replyData.id}
        />
      })
      return repliesJSX
    }
    return null
  }
  const [replies, setReplies] = useState(renderReplies())
  useEffect(() => {
    setReplies(renderReplies())
  }, [subcommentsLength])
  const toggleReplies = () => {
    setShowReplies(prev => !prev)
  }
  const toggleShowFormReply = () => {
    setShowFormReply(prev => !prev)
  }
  return (
    <div className="py-2">
      <div className="pb-1">
        <div className="pb-1">
          <div className="d-flex">
            <p className="fw-bold mb-1">
              {data.from_admin ? "Admin" : data.author ? data.author.username : "User"}
            </p>
            <p className="ms-2 mb-1">
              {"\t"} on {ISOToFull(data.createdAt)}
            </p>
          </div>
        </div>
        <div className="p-3 border rounded">
          <p className="mb-0">
            {data.content}
          </p>
        </div>
      </div>
      <div className="d-flex">
      {
        (replies && replies.length) ?
          <div>
            <button className="btn btn-light" onClick={toggleReplies}>
              {replies.length}
              {" "} {replies.length === 1 ? " reply" : " replies"}
            </button>
          </div>
        : <div className="d-flex align-items-center">0 replies</div>
      }
      {
        (user && user.token) && (
          <button
            className="btn btn-outline-primary ms-2"
            onClick={toggleShowFormReply}
          >Leave a reply</button>
        )
      }
      </div>
      {
        showFormReply &&
          <FormReply
            commentID={data.id}
            closeForm={() => setShowFormReply(false)}
          />
      }
      {
        showReplies &&
        <div className="ps-3">
          {replies}
        </div>
      }
    </div>
  )
}

export default Comment

interface FormReplyProps {
  commentID: number,
  closeForm: () => void
}

const FormReply = ({ commentID, closeForm }: FormReplyProps) => {
  const { postReply } = useContext(CommentsContext)
  const [content, setContent] = useState("")
  const [sending, setSending] = useState(false)
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!content) {
      return
    }
    setSending(true)
    const successful = await postReply(commentID, content)
    if (successful) {
      closeForm()
    }
  }
  return (
    <form onSubmit={handleSubmit} className="ps-3 mt-1">
      <div className="d-flex flex-column mb-1">
        <label>
          <p className="fw-bold small mb-1">Your reply</p>
          <textarea
            className="form-control"
            rows={3}
            onChange={handleInput}
            placeholder="Type a comment here"
            name="content"
            value={content}
          ></textarea>
        </label>
      </div>
      <div className="pt-1">
        <div className="d-flex">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={((content.length < 1) || sending) ? true : undefined}
          >{sending ? "Sending" : "Submit"}</button>
          <button
            className="btn btn-secondary ms-2"
            type="button"
            disabled={sending ? true : undefined}
            onClick={closeForm}
          >Cancel</button>
        </div>
      </div>
    </form>
  )
}

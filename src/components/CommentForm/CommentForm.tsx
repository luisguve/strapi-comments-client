import React, { useState, useContext } from "react"

import CommentsContext from "../CommentsProvider"

export interface CommentFormProps {
  label?: string
}

const CommentForm = (props: CommentFormProps) => {
  const { user, postComment } = useContext(CommentsContext)
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
    const successful = await postComment(content)
    if (successful) {
      setContent("")
    }
    setSending(false)
  }
  if (!user) {
    return (
      <div className="py-3">
        Login to post a comment
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="py-3">
        <p className="fs-4">{props.label || "Post a comment"}</p>
        <div className="d-flex flex-column mb-1">
          <label>
            <p className="fw-bold small mb-1">Your comment</p>
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
          <button
            className="btn btn-primary"
            type="submit"
            disabled={((content.length < 1) || sending) ? true : undefined}
          >{sending ? "Sending" : "Submit"}</button>
        </div>
      </div>
    </form>
  )
}

export default CommentForm
import React, { useContext, useState, useEffect } from "react"

import Comment from "../Comment"
import CommentsContext from "../CommentsProvider"

const Comments = () => {
  const { commentsCount, comments, loadMore, loadingComments } = useContext(CommentsContext)
  const [loadingMore, setLoadingMore] = useState(false)
  const [commentsJSX, setCommentsJSX] = useState<React.ReactNode[] | null>(null)
  useEffect(() => {
    setCommentsJSX(comments.map(comment => {
      const subcommentsLength = comment.subcomments ? comment.subcomments.length : 0
      return (
        <Comment subcommentsLength={subcommentsLength} data={comment} key={comment.id} />
      )
    }))
  }, [comments])
  const loadMoreComments = async () => {
    setLoadingMore(true)
    await loadMore()
    setLoadingMore(false)
  }
  return (
    <div>
      {
        loadingComments ?
          <p className="small fs-6">
            Loading Comments...
          </p>
        :
          (comments.length > 0) ?
            <div className="d-flex flex-column">
              {commentsJSX}
              {
                (commentsJSX && (commentsJSX.length < commentsCount)) &&
                <button
                  className="btn btn-secondary mt-2"
                  onClick={loadMoreComments}
                  disabled={loadingMore ? true : undefined}
                >Load more comments</button>
              }
            </div>
          : <p className="small fs-6">There are no comments</p>
      }
    </div>
  )
}

export default Comments
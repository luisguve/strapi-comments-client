import React, { useContext, useState, useEffect } from "react"
import { Stack } from "@strapi/design-system/Stack"
import { Box } from "@strapi/design-system/Box"
import { Typography } from "@strapi/design-system/Typography"
import { Button } from "@strapi/design-system/Button"

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
    <Box>
      {
        loadingComments ?
          <Typography variant="beta">
            Loading Comments...
          </Typography>
        :
          (comments.length > 0) ?
            <Stack size={2}>
              {commentsJSX}
              {
                (commentsJSX && (commentsJSX.length < commentsCount)) &&
                <Button
                  variant="secondary"
                  onClick={loadMoreComments}
                  loading={loadingMore ? true : false}
                >Load more comments</Button>
              }
            </Stack>
          : <Typography variant="beta">There are no comments</Typography>
      }
    </Box>
  )
}

export default Comments
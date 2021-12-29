import React, { useState, useContext } from "react"
import { Textarea } from '@strapi/design-system/Textarea';
import { Button } from '@strapi/design-system/Button';
import { Box } from "@strapi/design-system/Box"
import { Typography } from '@strapi/design-system/Typography';

import CommentsContext from "../CommentsProvider"

export interface CommentFormProps {
  label?: string
}

const CommentForm = (props: CommentFormProps) => {
  const { user, postComment } = useContext(CommentsContext)
  const [content, setContent] = useState("")
  const [sending, setSending] = useState(false)
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
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
      <Box paddingTop={3} paddingBottom={3}>
        Login to post a comment
      </Box>
    )
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box paddingTop={3} paddingBottom={3}>
        <Typography variant="beta">{props.label || "Post a comment"}</Typography>
        <Textarea
          placeholder="Type a comment here"
          label="Content"
          name="content"
          onChange={handleInput}
        >
          {content}
        </Textarea>
        <Box paddingTop={2}>
          <Button
            type="submit"
            loading={sending ? true : undefined}
            disabled={content.length < 1 ? true : false}
          >{sending ? "Sending" : "Submit"}</Button>
        </Box>
      </Box>
    </form>
  )
}

export default CommentForm
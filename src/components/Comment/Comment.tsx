import React, { useState, useEffect, useContext } from "react"
import { Stack } from '@strapi/design-system/Stack';
import { Divider } from '@strapi/design-system/Divider';
import { Textarea } from '@strapi/design-system/Textarea';
import { Button } from '@strapi/design-system/Button';
import { Box } from "@strapi/design-system/Box"
import { Typography } from '@strapi/design-system/Typography';

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
    <Box paddingTop={4} paddingBottom={4}>
      <Box paddingBottom={4}>
        <Box paddingBottom={2}>
          <Stack horizontal size={2}>
            <Typography fontWeight="bold">
              {data.from_admin ? "Admin" : data.author ? data.author.username : "User"}
            </Typography>
            <Typography>
              {"\t"} on {ISOToFull(data.createdAt)}
            </Typography>
          </Stack>
        </Box>
        <Box background="neutral0" borderColor="neutral200" hasRadius={true} padding={6}>
          <Typography>
            {data.content}
          </Typography>
        </Box>
      </Box>
      <Stack horizontal size={4}>
      {
        (replies && replies.length) ?
          <Box>
            <Button variant="ghost" onClick={toggleReplies}>
              {replies.length}
              {" "} {replies.length === 1 ? " reply" : " replies"}
            </Button>
          </Box>
        : <Box>0 replies</Box>
      }
      {
        (user && user.token) &&
        <Button variant="secondary" onClick={toggleShowFormReply}>Leave a reply</Button>
      }
      </Stack>
      {
        showFormReply &&
          <FormReply
            commentID={data.id}
            closeForm={() => setShowFormReply(false)}
          />
      }
      {
        showReplies &&
        <Box paddingLeft={3}>
          {replies}
        </Box>
      }
    </Box>
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
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
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
    <form onSubmit={handleSubmit}>
      <Textarea
        placeholder="Type a comment here"
        label="Your reply"
        name="content"
        onChange={handleInput}
      >
        {content}
      </Textarea>
      <Box paddingTop={2}>
        <Stack horizontal size={4}>
          <Button
            type="submit"
            loading={sending ? true : undefined}
            disabled={content.length < 1 ? true : undefined}
          >{sending ? "Sending" : "Submit"}</Button>
          <Button
            variant="secondary"
            type="Button"
            disabled={sending ? true : undefined}
            onClick={closeForm}
          >Cancel</Button>
        </Stack>
      </Box>
    </form>
  )
}

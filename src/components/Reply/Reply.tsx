import React from "react"
import { Box } from "@strapi/design-system/Box"
import { Divider } from "@strapi/design-system/Divider"
import { Stack } from "@strapi/design-system/Stack"
import { Typography } from "@strapi/design-system/Typography"

import { ISubcomment } from "../CommentsProvider"
import { ISOToFull } from "../../lib"

export interface ReplyProps {
  data: ISubcomment
}

const Reply = ({data}: ReplyProps) => {
  const authorLabel = data.from_admin ? "Admin" : data.author ? data.author.username : "User"

  return (
    <Box paddingTop={3}>
      <Divider />
      <Box paddingTop={3}>
        <Stack horizontal size={2}>
          <Typography fontWeight="bold">
            {authorLabel}
          </Typography>
          <Typography>
            {"\t"} on {ISOToFull(data.createdAt)}
          </Typography>
        </Stack>
      </Box>
      <Box>
        <Typography>{data.content}</Typography>
      </Box>
    </Box>
  )
}

export default Reply
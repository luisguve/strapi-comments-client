import React, { useContext } from "react"
import { Status } from "@strapi/design-system/Status"
import { Box } from "@strapi/design-system/Box"

import CommentsContext from "../CommentsProvider"

const ErrorBox = () => {
  const { errorHelperMessage } = useContext(CommentsContext)
  if (!errorHelperMessage) {
    return null
  }
  return (
    <Box paddingTop={3} paddingBottom={3}>
      <Status variant="danger">{errorHelperMessage}</Status>
    </Box>
  )
}

export default ErrorBox

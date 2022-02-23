import React, { useContext } from "react"

import CommentsContext from "../CommentsProvider"

const ErrorBox = () => {
  const { errorHelperMessage } = useContext(CommentsContext)
  if (!errorHelperMessage) {
    return null
  }
  return (
    <div className="py-2">
      <div className="alert alert-danger">{errorHelperMessage}</div>
    </div>
  )
}

export default ErrorBox

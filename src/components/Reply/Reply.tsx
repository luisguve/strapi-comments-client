import React from "react"

import { ISubcomment } from "../CommentsProvider"
import { ISOToFull } from "../../lib"

export interface ReplyProps {
  data: ISubcomment
}

const Reply = ({data}: ReplyProps) => {
  const authorLabel = data.from_admin ? "Admin" : data.author ? data.author.username : "User"

  return (
    <div>
      <hr />
      <div>
        <div className="d-flex">
          <p className="fw-bold mb-1">
            {authorLabel}
          </p>
          <p className="ms-2 mb-1">
            {"\t"} on {ISOToFull(data.createdAt)}
          </p>
        </div>
      </div>
      <div>
        <p className="mb-1">{data.content}</p>
      </div>
    </div>
  )
}

export default Reply
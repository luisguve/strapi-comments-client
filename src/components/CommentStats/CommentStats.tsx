import React, { useEffect, useState } from "react"

interface CommentStatsProps {
  apiURL: string;
  slug: string;
}

interface IStats {
  count: number | null;
}
const defaultStatsState: IStats = {
  count: null
}

const CommentStats = (props: CommentStatsProps) => {
  const { slug, apiURL } = props
  const [stats, setStats] = useState<IStats>(defaultStatsState)
  useEffect(() => {
    const fetchStats = async () => {
      const url = `${apiURL}/api/comment-manager/comments/${slug}/count`
      try {
        const data_res = await fetch(url)
        const data = await data_res.json()
        if (!data_res.ok) {
          throw data
        }
        setStats(data)
      } catch(err) {
        console.log("Error fetching comments stats")
        console.log(err)
        setStats({
          count: 0
        })
      }
    }
    fetchStats()
  }, [])
  return (
    <p style={{margin: 0}}>
      {
        (stats.count === null) ?
          "loading comments"
        : stats.count + " comment"+(stats.count !== 1 ? "s" : "")
      }
    </p>
  )
}

export default CommentStats
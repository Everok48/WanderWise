import { trpc } from '../../lib/trpc-config'
import { Link } from 'react-router-dom'
import { getViewIdeaRoute } from '../../lib/routes'
import { useState } from 'react'

interface Idea {
  id: string;
  name: string;
  description: string;
}

export const AllIdeasPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  const { data: allData, error: allError, isLoading: allLoading } = trpc.getAllIdeas.useQuery()
  const { data: searchData, error: searchError, isLoading: searchLoading } = trpc.searchIdeas.useQuery(
    { query: searchQuery, limit: 5 },
    { enabled: searchQuery.length > 0 }
  )

  const ideas = searchQuery ? searchData?.ideas : allData?.travelIdeas
  const isLoading = allLoading || searchLoading
  const error = allError || searchError

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (error) {
    return <span>Error: {error.message}</span>
  }

  if (!ideas) {
    return <span>No data available</span>
  }

  return (
    <div>
      <h1>Путешествуйте мудро</h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск идей..."
        />
      </div>
      {ideas.map((idea: Idea) => (
        <div key={idea.id}>
          <h2>
            <Link to={getViewIdeaRoute({ travelIdeas: idea.id })}>{idea.name}</Link>
          </h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  )
}

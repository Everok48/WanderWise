import { trpc } from '../../lib/trpc-config'
import { Link } from 'react-router-dom'
import { getViewIdeaRoute, getDestinationDetailsPageRoute } from '../../lib/routes'
import { useState } from 'react'
import css from './index.module.scss'

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

  const getLinkPath = (idea: Idea) => {
    switch (idea.id) {
      case '2': // Поиск направлений
        return getViewIdeaRoute({ travelIdeas: idea.id })
      case '3': // Популярные направления
        return getDestinationDetailsPageRoute({ id: idea.id })
      default:
        return '/under-construction'
    }
  }

  return (
    <div className={css.ideas}>
      <h1 className={css.title}>Путешествуйте мудро</h1>
      <div className={css.search}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Место, ради которого стоит собирать чемодан..."
        />
      </div>
      {ideas.map((idea: Idea) => (
        <div className={css.idea} key={idea.id}>
          <h2 className={css.ideaName}>
            <Link className={css.ideaLink} to={getLinkPath(idea)}>
              {idea.name}
            </Link>
          </h2>
          <p className={css.ideaDescription}>{idea.description}</p>
        </div>
      ))}
    </div>
  )
}

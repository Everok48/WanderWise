import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc-config'
import css from './index.module.scss'

interface Attraction {
  name: string
  description: string
}

interface Idea {
  id: string
  name: string
  description: string
  imageUrl?: string
  facts?: string[]
  attractions?: Attraction[]
}

export const ViewIdeaPage = () => {
  const { travelIdeas } = useParams<{ travelIdeas?: string }>()

  if (!travelIdeas) {
    return <span>Ошибка: ID не указан</span>
  }

  const { data, error, isLoading, isError } = trpc.getIdea.useQuery({ id: travelIdeas }, { enabled: !!travelIdeas })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    console.error('Ошибка запроса:', error)
    return <span>Error: {error.message}</span>
  }

  if (!data || !data.idea) {
    return <span>Idea not found</span>
  }

  const idea: Idea = data.idea

  return (
    <div>
      <h1>{idea.name}</h1>
      <div className={css.title}>
        <input type="text" className="search-input" placeholder="Найти направление..." />
      </div>
      <div className={css.description}>
        <button className="filter-btn">Пляжный отдых</button>
        <button className="filter-btn">Горные походы</button>
        <button className="filter-btn">Городские туры</button>
      </div>
      <div className={css.text}>
        <div className="card">
          <img
            src={idea.imageUrl || 'https://via.placeholder.com/250x150'}
            alt={idea.name}
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
          />
          <h3>{idea.name}</h3>
          <p>{idea.description}</p>
        </div>
      </div>
    </div>
  )
}

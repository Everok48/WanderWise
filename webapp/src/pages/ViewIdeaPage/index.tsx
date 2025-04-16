import { useParams } from 'react-router-dom'
import { type ViewIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc-config'

export const ViewIdeaPage = () => {
  const { travelIdeas } = useParams() as ViewIdeaRouteParams
  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({
    id: travelIdeas
  })

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data || !data.idea) {
    return <span>Idea not found</span>
  }
  return (
    <div>
      <h1>{travelIdeas}</h1>{/* Поиск */}
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Найти направление..." />
      </div>

      {/* Фильтры */}
      <div className="filters">
        <button className="filter-btn">Пляжный отдых</button>
        <button className="filter-btn">Горные походы</button>
        <button className="filter-btn">Городские туры</button>
      </div>

      {/* Карточки направлений */}
      <div className="cards">
        <div className="card">
          <img
            src="https://via.placeholder.com/250x150"
            alt="Бали"
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
          />
          <h3>Бали, Индонезия</h3>
          <p>Остров с потрясающими пляжами и древними храмами.</p>
        </div>
        <div className="card">
          <img
            src="https://via.placeholder.com/250x150"
            alt="Швейцария"
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
          />
          <h3>Альпы, Швейцария</h3>
          <p>Идеальное место для горных походов и лыжного отдыха.</p>
        </div>
        <div className="card">
          <img
            src="https://via.placeholder.com/250x150"
            alt="Токио"
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
          />
          <h3>Токио, Япония</h3>
          <p>Яркий мегаполис с уникальной культурой и кухней.</p>
        </div>
      </div>
    </div>
  )
}

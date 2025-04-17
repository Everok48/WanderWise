import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc-config'
import css from './index.module.scss'

interface Attraction {
  name: string
  description: string
}

interface Destination {
  id: string
  name: string
  description: string
  imageUrl?: string
  facts?: string[]
  attractions?: Attraction[]
}

export const DestinationDetailsPage = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div>Ошибка: ID не указан</div>
  }

  const { data: destination, isLoading, error } = trpc.getDestinationDetails.useQuery({ id }, { enabled: !!id })

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    console.error('Ошибка запроса:', error)
    return <div>Ошибка: {error.message}</div>
  }

  if (!destination) {
    return <div>Место не найдено</div>
  }

  const destinationData: Destination = destination

  return (
    <div className={css.destinationDetails}>
      {destinationData.imageUrl ? (
        <div className={css.photos}>
          <img src={destinationData.imageUrl} alt={destinationData.name} />
          <button>←</button>
          <button>→</button>
        </div>
      ) : (
        <div className={css.photos}>Изображение недоступно</div>
      )}
      <div className={css.header}>
        <h1>{destinationData.name}</h1>
        <button>☆</button>
      </div>
      <div className={css.description}>
        <p>{destinationData.description}</p>
      </div>
      {destinationData.facts && (
        <div className={css.facts}>
          <h2>Интересные факты</h2>
          <ul>
            {destinationData.facts.map((fact: string, index: number) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      )}
      {destinationData.attractions && (
        <div className={css.attractions}>
          <h2>Что посетить</h2>
          <div className={css.attractionsList}>
            {destinationData.attractions.map((attraction: Attraction, index: number) => (
              <div key={index} className={css.attraction}>
                <h3>{attraction.name}</h3>
                <p>{attraction.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={css.map}>
        <h2>Карта</h2>
        <div className={css.mapContainer}>{/* Компонент карты */}</div>
      </div>
    </div>
  )
}

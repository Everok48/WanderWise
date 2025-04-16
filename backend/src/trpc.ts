import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const travelIdeas = [
  {
    id: '1',
    name: 'Главная страница (Home / Landing Page)',
    description:
      'Красивый герой-баннер с названием проекта и кратким описанием (например, "Планируй путешествия легко!").Кнопка CTA ("Начать планирование" → ведет на страницу поиска).Блок с преимуществами сервиса (3-4 карточки с иконками).Простой слайдер с популярными направлениями (можно статичные картинки + текст).',
  },
  {
    id: '2',
    name: 'Поиск направлений (Explore / Search)',
    description:
      'Поле ввода для поиска (можно без бэкенда, просто фильтрация моковых данных).Карточки стран/городов (фото, название, краткое описание).Фильтры (например, "Пляжный отдых", "Горные походы", "Городские туры").При клике на карточку – переход на страницу места.',
  },
  {
    id: '3',
    name: 'Страница места (Destination Details)',
    description: 
      'Фото места (можно карусель).Название, описание, интересные факты. Блок "Что посетить" (список достопримечательностей). Простая карта (можно встроить Google Maps или статичное изображение). Кнопка "Добавить в избранное" (работает через локальное состояние).',
  },
  {
    id: '4',
    name: 'Избранное (Favorites / Saved)',
    description:
      'Список сохраненных мест (из LocalStorage или состояния). Возможность удалять элементы. Если список пуст – сообщение "Здесь пока ничего нет" + кнопка перехода в Explore.',
  },
  {
    id: '5',
    name: 'О проекте (About / Contacts)',
    description:
      'Информация о проекте (например, "WanderWise создан для удобного планирования путешествий"). Форма обратной связи (без бэкенда, просто имитация отправки). Ссылки на соцсети (можно просто иконки).',
  },
]

const t = initTRPC.create()

export const router = t.router({
  getAllIdeas: t.procedure
    .query(() => {
      return { travelIdeas }
    }),
    
  getIdea: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input }) => {
      const idea = travelIdeas.find((idea) => idea.id === input.id)
      return { idea: idea || null }
    }),

  searchIdeas: t.procedure
    .input(
      z.object({
        query: z.string(),
        limit: z.number().optional(),
      })
    )
    .query(({ input }) => {
      const { query, limit } = input
      const filteredIdeas = travelIdeas.filter(
        (idea) => 
          idea.name.toLowerCase().includes(query.toLowerCase()) ||
          idea.description.toLowerCase().includes(query.toLowerCase())
      )
      return { 
        ideas: limit ? filteredIdeas.slice(0, limit) : filteredIdeas 
      }
    })
})

// Экспортируем тип роутера
export type TrpcRouter = typeof router
// Экспортируем сам роутер для использования в Express
export const trpcRouter = router
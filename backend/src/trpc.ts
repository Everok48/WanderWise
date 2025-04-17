import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Схемы для данных
const AttractionSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const TravelIdeaSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
  facts: z.array(z.string()).optional(),
  attractions: z.array(AttractionSchema).optional(),
});

const travelIdeas = [
  {
    id: '1',
    name: 'Главная страница',
    description:
      'Логотип, название проекта и краткое описание. Кнопка("Начать планирование" → ведет на страницу поиска). Блок с преимуществами сервиса (3-4 карточки с иконками). Простой слайдер с популярными направлениями (можно статичные картинки + текст).',
  },
  {
    id: '2',
    name: 'Поиск направлений',
    description:
      'Поле ввода для поиска. Карточки стран/городов (фото, название, краткое описание). Фильтры (например, "Пляжный отдых", "Горные походы", "Городские туры"). При клике на карточку – переход на страницу места.',
  },
  {
    id: '3',
    name: 'Популярные направления',
    description:
      'Фото места. Название, описание, интересные факты. Блок "Что посетить" (список достопримечательностей). Простая карта. Кнопка "Добавить в избранное".',
    imageUrl: 'https://example.com/image3.jpg',
    facts: ['Факт 1', 'Факт 2'],
    attractions: [
      { name: 'Достопримечательность 1', description: 'Описание 1' },
      { name: 'Достопримечательность 2', description: 'Описание 2' },
    ],
  },
  {
    id: '4',
    name: 'Избранное',
    description:
      'Список сохраненных мест. Возможность удалять элементы. Если список пуст – сообщение "Здесь пока ничего нет" + кнопка перехода в Поиск.',
  },
  {
    id: '5',
    name: 'О проекте (About / Contacts)',
    description:
      'Инformation о проекте (например, "WanderWise создан для удобного планирования путешествий"). Ссылки на соцсети, иконки.',
  },
];

const t = initTRPC.create();

export const router = t.router({
  getAllIdeas: t.procedure.query(() => {
    return { travelIdeas: travelIdeas.map((idea) => TravelIdeaSchema.parse(idea)) };
  }),

  getIdea: t.procedure
    .input(z.object({ id: z.string().nonempty() }))
    .query(({ input }) => {
      const idea = travelIdeas.find((idea) => idea.id === input.id);
      return { idea: idea ? TravelIdeaSchema.parse(idea) : null };
    }),

  searchIdeas: t.procedure
    .input(
      z.object({
        query: z.string(),
        limit: z.number().optional(),
      })
    )
    .query(({ input }) => {
      const { query, limit } = input;
      const filteredIdeas = travelIdeas.filter(
        (idea) =>
          idea.name.toLowerCase().includes(query.toLowerCase()) ||
          idea.description.toLowerCase().includes(query.toLowerCase())
      );
      return {
        ideas: (limit ? filteredIdeas.slice(0, limit) : filteredIdeas).map((idea) =>
          TravelIdeaSchema.parse(idea)
        ),
      };
    }),

  getDestinationDetails: t.procedure
    .input(z.object({ id: z.string().nonempty() }))
    .query(({ input }) => {
      const destination = travelIdeas.find((idea) => idea.id === input.id);
      return destination ? TravelIdeaSchema.parse(destination) : null;
    }),
});

export type TrpcRouter = typeof router;
export const trpcRouter = router;
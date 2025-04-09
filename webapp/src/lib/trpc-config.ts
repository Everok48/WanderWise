import type { AppRouter } from '@wanderwise/backend/src/trpc'
import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/trpc',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ],
})

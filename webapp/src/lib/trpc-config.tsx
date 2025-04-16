import { createTRPCReact } from '@trpc/react-query'
import { TrpcRouter } from '../../../backend/src/trpc'

export const trpc = createTRPCReact<TrpcRouter>() 
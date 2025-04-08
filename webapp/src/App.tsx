import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/allIdeasPage'

export const App = () => {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  )
}

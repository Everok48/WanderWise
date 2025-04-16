import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAllIdeasRoute, getViewIdeaRoute } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllIdeasPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import { Layout } from './components/Layout'
export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route path={getViewIdeaRoute({ travelIdeas: ':travelIdeas' })} element={<ViewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
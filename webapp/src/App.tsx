import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllIdeasPage'
import { DestinationDetailsPage } from './pages/DestinationDetailsPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import { UnderConstructionPage } from './pages/UnderConstructionPage'
import './styles/global.scss'

export function App() {
  return (
    <BrowserRouter>
      <TrpcProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route path="/ideas/details/:id" element={<DestinationDetailsPage />} />
            <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
            <Route path="/under-construction" element={<UnderConstructionPage />} />
          </Route>
        </Routes>
      </TrpcProvider>
    </BrowserRouter>
  )
}
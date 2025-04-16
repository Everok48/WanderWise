import { Link, Outlet } from 'react-router-dom'
    import { getAllIdeasRoute } from '../lib/routes'

export const Layout = () => {
  return (
    <div>
        <p>Путешествуй мудро</p>
      <Link to={getAllIdeasRoute()}>Вернуться на главную</Link>
      <Outlet />
    </div>
  )
}

import AppRoutes from './AppRoutes';
import { loadAuth } from './store/actions/authActions';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import AppPublic from './AppPublic';
import AppPreLoader from './components/library/AppPreLoader';

const publicRoutes = ['/admin/signin', '/admin/forgot-password', '/admin/reset-password']
function App({ user, isAuthLoaded, loadAuth }) {

  const { pathname } = useLocation();

  useEffect(() => {
    loadAuth()
  }, [])

  if (!isAuthLoaded)
    return <AppPreLoader message="Loading..." />

  if (user && publicRoutes.find(url => pathname.startsWith(url)))
    return <Navigate to='/admin/dashboard/' />

  if (!user && !publicRoutes.find(url => pathname.startsWith(url)))
    return <Navigate to='/admin/signin' />


  if (pathname === '/' || pathname === '/admin')
    return <Navigate to='/admin/signin' />

  if (!user)
    return <AppPublic />

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

const mapStateToProps = (state) => {

  return (
    {
      user: state.auth.user,
      isAuthLoaded: state.auth.isLogined
    }
  )
}

export default connect(mapStateToProps, { loadAuth })(App);
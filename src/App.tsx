import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { MainLayout } from './components/layout/main-layout'
import { ArticlesTable } from './features/articles/articles-table'
import { BonCommandesTable } from './features/bon-commandes/bon-commandes-table'
import { BonLivraisonsTable } from './features/bon-livraisons/bon-livraisons-table'
import { DevisTable } from './features/devis/devis-table'
import { FacturesTable } from './features/factures/factures-table'
import { FournisseursTable } from './features/fournisseurs/fournisseurs-table'
import { PatientsTable } from './features/patients/patients-table'
import { PrescripteursTable } from './features/prescripteurs/prescripteurs-table'
import { UsersTable } from './features/users/users-table'
import { DashboardPage } from './pages/dashboard'
import { LoginPage } from './pages/login'

export default function App() {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = React.useState(true)
  const [activeKey, setActiveKey] = React.useState('dashboard')

  React.useEffect(() => {
    const getActiveKeyFromPath = (path: string) => {
      switch (path) {
        case '/dashboard':
          return 'dashboard'
        case '/articles':
          return 'articles'
        case '/patients':
          return 'patients'
        case '/bonCommandes':
          return 'bonCommandes'
        case '/bonLivraisons':
          return 'bonLivraisons'
        case '/fournisseurs':
          return 'fournisseurs'
        case '/factures':
          return 'factures'
        case '/devis':
          return 'devis'
        case '/prescripteurs':
          return 'prescripteurs'
        case '/users':
          return 'users'
        default:
          return 'dashboard'
      }
    }

    setActiveKey(getActiveKeyFromPath(location.pathname))
    console.log(getActiveKeyFromPath(location.pathname))
  }, [location.pathname])

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <MainLayout activeKey={activeKey} onSelect={setActiveKey}>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/articles" element={<ArticlesTable />} />
        <Route path="/patients" element={<PatientsTable />} />
        <Route path="/bonCommandes" element={<BonCommandesTable />} />
        <Route path="/bonLivraisons" element={<BonLivraisonsTable />} />
        <Route path="/fournisseurs" element={<FournisseursTable />} />
        <Route path="/factures" element={<FacturesTable />} />
        <Route path="/devis" element={<DevisTable />} />
        <Route path="/prescripteurs" element={<PrescripteursTable />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </MainLayout>
  )
}

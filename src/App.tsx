import React from 'react'
import { Navigate } from 'react-router-dom'
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
  const [activeKey, setActiveKey] = React.useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = React.useState(true)

  if (!isAuthenticated) {
    return <LoginPage />
  }

  const renderContent = () => {
    switch (activeKey) {
      case 'dashboard':
        return <DashboardPage />
      case 'articles':
        return <ArticlesTable />
      case 'patients':
        return <PatientsTable />
      case 'bonCommandes':
        return <BonCommandesTable />
      case 'bonLivraisons':
        return <BonLivraisonsTable />
      case 'fournisseurs':
        return <FournisseursTable />
      case 'factures':
        return <FacturesTable />
      case 'devis':
        return <DevisTable />
      case 'prescripteurs':
        return <PrescripteursTable />
      case 'users':
        return <UsersTable />
      default:
        return <Navigate to="/dashboard" replace />
    }
  }

  return (
    <MainLayout activeKey={activeKey} onSelect={setActiveKey}>
      {renderContent()}
    </MainLayout>
  )
}

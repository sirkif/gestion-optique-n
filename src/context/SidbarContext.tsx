import { createContext, ReactNode, useContext, useState } from 'react'
import Fournisseur from '../features/Fournisseur'
import GestionUsers from '../features/GestionUsers'
import Patient from '../features/Patient'
import Prescripteur from '../features/Prescripteur'
import Reglement from '../features/Reglement'
import Stock from '../features/Stock'
import TableauBoard from '../features/TableauBoard'

interface SidebarContextProps {
  currentTab: number
  onSelectedTab: (index: number) => void
  ActiveTabComponent: JSX.Element
}

const tabs = [
  <TableauBoard />,
  <Patient />,
  <Prescripteur />,
  <Fournisseur />,
  <Stock />,
  <Reglement />,
  <GestionUsers />,
]

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState(0)

  function onSelectedTab(index: number) {
    setCurrentTab(index)
  }

  const ActiveTabComponent = tabs[currentTab]

  return (
    <SidebarContext.Provider
      value={{ currentTab, onSelectedTab, ActiveTabComponent }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

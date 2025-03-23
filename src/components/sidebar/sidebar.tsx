import { Button } from '@heroui/react'
import { Icon } from '@iconify/react'

const menuItems = [
  {
    key: 'dashboard',
    label: 'Tableau de Bord',
    icon: 'lucide:layout-dashboard',
  },
  { key: 'articles', label: 'Articles', icon: 'lucide:box' },
  { key: 'patients', label: 'Patients', icon: 'lucide:users' },
  {
    key: 'bonCommandes',
    label: 'Bons de Commande',
    icon: 'lucide:clipboard-list',
  },
  { key: 'bonLivraisons', label: 'Bons de Livraison', icon: 'lucide:truck' },
  { key: 'fournisseurs', label: 'Fournisseurs', icon: 'lucide:building' },
  { key: 'factures', label: 'Factures', icon: 'lucide:file-text' },
  { key: 'devis', label: 'Devis', icon: 'lucide:receipt' },
  { key: 'prescripteurs', label: 'Prescripteurs', icon: 'lucide:stethoscope' },
  { key: 'users', label: 'Utilisateurs', icon: 'lucide:users' },
]

interface SidebarProps {
  activeKey: string
  onSelect: (key: string) => void
  onLogout: () => void
}

export function Sidebar({ activeKey, onSelect, onLogout }: SidebarProps) {
  console.log(activeKey)

  return (
    <div className="w-64 h-screen bg-content1 border-r border-divider p-4 flex flex-col">
      <div className="flex items-center gap-2 p-2 mb-4">
        <Icon icon="lucide:glasses" className="text-2xl text-primary" />
        <span className="text-xl font-bold">OpticManager</span>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Button
            key={item.key}
            variant={activeKey === item.key ? 'solid' : 'light'}
            color={activeKey === item.key ? 'primary' : 'default'}
            className="justify-start"
            startContent={<Icon icon={item.icon} />}
            onPress={() => onSelect(item.key)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <Button
        className="justify-start mt-4"
        color="danger"
        variant="light"
        startContent={<Icon icon="lucide:log-out" />}
        onPress={onLogout}
      >
        Déconnexion
      </Button>
    </div>
  )
}

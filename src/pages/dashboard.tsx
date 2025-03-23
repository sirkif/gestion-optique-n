import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const stats = [
  {
    title: "Articles",
    value: "124",
    icon: "lucide:box",
    color: "text-primary-500"
  },
  {
    title: "Patients",
    value: "45",
    icon: "lucide:users",
    color: "text-success-500"
  },
  {
    title: "Commandes",
    value: "12",
    icon: "lucide:clipboard-list",
    color: "text-warning-500"
  },
  {
    title: "Factures",
    value: "89",
    icon: "lucide:file-text",
    color: "text-danger-500"
  }
];

const salesData = [
  { month: 'Jan', ventes: 4000, achats: 2400 },
  { month: 'Fév', ventes: 3000, achats: 1398 },
  { month: 'Mar', ventes: 2000, achats: 9800 },
  { month: 'Avr', ventes: 2780, achats: 3908 },
  { month: 'Mai', ventes: 1890, achats: 4800 },
  { month: 'Jun', ventes: 2390, achats: 3800 },
];

const stockData = [
  { name: 'Montures', value: 400 },
  { name: 'Verres', value: 300 },
  { name: 'Lentilles', value: 300 },
  { name: 'Autres', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de Bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardBody className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <Icon icon={stat.icon} className={`text-2xl ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-default-500">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Ventes et Achats</h3>
          </CardHeader>
          <CardBody>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="ventes" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="achats" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Distribution du Stock</h3>
          </CardHeader>
          <CardBody>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {stockData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
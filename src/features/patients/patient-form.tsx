import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { PatientType, CategoryType, AssuranceType, PeriodiciteVisiteType } from "../../types";

interface PatientFormProps {
  formData: Partial<PatientType>;
  onChange: (data: Partial<PatientType>) => void;
}

export function PatientForm({ formData, onChange }: PatientFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Nom"
        value={formData.clientName || ""}
        onChange={(e) => onChange({ ...formData, clientName: e.target.value })}
        isRequired
      />
      <Select
        label="Catégorie"
        selectedKeys={formData.category ? [formData.category] : []}
        onChange={(e) => onChange({ ...formData, category: e.target.value as CategoryType })}
        isRequired
      >
        {Object.values(CategoryType).map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Assurance"
        selectedKeys={formData.assurance ? [formData.assurance] : []}
        onChange={(e) => onChange({ ...formData, assurance: e.target.value as AssuranceType })}
        isRequired
      >
        {Object.values(AssuranceType).map((assurance) => (
          <SelectItem key={assurance} value={assurance}>
            {assurance}
          </SelectItem>
        ))}
      </Select>
      <Input
        label="Adresse"
        value={formData.address || ""}
        onChange={(e) => onChange({ ...formData, address: e.target.value })}
      />
      <Input
        label="Ville"
        value={formData.ville || ""}
        onChange={(e) => onChange({ ...formData, ville: e.target.value })}
      />
      <Input
        label="Téléphone"
        value={formData.phone || ""}
        onChange={(e) => onChange({ ...formData, phone: e.target.value })}
        isRequired
      />
      <Input
        label="Email"
        type="email"
        value={formData.email || ""}
        onChange={(e) => onChange({ ...formData, email: e.target.value })}
      />
      <Select
        label="Périodicité des visites"
        selectedKeys={formData.periodiciteVisite ? [formData.periodiciteVisite] : []}
        onChange={(e) => onChange({ ...formData, periodiciteVisite: e.target.value as PeriodiciteVisiteType })}
        isRequired
      >
        {Object.values(PeriodiciteVisiteType).map((periodicite) => (
          <SelectItem key={periodicite} value={periodicite}>
            {periodicite}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
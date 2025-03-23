import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { BonLivraisonType, CorrectionType, ModeType } from "../../types";

interface BonLivraisonFormProps {
  formData: Partial<BonLivraisonType>;
  onChange: (data: Partial<BonLivraisonType>) => void;
}

// Helper function to format enum values
const formatEnumValue = (value: string) => {
  return value.split(/(?=[A-Z])/).join(" ");
};

export function BonLivraisonForm({ formData, onChange }: BonLivraisonFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="ID Client"
        value={formData.idClient || ""}
        onChange={(e) => onChange({ ...formData, idClient: e.target.value })}
        isRequired
      />
      <Input
        label="Nom Client"
        value={formData.clientName || ""}
        onChange={(e) => onChange({ ...formData, clientName: e.target.value })}
        isRequired
      />
      <Select
        label="Type de Correction"
        selectedKeys={formData.correction ? [formData.correction] : []}
        onChange={(e) => onChange({ ...formData, correction: e.target.value as CorrectionType })}
        isRequired
      >
        {Object.values(CorrectionType).map((type) => (
          <SelectItem key={type} value={type}>
            {formatEnumValue(type)}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Mode de Paiement"
        selectedKeys={formData.mode ? [formData.mode] : []}
        onChange={(e) => onChange({ ...formData, mode: e.target.value as ModeType })}
        isRequired
      >
        {Object.values(ModeType).map((mode) => (
          <SelectItem key={mode} value={mode}>
            {formatEnumValue(mode)}
          </SelectItem>
        ))}
      </Select>
      <Input
        type="number"
        label="Total HT"
        value={formData.totalHT?.toString() || ""}
        onChange={(e) => {
          const totalHT = Number(e.target.value);
          const totalTVA = totalHT * 0.2; // 20% TVA
          onChange({
            ...formData,
            totalHT,
            totalTVA,
            totalTTC: totalHT + totalTVA
          });
        }}
        isRequired
      />
      <Input
        type="number"
        label="TVA"
        value={formData.totalTVA?.toString() || ""}
        isReadOnly
      />
      <Input
        type="number"
        label="Total TTC"
        value={formData.totalTTC?.toString() || ""}
        isReadOnly
      />
    </div>
  );
}
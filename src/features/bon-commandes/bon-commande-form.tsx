import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { BonCommandeType, PieceType } from "../../types";

interface BonCommandeFormProps {
  formData: Partial<BonCommandeType>;
  onChange: (data: Partial<BonCommandeType>) => void;
}

export function BonCommandeForm({ formData, onChange }: BonCommandeFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="N° Pièce"
        value={formData.pieceNumber || ""}
        onChange={(e) => onChange({ ...formData, pieceNumber: e.target.value })}
        isRequired
      />
      <Input
        type="date"
        label="Date"
        value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ""}
        onChange={(e) => onChange({ ...formData, date: new Date(e.target.value) })}
        isRequired
      />
      <Select
        label="Type de pièce"
        selectedKeys={formData.pieceType ? [formData.pieceType] : []}
        onChange={(e) => onChange({ ...formData, pieceType: e.target.value as PieceType })}
        isRequired
      >
        {Object.values(PieceType).map((type) => (
          <SelectItem key={type} value={type}>
            {type}
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
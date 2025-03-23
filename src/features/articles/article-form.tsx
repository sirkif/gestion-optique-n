import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { ArticleType, NatureArticleType, EtatStock } from "../../types";

interface ArticleFormProps {
  formData: Partial<ArticleType>;
  onChange: (data: Partial<ArticleType>) => void;
}

export function ArticleForm({ formData, onChange }: ArticleFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Référence"
        value={formData.refArticle || ""}
        onChange={(e) => onChange({ ...formData, refArticle: e.target.value })}
        isRequired
      />
      <Input
        label="Désignation"
        value={formData.designation || ""}
        onChange={(e) => onChange({ ...formData, designation: e.target.value })}
        isRequired
      />
      <Select
        label="Nature"
        selectedKeys={formData.natureArticle ? [formData.natureArticle] : []}
        onChange={(e) => onChange({ ...formData, natureArticle: e.target.value as NatureArticleType })}
        isRequired
      >
        {Object.values(NatureArticleType).map((nature) => (
          <SelectItem key={nature} value={nature}>
            {nature}
          </SelectItem>
        ))}
      </Select>
      <Input
        label="Type"
        value={formData.type || ""}
        onChange={(e) => onChange({ ...formData, type: e.target.value })}
        isRequired
      />
      <Input
        type="number"
        label="TVA (%)"
        value={formData.tva?.toString() || ""}
        onChange={(e) => onChange({ ...formData, tva: Number(e.target.value) })}
        isRequired
      />
      <Input
        label="Stock Minimum"
        value={formData.stockMin || ""}
        onChange={(e) => onChange({ ...formData, stockMin: e.target.value })}
        isRequired
      />
      <Input
        type="number"
        label="Prix d'achat"
        value={formData.achat?.toString() || ""}
        onChange={(e) => onChange({ ...formData, achat: Number(e.target.value) })}
        isRequired
      />
      <Input
        type="number"
        label="Prix de vente"
        value={formData.vente?.toString() || ""}
        onChange={(e) => onChange({ ...formData, vente: Number(e.target.value) })}
        isRequired
      />
      <Select
        label="État du stock"
        selectedKeys={formData.etatStock ? [formData.etatStock] : []}
        onChange={(e) => onChange({ ...formData, etatStock: e.target.value as EtatStock })}
        isRequired
      >
        {Object.values(EtatStock).map((etat) => (
          <SelectItem key={etat} value={etat}>
            {etat}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
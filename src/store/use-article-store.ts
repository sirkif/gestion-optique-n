import { create } from 'zustand';
import { ArticleType, NatureArticleType, EtatStock } from '../types';

interface ArticleState {
  articles: ArticleType[];
  selectedArticle: ArticleType | null;
  formOpen: boolean;
  formMode: "create" | "edit";
  setArticles: (articles: ArticleType[]) => void;
  addArticle: (article: Omit<ArticleType, "id">) => void;
  updateArticle: (id: number, article: Omit<ArticleType, "id">) => void;
  deleteArticle: (id: number) => void;
  setSelectedArticle: (article: ArticleType | null) => void;
  setFormOpen: (open: boolean) => void;
  setFormMode: (mode: "create" | "edit") => void;
}

const initialArticles: ArticleType[] = [
  {
    id: 1,
    refArticle: "ART001",
    type: "Type A",
    natureArticle: NatureArticleType.Monture,
    designation: "Monture Classic",
    tva: 20,
    stockMin: "10",
    entree: 100,
    sortie: 30,
    achat: 150,
    vente: 250,
    stockFinal: 70,
    totalStock: 70,
    etatStock: EtatStock.Disponible
  },
  {
    id: 2,
    refArticle: "ART002",
    type: "Type B",
    natureArticle: NatureArticleType.Verre,
    designation: "Verre Progressive",
    tva: 20,
    stockMin: "5",
    entree: 50,
    sortie: 20,
    achat: 200,
    vente: 350,
    stockFinal: 30,
    totalStock: 30,
    etatStock: EtatStock.Disponible
  },
];

export const useArticleStore = create<ArticleState>((set) => ({
  articles: initialArticles,
  selectedArticle: null,
  formOpen: false,
  formMode: "create",

  setArticles: (articles) => set({ articles }),
  addArticle: (articleData) => set((state) => ({
    articles: [...state.articles, { ...articleData, id: state.articles.length + 1 }]
  })),
  updateArticle: (id, articleData) => set((state) => ({
    articles: state.articles.map(article => 
      article.id === id ? { ...articleData, id } : article
    )
  })),
  deleteArticle: (id) => set((state) => ({
    articles: state.articles.filter(article => article.id !== id)
  })),
  setSelectedArticle: (article) => set({ selectedArticle: article }),
  setFormOpen: (open) => set({ formOpen: open }),
  setFormMode: (mode) => set({ formMode: mode }),
}));
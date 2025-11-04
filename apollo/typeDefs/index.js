const typeDefs = /* GraphQL */ `


  type Frase {
    categoria: String,
    frase: String,
    autor: String
  }

  type FraseCategoria {
    id: Int,
    tipo: String,
    frases: [Frase]
  }

 

  type Query {
    getAllFrases: [FraseCategoria],
    getAllCategories: [String],
    getCategory(category: String): FraseCategoria,
    getTodaysFrase: Frase
  }
`;

export default typeDefs;
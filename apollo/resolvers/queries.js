import frases from "../../data/frases.js";

const params = new URLSearchParams();


const translateText = async (frase) => {

    params.append("text", frase);
    params.append("source_language", "en");
    params.append("target_language", "es");

    try {
        const respuesta = await fetch(process.env.TRANSLATOR_API_URL || "", {
            method: "POST",
            headers: {
                'x-rapidapi-key': process.env.TRANSLATOR_API_KEY || '',
                'x-rapidapi-host': 'text-translator2.p.rapidapi.com',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString(),
        });

        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("❌ Error al crear post:", error.message);
    }


};




const Query = {
    getAllFrases: () => frases,
    getAllCategories: () => [...new Set(frases.map(category => category.tipo).filter(Boolean))],
    getCategory: (_parent, _args) => {
        const { category } = _args;
        return frases.find((frases) => frases.tipo === category) ?? null
    },
    getTodaysFrase: async () => {
        const response = await fetch('https://zenquotes.io/api/today/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        const translatedFrase  = await translateText(data[0].q);


        return (data && data.length > 0) || translatedFrase.data.translatedText ? {
            categoria: "Inspiración Diaria",
            frase: translatedFrase.data.translatedText,
            autor: data[0].a === "Unknown" ? "Anónimo" : data[0].a
        } : null;
    }

};


export default Query;
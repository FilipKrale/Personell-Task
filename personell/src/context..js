import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
const URL = "https://world.openfoodfacts.org/search.json?product=";
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("pizza");
    const [pizza, setPizza] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultPizza, setResultPizza] = useState("");

    const fetchPizza = useCallback(async() => {
        setLoading(true);
        try{
            const response = await fetch(`${URL}${searchTerm}`);
            const data = await response.json();
            const {docs} = data;

            if(docs){
                const newPizza = docs.slice(0, 20).map((pizzaSingle) => {
                    const {key, product_name, brand_i, edition_count, ingredients, country} = pizzaSingle;

                    return {
                        id: key,
                        product: product_name,
                        brand_id: brand_i,
                        edition_count: edition_count,
                        ingredients: ingredients,
                        country: country
                    }
                });

                setPizza(newPizza);

                if(newPizza.length > 1){
                    setResultPizza("Your Search Result");
                } else {
                    setResultPizza("No Search Result Found!")
                }
            } else {
                setPizza([]);
                setResultPizza("No Search Result Found!");
            }
            setLoading(false);
        } catch(error){
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchPizza();
    }, [searchTerm, fetchPizza]);

    return (
        <AppContext.Provider value = {{
            loading, pizza, setSearchTerm, resultPizza, setResultPizza,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};
import {Filters} from "../interfaces/Filters.ts";
import axios from "axios";


/**
 * Recupera os filtros
 */
export const getFilters = async (): Promise<Filters> => {
    return new Promise((resolve, reject) => {
        axios
            .get("http://127.0.0.1:8080/filters")
            .then((response) => resolve(response.data as Filters))
            .catch((error: any) => reject(error));
    });
}

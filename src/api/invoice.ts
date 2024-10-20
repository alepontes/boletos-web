import axios from "axios";
import {Invoice} from "../interfaces/Invoice.ts";
import {Search} from "../interfaces/Search.ts";

/**
 * Recupera as faturas
 */
export const getFaturas = async (search?: Search): Promise<unknown> => {
    return new Promise((resolve, reject) => {

        const query = Object
            .keys(search || {})
            .reduce((query, key: string) => {

                // @ts-ignore
                const value = search?.[key];

                if (value) {
                    return query.concat(`${query ? '&' : '?'}${key}=${value}`);
                }

                return query;
            }, '');

        axios
            .get(`http://127.0.0.1:8080/invoices${query}`)
            .then((response) => resolve(response.data as Invoice[]))
            .catch((error: any) => reject(error));
    });
}

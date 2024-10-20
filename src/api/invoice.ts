import axios from "axios";
import {Invoice} from "../interfaces/Invoice.ts";


/**
 * Recupera as faturas
 */
export const getFaturas = async (): Promise<Invoice[]> => {
    return new Promise((resolve, reject) => {
        axios
            .get("http://127.0.0.1:8080/invoices")
            .then((response) => resolve(response.data as Invoice[]))
            .catch((error: any) => reject(error));
    });
}

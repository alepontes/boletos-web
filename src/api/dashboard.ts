import axios from "axios";
import {Dashboard} from "../interfaces/Dashboard.ts";

/**
 * Recupera os dados de Dashboard
 */
export const getDashboard = async (): Promise<Dashboard> => {
    return new Promise((resolve, reject) => {
        axios
            .get("http://127.0.0.1:8080/dashboard")
            .then((response) => resolve(response.data as Dashboard))
            .catch((error: any) => reject(error));
    });
}
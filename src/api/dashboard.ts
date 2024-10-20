import {Dashboard} from "../interfaces/Dashboard.ts";

/**
 * Recupera os filtros
 */
export const getDashboard = async (): Promise<Dashboard> => {
    return Promise.resolve({
        energy: {
            total: 100,
            compensated: 30,
        },
        financial: {
            total: 100,
            saving: 50,
        },
    });
}

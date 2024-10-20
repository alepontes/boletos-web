interface Personal {
    clientId: string;
    name: string;
    meterId: string;
}

interface General {
    date: string;
    due: string;
    payment: number;
    distributor: string;
}

interface EnergyDetails {
    quantity: number;
    priceUnit: number;
    value: number;
    tax: number;
}

interface PublicEnergy {
    value: number;
}

interface Total {
    value: number;
}

export interface Invoice {
    id?: string,
    personal: Personal;
    general: General;
    electricalEnergy: EnergyDetails;
    scee: EnergyDetails;
    compensatedEnergy: EnergyDetails;
    publicEnergy: PublicEnergy;
    total: Total;
}


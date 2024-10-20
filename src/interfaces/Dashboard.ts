export interface Dashboard {
    energy: {
        total: number;
        compensated: number;
    };
    financial: {
        total: number;
        saving: number;
    };
}
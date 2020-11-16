export interface DongleDataInterface {
    electricityCost: number;
    electricityCostLow: number;
    electricityTarget: number;
    firmwareVersion: string;
    gasCost: number;
    gasTarget: number;
    macAddress: string;
    name: string;
    solar: undefined; // not known for the moment
    solarTarget: undefined; // not known for the moment
    timezone: string;
}


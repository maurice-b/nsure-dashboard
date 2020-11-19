import {DateInterface} from '@app-shared/services/report-data/date.interface';

export interface ReportDataInterface extends DateInterface{
    gas: number;
    electricity: number;
    electricityHigh: number;
    electricityLow: number;
    electricityDelivery: number;

    slumber?: number;
    gasTarget?: number;
    electricityTarget?: number;
    elapsed?: number;
    electricityProduction?: number;
}



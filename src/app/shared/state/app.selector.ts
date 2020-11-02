import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNameConst } from '../kpi.const';
import { KpiModuleState } from './base.state';

// Create the Feature Selector. This is the base selector
export const featureSelector = createFeatureSelector<KpiModuleState>(FeatureNameConst);

export const selectSourceSystemState = createSelector(
  featureSelector, (state: KpiModuleState) => state.sourceSystem
);

export const selectKpiState = createSelector(
  featureSelector, (state: KpiModuleState) => state.kpi
);

export const selectKpiThresholdState = createSelector(
  featureSelector, (state: KpiModuleState) => state.kpiThreshold
);


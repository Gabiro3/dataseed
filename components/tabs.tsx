// FarmersDataTabs.tsx
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchDetails } from '@/app/actions';

interface DashboardData {
  totalFarmers: number;
  totalCultivatedLand: number;
  averageCapitalPerFarmer: number;
  averageYieldSoldPercentagePerFarmer: number;
}

// Fetching data directly in the component
const FarmersDataTabs: React.FC<{ data: DashboardData }> = ({ data }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Cultivated Land
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.totalCultivatedLand} Ha
          </div>
          <p className="text-xs text-muted-foreground">+20.1% from last year</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalFarmers}</div>
          <p className="text-xs text-muted-foreground">-15.1% from last year</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Capital</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.averageCapitalPerFarmer}
          </div>
          <p className="text-xs text-muted-foreground">+19% from last year</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Yield Sold</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.averageYieldSoldPercentagePerFarmer}
          </div>
          <p className="text-xs text-muted-foreground">+4.9% from last year</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default async function FarmersData() {
  const data: DashboardData = await fetchDetails();
  return <FarmersDataTabs data={data} />;
}

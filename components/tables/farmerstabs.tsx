// FarmerTabs.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Make sure to import your Card component
import { Farmer } from '@/constants/data'; // Adjust the import according to your Farmer type definition

type FarmerTabsProps = {
  farmers: Farmer[];
};

const FarmerTabs: React.FC<FarmerTabsProps> = ({ farmers }) => {
  // Calculate necessary metrics
  const totalFarmers = farmers.length;
  const totalCultivatedLand = farmers.reduce(
    (acc, farmer) => acc + farmer.totalFarmArea,
    0
  ); // Sum of total farm area
  const averageCapitalPerFarmer =
    farmers.reduce((acc, farmer) => acc + farmer.capitalRequired, 0) /
      totalFarmers || 0; // Average capital
  const averageYieldSoldPercentagePerFarmer =
    farmers.reduce((acc, farmer) => acc + farmer.yieldSoldPercentage, 0) /
      totalFarmers || 0; // Average yield sold

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Cultivated Land
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCultivatedLand} Ha</div>
          <p className="text-xs text-muted-foreground">+20.1% from last year</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalFarmers}</div>
          <p className="text-xs text-muted-foreground">-15.1% from last year</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Capital</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {averageCapitalPerFarmer.toFixed(2)}
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
            {averageYieldSoldPercentagePerFarmer.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground">+4.9% from last year</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerTabs;

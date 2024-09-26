// FarmerTabs.tsx
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Ensure correct import path for your Card component
import { Farmer } from '@/constants/data'; // Adjust the import according to your Farmer type definition
import { RefreshCcw } from 'lucide-react'; // Import the refresh icon from lucide-react

const FarmerTabs: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getFarmersData = async () => {
    setLoading(true); // Set loading state
    try {
      const response = await fetch('https://dataseed.vercel.app/api/farmers', {
        method: 'GET',
        cache: 'no-store' // Ensure fresh data is fetched
      });
      if (!response.ok) {
        throw new Error('Failed to fetch farmers data');
      }
      const farmersData = await response.json();
      setFarmers(farmersData);
    } catch (err) {
      console.error('Failed to fetch farmers data:', err);
      setError('Failed to fetch farmers data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFarmersData(); // Fetch farmers data on component mount
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  // Calculate necessary metrics
  const totalFarmers = farmers.length;
  const totalCultivatedLand = farmers.reduce(
    (acc, farmer) => acc + farmer.totalFarmArea,
    0
  ); // Sum of total farm area
  const averageCapitalPerFarmer =
    totalFarmers > 0
      ? farmers.reduce((acc, farmer) => acc + farmer.capitalRequired, 0) /
        totalFarmers
      : 0; // Average capital
  const averageYieldSoldPercentagePerFarmer =
    totalFarmers > 0
      ? farmers.reduce((acc, farmer) => acc + farmer.yieldSoldPercentage, 0) /
        totalFarmers
      : 0; // Average yield sold

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Farmers Overview</h2>
        <button
          onClick={getFarmersData}
          className="rounded-full p-2 transition hover:bg-gray-200"
          aria-label="Refresh Farmers Data"
        >
          <RefreshCcw size={20} />{' '}
          {/* Using the Refresh icon from lucide-react */}
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Cultivated Land
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCultivatedLand.toFixed(2)} Ha
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFarmers}</div>
            <p className="text-xs text-muted-foreground">
              -15.1% from last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Capital</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageCapitalPerFarmer.toFixed(2)} Rwf
            </div>
            <p className="text-xs text-muted-foreground">+19% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Yield Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageYieldSoldPercentagePerFarmer.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">
              +4.9% from last year
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerTabs;

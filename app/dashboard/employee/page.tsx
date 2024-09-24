import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { columns } from '@/components/tables/employee-tables/columns';
import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Farmer } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { fetchFarmersData } from '@/app/actions'; // Import the fetchFarmersData function

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Farmers', link: '/dashboard/farmers' } // Updated breadcrumb title
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  // Fetch farmers data directly
  const farmers = await fetchFarmersData();
  const totalFarmers = farmers.length; // Count total farmers
  const pageCount = 1; // Since we're not paginating for now

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Farmers (${totalFarmers})`} // Updated title
            description="Manage farmers (Server side table functionalities.)" // Updated description
          />

          <Link
            href={'/dashboard/farmers/new'} // Updated link
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <EmployeeTable // Update to FarmerTable component
          searchKey="country" // Adjust if necessary
          pageNo={1} // Update to the first page since we're not paginating
          columns={columns} // Ensure this matches your farmer data structure
          totalUsers={totalFarmers} // Update to totalFarmers
          data={farmers} // Update to farmers
          pageCount={pageCount} // Set pageCount to 1
        />
      </div>
    </PageContainer>
  );
}

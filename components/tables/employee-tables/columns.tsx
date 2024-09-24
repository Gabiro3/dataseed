import { ColumnDef } from '@tanstack/react-table';
import { Farmer } from '@/constants/data'; // TypeScript Farmer model
import { CellAction } from './cell-action';
export const columns: ColumnDef<Farmer>[] = [
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number'
  },
  {
    accessorKey: 'nationalID',
    header: 'National ID'
  },
  {
    accessorKey: 'totalFarmArea',
    header: 'Farm Area (Ha)'
  },
  {
    accessorKey: 'capitalRequired',
    header: 'Capital Required (Rwf)'
  },
  {
    accessorKey: 'pestTreatmentSource',
    header: 'Pest Treatment Source'
  },
  {
    accessorKey: 'sellingMarkets',
    header: 'Selling Markets'
  },
  {
    accessorKey: 'farmLocation',
    header: 'Farm Location'
  },
  {
    accessorKey: 'yieldSoldPercentage',
    header: 'Yield Sold (%)'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FarmerForm } from '@/components/forms/farmer-form';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Farmers', link: '/dashboard/farmers' },
  { title: 'Create', link: '/dashboard/farmers/create' }
];

export default function Page() {
  const searchParams = useSearchParams();
  const initialData = {
    nationalId: searchParams.get('nationalId') || '',
    farmLocation: searchParams.get('farmLocation') || '',
    farmSize: searchParams.get('farmSize')
      ? parseFloat(searchParams.get('farmSize') || '')
      : 0,
    phoneNumber: searchParams.get('phoneNumber') || '',
    capitalRequired: searchParams.get('capitalRequired')
      ? parseFloat(searchParams.get('capitalRequired') || '')
      : 0
  };
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <FarmerForm
          initialData={initialData} // Pass the extracted query params as initial data
        />
      </div>
    </ScrollArea>
  );
}

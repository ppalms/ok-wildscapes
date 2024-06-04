import { getPlantSheets } from '@/app/data';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { DataTable } from './data-table';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const PlantSheets = async () => {
  const plantSheets = await getPlantSheets();
  if (plantSheets.length === 0) {
    redirect('/plant-sheets/upload');
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row items-baseline justify-between">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight mt-8 mb-4 lg:text-5xl">
          Plant Sheets
        </h1>
        <div className="ml-auto">
          <Button>
            <Link href="/plant-sheets/upload">Upload Plant Sheet</Link>
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={plantSheets} />
    </div>
  );
};

export default PlantSheets;

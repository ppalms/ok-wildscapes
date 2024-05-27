import { DataTable } from './data-table';
import { columns } from './columns';
import { getPlantSheets } from '@/app/actions';

const PlantSheets = async () => {
  const data = await getPlantSheets();
  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mt-8 mb-4 lg:text-5xl">
        Plant Sheets
      </h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PlantSheets;

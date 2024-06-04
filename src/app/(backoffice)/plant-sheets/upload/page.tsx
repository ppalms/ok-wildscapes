'use client';

import Form from './upload-form';

const Page = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex items-baseline justify-between">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight mt-8 mb-4 lg:text-5xl">
            New Plant Sheet
          </h1>
        </div>
        <Form />
      </div>
    </>
  );
};

export default Page;

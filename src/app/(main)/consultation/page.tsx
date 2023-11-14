'use client';

import { PaperAirplaneIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ConsultationRequest {
  firstName: string;
  lastName: string;
  email: string;
  yardSize: number;
  phone: string;
  message: string;
  expectedBudget: string;
}

export default function RequestConsultation() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ConsultationRequest>();
  const onSubmit: SubmitHandler<ConsultationRequest> = (data) =>
    console.log(data);

  return (
    <>
      <div className="relative bg-white">
        <div className="lg:absolute lg:inset-0 lg:left-1/2">
          <img
            className="h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full"
            src="/images/consultation-splash.jpg"
            alt="Prairie garden"
          />
        </div>

        <div className="pb-10 pt-12 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
          <div className="px-6 lg:px-8">
            <div className="mb-4 mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <Link
                href="/"
                className="text-emerald-950 hover:text-emerald-700"
                aria-label="Home">
                <div className="flex items-center">
                  <ArrowLeftIcon className="h-5 w-5 mr-1" /> Home
                </div>
              </Link>
            </div>

            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
                Let's work together
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} method="POST">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold leading-6 text-gray-900">
                      First name
                    </label>
                    <div className="mt-2.5">
                      <input
                        {...register('firstName', { required: true })}
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold leading-6 text-gray-900">
                      Last name
                    </label>
                    <div className="mt-2.5">
                      <input
                        {...register('lastName', { required: true })}
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold leading-6 text-gray-900">
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        {...register('email', { required: true })}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="yardSize"
                      className="block text-sm font-semibold leading-6 text-gray-900">
                      Yard size (sq ft)
                    </label>
                    <div className="mt-2.5">
                      <input
                        {...register('yardSize', { required: true })}
                        type="number"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between text-sm leading-6">
                      <label
                        htmlFor="phone"
                        className="block font-semibold text-gray-900">
                        Phone
                      </label>
                      <p id="phone-description" className="text-gray-400">
                        Optional
                      </p>
                    </div>
                    <div className="mt-2.5">
                      <input
                        {...register('phone')}
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        aria-describedby="phone-description"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between text-sm leading-6">
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold leading-6 text-gray-900">
                        How can we help you?
                      </label>
                      <p id="message-description" className="text-gray-400">
                        Max 500 characters
                      </p>
                    </div>
                    <div className="mt-2.5">
                      <textarea
                        {...register('message', { required: true })}
                        id="message"
                        name="message"
                        rows={4}
                        aria-describedby="message-description"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                      />
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-600">
                        <ul className="list-inside space-y-4">
                          <li>
                            <span className="font-bold">
                              Describe your ideal yard:
                            </span>{' '}
                            Share your vision with us. What elements are most
                            important to you? (Native plants, wildlife habitats,
                            pollinator host plants, etc.)
                          </li>
                          <li>
                            <span className="font-bold">Inspirations:</span> Are
                            there any particular styles, themes, or examples of
                            wildscaping that inspire you? Feel free to share
                            links or descriptions.
                          </li>
                          <li>
                            <span className="font-bold">
                              Challenges and concerns:
                            </span>{' '}
                            Do you have any concerns or challenges with your
                            current yard? (Erosion, lack of privacy,
                            maintenance, etc.)
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>

                  <fieldset className="sm:col-span-2">
                    <legend className="block text-sm font-semibold leading-6 text-gray-900">
                      Expected budget
                    </legend>
                    <div className="mt-4 space-y-4 text-sm leading-6 text-gray-600">
                      <div className="flex gap-x-2.5">
                        <input
                          id="budget-under-1k"
                          name="budget"
                          defaultValue="under_1k"
                          type="radio"
                          className="mt-1 h-4 w-4 border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-600"
                        />
                        <label htmlFor="budget-under-1k">
                          Less than $1,000
                        </label>
                      </div>
                      <div className="flex gap-x-2.5">
                        <input
                          id="budget-1k-5k"
                          name="budget"
                          defaultValue="1k-5k"
                          type="radio"
                          className="mt-1 h-4 w-4 border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-600"
                        />
                        <label htmlFor="budget-1k-5k">$1,000 - $5,000</label>
                      </div>
                      <div className="flex gap-x-2.5">
                        <input
                          id="budget-over-5k"
                          name="budget"
                          defaultValue="over-5k"
                          type="radio"
                          className="mt-1 h-4 w-4 border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-600"
                        />
                        <label htmlFor="budget-over-5k">$5,000+</label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="my-6 border-t flex flex-row justify-end border-gray-900/10 pt-8">
                  <button
                    type="submit"
                    className="rounded-md flex items-center bg-emerald-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                    Send message{' '}
                    <PaperAirplaneIcon className="h-5 w-5 -mr-0.5 ml-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

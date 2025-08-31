// TODO refactor to server component
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField } from '@/components/ui/main/Fields';
import { PaperAirplaneIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { requestConsultation } from '@/graphql/mutations';
import { ConsultationRequestInput, ProjectSize } from '@/graphql/types';
import { ArrowUpRightFromSquareIcon } from 'lucide-react';

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_API_URL!,
      region: process.env.NEXT_PUBLIC_REGION,
      defaultAuthMode: 'apiKey',
      apiKey: process.env.NEXT_PUBLIC_API_KEY
    }
  }
});

const client = generateClient();

export default function RequestConsultation() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ConsultationRequestInput>();

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ConsultationRequestInput> = async (
    request: ConsultationRequestInput
  ) => {
    setSending(true);
    setError(null);

    try {
      const result = await client.graphql({
        query: requestConsultation,
        variables: { consultationRequest: request }
      });
      if (result.errors) {
        setError('We encountered an issue submitting your request.');
        return;
      }
      setSent(true);
    } catch (e) {
      console.error('Form submission error:', e);
      setError('We encountered an issue submitting your request.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="relative bg-white h-full border-t">
        <div className="lg:absolute lg:inset-0 lg:left-1/2">
          <Image
            className="h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full"
            src="/images/standing-cypress.jpeg"
            width={500}
            height={500}
            alt="Prairie garden"
            priority
          />
        </div>

        <div className="pb-10 pt-12 sm:pb-32 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2">
          <div className="px-6 lg:px-8">
            <div className="mb-4 mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <Link
                href="/"
                className="inline-flex items-center text-okw-green hover:text-okw-green-darker transition-colors duration-200 mb-6"
                aria-label="Home"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" /> 
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
            </div>
            {!sent && (
              <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                {error && (
                  <div className="mb-6 rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Submission Failed
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>
                            We encountered an issue submitting your request.
                            Please try again or{' '}
                            <span className="flex gap-1 items-center">
                              <a
                                href="https://www.facebook.com/profile.php?id=61552012025895"
                                className="underline"
                              >
                                contact us on Facebook{' '}
                              </a>
                              <ArrowUpRightFromSquareIcon className="size-4" />
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <h1 className="heading-hero text-gray-900 mb-8">
                  Let&apos;s work together
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} method="POST">
                  <div>
                    {/* Contact info */}
                    <fieldset
                      className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 mb-6"
                      disabled={sending}
                    >
                      <TextField
                        {...register('firstName', {
                          required: 'First name is required'
                        })}
                        label="First name"
                        className="mt-2.5"
                        autoComplete="given-name"
                        error={errors.firstName?.message}
                      />

                      <TextField
                        {...register('lastName', {
                          required: 'Last name is required'
                        })}
                        label="Last name"
                        className="mt-2.5"
                        autoComplete="family-name"
                        error={errors.lastName?.message}
                      />

                      <TextField
                        {...register('email', {
                          required: 'Email is required'
                        })}
                        label="Email"
                        className="mt-2.5 sm:col-span-2"
                        type="email"
                        autoComplete="email"
                        error={errors.email?.message}
                      />

                      <TextField
                        {...register('zipCode', {
                          required: 'Zip code is required'
                        })}
                        label="Zip Code"
                        className="mt-2.5 sm:col-span-1"
                        type="text"
                        autoComplete="postal-code"
                        error={errors.zipCode?.message}
                      />

                      <TextField
                        {...register('phone')}
                        label="Phone"
                        description="Optional"
                        className="mt-2.5 sm:col-span-1"
                        type="tel"
                        autoComplete="tel"
                        error={errors.phone?.message}
                      />
                    </fieldset>

                    {/* Project info */}
                    <fieldset
                      className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                      disabled={sending}
                    >
                      <legend className="block text-sm font-semibold leading-6 text-gray-900">
                        Project size
                      </legend>
                      <div
                        className={`mt-4 space-y-4 text-sm leading-6 text-gray-600 ${
                          errors.projectSize ? 'text-red-900' : ''
                        }`}
                      >
                        <div className="flex gap-x-2.5">
                          <input
                            {...register('projectSize', { required: true })}
                            id="project-size-under-1k"
                            value={ProjectSize.UNDER_1K}
                            type="radio"
                            className="mt-1 h-4 w-4 border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-600"
                          />
                          <label htmlFor="project-size-under-1k">
                            Less than 1,000 sq ft
                          </label>
                        </div>
                        <div className="flex gap-x-2.5">
                          <input
                            {...register('projectSize', { required: true })}
                            id="project-size-1k-2k"
                            value={ProjectSize._1K_TO_2K}
                            type="radio"
                            className="mt-1 h-4 w-4 border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-600"
                          />
                          <label htmlFor="project-size-1k-2k">
                            1,000 - 2,000 sq ft
                          </label>
                        </div>
                        <div className="flex gap-x-2.5">
                          <input
                            {...register('projectSize', { required: true })}
                            id="project-size-over-2k"
                            value={ProjectSize.OVER_2K}
                            type="radio"
                            className="mt-1 h-4 w-4 border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-600"
                          />
                          <label htmlFor="project-size-over-2k">
                            2,000+ sq ft
                          </label>
                        </div>
                        {errors.projectSize &&
                          errors.projectSize.type === 'required' && (
                            <span className="text-sm text-red-600" role="alert">
                              Select a project size
                            </span>
                          )}
                      </div>

                      <div className="sm:col-span-2">
                        <div className="flex justify-between text-sm leading-6">
                          <label
                            htmlFor="message"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            How can we help you?
                          </label>
                          <p id="message-description" className="text-gray-400">
                            Max 2000 characters
                          </p>
                        </div>
                        <div className="mt-2.5">
                          <textarea
                            {...register('message', {
                              required:
                                'Please include some details about what you hope to achieve',
                              maxLength: {
                                value: 2000,
                                message:
                                  'Message must be 2000 characters or less'
                              }
                            })}
                            id="message"
                            name="message"
                            rows={4}
                            aria-describedby="message-description"
                            aria-invalid={errors.message ? 'true' : 'false'}
                            className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 ${
                              errors.message
                                ? 'ring-red-300 text-red-900 focus:ring-red-500'
                                : ''
                            }`}
                            defaultValue={''}
                          />
                          {errors.message && (
                            <span className="text-sm text-red-600" role="alert">
                              {errors.message.message}
                            </span>
                          )}
                        </div>
                        <div className="mt-4">
                          <p className="text-xs text-gray-600">
                            <ul className="list-inside space-y-4">
                              <li>
                                <span className="font-bold">
                                  Describe your ideal yard:
                                </span>{' '}
                                Share your vision with us. What elements are
                                most important to you? (Native plants, wildlife
                                habitats, pollinator host plants, etc.)
                              </li>
                              <li>
                                <span className="font-bold">Inspirations:</span>{' '}
                                Are there any particular styles, themes, or
                                examples of wildscaping that inspire you? Feel
                                free to share links or descriptions.
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
                    </fieldset>
                  </div>

                  <div className="my-8 border-t border-gray-200 pt-8">
                    <button
                      type="submit"
                      className="btn-primary w-full sm:w-auto"
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          Sending
                          <svg
                            className="animate-spin -mr-0.5 ml-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </>
                      ) : (
                        <>
                          Send{' '}
                          <PaperAirplaneIcon className="h-5 w-5 -mr-0.5 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {sent && (
              <div className="mx-auto max-w-xl pb-10 lg:mx-0 lg:max-w-lg">
                <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
                  Your wildscaping journey begins!
                </h2>
                <p className="text-lg text-gray-700">
                  Thank you for reaching out to us with your consultation
                  request! We will review your information and contact you to
                  discuss next steps and how we can bring your vision to life.
                </p>
                <p className="mt-4 text-lg text-gray-700">
                  We look forward to creating a beautiful, sustainable, and
                  lively space with you!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

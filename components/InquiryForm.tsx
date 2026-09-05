'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  MapPin,
  PackageSearch,
  UserRound,
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { FormField, FormHint } from '@/components/ui/form-field';

const fieldClass = 'form-control';

type QuoteValues = Record<string, string>;

export function QuoteInquiryForm() {
  return <InquiryForm kind='quote' />;
}

export function InquiryForm({ kind }: { kind: 'contact' | 'quote' }) {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const f = t.form;

  if (kind === 'quote') return <MultiStepQuoteForm />;

  if (sent) {
    return (
      <div role='status' className='ui-status-card'>
        <CheckCircle2 size={44} className='text-[#18a957]' />
        <h3 className='text-h3 text-2xl'>
          {kind === 'contact' ? t.contact.formTitle : t.quote.title}
        </h3>
        <p className='site-body max-w-[440px]'>
          {kind === 'contact' ? t.contact.success : t.quote.success}
        </p>
      </div>
    );
  }

  return (
    <form
      className='form-card contact-form'
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className='grid gap-4.5 sm:grid-cols-2'>
        <FormField label={f.name} required>
          <input
            required
            name='name'
            autoComplete='name'
            placeholder='Jane Doe'
            className={fieldClass}
          />
        </FormField>
        <FormField label={f.email} required>
          <input
            required
            type='email'
            name='email'
            autoComplete='email'
            placeholder='jane@company.com'
            className={fieldClass}
          />
        </FormField>
      </div>

      {kind === 'contact' ? (
        <>
          <div className='grid gap-4.5 sm:grid-cols-2'>
            <FormField label={f.phone}>
              <input
                type='tel'
                name='phone'
                autoComplete='tel'
                placeholder='+49 152 29939834'
                className={fieldClass}
              />
            </FormField>
            <FormField label={f.subject} required>
              <select required defaultValue='' className={fieldClass}>
                <option value='' disabled>
                  {f.selectSubject}
                </option>
                {t.contact.subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
          <FormField label={f.message} required>
            <textarea
              required
              name='message'
              rows={5}
              placeholder='Tell us how we can help.'
              className={`${fieldClass} resize-y`}
            />
          </FormField>
        </>
      ) : null}

      <Button type='submit' size='lg'>
        {kind === 'contact' ? t.contact.formTitle : t.quote.submit}{' '}
        <ArrowUpRight size={17} />
      </Button>
      <FormHint>{f.required}</FormHint>
    </form>
  );
}

function MultiStepQuoteForm() {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState<QuoteValues>({
    recipientType: 'company',
  });
  const [positions, setPositions] = useState<QuoteValues[]>([{ number: '1' }]);
  const stepPanel = useRef<HTMLDivElement>(null);
  const q = t.quote.multi;
  const steps = [
    { label: q.steps.client, icon: UserRound },
    { label: q.steps.recipient, icon: MapPin },
    { label: q.steps.loading, icon: PackageSearch },
    { label: q.steps.review, icon: ClipboardList },
  ];
  const setValue = (name: string, value: string) =>
    setValues((current) => ({ ...current, [name]: value }));
  const control = (name: string) => ({
    name,
    value: values[name] ?? '',
    onChange: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => setValue(name, event.target.value),
  });
  const positionControl = (index: number, name: string) => ({
    name: `position-${index}-${name}`,
    value: positions[index][name] ?? '',
    onChange: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setPositions((current) =>
        current.map((position, positionIndex) =>
          positionIndex === index
            ? { ...position, [name]: event.target.value }
            : position,
        ),
      ),
  });
  const addPosition = () =>
    setPositions((current) => [
      ...current,
      { number: String(current.length + 1) },
    ]);
  const removePosition = (index: number) =>
    setPositions((current) =>
      current.filter((_, positionIndex) => positionIndex !== index),
    );
  const next = () => {
    const controls =
      stepPanel.current?.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >('input, select, textarea') ?? [];
    for (const element of controls) {
      if (!element.checkValidity()) {
        element.reportValidity();
        return;
      }
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  if (sent)
    return (
      <div role='status' className='ui-status-card'>
        <CheckCircle2 size={44} className='text-[#18a957]' />
        <h3 className='text-h3 text-2xl'>{t.quote.title}</h3>
        <p className='site-body max-w-110'>{t.quote.success}</p>
      </div>
    );

  return (
    <form
      className='form-card quote-form gap-8'
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className='border-b border-editorial-line/60 pb-6'>
        <p className='text-sm leading-6 text-editorial-muted'>
          {q.progress
            .replace('{current}', String(step + 1))
            .replace('{total}', String(steps.length))}
        </p>
        <ol
          className='mt-4 grid grid-cols-4 gap-1.5'
          aria-label={q.progressLabel}
        >
          {steps.map(({ label, icon: Icon }, index) => {
            const state =
              index === step
                ? 'bg-editorial-accent text-white'
                : index < step
                  ? 'bg-editorial-ink text-white'
                  : 'bg-editorial-surface text-editorial-muted';
            return (
              <li key={label} className='min-w-0'>
                <div
                  className={`flex min-h-10 items-center justify-center gap-2 rounded-lg px-2 text-xs font-semibold transition-colors sm:justify-start sm:px-3 ${state}`}
                >
                  <Icon size={15} aria-hidden='true' />
                  <span className='hidden truncate sm:inline'>{label}</span>
                  <span className='sm:hidden'>{index + 1}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div ref={stepPanel} className='grid gap-5' aria-live='polite'>
        <div>
          <h3 className='text-h3'>
            {q.headings[step]}
          </h3>
          <p className='mt-1.5 text-sm leading-6 text-editorial-muted'>
            {q.descriptions[step]}
          </p>
        </div>
        {step === 0 && (
          <div className='grid items-start gap-10 lg:grid-cols-2 lg:gap-x-16'>
            <section className='grid gap-6'>
              <h4 className='quote-form__group-title'>{q.contactPerson}</h4>
              <FormField label={q.salutation} required>
                <select
                  required
                  className={fieldClass}
                  {...control('salutation')}
                >
                  <option value='' disabled>
                    {q.select}
                  </option>
                  <option>{q.salutations.mr}</option>
                  <option>{q.salutations.ms}</option>
                  <option>{q.salutations.diverse}</option>
                </select>
              </FormField>
              <FormField label={t.form.name} required>
                <input
                  required
                  placeholder={q.namePlaceholder}
                  autoComplete='name'
                  className={fieldClass}
                  {...control('name')}
                />
              </FormField>
              <FormField label={t.form.email} required>
                <input
                  required
                  placeholder={q.emailPlaceholder}
                  type='email'
                  autoComplete='email'
                  className={fieldClass}
                  {...control('email')}
                />
              </FormField>
              <FormField label={t.form.phone} required>
                <input
                  required
                  placeholder={q.phonePlaceholder}
                  type='tel'
                  autoComplete='tel'
                  className={fieldClass}
                  {...control('phone')}
                />
              </FormField>
            </section>
            <section className='grid gap-6'>
              <h4 className='quote-form__group-title'>{q.address}</h4>
              <FormField label={q.company} required>
                <input
                  required
                  placeholder={q.companyPlaceholder}
                  autoComplete='organization'
                  className={fieldClass}
                  {...control('clientCompany')}
                />
              </FormField>
              <FormField label={q.zip} required>
                <input
                  required
                  placeholder={q.zipPlaceholder}
                  autoComplete='postal-code'
                  className={fieldClass}
                  {...control('clientZip')}
                />
              </FormField>
              <FormField label={q.location} required>
                <input
                  required
                  placeholder={q.locationPlaceholder}
                  autoComplete='address-level2'
                  className={fieldClass}
                  {...control('clientLocation')}
                />
              </FormField>
              <FormField label={q.country} required>
                <input
                  required
                  placeholder={q.countryPlaceholder}
                  autoComplete='country-name'
                  className={fieldClass}
                  {...control('clientCountry')}
                />
              </FormField>
              <FormField label={q.street} required>
                <input
                  required
                  placeholder={q.streetPlaceholder}
                  autoComplete='street-address'
                  className={fieldClass}
                  {...control('clientStreet')}
                />
              </FormField>
              <FormField label={q.houseNumber} required>
                <input
                  required
                  placeholder={q.houseNumberPlaceholder}
                  className={fieldClass}
                  {...control('clientHouseNumber')}
                />
              </FormField>
            </section>
          </div>
        )}
        {step === 1 && (
          <>
            <fieldset className='grid gap-3'>
              <legend className='form-label'>
                {q.recipientType}
                <span aria-hidden='true'> *</span>
              </legend>
              <div className='grid gap-3 sm:grid-cols-2'>
                {[
                  ['company', q.companyRecipient],
                  ['private', q.privateRecipient],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center gap-3 border p-4 text-sm font-medium transition-colors ${values.recipientType === value ? 'border-editorial-accent bg-editorial-accent/5' : 'border-editorial-line/60'}`}
                  >
                    <input
                      type='radio'
                      name='recipientType'
                      value={value}
                      checked={values.recipientType === value}
                      onChange={() => setValue('recipientType', value)}
                      className='size-4 accent-editorial-accent'
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            {values.recipientType === 'company' && (
              <FormField label={q.company} required>
                <input
                  required
                  placeholder={q.companyPlaceholder}
                  autoComplete='organization'
                  className={fieldClass}
                  {...control('recipientCompany')}
                />
              </FormField>
            )}
            <p className='pt-2 text-xs font-semibold uppercase tracking-[0.1em] text-editorial-muted'>
              {q.address}
            </p>
            <div className='grid gap-4.5 sm:grid-cols-3'>
              <FormField label={q.zip} required>
                <input
                  required
                  placeholder={q.zipPlaceholder}
                  autoComplete='postal-code'
                  className={fieldClass}
                  {...control('recipientZip')}
                />
              </FormField>
              <FormField label={q.location} required>
                <input
                  required
                  placeholder={q.locationPlaceholder}
                  autoComplete='address-level2'
                  className={fieldClass}
                  {...control('recipientLocation')}
                />
              </FormField>
              <FormField label={q.country} required>
                <input
                  required
                  placeholder={q.countryPlaceholder}
                  autoComplete='country-name'
                  className={fieldClass}
                  {...control('recipientCountry')}
                />
              </FormField>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            {positions.map((position, index) => (
              <section
                key={index}
                className='quote-form__position grid gap-6'
                aria-label={`${q.loadingPosition} ${index + 1}`}
              >
                <div className='flex items-center justify-between gap-3'>
                  <h4 className='quote-form__group-title'>
                    {q.loadingPosition} {index + 1}
                  </h4>
                  {positions.length > 1 && (
                    <Button
                      variant='link'
                      onClick={() => removePosition(index)}
                    >
                      {q.removePosition}
                    </Button>
                  )}
                </div>
                <div className='grid gap-6 sm:grid-cols-2'>
                  <FormField label={q.number} required>
                    <input
                      required
                      min='1'
                      type='number'
                      inputMode='numeric'
                      className={fieldClass}
                      {...positionControl(index, 'number')}
                    />
                  </FormField>
                  <FormField label={q.shipmentType} required>
                    <select
                      required
                      className={fieldClass}
                      {...positionControl(index, 'shipmentType')}
                    >
                      <option value='' disabled>
                        {q.select}
                      </option>
                      {q.shipmentTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </FormField>
                </div>
                <FormField label={q.content} required>
                  <input
                    required
                    className={fieldClass}
                    {...positionControl(index, 'content')}
                  />
                </FormField>
                <div className='grid gap-6 sm:grid-cols-2'>
                  <FormField label={q.shipmentDate} required>
                    <select
                      required
                      className={fieldClass}
                      {...positionControl(index, 'shipmentDate')}
                    >
                      <option value='' disabled>
                        {q.select}
                      </option>
                      {q.shippingDates.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label={q.incoterms} required>
                    <select
                      required
                      className={fieldClass}
                      {...positionControl(index, 'incoterms')}
                    >
                      <option value='' disabled>
                        {q.select}
                      </option>
                      {q.incotermOptions.map((term) => (
                        <option key={term}>{term}</option>
                      ))}
                    </select>
                  </FormField>
                </div>
                <div className='grid grid-cols-2 gap-6 sm:grid-cols-4'>
                  <FormField label={q.length} required>
                    <input
                      required
                      type='number'
                      min='0'
                      inputMode='decimal'
                      placeholder='cm'
                      className={fieldClass}
                      {...positionControl(index, 'length')}
                    />
                  </FormField>
                  <FormField label={q.width} required>
                    <input
                      required
                      type='number'
                      min='0'
                      inputMode='decimal'
                      placeholder='cm'
                      className={fieldClass}
                      {...positionControl(index, 'width')}
                    />
                  </FormField>
                  <FormField label={q.height} required>
                    <input
                      required
                      type='number'
                      min='0'
                      inputMode='decimal'
                      placeholder='cm'
                      className={fieldClass}
                      {...positionControl(index, 'height')}
                    />
                  </FormField>
                  <FormField label={q.weight} required>
                    <input
                      required
                      type='number'
                      min='0'
                      inputMode='decimal'
                      placeholder='kg'
                      className={fieldClass}
                      {...positionControl(index, 'weight')}
                    />
                  </FormField>
                </div>
                <FormField label={q.otherInformation}>
                  <textarea
                    rows={3}
                    className={`${fieldClass} resize-y`}
                    {...positionControl(index, 'otherInformation')}
                  />
                </FormField>
                <div className='flex flex-wrap gap-x-6 gap-y-3'>
                  <label className='flex items-center gap-2 text-sm font-medium'>
                    <input
                      type='checkbox'
                      checked={position.stackable === 'true'}
                      onChange={(event) =>
                        setPositions((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index
                              ? {
                                  ...item,
                                  stackable: String(event.target.checked),
                                }
                              : item,
                          ),
                        )
                      }
                      className='size-4 accent-editorial-accent'
                    />
                    {q.stackable}
                  </label>
                  <label className='flex items-center gap-2 text-sm font-medium'>
                    <input
                      type='checkbox'
                      checked={position.dangerous === 'true'}
                      onChange={(event) =>
                        setPositions((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index
                              ? {
                                  ...item,
                                  dangerous: String(event.target.checked),
                                }
                              : item,
                          ),
                        )
                      }
                      className='size-4 accent-editorial-accent'
                    />
                    {q.dangerousGoods}
                  </label>
                </div>
              </section>
            ))}
            <Button
              variant='outline'
              className='justify-self-start text-editorial-accent'
              onClick={addPosition}
            >
              {q.addPosition}
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <QuoteReview
              values={values}
              positions={positions}
              labels={q.summary}
            />
            <label className='flex items-start gap-3 border border-editorial-line/60 p-4 text-sm leading-6 text-editorial-muted'>
              <input
                required
                type='checkbox'
                checked={values.privacy === 'true'}
                onChange={(event) =>
                  setValue('privacy', String(event.target.checked))
                }
                className='mt-1 size-4 shrink-0 accent-editorial-accent'
              />
              <span>
                {q.privacyBefore}{' '}
                <Link
                  href='/data-policy'
                  className='font-semibold text-editorial-accent underline underline-offset-4'
                >
                  {q.privacyLink}
                </Link>
                {q.privacyAfter}
                <span aria-hidden='true'> *</span>
              </span>
            </label>
          </>
        )}
      </div>

      <div className='flex items-center justify-between gap-3 border-t border-editorial-line/60 pt-6'>
        {step > 0 ? (
          <Button
            variant='ghost'
            onClick={() => setStep((current) => current - 1)}
          >
            <ArrowLeft />
            {q.back}
          </Button>
        ) : (
          <span />
        )}
        {step < steps.length - 1 ? (
          <Button size='lg' onClick={next}>
            {q.next}
            <ArrowRight />
          </Button>
        ) : (
          <Button type='submit' size='lg'>
            {t.quote.submit}
            <ArrowUpRight />
          </Button>
        )}
      </div>
      <FormHint>{step === 3 ? q.reviewHint : t.form.required}</FormHint>
    </form>
  );
}

function QuoteReview({
  values,
  positions,
  labels,
}: {
  values: QuoteValues;
  positions: QuoteValues[];
  labels: {
    client: string;
    recipient: string;
    loading: string;
    name: string;
    email: string;
    address: string;
  };
}) {
  const item = (label: string, value?: string) => (
    <div>
      <dt className='text-xs font-semibold uppercase tracking-[0.08em] text-editorial-muted'>
        {label}
      </dt>
      <dd className='mt-1 text-sm font-medium text-editorial-ink'>
        {value || '—'}
      </dd>
    </div>
  );
  return (
    <div className='grid gap-5 border-y border-editorial-line/60 py-5'>
      <div>
        <h4 className='font-display font-semibold'>{labels.client}</h4>
        <dl className='mt-3 grid grid-cols-2 gap-4'>
          {item(labels.name, values.name)}
          {item(labels.email, values.email)}
          {item(
            labels.address,
            `${values.clientStreet || ''} ${values.clientHouseNumber || ''}, ${values.clientZip || ''} ${values.clientLocation || ''}`,
          )}
        </dl>
      </div>
      <div>
        <h4 className='font-display font-semibold'>{labels.recipient}</h4>
        <p className='mt-2 text-sm leading-6 text-editorial-muted'>
          {values.recipientType === 'company' ? values.recipientCompany : ''} ·{' '}
          {values.recipientZip} {values.recipientLocation},{' '}
          {values.recipientCountry}
        </p>
      </div>
      <div>
        <h4 className='font-display font-semibold'>{labels.loading}</h4>
        <div className='mt-3 grid gap-2'>
          {positions.map((position, index) => (
            <p key={index} className='text-sm leading-6 text-editorial-muted'>
              {index + 1}. {position.content} · {position.number} ×{' '}
              {position.shipmentType} · {position.weight} kg
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client'

import { useState } from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { SERVICES } from '@/lib/site'
import { Button } from '@/components/ui/button'
import { FormField, FormHint } from '@/components/ui/form-field'

const fieldClass = 'form-control'

export function InquiryForm({ kind }: { kind: 'contact' | 'quote' }) {
  const { t } = useLang()
  const [sent, setSent] = useState(false)
  const f = t.form

  if (sent) {
    return (
      <div
        role="status"
        className="ui-status-card"
      >
        <CheckCircle2 size={44} className="text-[#18a957]" />
        <h3 className="text-h3 text-2xl">{kind === 'contact' ? t.contact.formTitle : t.quote.title}</h3>
        <p className="site-body max-w-[440px]">
          {kind === 'contact' ? t.contact.success : t.quote.success}
        </p>
      </div>
    )
  }

  return (
    <form
      className="form-card"
      onSubmit={(e) => { e.preventDefault(); setSent(true) }}
    >
      <div className="grid gap-4.5 sm:grid-cols-2">
        <FormField label={f.name} required>
          <input required name="name" autoComplete="name" className={fieldClass} />
        </FormField>
        <FormField label={f.email} required>
          <input required type="email" name="email" autoComplete="email" className={fieldClass} />
        </FormField>
      </div>

      {kind === 'contact' ? (
        <>
          <div className="grid gap-4.5 sm:grid-cols-2">
            <FormField label={f.phone}>
              <input type="tel" name="phone" autoComplete="tel" className={fieldClass} />
            </FormField>
            <FormField label={f.subject} required>
              <select required defaultValue="" className={fieldClass}>
                <option value="" disabled>{f.selectSubject}</option>
                {t.contact.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label={f.message} required>
            <textarea required name="message" rows={5} className={`${fieldClass} resize-y`} />
          </FormField>
        </>
      ) : (
        <>
          <div className="grid gap-4.5 sm:grid-cols-2">
            <FormField label={f.phone}>
              <input type="tel" name="phone" autoComplete="tel" className={fieldClass} />
            </FormField>
            <FormField label={f.service} required>
              <select required defaultValue="" className={fieldClass}>
                <option value="" disabled>{f.selectService}</option>
                {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{t.services.details[s.slug].title}</option>)}
              </select>
            </FormField>
          </div>
          <div className="grid gap-4.5 sm:grid-cols-2">
            <FormField label={f.from} required>
              <input required name="origin" className={fieldClass} />
            </FormField>
            <FormField label={f.to} required>
              <input required name="destination" className={fieldClass} />
            </FormField>
          </div>
          <FormField label={t.quote.cargoLabel} required>
            <input required name="cargo" className={fieldClass} />
          </FormField>
          <FormField label={t.quote.detailsLabel}>
            <textarea name="details" rows={4} placeholder={t.quote.detailsPlaceholder} className={`${fieldClass} resize-y`} />
          </FormField>
        </>
      )}

      <Button type="submit" size="lg">
        {kind === 'contact' ? t.contact.formTitle : t.quote.submit} <ArrowUpRight size={17} />
      </Button>
      <FormHint>{f.required}</FormHint>
    </form>
  )
}

'use client'

import { WHATSAPP_URL } from '@/lib/site'
import { useLang } from '@/lib/i18n'

export function WhatsAppFloat() {
  const { t } = useLang()
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-60 grid size-13 place-items-center rounded-full bg-[#22c15e] text-white shadow-xl shadow-[#22c15e]/40 transition duration-300 hover:-translate-y-1 hover:scale-105 max-sm:right-4 max-sm:bottom-4 max-sm:size-13"
      aria-label={t.common.whatsappChat}
      title={t.common.whatsappChat}
    >
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden>
        <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.9 5 2.3 7L4 29l7.3-2.3c1.9 1 4 1.6 6.3 1.6h.4c6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.7c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.3 1.4 1.4-4.1-.3-.4c-1.2-1.7-1.9-3.7-1.9-5.9 0-5.5 4.6-10 10.1-10s9.9 4.5 9.9 10-4.5 10.8-10 10.8zm5.6-7.5c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.7l.5-.5c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6-.1-.2-.7-1.8-1-2.4-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2-.8 2.2-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.5z" />
      </svg>
    </a>
  )
}

import { siteConfig } from '@/data/content'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.phoneWhatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className="fixed z-[100] bottom-5 right-5 sm:bottom-6 sm:right-6 group flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 hover:scale-105 hover:bg-[#20bd5a] transition-all duration-200"
      style={{ width: 56, height: 56 }}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
        <path d="M16 3C9.38 3 4 8.38 4 15c0 2.34.66 4.53 1.81 6.4L4 29l7.85-1.77A11.94 11.94 0 0 0 16 27c6.62 0 12-5.38 12-12S22.62 3 16 3zm0 21.6c-1.86 0-3.6-.5-5.1-1.36l-.37-.22-4.66 1.05.99-4.53-.25-.4A9.6 9.6 0 1 1 25.6 15c0 5.3-4.3 9.6-9.6 9.6zm5.53-7.15c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.25-.6-.5-.51-.68-.52l-.58-.01c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.13 3.26 5.15 4.57.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.79-.73 2.04-1.44.25-.7.25-1.31.18-1.43-.07-.13-.27-.2-.58-.35z"/>
      </svg>
    </a>
  )
}

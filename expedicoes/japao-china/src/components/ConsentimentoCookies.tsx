import { useEffect, useState } from 'react'

/**
 * Banner de consentimento de cookies (LGPD — Lei 13.709/2018).
 *
 * Modelo OPT-OUT: o tracking (GTM / Google Ads / Meta Pixel) continua ligado por
 * padrão — como já estava — mas o visitante tem escolha clara. Se ele clicar em
 * "Recusar", chamamos o Consent Mode do Google e o revoke do Meta Pixel para
 * realmente parar a coleta não essencial naquele navegador.
 *
 * Autocontido de propósito (estilos inline + <style> injetado): assim funciona
 * igual nos 11 projetos, sem depender da config de Tailwind de cada um.
 *
 * Para trocar para o modelo OPT-IN (mais rígido, padrão GDPR), veja a nota no
 * final do arquivo.
 */

const STORAGE_KEY = 'setur-consent-v1'

type Consent = 'accepted' | 'rejected'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

function aplicarConsentimento(estado: Consent) {
  // Google Consent Mode v2
  if (typeof window.gtag === 'function') {
    const v = estado === 'accepted' ? 'granted' : 'denied'
    window.gtag('consent', 'update', {
      ad_storage: v,
      analytics_storage: v,
      ad_user_data: v,
      ad_personalization: v,
    })
  }
  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('consent', estado === 'accepted' ? 'grant' : 'revoke')
  }
}

export default function ConsentimentoCookies() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    let salvo: string | null = null
    try {
      salvo = localStorage.getItem(STORAGE_KEY)
    } catch {
      // localStorage indisponível (modo privado antigo etc.) — mostra o banner.
    }
    if (salvo === 'accepted' || salvo === 'rejected') {
      aplicarConsentimento(salvo)
    } else {
      setVisivel(true)
    }
  }, [])

  const decidir = (estado: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, estado)
    } catch {
      /* ignora */
    }
    aplicarConsentimento(estado)
    setVisivel(false)
  }

  if (!visivel) return null

  const base = `${import.meta.env.BASE_URL}politica-privacidade.html`

  return (
    <>
      <style>{`
        @keyframes setur-cookie-in {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .setur-cookie-card { animation: none !important; }
        }
      `}</style>
      <div
        role="dialog"
        aria-live="polite"
        aria-label="Aviso de cookies e privacidade"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2147483600,
          display: 'flex',
          justifyContent: 'center',
          padding: '16px',
          pointerEvents: 'none',
        }}
      >
        <div
          className="setur-cookie-card"
          style={{
            pointerEvents: 'auto',
            maxWidth: '720px',
            width: '100%',
            background: '#09282B',
            color: '#F8F6F7',
            borderRadius: '20px',
            border: '1px solid rgba(215,242,100,0.25)',
            boxShadow: '0 18px 50px rgba(0,0,0,0.45)',
            padding: '20px 22px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '16px',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            animation: 'setur-cookie-in 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: '13.5px',
                lineHeight: 1.55,
                color: 'rgba(248,246,247,0.85)',
              }}
            >
              Usamos cookies para melhorar sua experiência, analisar o tráfego e
              personalizar anúncios. Ao continuar navegando, você concorda com
              nossa{' '}
              <a
                href={base}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#D7F264',
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px',
                }}
              >
                Política de Privacidade
              </a>
              . Você pode recusar os cookies não essenciais.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              flex: '0 0 auto',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={() => decidir('rejected')}
              style={{
                cursor: 'pointer',
                background: 'transparent',
                color: 'rgba(248,246,247,0.8)',
                border: '1px solid rgba(248,246,247,0.3)',
                borderRadius: '999px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'inherit',
              }}
            >
              Recusar
            </button>
            <button
              type="button"
              onClick={() => decidir('accepted')}
              style={{
                cursor: 'pointer',
                background: '#D7F264',
                color: '#09282B',
                border: 'none',
                borderRadius: '999px',
                padding: '10px 22px',
                fontSize: '13px',
                fontWeight: 700,
                fontFamily: 'inherit',
              }}
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

/*
 * ---------------------------------------------------------------------------
 * MODELO OPT-IN (mais rígido) — se um dia quiser bloquear o tracking ATÉ o
 * visitante aceitar:
 *   1. No index.html, ANTES dos scripts de GTM/gtag/Pixel, adicione o default
 *      negado:
 *        gtag('consent', 'default', {
 *          ad_storage:'denied', analytics_storage:'denied',
 *          ad_user_data:'denied', ad_personalization:'denied'
 *        });
 *      e no Pixel:  fbq('consent', 'revoke');  (antes do track 'PageView')
 *   2. Aqui, NÃO mostre nada como "ao continuar navegando você concorda" — só
 *      libere o tracking no clique de "Aceitar".
 * ---------------------------------------------------------------------------
 */

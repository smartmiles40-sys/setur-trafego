import { useState, type FormEvent } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

import { captacao, expedicao, investimento } from "../data/expedicao";
import { cn } from "@/lib/utils";

/**
 * FORMULÁRIO DO PACOTE (doc "Ajustes nas páginas do site – Expedições 2027",
 * 05/10/2026: "incluir em todos os pacotes o mesmo forms das LPs dos
 * influenciadores" + "adicionar o forms para marcar com o SDR").
 *
 * Mesmo molde da LP dos influenciadores (Setur Trafego/pacotes-influencers,
 * LeadSheet.tsx), já com o padrão novo dos formulários: sem "Como você
 * pretende viajar?", sem "Quando você pretende tomar a decisão?" e o
 * investimento com só duas opções. O pacote é o da página — não se escolhe.
 *
 *   1. contato  ·  2. a viagem  ·  3. quarto + investimento  ·  4. ligação com o SDR
 *
 * POST /api/lead-pacote → contato + negócio direto no Bitrix (funil Pré-Vendas),
 * com a fonte "[<pacote>] - Orgânico" e o Lead Scoring calculado AQUI.
 * Este arquivo é IDÊNTICO nos 5 pacotes: o que varia vem de data/expedicao.ts.
 */

const QUANDO = ["Nos próximos 3 meses", "De 3 a 6 meses", "Daqui a mais de 6 meses", "Ainda não tenho data"];
const PESSOAS = ["Só eu", "2 pessoas", "3 ou 4 pessoas", "5 ou mais"];
// Japão (doc do Bruno, 26/10): o preço muda conforme o quarto/hospedagem,
// então a pergunta de perfil de viajante deu lugar à do quarto.
const QUARTO = [
  "Quarto duplo (2 pessoas)",
  "Quarto single (só eu)",
  "Quarto triplo (3 pessoas)",
  "Mais de um quarto (família ou grupo)",
];
const INVESTIMENTO = ["Sim, estou ciente", "Não, quero entender melhor"];

// ---- Lead score (05/10/2026) — calculado no site e gravado no "Lead Scoring"
// do Bitrix. Mesma escala das expedições: 20 = quente · 10 ou 15 = morno · até 5 = frio.
const PONTOS_QUANDO: Record<string, number> = { "Nos próximos 3 meses": 10, "De 3 a 6 meses": 5 };
const PONTOS_INVESTIMENTO: Record<string, number> = { "Sim, estou ciente": 10 };

function leadScore(quando: string, investimentoResp: string) {
  const pontos = (PONTOS_QUANDO[quando] ?? 0) + (PONTOS_INVESTIMENTO[investimentoResp] ?? 0);
  const rotulo = pontos >= 20 ? "Quente" : pontos >= 10 ? "Morno" : "Frio";
  return { lead_score: rotulo, lead_score_pontos: pontos };
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id", "gclid", "fbclid"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const mascaraWhatsapp = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const mascaraInstagram = (v: string) => {
  const h = v.replace(/\s|@/g, "").replace(/[^a-zA-Z0-9._]/g, "").slice(0, 30);
  return h ? `@${h}` : "";
};

const novoLeadId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

function pushDataLayer(event: string, data?: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, form_name: `pacote-${captacao.slug}`, ...data });
}

function trackingDaUrl() {
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of UTM_KEYS) out[k] = (p.get(k) || "").slice(0, 200);
  return out;
}

// "A partir de 10x de R$ 886,19 sem juros por pessoa · em quarto duplo"
const inv = investimento as typeof investimento & { parcelas?: string; sufixo?: string };
const FRASE_PRECO = [inv.prefixo, inv.parcelas, `${inv.moeda} ${inv.valor}`, inv.sufixo, inv.unidade]
  .filter(Boolean)
  .join(" ");

function Opcoes({
  titulo,
  opcoes,
  valor,
  onEscolher,
  erro,
}: {
  titulo: string;
  opcoes: string[];
  valor: string;
  onEscolher: (v: string) => void;
  erro?: boolean;
}) {
  return (
    <fieldset className="mt-6">
      <legend className={cn("text-sm font-semibold", erro ? "text-[#C2362F]" : "text-dark-teal")}>{titulo}</legend>
      <div className="mt-3 grid gap-2">
        {opcoes.map((o) => (
          <button
            type="button"
            key={o}
            onClick={() => onEscolher(o)}
            aria-pressed={valor === o}
            className={cn(
              "rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
              valor === o
                ? "border-lime bg-lime/25 font-semibold text-dark-teal"
                : "border-dark-teal/15 bg-white text-dark-teal/80 hover:border-dark-teal/40",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

const campo =
  "mt-2 w-full rounded-2xl border border-dark-teal/15 bg-white px-4 py-3 text-base text-dark-teal outline-none transition-colors placeholder:text-dark-teal/35 focus:border-dark-teal";

export default function FormularioPacote() {
  const [etapa, setEtapa] = useState<1 | 2 | 3>(1);
  const [nome, setNome] = useState("");
  const [whats, setWhats] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [quando, setQuando] = useState("");
  const [pessoas, setPessoas] = useState("");
  const [cidade, setCidade] = useState("");
  const [quarto, setQuarto] = useState("");
  const [investimentoResp, setInvestimentoResp] = useState("");
  const [estado, setEstado] = useState<"form" | "enviando">("form");
  const [erro, setErro] = useState("");
  const [faltando, setFaltando] = useState<string[]>([]);

  const whatsappE164 = `+55${whats.replace(/\D/g, "")}`;

  const irPara = (n: 1 | 2 | 3) => {
    setErro("");
    setFaltando([]);
    setEtapa(n);
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  const avancar1 = () => {
    const d = whats.replace(/\D/g, "");
    if (nome.trim().length < 3) return setErro("Digite seu nome completo");
    if (d.length !== 11 || d[2] !== "9") return setErro("Confira o WhatsApp: celular com DDD, 11 números");
    if (!EMAIL_RE.test(email.trim())) return setErro("Digite um e-mail válido");
    if (instagram.replace("@", "").trim().length < 2) return setErro("Digite seu @ do Instagram");
    pushDataLayer("form_step_complete", { step: 1 });
    irPara(2);
  };

  const avancar2 = () => {
    const f = [!quando && "quando", !pessoas && "pessoas"].filter(Boolean) as string[];
    if (f.length) {
      setFaltando(f);
      return setErro("Falta responder o que ficou em vermelho");
    }
    pushDataLayer("form_step_complete", { step: 2 });
    irPara(3);
  };

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (etapa === 1) return avancar1();
    if (etapa === 2) return avancar2();
    const f = [!quarto && "quarto", !investimentoResp && "investimento"].filter(Boolean) as string[];
    if (f.length) {
      setFaltando(f);
      return setErro("Falta responder o que ficou em vermelho");
    }
    setErro("");
    setEstado("enviando");

    const score = leadScore(quando, investimentoResp);
    const payload = {
      lead_id: novoLeadId(),
      pacote: captacao.slug,
      nome: nome.trim(),
      whatsapp: whatsappE164,
      email: email.trim().toLowerCase(),
      instagram,
      quando,
      pessoas,
      cidade: cidade.trim(),
      quarto,
      investimento: investimentoResp,
      ...score,
      ...trackingDaUrl(),
      pagina: window.location.href,
      referrer: document.referrer || "",
    };

    try {
      const res = await fetch("/api/lead-pacote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      const retorno = (await res.json().catch(() => ({}))) as { bitrix?: boolean };
      pushDataLayer("form_submit", { pacote: captacao.slug, temperatura: score.lead_score.toLowerCase() });
      // 22/10/2026 (Bruno): o lead vai DIRETO pro obrigado.html, onde a
      // Stape/GTM conta a conversão do Meta, e a ligação com o SDR é marcada
      // lá (antes era a última etapa daqui, e quem fechava a aba na agenda
      // nunca contava). Os dados da agenda seguem pelo sessionStorage.
      // `bitrix === false`: o card não abriu aqui — aí quem abre é o QS, ao marcar a ligação.
      try {
        sessionStorage.setItem(
          "stfv_agenda",
          JSON.stringify({
            nome: nome.trim(),
            email: email.trim().toLowerCase(),
            telefone: whatsappE164,
            expedicao: expedicao.nome,
            origem: captacao.fonte,
            destino: captacao.slug,
            form_name: `pacote-${captacao.slug}`,
            ja_no_bitrix: retorno.bitrix === true,
          }),
        );
      } catch {
        /* aba privada: o obrigado.html só confirma, sem agenda */
      }
      let foi = false;
      const irParaObrigado = () => {
        if (foi) return;
        foi = true;
        window.location.href = `${import.meta.env.BASE_URL}obrigado.html`;
      };
      // Dá tempo do GTM mandar o lead_conversion antes de sair da página
      pushDataLayer("lead_conversion", {
        pacote: captacao.slug,
        value: 1,
        eventCallback: irParaObrigado,
        eventTimeout: 2000,
      });
      setTimeout(irParaObrigado, 2000);
    } catch {
      setEstado("form");
      setErro("Não conseguimos enviar agora. Tente de novo em alguns segundos.");
    }
  };

  const f = (k: string) => faltando.includes(k);
  const passoAtual = etapa;

  return (
    <section id="formulario" className="section bg-soft-green/40">
      <div className="mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <div className="eyebrow-center mb-5 justify-center text-dark-teal">Reserve seu lugar</div>
          <h2 className="font-serif text-h2 font-bold leading-[1.05] tracking-tight text-dark-teal">
            Pronto(a) para viver o{" "}
            <span className="serif-italic font-normal">{expedicao.nome}?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-dark-teal/70">
            Preencha o formulário e marque uma ligação rápida com o nosso time para alinhar datas e valores.
          </p>
        </div>

        <div className="card">
          {/* Progresso: 4 tracinhos, sem número (a ligação com o SDR conta) */}
          <div className="mb-6 flex gap-1.5" aria-hidden>
            {[1, 2, 3, 4].map((n) => (
              <span
                key={n}
                className={cn("h-1.5 flex-1 rounded-full transition-colors", n <= passoAtual ? "bg-lime" : "bg-dark-teal/10")}
              />
            ))}
          </div>

          {(
            <form onSubmit={enviar} noValidate>
              {etapa === 1 && (
                <>
                  <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-dark-teal/55">
                    Dados de contato
                  </p>
                  <label className="mt-4 block text-sm font-semibold text-dark-teal">
                    Nome completo
                    <input className={campo} value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" />
                  </label>
                  <label className="mt-4 block text-sm font-semibold text-dark-teal">
                    WhatsApp com DDD
                    <input
                      className={campo}
                      value={whats}
                      onChange={(e) => setWhats(mascaraWhatsapp(e.target.value))}
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="(11) 98765-4321"
                    />
                  </label>
                  <label className="mt-4 block text-sm font-semibold text-dark-teal">
                    E-mail
                    <input
                      className={campo}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                    />
                  </label>
                  <label className="mt-4 block text-sm font-semibold text-dark-teal">
                    Instagram
                    <input
                      className={campo}
                      value={instagram}
                      onChange={(e) => setInstagram(mascaraInstagram(e.target.value))}
                      autoCapitalize="none"
                      autoCorrect="off"
                      placeholder="@seuusuario"
                    />
                  </label>
                </>
              )}

              {etapa === 2 && (
                <>
                  <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-dark-teal/55">
                    Sua viagem
                  </p>
                  <Opcoes titulo="Quando você pretende viajar?" opcoes={QUANDO} valor={quando} onEscolher={setQuando} erro={f("quando")} />
                  <Opcoes titulo="Quantas pessoas vão?" opcoes={PESSOAS} valor={pessoas} onEscolher={setPessoas} erro={f("pessoas")} />
                  <label className="mt-6 block text-sm font-semibold text-dark-teal">
                    De qual cidade você sairia? <span className="font-normal text-dark-teal/45">(opcional)</span>
                    <input
                      className={campo}
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      autoComplete="address-level2"
                      placeholder="Ex.: São Paulo"
                    />
                  </label>
                </>
              )}

              {etapa === 3 && (
                <>
                  <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-dark-teal/55">
                    Sua hospedagem
                  </p>
                  <Opcoes titulo="Como vocês vão se hospedar?" opcoes={QUARTO} valor={quarto} onEscolher={setQuarto} erro={f("quarto")} />
                  <Opcoes
                    titulo={`O ${expedicao.tipo} ${expedicao.nome} sai ${FRASE_PRECO.charAt(0).toLowerCase()}${FRASE_PRECO.slice(1)}. Você está ciente desse investimento?`}
                    opcoes={INVESTIMENTO}
                    valor={investimentoResp}
                    onEscolher={setInvestimentoResp}
                    erro={f("investimento")}
                  />
                </>
              )}

              {erro && <p className="mt-5 text-sm font-medium text-[#C2362F]">{erro}</p>}

              <div className="mt-8 flex gap-3">
                {etapa > 1 && (
                  <button
                    type="button"
                    onClick={() => irPara((etapa - 1) as 1 | 2)}
                    aria-label="Voltar"
                    className="btn-outline shrink-0 px-5"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <button type="submit" disabled={estado === "enviando"} className="btn-primary w-full">
                  {estado === "enviando" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : etapa < 3 ? (
                    "Continuar"
                  ) : (
                    "Quero reservar"
                  )}
                </button>
              </div>
              <p className="mt-4 text-center text-xs text-dark-teal/45">
                Atendimento humano · Resposta rápida em horário comercial
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

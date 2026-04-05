import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "プライバシーポリシー | members cafe -MIYAKO-",
  description: "members cafe -MIYAKO- の個人情報保護方針についてご案内いたします。",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />

      <div className="pt-32 pb-32 px-8" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16">
            <p className="font-[family-name:var(--font-cormorant)] text-[0.7rem] tracking-[0.5em] uppercase text-[var(--rose-gold)] mb-4">
              Legal
            </p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,4vw,3rem)] font-light tracking-[0.2em] uppercase text-[var(--champagne)] leading-[1.2] mb-4">
              Privacy Policy
            </h1>
            <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] text-[var(--text-dim)]">
              当店の個人情報保護方針についてご案内いたします
            </p>
            <div className="w-10 h-px bg-[var(--rose-gold)] mx-auto mt-8" />
          </div>

          <div className="font-[family-name:var(--font-shippori)] text-[0.85rem] text-[var(--text-secondary)] leading-[2.4] space-y-10">
            <p>
              members cafe -MIYAKO-（以下、当店と言います）は、当店が取得した個人情報の取扱いに関し、個人情報の保護に関する法律、個人情報保護に関するガイドライン等の指針、その他個人情報保護に関する関係法令を遵守します。
            </p>

            <Section num="1" title="個人情報の安全管理">
              <p>
                当店は、個人情報の保護に関して、組織的、物理的、人的、技術的に適切な対策を実施し、当店の取り扱う個人情報の漏えい、滅失又はき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講ずるものとします。
              </p>
            </Section>

            <Section num="2" title="個人情報の取得等の遵守事項">
              <p className="mb-4">当店による個人情報の取得、利用、提供については、以下の事項を遵守します。</p>

              <SubSection title="(1) 個人情報の取得">
                <p>
                  当店は、当店が管理するインターネットによる情報提供サイト（以下「本サイト」といいます。）の運営に必要な範囲で、本サイトの一般利用者（以下「ユーザー」といいます。）から、ユーザーに係る個人情報を取得することがあります。
                </p>
              </SubSection>

              <SubSection title="(2) 個人情報の利用目的">
                <p className="mb-3">
                  当店は、当店が取得した個人情報について、法令に定める場合又は本人の同意を得た場合を除き、以下に定める利用目的の達成に必要な範囲を超えて利用することはありません。
                </p>
                <ul className="list-none space-y-1 pl-4">
                  <li className="before:content-['①'] before:mr-2 before:text-[var(--rose-gold)]">本サイトの運営、維持、管理</li>
                  <li className="before:content-['②'] before:mr-2 before:text-[var(--rose-gold)]">本サイトを通じたサービスの提供及び紹介</li>
                  <li className="before:content-['③'] before:mr-2 before:text-[var(--rose-gold)]">本サイトの品質向上のためのアンケート</li>
                </ul>
              </SubSection>

              <SubSection title="(3) 個人情報の提供等">
                <p>
                  当店は、法令で定める場合を除き、本人の同意に基づき取得した個人情報を、本人の事前の同意なく第三者に提供することはありません。なお、本人の求めによる個人情報の開示、訂正、追加若しくは削除又は利用目的の通知については、法令に従いこれを行うとともに、ご意見、ご相談に関して適切に対応します。
                </p>
              </SubSection>
            </Section>

            <Section num="3" title="個人情報の利用目的の変更">
              <p>
                当店は、前項で特定した利用目的は、予め本人の同意を得た場合を除くほかは、原則として変更しません。但し、変更前の利用目的と相当の関連性を有すると合理的に認められる範囲において、予め変更後の利用目的を公表の上で変更を行う場合はこの限りではありません。
              </p>
            </Section>

            <Section num="4" title="個人情報の第三者提供">
              <p>
                当店は、個人情報の取扱いの全部又は一部を第三者に委託する場合、その適格性を十分に審査し、その取扱いを委託された個人情報の安全管理が図られるよう、委託を受けた者に対する必要かつ適切な監督を行うこととします。
              </p>
            </Section>

            <Section num="5" title="個人情報の取扱いの改善・見直し">
              <p>
                当店は、個人情報の取扱い、管理体制及び取組みに関する点検を実施し、継続的に改善・見直しを行います。
              </p>
            </Section>

            <Section num="6" title="個人情報の廃棄">
              <p>
                当店は、個人情報の利用目的に照らしその必要性が失われたときは、個人情報を消去又は廃棄するものとし、当該消去及び廃棄は、外部流出等の危険を防止するために必要かつ適切な方法により、業務の遂行上必要な限りにおいて行います。
              </p>
            </Section>

            <div className="border-t border-[var(--border-subtle)] pt-8 mt-12 text-center text-[var(--text-dim)] text-[0.8rem]">
              <p>members cafe -MIYAKO-</p>
              <p>京都府京都市中京区大黒町（河原町通り）</p>
              <p>tel: 050-6876-2583</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-shippori)] text-[1rem] font-medium text-[var(--champagne)] mb-4 tracking-[0.05em]">
        <span className="text-[var(--rose-gold)] mr-2">{num}.</span>
        {title}
      </h2>
      <div className="pl-1">{children}</div>
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 pl-4 border-l border-[var(--border-subtle)]">
      <h3 className="text-[var(--champagne)] text-[0.85rem] mb-2">{title}</h3>
      {children}
    </div>
  );
}

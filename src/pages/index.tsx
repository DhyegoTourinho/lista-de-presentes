import Presents from "@/components/presents";

import { title, subtitle } from "@/components/primitives";
import { ThemeSwitch } from "@/components/theme-switch";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="text-end">
        <ThemeSwitch />
      </div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Lista de presentes para &nbsp;</span>
          <span className={title({ color: "violet" })}>Dhyego Tourinho&nbsp;</span>
          <br />
          <div className={subtitle({ class: "mt-4" })}>
            Acompanhe abaixo as melhores opções que ele selecionou
          </div>
        </div>

        <div className="flex gap-3">
        <Presents />
        </div>
      </section>
    </DefaultLayout>
  );
}

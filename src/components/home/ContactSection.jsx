import OrbitObject from "./OrbitObject";
import StarField from "./StarField";

const ContactSection = () => (
  <section
    id="contato"
    className="bg-fundo-contato relative overflow-hidden px-6 py-[72px] lg:pt-16 lg:pb-24"
  >
    <StarField />
    <div className="relative z-10">
      <OrbitObject />
      <h2 className="mt-2 text-center font-serif text-[40px] leading-[1.1] font-light tracking-[-0.03em] lg:mt-4 lg:text-[52px]">
        Vamos conversar?
      </h2>
      <p className="text-texto-suave mx-auto mt-3 max-w-[460px] text-center text-base leading-normal lg:mt-4 lg:text-lg">
        Estou procurando estágio em desenvolvimento web. Mande uma mensagem ou
        use os links no rodapé.
      </p>
    </div>
  </section>
);

export default ContactSection;

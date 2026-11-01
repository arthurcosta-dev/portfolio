import { SITE } from "../config/site";

const Home = () => (
  <main className="mx-auto flex min-h-svh max-w-[1360px] items-center px-6 lg:px-20">
    <h1 className="font-serif text-[clamp(5.75rem,13vw,11rem)] leading-[0.88] font-light tracking-[-0.045em]">
      {SITE.name}
    </h1>
  </main>
);

export default Home;

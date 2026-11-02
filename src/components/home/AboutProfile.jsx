import { SITE } from "../../config/site";
import Card from "../ui/Card";

const AboutProfile = () => (
  <Card
    variant="outline"
    className="col-span-2 rounded-[22px] p-6 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:flex lg:flex-col lg:justify-between lg:rounded-3xl lg:p-8"
  >
    <h3 className="text-base font-medium lg:text-[17px]">Formação e idiomas</h3>
    <dl className="mt-4 grid gap-3.5 lg:mt-5 lg:gap-4">
      {SITE.about.profile.map(({ label, value }) => (
        <div key={label}>
          <dt className="text-texto-suave text-[13px] lg:text-sm">{label}</dt>
          <dd className="text-texto-2 mt-0.5 text-[17px] leading-[1.4] lg:text-lg">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  </Card>
);

export default AboutProfile;

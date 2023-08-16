import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "src/components/elements/Layout";

const HOTLINE_DUMMY = [
  {
    id: 1,
    name: "HopeHelps",
    photo_url: "/assets/images/photo-hopehelps.svg",
    phone_number: "1800-221-4444",
  },
  {
    id: 2,
    name: "Police",
    photo_url: "/assets/images/photo-police.svg",
    phone_number: "110",
  },
];

const EMERGENCY_DUMMY = [
  {
    id: 1,
    name: "Mom",
    photo_url: "/assets/images/photo-mom.svg",
    phone_number: "08123456789",
  },
];

export const ContactListModule: React.FC = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="h-[92vh] p-6">
        <div>
          <div className="text-2xl font-bold text-white">Hotline</div>
          {HOTLINE_DUMMY.map((hotline: any, id: number) => {
            return (
              <div
                key={id}
                className="flex justify-between bg-[#252525]/80 my-4 pl-3 rounded-xl"
              >
                <div className="flex">
                  <Image
                    src={hotline.photo_url}
                    alt="logo"
                    width={60}
                    height={60}
                  />
                  <div className="flex text-sm items-center px-3">
                    <div>
                      <div className="text-white font-bold">{hotline.name}</div>
                      <div className="text-white/40">
                        {hotline.phone_number.slice(0, 6)}
                        {hotline.phone_number.length > 6 && "..."}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div>
                    <Image
                      src="/assets/icons/contact-call-1.png"
                      alt="logo"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div>
                    <Image
                      src="/assets/icons/contact-wa.png"
                      alt="logo"
                      width={60}
                      height={60}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <div className="text-2xl font-bold text-white">Emergency Contact</div>
          {EMERGENCY_DUMMY.map((emergency: any, id: number) => {
            return (
              <div
                key={id}
                className="flex justify-between bg-[#252525]/80 my-4 pl-3 rounded-xl"
              >
                <div className="flex">
                  <Image
                    src={emergency.photo_url}
                    alt="logo"
                    width={60}
                    height={60}
                  />
                  <div className="flex text-sm items-center px-3">
                    <div>
                      <div className="text-white font-bold">
                        {emergency.name}
                      </div>
                      <div className="text-white/40">
                        {emergency.phone_number.slice(0, 6)}
                        {emergency.phone_number.length > 6 && "..."}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div>
                    <Image
                      src="/assets/icons/contact-call-1.png"
                      alt="logo"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div>
                    <Image
                      src="/assets/icons/contact-wa.png"
                      alt="logo"
                      width={60}
                      height={60}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div
            className="bg-[#252525]/80 text-white/40 text-center py-7 px-8 rounded-xl"
            onClick={() => router.push("/contact/create")}
          >
            + Add Emergency Contact
          </div>
        </div>
      </div>
    </Layout>
  );
};

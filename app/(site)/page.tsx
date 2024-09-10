import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";

export default function Home() {
  const tabs = [
    {
      title: "Dashboard",
      value: "dashboard",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-primary">
          <p>Dashboard</p>
          <img
            src="/Home.jpg"
            alt=""
            width="1000"
            height="1000"
            className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
          />{" "}
        </div>
      ),
    },
    {
      title: "Brand",
      value: "brand",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-primary">
          <p>Brand</p>
          <img
            src="/Capture.jpg"
            alt="dummy image"
            width="1000"
            height="1000"
            className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
          />{" "}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="min-h-screen w-full relative flex items-center justify-center">
        <div className={cn("flex flex-col items-center gap-y-3", "lg:w-3/4")}>
          <p className={cn("text-5xl font-bold text-center", "lg:px-10")}>
            Aplikasi untuk Menentukan{" "}
            <em className="text-primary">Key Opinion Leader (KOL)</em>
          </p>
          <p className={cn("text-lg text-center text-slate-500", "lg:px-32")}>
            Aplikasi ini membantu dalam menentukan <em>Key Opinion Leader</em>{" "}
            yang sesuai dengan kebutuhan brand Anda. Asheera Management
            merupakan salah satu management yang Key Opinion Leader yang
            dipimpin oleh Owner Management Asheera.
          </p>
          <Link
            href={"/register"}
            className={buttonVariants({ variant: "default" })}
          >
            Tambahkan Brand
          </Link>
        </div>
      </div>
      <div
        id="about"
        className="min-h-screen w-full relative flex flex-col items-center justify-center "
      >
        <p className="text-2xl font-bold text-center mb-5">About</p>
        <p className=" text-lg text-center px-20  ">
          Aplikasi ini membantu dalam menentukan Key Opinion Leader yang sesuai
          dengan kebutuhan brand Anda. Asheera Management merupakan salah satu
          management yang Key Opinion Leader yang dipimpin oleh Owner Management
          Asheera.
        </p>
        <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-center justify-start my-5">
          <Tabs tabs={tabs} />
        </div>
      </div>

      <div
        id="contact"
        className="min-h-screen w-full relative flex items-center justify-center"
      >
        <div className={cn("mt-10 text-center", "lg:px-32")}>
          <h2 className="text-2xl font-bold">Contact</h2>
          <p className={cn("text-lg text-slate-500 mt-4")}>
            Untuk informasi lebih lanjut, hubungi kami melalui:
          </p>
          <p className="text-lg mt-2">Email: anjani2020020@gmail.com</p>
          <p className="text-lg">Telepon: +62 812-3456-7890</p>
        </div>
      </div>
    </div>
  );
}

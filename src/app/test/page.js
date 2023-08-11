
//import CheckForm from "@/components/CheckFormServer";
import CheckForm from "@/components/CheckFormClient";

const Page = async () => {

  return (
    <div className="container mx-auto max-w-md p-4">
      <h2 className="text-2xl font-bold mb-4">Новый счет</h2>
      <CheckForm />
    </div>
  );
};

export default Page;

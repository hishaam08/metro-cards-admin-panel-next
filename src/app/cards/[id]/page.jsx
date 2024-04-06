import EditCard from "@/components/EditCard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

// export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

async function getCard(id) {
  console.log("ID", id);
  const data = await fetch(`http://localhost:3000/api/cards/${id}`, {
    cache: "no-store",
  });
  const card = await data.json();
  return card;
}

export default async function Home({ params }) {
  const card = await getCard(params.id);
  console.log("ca", card);
  return (
    <>
      <DefaultLayout>
        <EditCard card={card} />
      </DefaultLayout>
    </>
  );
}

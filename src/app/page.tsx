import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Cards from "@/backend/cards";
import axios from "axios";

export const metadata: Metadata = {
  title: "Metro Cards Admin Panel",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

// async function getAllCards() {
//   const data = await fetch("http://localhost:3000/api/cards", {
//     cache: "no-cache",
//   });
//   const cards = await data.json();

//   return cards;
// }

export default async function Home() {
  // const cards = await getAllCards();
  return (
    <>
      <DefaultLayout>
        {/* <ECommerce cards={cards} /> */}
        <ECommerce />
      </DefaultLayout>
    </>
  );
}

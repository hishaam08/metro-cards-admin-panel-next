"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ECommerce = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const data = { query: searchQuery };
    axios
      .post("http://localhost:3000/api/cards", { query: searchQuery })
      .then((data) => setCards(data.data));
  }, [searchQuery]);

  const router = useRouter();
  function handleDelete(id) {
    axios
      .post("http://localhost:3000/api/deleteCard", { id: id })
      .then((res) => {
        if (res) router.refresh();
      });
  }

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Image",
      selector: (row) => row.image,
    },
    {
      name: "Actions",
      selector: (row) => row.actions,
    },
  ];

  const setRooms = () => {
    const data = [];

    cards?.forEach((card) => {
      data?.push({
        id: card._id,
        title: card.name,
        image: (
          <div className="py-3">
            <Image src={card.images[0]} alt="image" width={100} height={100} />
          </div>
        ),
        actions: (
          <div className="flex gap-3 rounded-md">
            <Link
              href={`/cards/${card._id}`}
              className="bg-green-500 p-3 hover:bg-green-400"
            >
              Edit
            </Link>

            <button
              onClick={() => handleDelete(card._id)}
              className="bg-red p-3 hover:bg-red/80"
            >
              Delete
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  console.log("Room", setRooms());

  return (
    <>
      <div className="w-full">
        {/* <span>Hello World</span> */}
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Type to search..."
          className="mb-10 w-full bg-white p-3 pl-9 pr-4 font-medium shadow-1 focus:outline-none sm:mt-10 lg:mt-0 xl:w-125"
        />
        <DataTable columns={columns} data={setRooms()} />
      </div>
    </>
  );
};

export default ECommerce;

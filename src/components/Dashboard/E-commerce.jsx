"use client";
import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ECommerce = ({ cards }) => {
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
        <DataTable columns={columns} data={setRooms()} />
      </div>
    </>
  );
};

export default ECommerce;

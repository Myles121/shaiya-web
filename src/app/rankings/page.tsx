"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardFooter,
  CardHeader,
  Image,
  CircularProgress,
  Pagination,
} from "@nextui-org/react";
import axios from "axios";
import useSWR from "swr";
import mapCodes from "./mapCodes";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Rankings() {
  const { data, error } = useSWR(`/api/rankings`, fetcher);

  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 50;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => {
        const randomIncrement = Math.floor(Math.random() * 11) + 5; // Random value between 5 and 15
        const newValue = v + randomIncrement;
        return newValue >= 100 ? 0 : newValue; // Reset if value >= 100
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (error) return <div>Error loading data</div>;
  if (!data)
    return (
      <div className="flex justify-center items-center h-screen w-full absolute top-0 left-0 bg-black/90 z-50">
        <div className="flex flex-col items-center">
          <CircularProgress
            aria-label="Loading..."
            size="lg"
            value={value}
            color="warning"
            showValueLabel={true}
            className="text-white"
          />
        </div>
      </div>
    );

  // Separate the first 3 items for the cards
  const [firstRow, secondRow, thirdRow, ...restOfData] = data;

  // Calculate pages based on the total number of items
  const pages = Math.ceil(restOfData.length / rowsPerPage);

  // Get the data for the current page
  const currentPageData = restOfData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-10 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 min-h-screen">
      <h1 className="text-center text-4xl font-bold text-white mb-8 drop-shadow-lg">
        Player Rankings
      </h1>
      {/* Body */}
      <div className="flex justify-center p-5 items-end">
        <div className="flex gap-5">
          {[
            secondRow, // Second row goes to the first card
            firstRow, // First row goes to the middle card
            thirdRow, // Third row goes to the third card
          ].map((item, index) => (
            <div
              key={index}
              className={`${
                index === 1
                  ? "-mt-7"
                  : "" /* Apply margin-top to the middle card */
              } hover:scale-105 transform transition-all duration-300`}
            >
              <Card
                isFooterBlurred
                radius="lg"
                className="border-none bg-slate-600"
                fullWidth
              >
                {/* Card Header styled like the footer and overlaid on the image */}
                <div className="relative">
                  <Image
                    alt="Player Avatar"
                    className="object-cover rounded-t-lg"
                    height={400}
                    src="https://nextui.org/images/hero-card.jpeg" // Replace with actual player image URL if available
                  />
                  <CardHeader className="absolute top-0 py-5 px-5 z-10 flex justify-between items-center w-full">
                    {/* Online Status Circle */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.LoginStatus === 1 ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      {/* Name and Level */}
                      <div className="flex gap-2 items-center">
                        <h4 className="text-xl font-bold text-white">
                          {item.Name}
                        </h4>
                        <p className="text-tiny text-gray-200">{`Level ${item.Level}`}</p>
                      </div>
                    </div>
                    {/* Top Ranking Label */}
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-md px-3 py-1 rounded-lg">
                      {index === 0 ? "Top 2" : index === 1 ? "Top 1" : "Top 3"}
                    </div>
                  </CardHeader>
                </div>

                {/* Card Footer with similar style */}
                <CardFooter className="flex overflow-hidden py-2 absolute before:rounded-xl bottom-0 bg-slate-500/60 z-10">
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                      {/* Map name */}
                      <p className="text-tiny text-white/80">
                        {mapCodes[item.Map] || "Unknown Map"}
                      </p>
                      <p className="text-tiny text-white/80">
                        {item.GuildName || ""}
                      </p>
                      <p className="text-tiny text-white/80">
                        {`${item.Kills.toLocaleString()} Kills`}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of the Rankings in a Table */}
      <Table
        aria-label="Player Rankings Table"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        className="mt-5 bg-black/70 p-3 rounded-md text-white"
        removeWrapper
      >
        <TableHeader>
          <TableColumn align="center" width={1}>
            #
          </TableColumn>
          <TableColumn align="start">Name</TableColumn>
          <TableColumn width={80} maxWidth={150} align="center">
            Kills
          </TableColumn>
          <TableColumn width={1} align="center">
            Level
          </TableColumn>
          <TableColumn>Guild</TableColumn>
        </TableHeader>
        <TableBody>
          {currentPageData.map(
            (
              item: {
                ID: React.Key | null | undefined;
                Name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                Kills: {
                  toLocaleString: () =>
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<React.AwaitedReactNode>
                    | null
                    | undefined;
                };
                Level:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                GuildName:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
              },
              index: number
            ) => (
              <TableRow key={item.ID}>
                <TableCell>{(page - 1) * rowsPerPage + index + 4}</TableCell>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Kills.toLocaleString()}</TableCell>
                <TableCell>{item.Level}</TableCell>
                <TableCell>{item.GuildName}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}

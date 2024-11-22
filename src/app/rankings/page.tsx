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
import { getImageBasedOnKills } from "./getIconKills";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type PlayerData = {
  ID: string;
  Name: string;
  Kills: number;
  Level: number;
  GuildName: string | null;
  Map: string;
  LoginStatus: number;
  Admin: boolean;
  AdminLevel: number | null;
};

type RankingCardProps = {
  data: PlayerData[];
};

type RankingsTableProps = {
  currentPageData: PlayerData[];
  page: number;
  rowsPerPage: number;
  pages: number;
  setPage: (page: number) => void;
};

const LoadingScreen = ({ value }: { value: number }) => (
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

const RankingCards = ({ data }: RankingCardProps) => {
  const [firstRow, secondRow, thirdRow] = data;

  return (
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
              className="border-none bg-slate-600 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              fullWidth
            >
              {/* Card Header styled like the footer and overlaid on the image */}
              <div className="relative">
                <Image
                  alt="Player Avatar"
                  className="object-cover rounded-t-lg transition-transform duration-500 ease-in-out hover:scale-105"
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
                      <h4 className="text-2xl font-semibold text-white drop-shadow-md">
                        {item.Name}
                      </h4>
                      <p className="text-sm text-gray-200">{`Level ${item.Level}`}</p>
                    </div>
                  </div>
                  {/* Top Ranking Label */}
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-md px-4 py-2 rounded-lg shadow-lg">
                    {index === 0 ? "Top 2" : index === 1 ? "Top 1" : "Top 3"}
                  </div>
                </CardHeader>
              </div>

              {/* Card Footer with similar style */}
              <CardFooter className="flex flex-col p-4 absolute bottom-0 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-500/60 backdrop-blur-md rounded-b-xl z-10 shadow-md transform transition-all duration-300 ease-in-out hover:scale-105">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-3">
                    {/* Kill Badge and Kill Count */}
                    <img
                      src={getImageBasedOnKills(item.Kills)}
                      alt="Kill Badge"
                      className="h-8 w-8 object-contain transform transition-all duration-300 ease-in-out hover:scale-110"
                    />
                    <p className="text-lg font-semibold text-white/90">
                      {`${item.Kills.toLocaleString()} Kills`}
                    </p>
                  </div>
                  <div className="flex">
                    {/* Map and Guild Name */}
                    <p className="text-xs text-white/70">
                      {item.GuildName ? `${item.GuildName} - ` : ""}
                      {mapCodes[Number(item.Map)] || "Unknown Map"}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const RankingsTable = ({
  currentPageData,
  page,
  rowsPerPage,
  pages,
  setPage,
}: RankingsTableProps) => (
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
          item: PlayerData, // Correctly type the item here
          index: number
        ) => (
          <TableRow key={item.ID}>
            <TableCell>{(page - 1) * rowsPerPage + index + 4}</TableCell>
            <TableCell>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={getImageBasedOnKills(item.Kills)}
                  alt="Kill Badge"
                  style={{ width: 30, height: 30, marginRight: 8 }}
                />
                {item.Name}
              </div>
            </TableCell>
            <TableCell>{item.Kills.toLocaleString()}</TableCell>
            <TableCell>{item.Level}</TableCell>
            <TableCell>{item.GuildName}</TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  </Table>
);

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
  if (!data) return <LoadingScreen value={value} />;

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
    <div className="p-10 min-h-screen">
      <h1 className="text-center text-4xl font-bold text-white mb-8 drop-shadow-lg">
        Player Rankings
      </h1>
      <RankingCards data={[firstRow, secondRow, thirdRow]} />
      <RankingsTable
        currentPageData={currentPageData}
        page={page}
        rowsPerPage={rowsPerPage}
        pages={pages}
        setPage={setPage}
      />
    </div>
  );
}

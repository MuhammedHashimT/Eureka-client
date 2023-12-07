// "use client";
import InfoBar from "@/components/admin/InfoBar";
import RightSideBar from "@/components/admin/RightSideBar";
import DashBoard from "@/components/admin/DashBoard";
import { getUrqlClient } from "@/lib/urql";
import {
  CategorBasedToppersQuery,
  CategorBasedToppersQueryVariables,
  CategorBasedToppersDocument,
  GetEnteredProgrammesQuery,
  GetEnteredProgrammesQueryVariables,
  GetEnteredProgrammesDocument,
  GetAllTeamsQuery,
  GetAllTeamsQueryVariables,
  GetAllTeamsDocument,
} from "@/gql/graphql";
import { API_KEY } from "@/lib/env";

export default async function Admin() {
  const { client } = getUrqlClient();
  const data = [
    {
      title: "Total Users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-base-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      title: "Total Users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-base-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      title: "Total Users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-base-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },

  ];



  const toppers = await client.query<
    CategorBasedToppersQuery,
    CategorBasedToppersQueryVariables
  >(CategorBasedToppersDocument, {});

  const enteredProgrammes = await client.query<
    GetEnteredProgrammesQuery,
    GetEnteredProgrammesQueryVariables
  >(GetEnteredProgrammesDocument, { api_key: API_KEY });

  const teams = await client.query<
  GetAllTeamsQuery,
  GetAllTeamsQueryVariables
>(GetAllTeamsDocument, {api_key : API_KEY});
  return (
    <main className=" w-full h-full flex ">
      <DashBoard data={data} key={1} pageProps={0} toppers={toppers.data?.getCategoryBasedToppers?.map((category) => {
        const ArtsToppers = category?.candidates?.map((candidate, index) => {
          if (index <= 4) {
            return candidate
          }
        })
        return {
          ...category,
          candidates: ArtsToppers
        }
      })}

        enteredProgrammes={enteredProgrammes.data?.resultEnteredProgrammes}
        teams = {teams.data?.teams}
      />
    </main>
  );
}



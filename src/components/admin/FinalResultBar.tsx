// import React from "react";

// interface Props {
//     data: {
//         name: string
//         totalPoint: number;
//         currentPoint: number;
//         totalSports: number;
//         currentSports: number
//     }[]
// }

// const FinalResultBar = (props: Props) => {
//     return (
//         <div className="w-1/2 lg:flex flex-wrap  gap-10 justify-between hidden mt-2">
//             {props.data.map((item, index) => (
//                 <div key={index} className="bg-accent text-secondary  rounded-2xl w-[45%] flex flex-col items-center py-2 ">
//                     <h1 className="font-bold text-lg">{item.name}</h1>
//                     <div className="flex gap-2 w-full px-5">
//                         <div className="w-1/2 h-full flex flex-col items-center">
//                             <h1 className="text-3xl font-bold">{item.totalPoint}</h1>
//                             <h1 className="text-xs">Arts Total</h1>
//                         </div>
//                         <div className="w-1/2 h-full flex flex-col items-center">
//                             <h1 className="text-3xl font-bold">{item.totalSports}</h1>
//                             <h1 className="text-xs">Sports Total</h1>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default FinalResultBar;



"use client";
import { Category, Model, Programme, Team } from "@/gql/graphql";
import { useEffect, useState } from "react";

interface SidebarProps {
  teams: Team[];
  categories: Category[];
  programs: Programme[];
}

interface CategoryForTotal {
  name: string;
  teams: {
    name: string;
    grandArtsResult: number;
    grandSportsResult: number;
  }[];
}

export default function FinalResultBar(props: SidebarProps) {
  const [sortedTeams, setSortedTeams] = useState<Team[]>(props.teams);
  const [categoryForTotal, SetCategoryForTotal] = useState<CategoryForTotal[]>(
    []
  );
  const [selectedCategoryForTotal, setSelectedCategoryForTotal] =
    useState<CategoryForTotal>();

  function calculateTotalPointsForTeams(categories: any) {
    const teamPointsArray: any = [];

    categories.forEach((category: any) => {
      category.teams.forEach((team: any) => {
        const existingTeam = teamPointsArray.find(
          (t: any) => t.name === team.name
        );

        if (existingTeam) {
          existingTeam.grandArtsResult += team.grandArtsResult;
          existingTeam.grandSportsResult += team.grandSportsResult;
        } else {
          teamPointsArray.push({
            name: team.name,
            grandArtsResult: team.grandArtsResult,
            grandSportsResult: team.grandSportsResult,
          });
        }
      });
    });

    return teamPointsArray;
  }

  useEffect(() => {
    console.log(props.teams);

    // sort
    const sorted = props.teams.sort((a, b) => {
      return (b?.totalPoint as number) - (a?.totalPoint as number);
    });
    setSortedTeams(sorted);

    const groupedByCategory: { [key: string]: Programme[] } = {};
    props.programs.forEach((program) => {
      const category = program?.category?.name;
      if (!groupedByCategory[category as string]) {
        groupedByCategory[category as string] = [];
      }
      groupedByCategory[category as string].push(program as Programme);
    });

    // Step 2: Transform the grouped data into CategoryForTotal format
    const categoryForTl: CategoryForTotal[] = props.categories.map(
      (category) => {
        const categoryName = category.name;
        const programsInCategory =
          groupedByCategory[categoryName as string] || [];
        // Step 3: Calculate total points for each team in the category
        const teams: {
          name: string;
          grandArtsResult: number;
          grandSportsResult: number;
        }[] = props.teams.map((team) => {
          return {
            name: team.name as string,
            grandArtsResult: 0 as number,
            grandSportsResult: 0 as number,
          };
        });

        programsInCategory.forEach((program) => {
          program.candidateProgramme?.forEach((cp) => {
            const teamName = cp.candidate?.team?.name;
            const teamIndex = teams.findIndex((t) => t.name === teamName);

            if (teamIndex !== -1) {
              if (program.model === Model.Arts) {
                teams[teamIndex].grandArtsResult += (
                  cp?.point ? cp?.point : 0
                ) as number;
              } else {
                teams[teamIndex].grandSportsResult += (
                  cp?.point ? cp?.point : 0
                ) as number;
              }
            }
          });
        });

        return {
          name: categoryName as string,
          teams: teams as {
            name: string;
            lastArtsResult: number;
            grandArtsResult: number;
            lastSportsResult: number;
            grandSportsResult: number;
          }[],
        };
      }
    );

    console.log(categoryForTl);

    SetCategoryForTotal(categoryForTl);

    // selected

    console.log(calculateTotalPointsForTeams(categoryForTl as any));

    setSelectedCategoryForTotal({
      name: "all",
      teams: calculateTotalPointsForTeams(categoryForTl as any),
    });
  }, []);
  return (
    <div className="h-full w-1/2  bg-primary flex flex-col justify-center gap-3 pl-8">
      {/* title */}
      <h1 className="text-white text-3xl font-semibold leading-none">
         <br />
         #Results
      </h1>
      {/* heading */}
      <div className="flex justify-start gap-2  items-center">
        <h2 className="text-white font-semibold">Overall Results</h2>
        {/* sort buttons */}
        <div className="flex items-center gap-4 px-5 h-16">
          {/* All */}
          <select
            onChange={(e) => {
              // filter the programs by category
              if (e.target.value === "all") {
                // setSortedPrograms(props.programs)
                // setSelectedCategoryForTotal({
                //   name:'all',
                //   teams: ''
                // })

                const all = calculateTotalPointsForTeams(categoryForTotal);
                all.sort((a: any, b: any) => {
                  console.log(a.grandArtsResult);
                  return b.grandArtsResult - a.grandArtsResult;
                });

                setSelectedCategoryForTotal({
                  name: "all",
                  teams: all,
                });
              } else {
                const filtered: CategoryForTotal = categoryForTotal?.find(
                  (cat) => {
                    return cat.name === e.target.value;
                  }
                ) as CategoryForTotal;

                const sorted = filtered.teams.sort((a, b) => {
                  console.log(a.grandArtsResult);

                  return b.grandArtsResult - a.grandArtsResult;
                });

                console.log(sorted);

                setSelectedCategoryForTotal({
                  name: filtered.name,
                  teams: sorted,
                });
              }
            }}
            name=""
            id=""
            className="py-2 px-2  block  border-gray-200 rounded-full text-sm cursor-pointer"
          >
            <option value={"all"} key={1000}>
              All Category
            </option>
            {props.categories?.map((category, index) => {
              return (
                <option key={"index"} value={category.name as string}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* result */}
      <div className="w-full flex flex-wrap gap-8 pb-10">
        {/* #01 */}
        {selectedCategoryForTotal?.teams?.map((team, index) => {
          console.log(team);

          let OGTeam = props.teams.find((tm, i) => {
            return tm.name == team.name;
          });


          return (
            <div className="flex justfy-between h-1/6 w-[45%">
              <div className="h-full w-1/2 px-2 font-bold leading-tight pt-3 text-white">
                <h1 className="text-sm 2xl:text-base">#0{index + 1}</h1>
                <h1 className="text-3xl 2xl:text-5xl">
                  {team.grandArtsResult}
                </h1>
                <div
                  style={{ background: `${OGTeam?.color}` }}
                  className="w-28 h-5 rounded-xl flex items-center justify-center"
                >
                  <h1 className="font-medium text-white text-xs px-2">
                    Team {team.name}
                  </h1>
                </div>
              </div>
              <div className="h-full w-1/2 flex flex-col items-start justify-start pt-5 px-3">
                <div className="flex items-center gap-2">
                  <span className="h-[5px] w-[5px] bg-green-400 rounded-full" />
                  <p className="text-xs text-white">
                    Arts : {team.grandArtsResult}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-[5px] w-[5px] bg-blue-400 rounded-full" />
                  <p className="text-xs text-white">
                    Sports : {team.grandSportsResult}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

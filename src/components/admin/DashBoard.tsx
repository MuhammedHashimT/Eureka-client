"use client";
import InfoBar from '@/components/admin/InfoBar'
import RightSideBar from '@/components/admin/RightSideBar'
import { Category, Model, Programme, Skill, Team } from '@/gql/graphql';
import { withUrqlClient } from 'next-urql';
import { useEffect, useState } from 'react'
import { cacheExchange, fetchExchange } from 'urql';
import SecondRowFirstCard from '../result/desktop/SrFc';
import FinalResultBar from './FinalResultBar';

interface BarData {
  name: string;
  totalPoint: number;
  currentPoint: number;
  totalSports: number;
  currentSports: number;
}

interface CategoryForTotal {
  name: string;
  teams: {
    name: string;
    lastArtsResult: number;
    grandArtsResult: number;
    lastSportsResult: number;
    grandSportsResult: number;
  }[];
}

interface ToDownLoadData {
  sl: number | string;
  programCode: string;
  programmeName: string;
  category: string;
  position: number;
  grade: string;
  candidateChestNo: string;
  candidateName: string;
  class: string;
  candidateTeam: string;
  gradePoint: number;
  positionPoint: number;
  totalPoint: number;
  checkCode: string;
}

interface Props {
    data: {
        title: string;
        icon: JSX.Element;
    }[];
    toppers : Category[];
    enteredProgrammes : Programme[];
    teams : Team[];
}

const DashBoard = (props : Props) => {

    const [IsRightSideBarOpen, setIsRightSideBarOpen] = useState(false)
    const [barData, setBarData] = useState<BarData[]>([]);
    
  const [categoryForTotal, SetCategoryForTotal] = useState<CategoryForTotal[]>([]);

    useEffect(() => {
    
  
  
      const groupedByCategory: { [key: string]: Programme[] } = {};
      props.enteredProgrammes.forEach((program) => {
        const category = program?.category?.name;
        if (!groupedByCategory[category as string]) {
          groupedByCategory[category as string] = [];
        }
        groupedByCategory[category as string].push(program as Programme);
      });
  
      // Step 2: Transform the grouped data into CategoryForTotal format
      const categoryForTl: CategoryForTotal[] = props.toppers.map((category) => {
        const categoryName = category.name;
        const programsInCategory = groupedByCategory[categoryName as string] || [];
        // Step 3: Calculate total points for each team in the category
        const teams: { name: string; lastArtsResult: number; grandArtsResult: number; lastSportsResult: number; grandSportsResult: number }[] = props.teams.map(
          (team) => {
            return {
              name: team.name as string,
              lastArtsResult: 0 as number,
              grandArtsResult: 0 as number,
              lastSportsResult: 0 as number,
              grandSportsResult: 0 as number,
            }
          }
        );
  
  
        programsInCategory.forEach((program) => {
          program.candidateProgramme?.forEach((cp) => {
            const teamName = cp.candidate?.team?.name;
            const teamIndex = teams.findIndex((t) => t.name === teamName);
  
            if (teamIndex !== -1) {
              if (program.model === Model.Arts) {
                teams[teamIndex].grandArtsResult += (cp?.point ? cp?.point : 0) as number;
              } else {
                teams[teamIndex].grandSportsResult += (cp?.point ? cp?.point : 0) as number;
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
          }[]
        };
      });
  
      console.log(categoryForTl);
  
      SetCategoryForTotal(categoryForTl);
  
  
  
      let teamData: BarData[] = props.teams.map((data, i) => {
        return {
          name: data.name as string,
          totalPoint: (data.totalPoint as number) || (0 as number),
          totalSports: (data.totalSportsPoint as number) || (0 as number),
          currentPoint: 0 as number,
          currentSports: 0 as number,
        };
      });
  
      const brcl : {
        name: string;
        lastArtsResult: number;
        grandArtsResult: number;
        lastSportsResult: number;
        grandSportsResult: number;
      }[] = calculateTotalPointsForTeams(categoryForTl as any)
  
      setBarData(brcl.map((brs, i) => {
        return {
          name : brs.name,
          currentPoint : brs.lastArtsResult || 0,
          currentSports : brs.lastSportsResult || 0,
          totalPoint : brs.grandArtsResult || 0,
          totalSports : brs.grandSportsResult || 0
        }
  
      }));
  
     
    }, []);


    function calculateTotalPointsForTeams(categories : any){
      const teamPointsArray : any = [];
    
      categories.forEach((category: any)=> {
        category.teams.forEach((team : any) => {
          const existingTeam = teamPointsArray.find((t : any) => t.name === team.name);
    
          if (existingTeam) {
            existingTeam.grandArtsResult += team.grandArtsResult;
            existingTeam.grandSportsResult += team.grandSportsResult;
          } else {
            teamPointsArray.push({
              name: team.name,
              grandArtsResult: team.grandArtsResult,
              grandSportsResult: team.grandSportsResult
            });
          }
        });
      });
    
      return teamPointsArray;
    };

  return (
    <> <div className="w-full h-full overflow-auto">
        {/* <InfoBar data={props.data} /> */}



        <div className=" rounded-lg " >

         <div className="text-4xl font-semibold leading-none my-10"> #Entered Result Status</div>

        {
          props.toppers && (
            <SecondRowFirstCard categories={props.toppers as Category[]}
                // first 5 toppers
                toppers={props.toppers as Category[]}
              />
          )
        }

<div className="text-4xl font-semibold leading-none my-10"> </div>
        {
          props.enteredProgrammes && (
           <FinalResultBar categories={props.toppers} programs={props.enteredProgrammes} teams={props.teams}/>
          )

        }
        </div>
      </div>
    </>
  )
}


export default withUrqlClient(() => ({
  url: "https://bug-free-space-guide-v7ggj6r57vr26x5v-8080.app.github.dev/graphql",
  exchanges: [fetchExchange, cacheExchange],
  fetchOptions: {
    cache: "no-cache",
  },
}))(DashBoard);
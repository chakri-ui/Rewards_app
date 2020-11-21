import "./App.css";
import { getRewardsData } from "./rewardsData";
import { useEffect, useState } from "react";
import { GridComponent } from "./GridComponent";
function App() {
  const [rewardsData, setRewardsData] = useState([]);
  const [totalRewardsArr, seTotalRewardsArr] = useState([]);
  const getRewardPoints = (amount) => {
    if (amount > 100) {
      return 50 + (amount - 100) * 2;
    }
    if (amount > 50) {
      return amount - 50;
    }
    return 0;
  };

  const getTotalRewardsPoint = (finalArr) => {
    var totalRewardsLoc = [];
    var rewardObj = {};
    finalArr.forEach((x) => {
      if (rewardObj.hasOwnProperty(x.custName)) {
        rewardObj[x.custName] = rewardObj[x.custName] + x.rewardPoints;
      } else {
        rewardObj[x.custName] = x.rewardPoints;
      }
    });
    for (var obj in rewardObj) {
      totalRewardsLoc.push({ custName: obj, totalRewards: rewardObj[obj] });
    }
    seTotalRewardsArr(totalRewardsLoc);
    return totalRewardsLoc;
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const finalArr = [];
  useEffect(() => {
    //A dummy check to return dataset
    let callPromise = finalArr.length === 0 ? true : false;
    getRewardsData(callPromise)
      .then((data) => {
        data.forEach((user) => {
          (user.expenses || []).forEach((expense) => {
            const month = new Date(expense.date).getMonth();
            const rewardPoints = getRewardPoints(expense.amount);
            var monthNm = monthNames[month];
            finalArr.push({
              custName: user.custName,
              monthNm: monthNm,
              rewardPoints: rewardPoints,
              date: expense.date,
              customerId: user.customerId,
              amount: expense.amount
            });
          });
        });
        //getting the manipulated dataset with monthwise and yearwise calculation
        getTotalRewardsPoint(finalArr);
        setRewardsData(finalArr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <GridComponent
        rewardsData={rewardsData}
        totalRewardsArr={totalRewardsArr}
      />
    </>
  );
}

export default App;

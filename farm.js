// functions to pass intial tests
// added in second argument so environmental factors are calculated
const getYieldForPlant = (plant, EFactors) => {
  if (EFactors == null) {
    return plant.yield;
  } else {
    // use Object.entries to check for key and value pairs of plant.factor and see if these are present in Efactors (with .filter) and transform to object with Object.fromEntries
    const actualFactors = Object.entries(plant.factor).map(([key, value]) => {
      if (key in EFactors) {
        if (EFactors[key] in value) {
          return value[EFactors[key]];
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });

    // map actual factors to itterate over affectedYield array percentages to calculate yield sum
    const yieldSum = actualFactors.reduce(
      (previousValue, currentValue) =>
        previousValue * ((100 + currentValue) / 100),
      plant.yield //initialValue
    );
    return yieldSum;
  }
};

const getYieldForCrop = (input, Efactors) => {
  if (Efactors == null) {
    const cropYield = input.crop.yield;
    const cropNum = input.numCrops;
    return cropYield * cropNum;
  } else {
    //edit yield calc to take in Efactors
    const actualFactors = Object.entries(input.crop.factor).map(
      ([key, value]) => {
        if (key in Efactors) {
          if (Efactors[key] in value) {
            return value[Efactors[key]];
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      }
    );

    const yieldSum = actualFactors.reduce(
      (previousValue, currentValue) =>
        previousValue * ((100 + currentValue) / 100),
      input.crop.yield //initialValue
    );
    const cropNum = input.numCrops;
    return yieldSum * cropNum;
  }
};

// function needs to process multiple crop calculations and output a single number
const getTotalYield = (cropsArray, Efactors) => {
  if (Efactors == null) {
    // map new array for all YieldPerCrop
    const yieldPerCrop = cropsArray.crops.map((crop) => {
      const cropYield = crop.crop.yield;
      const cropNum = crop.numCrops;
      const cropSum = cropYield * cropNum;
      return cropSum;
    });
    // get sum Yield array
    const totalYield = yieldPerCrop.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0);
    return totalYield;
  } else {
    // edit yieldPerCrop where actualFactors affects cropYield first within the mapping
    const yieldPerCrop = cropsArray.crops.map((crop) => {
      const actualFactors = Object.entries(crop.crop.factor).map(
        ([key, value]) => {
          if (key in Efactors) {
            if (Efactors[key] in value) {
              return value[Efactors[key]];
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        }
      );

      const cropYield = actualFactors.reduce(
        (previousValue, currentValue) =>
          previousValue * ((100 + currentValue) / 100),
        crop.crop.yield //initialValue
      );
      const cropNum = crop.numCrops;
      const cropSum = cropYield * cropNum;
      return cropSum;
    });
    const totalYield = yieldPerCrop.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0);
    return totalYield;
  }
};

// calculate cost for crop
const getCostsForCrop = (cropsArray) => {
  // map new array for cost and reduce for total cost
  const costCrops = cropsArray.crops.map((crop) => {
    const singleCropCost = crop.crop.cost;
    const cropNum = crop.numCrops;
    const cropSumCost = singleCropCost * cropNum;
    return cropSumCost;
  });

  const totalCost = costCrops.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);
  return totalCost;
};

// calculate revenue (no enviromental factors) yield * sale price
const getRevenueForCrop = (cropsArray, EFactors) => {
  if (EFactors == null) {
    // remap yield and add sale price to calculate sum
    const revenuePerCrop = cropsArray.crops.map((crop) => {
      const cropYield = crop.crop.yield;
      const cropNum = crop.numCrops;
      const cropYieldSum = cropYield * cropNum;
      const salePrice = crop.salePrice;
      const totalRev = salePrice * cropYieldSum;
      return totalRev;
    });
    const totalEarning = revenuePerCrop.reduce(
      (previousValue, currentValue) => {
        return previousValue + currentValue;
      },
      0
    );
    return totalEarning;
  } else {
    // edit map to have Efactors affect cropYield
    const revenuePerCrop = cropsArray.crops.map((crop) => {
      const actualFactors = Object.entries(crop.crop.factor).map(
        ([key, value]) => {
          if (key in EFactors) {
            if (EFactors[key] in value) {
              return value[EFactors[key]];
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        }
      );
      const cropYield = actualFactors.reduce(
        (previousValue, currentValue) =>
          previousValue * ((100 + currentValue) / 100),
        crop.crop.yield //initialValue
      );
      const cropNum = crop.numCrops;
      const cropYieldSum = cropYield * cropNum;
      const salePrice = crop.salePrice;
      const totalRev = salePrice * cropYieldSum;
      return totalRev;
    });
    const totalEarning = revenuePerCrop.reduce(
      (previousValue, currentValue) => {
        return previousValue + currentValue;
      },
      0
    );
    return totalEarning;
  }
};

// calculate Profit: getRevenueForCrop - getCostsForCrop (single crop as argument)
const getProfitForCrop = (crop, Efactors) => {
  if (Efactors == null) {
    // cost per crop
    const singleCropCost = crop.crop.cost;
    const cropNum = crop.numCrops;
    const cropSumCost = singleCropCost * cropNum;
    // revenue per crop
    const cropYield = crop.crop.yield;
    const cropYieldSum = cropYield * cropNum;
    const salePrice = crop.salePrice;
    const totalRev = salePrice * cropYieldSum;
    // profit per crop
    const profit = totalRev - cropSumCost;
    return profit;
  } else {
    const singleCropCost = crop.crop.cost;
    const cropNum = crop.numCrops;
    const cropSumCost = singleCropCost * cropNum;
    // cost and profit calc are same, edit revenue calc with Efactors added to calc yield
    const actualFactors = Object.entries(crop.crop.factor).map(
      ([key, value]) => {
        if (key in Efactors) {
          if (Efactors[key] in value) {
            return value[Efactors[key]];
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      }
    );

    const cropYield = actualFactors.reduce(
      (previousValue, currentValue) =>
        previousValue * ((100 + currentValue) / 100),
      crop.crop.yield //initialValue
    );
    const cropYieldSum = cropYield * cropNum;
    const salePrice = crop.salePrice;
    const totalRev = salePrice * cropYieldSum;
    const profit = totalRev - cropSumCost;
    return profit;
  }
};

//  caculate profit mulitple crops (array of crops as argument)
const getTotalProfit = (cropsArray, Efactors) => {
  if (Efactors == null) {
    const profitPerCrop = cropsArray.crops.map((crop) => {
      // cost per crop
      const singleCropCost = crop.crop.cost;
      const cropNum = crop.numCrops;
      const cropSumCost = singleCropCost * cropNum;
      // revenue per crop
      const cropYield = crop.crop.yield;
      const cropYieldSum = cropYield * cropNum;
      const salePrice = crop.salePrice;
      const totalRev = salePrice * cropYieldSum;
      // profit per crop
      const profit = totalRev - cropSumCost;
      return profit;
    });

    const totalProfit = profitPerCrop.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0);
    return totalProfit;
  } else {
    // edit map profitPerCrop so yield is affected by Efactor
    const profitPerCrop = cropsArray.crops.map((crop) => {
      const singleCropCost = crop.crop.cost;
      const cropNum = crop.numCrops;
      const cropSumCost = singleCropCost * cropNum;

      const actualFactors = Object.entries(crop.crop.factor).map(
        ([key, value]) => {
          if (key in Efactors) {
            if (Efactors[key] in value) {
              return value[Efactors[key]];
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        }
      );

      const cropYield = actualFactors.reduce(
        (previousValue, currentValue) =>
          previousValue * ((100 + currentValue) / 100),
        crop.crop.yield //initialValue
      );
      const cropYieldSum = cropYield * cropNum;
      const salePrice = crop.salePrice;
      const totalRev = salePrice * cropYieldSum;
      // profit per crop
      const profit = totalRev - cropSumCost;
      return profit;
    });

    const totalProfit = profitPerCrop.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0);
    return totalProfit;
  }
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};

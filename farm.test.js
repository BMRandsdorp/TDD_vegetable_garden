const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environmental factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("getCostsForCrop", () => {
  test("Get cost for crop, single type of crop", () => {
    const maize = {
      name: "maize",
      cost: 1,
    };
    const crops = [{ crop: maize, numCrops: 1 }];
    expect(getCostsForCrop({ crops })).toBe(1);
  });

  test("Get cost for crop, multiple corps", () => {
    const pumpkin = {
      name: "pumpkin",
      cost: 1,
    };
    const corn = {
      name: "corn",
      cost: 3,
    };
    const crops = [
      { crop: pumpkin, numCrops: 10 },
      { crop: corn, numCrops: 5 },
    ];
    expect(getCostsForCrop({ crops })).toBe(25);
  });

  test("Get cost for crop, multiple corps", () => {
    const maize = {
      name: "maize",
      cost: 1,
    };
    const corn = {
      name: "corn",
      cost: 3,
    };
    const crops = [
      { crop: maize, numCrops: 0 },
      { crop: corn, numCrops: 5 },
    ];
    expect(getCostsForCrop({ crops })).toBe(15);
  });
});

describe("getRevenueForCrop", () => {
  test("Get revenue for a crop, no enviromental factors, single crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };

    const crops = [{ crop: corn, numCrops: 1, salePrice: 4 }];
    expect(getRevenueForCrop({ crops })).toBe(12);
  });

  test("Get revenue for a crop, no enviromental factors, multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 2,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 1, salePrice: 4 },
      { crop: pumpkin, numCrops: 2, salePrice: 2 },
    ];
    expect(getRevenueForCrop({ crops })).toBe(24);
  });
});

describe("getProfitForCrop", () => {
  test("Get profits for a crop, no enviromental factors, single crop", () => {
    const corn = {
      name: "corn",
      cost: 3,
      yield: 2,
    };
    const cropSingle = { crop: corn, numCrops: 1, salePrice: 4 };
    expect(getProfitForCrop(cropSingle)).toBe(5);
  });

  test("Get profits for a crop with 0 numCrops, no enviromental factors, single crop", () => {
    const pumpkin = {
      name: "pumpkin",
      cost: 2,
      yield: 4,
    };
    const cropSingle = { crop: pumpkin, numCrops: 0, salePrice: 2 };
    expect(getProfitForCrop(cropSingle)).toBe(0);
  });
});

describe("getTotalProfit", () => {
  test("Get profits for a crop, no enviromental factors, 2 crops", () => {
    const corn = {
      name: "corn",
      cost: 3,
      yield: 2,
    };

    const pumpkin = {
      name: "pumpkin",
      cost: 2,
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 1, salePrice: 4 },
      { crop: pumpkin, numCrops: 2, salePrice: 2 },
    ];
    expect(getTotalProfit({ crops })).toBe(17);
  });

  test("Get profits for a crop, no enviromental factors, multiple crops", () => {
    const corn = {
      name: "corn",
      cost: 3,
      yield: 2,
    };

    const pumpkin = {
      name: "pumpkin",
      cost: 2,
      yield: 4,
    };

    const tomato = {
      name: "tomato",
      cost: 0.5,
      yield: 1.5,
    };
    const crops = [
      { crop: corn, numCrops: 3, salePrice: 4 },
      { crop: pumpkin, numCrops: 1, salePrice: 2 },
      { crop: tomato, numCrops: 5, salePrice: 1 },
    ];
    expect(getTotalProfit({ crops })).toBe(26);
  });
});

describe("getYieldForPlant v2", () => {
  test("Get yield for plant with 1 low environmental factor", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
    };

    expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
  });

  test("Get yield for plant with 2 low environmental factors", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      wind: "low",
      soil: "medium",
    };

    expect(getYieldForPlant(corn, environmentFactors)).toBe(22.5);
  });

  test("Get yield for plant with 3 environmental factors", () => {
    const pumpkin = {
      name: "pumpkin",
      yield: 40,
      factor: {
        sun: {
          low: -40,
          medium: 25,
          high: 0,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      wind: "high",
      soil: "damp",
    };

    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(22.5);
  });
  test("Get yield for plant with 3 environmental factors, but 1 has no effect", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
      wind: "low",
      soil: "damp",
    };

    expect(getYieldForPlant(corn, environmentFactors)).toBe(67.5);
  });
});

describe("getYieldForCrop v2", () => {
  test("Get yield for crop, single crop, 1 environmental factor", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };

    const environmentFactors = {
      sun: "high",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(45);
  });

  test("Get yield for crop, single crop, multiple environmental factor", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };

    const environmentFactors = {
      sun: "low",
      wind: "high",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(11.25);
  });

  test("Get yield for crop, single crop, multiple environmental factor", () => {
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -40,
          medium: 25,
          high: 0,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };

    const input = {
      crop: pumpkin,
      numCrops: 10,
    };

    const environmentFactors = {
      sun: "low",
      wind: "high",
      soil: "damp",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(22.5);
  });

  test("Get yield for plant with 3 environmental factors, but 1 has no effect", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };

    const environmentFactors = {
      sun: "low",
      wind: "low",
      soil: "damp",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(22.5);
  });
});

describe("getTotalYield v2", () => {
  test("Calculate total yield with multiple crops, 1 environmental factor", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -40,
          medium: 25,
          high: 0,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "high",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(30.5);
  });

  test("Calculate total yield with multiple crops, multiple environmental factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -50,
          medium: 25,
          high: 0,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
      wind: "high",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(8.625);
  });

  test("Calculate total yield with multiple crops, multiple environmental factors, but 1 factor has no effect on 1 crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -40,
          medium: 25,
          high: 0,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 10 },
      { crop: pumpkin, numCrops: 10 },
    ];
    const environmentFactors = {
      sun: "high",
      wind: "high",
      soil: "damp",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(71.25);
  });
});

describe("getRevenueForCrop v2", () => {
  test("Get revenue for a crop, 1 enviromental factor, single crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };

    const crops = [{ crop: corn, numCrops: 2, salePrice: 4 }];
    const environmentFactors = { sun: "high" };
    expect(getRevenueForCrop({ crops }, environmentFactors)).toBe(36);
  });

  test("Get revenue for a crop, multiple enviromental factors, single crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };

    const crops = [{ crop: corn, numCrops: 2, salePrice: 4 }];
    const environmentFactors = {
      sun: "high",
      wind: "high",
      soil: "damp",
    };
    expect(getRevenueForCrop({ crops }, environmentFactors)).toBe(27);
  });

  test("Get revenue for a crop, 1 enviromental factors, multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -40,
          medium: 25,
          high: 0,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 1, salePrice: 4 },
      { crop: pumpkin, numCrops: 2, salePrice: 2 },
    ];
    const environmentFactors = { wind: "high" };
    expect(getRevenueForCrop({ crops }, environmentFactors)).toBe(21);
  });

  test("Get revenue for a crop, multiple enviromental factors, multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -40,
          medium: 25,
          high: 0,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 2, salePrice: 4 },
      { crop: pumpkin, numCrops: 2, salePrice: 2 },
    ];
    const environmentFactors = {
      sun: "high",
      wind: "high",
      soil: "damp",
    };
    expect(getRevenueForCrop({ crops }, environmentFactors)).toBe(42);
  });
});

describe("getProfitForCrop v2", () => {
  test("Get profits for a crop, 1 enviromental factor, single crop", () => {
    const corn = {
      name: "corn",
      cost: 3,
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };
    const cropSingle = { crop: corn, numCrops: 1, salePrice: 4 };
    const environmentFactors = { sun: "low" };
    expect(getProfitForCrop(cropSingle, environmentFactors)).toBe(3);
  });

  test("Get profits for a crop, mulitple enviromental factors, single crop", () => {
    const pumpkin = {
      name: "pumpkin",
      cost: 2,
      yield: 4,
      factor: {
        sun: {
          low: -40,
          medium: 25,
          high: 0,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };
    const cropSingle = { crop: pumpkin, numCrops: 2, salePrice: 2 };
    const environmentFactors = {
      sun: "medium",
      wind: "high",
      soil: "dry",
    };
    expect(getProfitForCrop(cropSingle, environmentFactors)).toBe(3.5);
  });
});

describe("getTotalProfit v2", () => {
  test("Get profits for a crop, 1 environmental factor, 2 crops", () => {
    const corn = {
      name: "corn",
      cost: 3,
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      cost: 2,
      yield: 4,
      factor: {
        sun: {
          low: -40,
          medium: 25,
          high: 0,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 2, salePrice: 4 },
      { crop: pumpkin, numCrops: 2, salePrice: 2 },
    ];
    const environmentFactors = { sun: "medium" };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(34);
  });

  test("Get profits for a crop, 1 environmental factor, multiple crops", () => {
    const corn = {
      name: "corn",
      cost: 3,
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      cost: 2,
      yield: 4,
      factor: {
        sun: {
          low: -40,
          medium: 25,
          high: 0,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };

    const tomato = {
      name: "tomato",
      cost: 0.5,
      yield: 1.5,
      factor: {
        sun: {
          low: -50,
          medium: 25,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 3, salePrice: 4 },
      { crop: pumpkin, numCrops: 1, salePrice: 2 },
      { crop: tomato, numCrops: 5, salePrice: 1 },
    ];
    const environmentFactors = { wind: "high" };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(25.125);
  });

  test("Get profits for a crop, multiple environmental factors, multiple crops", () => {
    const corn = {
      name: "corn",
      cost: 3,
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      cost: 2,
      yield: 4,
      factor: {
        sun: {
          low: -40,
          medium: 25,
          high: 0,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };

    const tomato = {
      name: "tomato",
      cost: 0.5,
      yield: 1.5,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 50,
          medium: 0,
          high: -25,
        },
        soil: {
          dry: -50,
          regular: 0,
          damp: 25,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 3, salePrice: 4 },
      { crop: pumpkin, numCrops: 2, salePrice: 2 },
      { crop: tomato, numCrops: 5, salePrice: 1 },
    ];
    const environmentFactors = {
      sun: "medium",
      wind: "high",
      soil: "regular",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(32.125);
  });
});

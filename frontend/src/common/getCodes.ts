export const getCodeFromPrice = (inputPrice: number, prices: any) => {
  const cleanedPrice =
    Number(inputPrice.toString().replace(/\D/g, "")) / Math.pow(10, 6);

  for (const range of prices) {
    const [minStr, maxStr] = range.value.match(/\d+/g) || [];
    let min = minStr ? parseInt(minStr) : 0;
    let max = maxStr ? parseInt(maxStr) : 100;

    if (range.value.includes("Dưới")) {
      min = 0;
      max = 1;
    }
    if (range.value.includes("Trên")) {
      min = 15;
      max = 100;
    }

    if (cleanedPrice < min && max === undefined) {
      return range.code;
    }

    if (cleanedPrice > max && min === undefined) {
      return range.code;
    }

    if (cleanedPrice >= min && cleanedPrice <= max) {
      return range.code;
    }
  }
};

export const getCodeFromArea = (inputPrice: number, acreages: any) => {
  const cleanedArea = Number(inputPrice.toString().replace(/\D/g, ""));

  for (const area of acreages) {
    const [minStr, maxStr] = area.value.match(/\d+/g) || [];
    let min = minStr ? parseInt(minStr) : 0;
    let max = maxStr ? parseInt(maxStr) : 100;

    if (area.value.includes("Dưới")) {
      min = 0;
      max = 20;
    }
    if (area.value.includes("Trên")) {
      min = 90;
      max = 1000;
    }

    if (cleanedArea < min && max === undefined) {
      return area.code;
    }

    if (cleanedArea > max && min === undefined) {
      return area.code;
    }

    if (cleanedArea >= min && cleanedArea <= max) {
      return area.code;
    }
  }
};

import { useGetAllProductsQuery } from "@/redux/features/admin/productsManagementApi";

export const OptionMaker = () => {
  // Brand Options
  const { data: carsData } = useGetAllProductsQuery([
    {
      name: "fields",
      value: "brand",
    },
  ]);
  const carBrands = [...new Set(carsData?.data.map((car) => car.brand))];

  const carBrandOptions = carBrands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  // Model Options
  const { data: modelData } = useGetAllProductsQuery([
    {
      name: "fields",
      value: "model",
    },
  ]);
  const carModels = [...new Set(modelData?.data.map((car) => car.model))];

  const carModelOptions = carModels.map((model) => ({
    value: model,
    label: model,
  }));

  // Category Options
  const { data: categoryData } = useGetAllProductsQuery([
    {
      name: "fields",
      value: "category",
    },
  ]);
  const carCategories = [
    ...new Set(categoryData?.data.map((car) => car.category)),
  ];

  const carCategoryOptions = carCategories.map((category) => ({
    value: category,
    label: category,
  }));

  return {
    carBrandOptions,
    carModelOptions,
    carCategoryOptions,
  };
};

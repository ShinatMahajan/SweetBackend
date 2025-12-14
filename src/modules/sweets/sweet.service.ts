import { Sweet } from "./sweet.model";

// CREATE sweet
export const createSweetService = async (data: any) => {
  return await Sweet.create(data);
};

// GET all sweets
export const getAllSweets = async () => {
  return await Sweet.find();
};

// SEARCH sweets
export const searchSweets = async (query: any) => {
  const filter: any = {};

  if (query.name) {
    filter.name = { $regex: query.name, $options: "i" };
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  return await Sweet.find(filter);
};

// UPDATE sweet
export const updateSweet = async (id: string, data: any) => {
  return await Sweet.findByIdAndUpdate(id, data, { new: true });
};

// DELETE sweet
export const deleteSweet = async (id: string) => {
  return await Sweet.findByIdAndDelete(id);
};

// PURCHASE sweet (quantity decrease)
export const purchaseSweet = async (id: string, qty: number) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");
  if (sweet.quantity < qty) throw new Error("Insufficient stock");
  sweet.quantity = sweet.quantity - qty;
  await sweet.save();
  return sweet;
};

// RESTOCK sweet (quantity increase)
export const restockSweet = async (id: string, qty: number) => {
  return await Sweet.findByIdAndUpdate(
    id,
    { $inc: { quantity: qty } },
    { new: true }
  );
};

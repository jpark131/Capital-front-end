import http from "./httpService";
import config from "../config.json";

const endpoint = config.url + "/users";

export function register(user) {
  return http.post(endpoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}

export async function getUserObject() {
  try {
    const { data: user } = await http.get(config.url + "/users/me");
    return user;
  } catch (ex) {}
}

export async function getCategories() {
  let categories = [];
  const user = await getUserObject();
  let index;
  for (let t of user.transactions) {
    if (!categories.some((c) => c.name === t.category)) {
      categories.push({ name: t.category, amount: t.amount });
    } else {
      index = categories.findIndex((c) => c.name === t.category);
      categories[index].amount += t.amount;
    }
  }
  return categories;
}

export default {
  register,
  getUserObject,
  getCategories,
};

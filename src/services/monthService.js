import http from "./httpService";
import config from "../config.json";

const endpoint = config.url + "/users";

export async function getMonths() {
  const response = await http.get(`${endpoint}/me`);
  const months = formatMonths(response.data.months);
  return months;
}

function formatMonths(months) {
  return months.map((month) => {
    return {
      name: `${month.month} - ${month.year}`,
      expected: month.budget,
      actual: month.actual,
    };
  });
}

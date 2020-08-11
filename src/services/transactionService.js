import http from "./httpService";
import config from "../config.json";

const url = `${config.url}/transactions`;

export async function saveTransaction(transaction) {
  transaction.date = new Date(transaction.date);
  if (transaction._id) {
    //update db
  }
  const { data } = await http.post(url, transaction);
  return data;
}

export async function getTransaction(transactionId) {
  const { data: transaction } = await http.get(`${url}/${transactionId}`);
  return transaction;
}

import { request } from "@/apis/request";

const getKeyword = async (keyword) => {
  console.log("KEYWORD", keyword);
  const KEYWORD_ROUTE = process.env.KEYWORD_ROUTE;
  return await request(`${KEYWORD_ROUTE}${keyword}`);
};

export default getKeyword;

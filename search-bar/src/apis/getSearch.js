import { request } from "@/apis/request";

const getSearch = async (searchKeyword) => {
  const SEARCH_ROUTE = process.env.SEARCH_ROUTE;
  return await request(`${SEARCH_ROUTE}${searchKeyword}`);
};

export default getSearch;

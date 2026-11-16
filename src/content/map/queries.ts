import { queryOptions } from "@tanstack/react-query";

import { getMapData } from "./repository";

export const mapDataQuery = () =>
  queryOptions({
    queryKey: ["map-data"],
    queryFn: getMapData,
  });

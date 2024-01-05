import { useLoaderData } from "react-router-dom";
import BoomItem from "./BoomItem";
import { useQuery } from "@tanstack/react-query";
import { getFullView } from "../../services/apiMenu";

function Boom() {
  const initialData = useLoaderData();
  const { data: menu} = useQuery({
    queryKey: ["fullmenu"],
    queryFn: async () => getFullView(),
    initialData,
  });

  return (
    <div className="min-h-screen m-3 bg-base-200 rounded-xl">
      <h1 className="text-3xl font-bold text-left m-3 py-6 text-primary">Menu</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2">
        {menu.map((el) => (
          <BoomItem category={el} />
        ))}
      </div>
    </div>
  );
}
export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData({
    queryKey: ["fullmenu"],
    queryFn: async () => getFullView(),
  });
  return data;
};
export default Boom;

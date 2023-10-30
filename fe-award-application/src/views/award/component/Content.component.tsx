import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { ContentCardComponent } from "./ContentCard.component";

export interface ResponseData {
  slug: string;
  award_type: string;
  point_exchanges: number;
  award_name: string;
  award_image: string;
}

export interface ContentParams {
  min_point?: number;
  max_point?: number;
  type?: string;
}

export interface Props {
  params: ContentParams
}

export const ContentComponent :FunctionComponent<Props> = ({ params }) => {
  const [data, setData] = useState<ResponseData[]>([]);

  const fetchData = async (p: ContentParams) => {
    const resp = await axios({
      method: "get",
      url: "/api/v1/award",
      params: p,
    });

    setData(resp.data.data);
  };

  useEffect(() => {
    fetchData(params);
  }, [params]);

  return (
    <div className="px-8 flex flex-col gap-2 h-full overflow-auto">
      {
        data.map((d) => (
          <ContentCardComponent key={d.slug} content={d} />
        ))
      }
    </div>
  );
};

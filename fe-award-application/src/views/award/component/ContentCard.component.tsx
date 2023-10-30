import { FunctionComponent } from "react";

export interface ContentCardType {
  slug: string;
  award_type: string;
  point_exchanges: number;
  award_name: string;
  award_image: string;
}

interface Props {
  content: ContentCardType
}

export const ContentCardComponent : FunctionComponent<Props> = ({ content }) => (
  <div>
    <div className="bg-gray-50 w-full h-48 rounded-md relative overflow-hidden">
      <span className="absolute top-3 right-3 bg-blue-300 py px-5 rounded-md text-basic-white"> { content.award_type } </span>
      <img src={content.award_image} alt="banner" loading="lazy" />
      <span className="absolute bottom-3 left-3">{content.point_exchanges} Point</span>
    </div>
    <h3 className="font-extrabold text-lg"> {content.award_name} </h3>
  </div>
);

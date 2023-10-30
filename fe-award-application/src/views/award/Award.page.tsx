import {
  FunctionComponent, useContext, useEffect, useState,
} from "react";
import { SessionContext } from "@shared/context/Session.context";
import { useNavigate } from "react-router-dom";
import { HeaderComponent } from "./component/Header.component";
import { ContentComponent, ContentParams } from "./component/Content.component";
import { SidebarComponent } from "./component/Sidebar.component";
import { FilterComponent, FilterFormType } from "./component/Filter.component";

export const AwardPage : FunctionComponent = () => {
  const navigate = useNavigate();

  const [{ login }] = useContext(SessionContext);

  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, [login]);

  const [sidebar, setSidebar] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);

  const [params, setParams] = useState<ContentParams>({});

  const handleSidebarToogle = () => {
    setSidebar((prev) => !prev);
  };

  const handleFilterToogle = () => {
    setFilter((prev) => !prev);
  };

  const handleFilterSubmit = ({ maximum, minimum, type }: FilterFormType) => {
    handleFilterToogle();

    const typeParams = [];

    const p: ContentParams = {};

    if (minimum) p.min_point = minimum;
    if (maximum) p.max_point = maximum;

    if (type && !type.includes("ALL")) {
      if (type.includes("OTHERS")) {
        typeParams.push("GIFTCARD");
      }

      if (type.includes("VOUCHER")) {
        typeParams.push("VOUCHER");
      }

      if (type.includes("PRODUCT")) {
        typeParams.push("PRODUCT");
      }

      p.type = typeParams.join(",");
    }

    setParams(p);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center overflow-hidden">
      <div className="w-1/3 bg-basic-white flex flex-col gap-5 relative">
        <HeaderComponent
          onSidebarToggle={handleSidebarToogle}
          onFilterToggle={handleFilterToogle}
        />
        <ContentComponent params={params} />
        {sidebar && (<SidebarComponent onToggle={handleSidebarToogle} />)}
        {filter && (
          <FilterComponent
            onToggle={handleFilterToogle}
            onSubmitFilter={handleFilterSubmit}
          />
        )}
      </div>
    </div>
  );
};

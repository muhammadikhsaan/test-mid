import { FunctionComponent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";

export interface FilterFormType {
  minimum: number;
  maximum: number;
  type: string[];
}

interface Props {
  onToggle: () => void
  onSubmitFilter: (_value: FilterFormType) => void
}

export const FilterComponent : FunctionComponent<Props> = ({ onToggle, onSubmitFilter }) => {
  const { register, handleSubmit } = useForm<FilterFormType>();

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-basic-white p-8">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold text-primary mb-4 flex-grow">Filter</h1>
        <button onClick={onToggle}> <CloseIcon /> </button>
      </div>
      <form onSubmit={handleSubmit(onSubmitFilter)}>
        <label className="flex flex-wrap gap-1">
          <span className="w-full">Poin Needed</span>
          <input className="p-2 border border-solid border-gray-2 rounded-md" {...register("minimum")} type="number" placeholder="Minimum" />
          <input className="p-2 border border-solid border-gray-2 rounded-md" {...register("maximum")} type="number" placeholder="Maximum" />
        </label>

        <label className="flex flex-col">
          <span> Award Type </span>
          <div>
            <input type="checkbox" value="ALL" {...register("type")} /> All
          </div>
          <div>
            <input type="checkbox" value="VOUCHER" {...register("type")} /> Vouchers
          </div>
          <div>
            <input type="checkbox" value="PRODUCT" {...register("type")} /> Products
          </div>
          <div>
            <input type="checkbox" value="OTHERS" {...register("type")} /> Others
          </div>
        </label>

        <input className="bg-blue-400 text-basic-white w-full py-2 mt-2" type="submit" value="Filter" />
      </form>
    </div>
  );
};

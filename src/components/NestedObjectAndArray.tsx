import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValue = {
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNo: string[];
};
export const NestedObjectAndArray = () => {
  const { register, control, formState, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      social: {
        facebook: "",
        twitter: "",
      },
      phoneNo: ["", ""],
    },
  });
  const { errors } = formState;
  renderCount++;
  const onSubmit = (data: FormValue) => {
    console.log("form value", data);
  };
  return (
    <div className="flex w-2/5   flex-col">
      <h1 className="text-center text-xl mb-10 font-semibold text-white">
        Neste Object and Array Form{renderCount / 2}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-2 py-4 bg-black/30  rounded-xl"
      >
        <div className="flex flex-col gap-y-2 relative">
          <label
            htmlFor="facebook"
            className=" text-base font-medium text-gray-200"
          >
            Twitter
          </label>
          <input
            {...register("social.facebook")}
            id="facebook"
            placeholder="facebook"
            className="standard-inputbox"
          />

          <p className="text-red-500 text-sm">
            {errors.social?.facebook?.message}
          </p>
        </div>
        <div className="flex flex-col gap-y-2 relative">
          <label
            htmlFor="twitter"
            className=" text-base font-medium text-gray-200"
          >
            Facebook
          </label>
          <input
            {...register("social.twitter")}
            id="twitter"
            placeholder="facebook"
            className="standard-inputbox"
          />

          <p className="text-red-500 text-sm">
            {errors.social?.twitter?.message}
          </p>
        </div>
        <div className="flex flex-col gap-y-2 relative">
          <label
            htmlFor="primary-phone"
            className=" text-base font-medium text-gray-200"
          >
            Primary Phone number
          </label>
          <input
            {...register("phoneNo.0")}
            id="primary-phone"
            placeholder="primary phone"
            className="standard-inputbox"
          />
        </div>
        <div className="flex flex-col gap-y-2 relative">
          <label
            htmlFor="secondary-phone"
            className=" text-base font-medium text-gray-200"
          >
            secondary Phone number
          </label>
          <input
            {...register("phoneNo.1")}
            id="secondary-phone"
            placeholder="secondary phone"
            className="standard-inputbox"
          />
        </div>
        <button
          type="submit"
          className=" px-6 py-2 w-40 mx-auto rounded-xl bg-white text-blue-500 mt-5 font-medium text-base"
        >
          Submit
        </button>
        <DevTool control={control} />
      </form>
    </div>
  );
};

import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValue = {
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNo: string[];
  phoneNumbers: {
    number: string;
  }[];
};
export const DynamicField = () => {
  const { register, control, formState, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      social: {
        facebook: "",
        twitter: "",
      },
      phoneNo: ["", ""],
      phoneNumbers: [{ number: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "phoneNumbers",
    control,
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
        <div className="flex flex-col gap-y-2 relative">
          <label
            htmlFor="secondary-phone"
            className=" text-base font-medium text-gray-200"
          >
            Lists Phone number
          </label>
          <div className="">
            {fields.map((field, index) => {
              return (
                <div className="" key={field.id}>
                  <input
                    type="text"
                    {...register(`phoneNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="py-1 px-3 text-white bg-red-300 text-sm"
                    >
                      remove
                    </button>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => append({ number: "" })}
              className="py-1 px-3 text-wihte bg-red-300 text-sm"
            >
              Add phone no
            </button>
          </div>
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

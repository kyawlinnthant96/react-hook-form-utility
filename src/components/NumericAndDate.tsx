import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValue = {
  age: number;
  date: Date;
};
export const NumericAndDate = () => {
  const { register, control, formState, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      age: 0,
      date: new Date(),
    },
  });
  const { errors } = formState;
  renderCount++;
  const onSubmit = (data: FormValue) => {
    console.log("form value", data);
  };
  return (
    <div className="flex w-2/5 relative  flex-col">
      <h1 className="text-center text-xl mb-10 font-semibold text-white">
        Simple Validation Form{renderCount / 2}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-2 py-4 bg-black/30  rounded-xl"
      >
        <div className="relative flex gap-y-2 flex-col">
          <label htmlFor="age" className=" text-base font-medium text-gray-200">
            Age
          </label>
          <input
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
            id="age"
            placeholder="user age"
            className="standard-inputbox"
          />

          <p className="text-red-500 text-base">{errors.age?.message}</p>
        </div>
        <div className="flex flex-col gap-y-2 relative">
          <label htmlFor="date" className=" text-sm font-medium text-gray-200">
            Dob
          </label>
          <input
            type="date"
            {...register("date", {
              valueAsDate: true,
            })}
            id="date"
            placeholder="user date"
            className="standard-inputbox"
          />

          <p className="text-red-500 text-sm">{errors.date?.message}</p>
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

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValue = {
  name: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
};
export const YoutubeForm = () => {
  /* const { register, control, formState, handleSubmit } = useForm<FormValue>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        name: data.name,
        email: data.email,
        channel: "No channel",
      };
    },
  });*/
  const { register, control, formState, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      name: "batman",
      email: "",
      channel: "",
      social: {
        facebook: "",
        twitter: "",
      },
    },
  });
  const { errors } = formState;
  renderCount++;
  const onSubmit = (data: FormValue) => {
    console.log("form value", data);
  };
  return (
    <div className="flex w-2/5   flex-col">
      <h1 className="text-center text-xl mb-10 font-semibold text-blue-500">
        Youtube Form{renderCount / 2}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-2 py-4 bg-black/30 backdrop-blur rounded-xl"
      >
        <div className="relative flex gap-y-2 flex-col">
          <label
            htmlFor="userName"
            className=" text-base font-medium text-gray-200"
          >
            Name
          </label>
          <input
            {...register("name", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
            id="userName"
            placeholder="user name"
            className="standard-inputbox"
          />

          <p className="text-red-500 text-base">{errors.name?.message}</p>
        </div>
        <div className="flex flex-col gap-y-2 relative">
          <label
            htmlFor="userEmail"
            className=" text-sm font-medium text-gray-200"
          >
            Email
          </label>
          <input
            {...register("email", {
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: "Invalid Email",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@gmail.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackList: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
            id="userEmail"
            placeholder="user email"
            className="standard-inputbox"
          />

          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div className="flex flex-col gap-y-2 relative">
          <label
            htmlFor="userChannal"
            className=" text-base font-medium text-gray-200"
          >
            Channal
          </label>
          <input
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
            id="userChannal"
            placeholder="user channal"
            className="standard-inputbox"
          />

          <p className="text-red-500 text-sm">{errors.channel?.message}</p>
        </div>
        <div className="flex flex-col gap-y-2 relative">
          <label
            htmlFor="facebook"
            className=" text-base font-medium text-gray-200"
          >
            Twitter
          </label>
          <input
            {...register("social.facebook", {
              required: {
                value: true,
                message: "Facebook is required",
              },
            })}
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
            {...register("social.twitter", {
              required: {
                value: true,
                message: "twitter is required",
              },
            })}
            id="twitter"
            placeholder="facebook"
            className="standard-inputbox"
          />

          <p className="text-red-500 text-sm">
            {errors.social?.twitter?.message}
          </p>
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

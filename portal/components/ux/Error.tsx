import { IconX, IconReload } from "@tabler/icons-react";
function Error() {
  return (
    <div className="error relative items-center justify-center w-fit flex gap-2 p-2">
      <span className="x">
        <span>
          {" "}
          <IconX />
        </span>
      </span>

      <div className="text flex flex-col pt-4 gap-3 items-center">
        <span className="font-semibold flex flex-col">
          Something went wrong
        </span>
        <span className="cta-2">
          <IconReload />
          Try again
        </span>
      </div>
    </div>
  );
}

export default Error;

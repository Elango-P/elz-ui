import { InputComponent } from "./Input";
import { InputLabel } from "./InputLabel";
import { InputHelper } from "./InputHelper";
import { InputError } from "./InputError";
import { InputPrefix } from "./InputPrefix";
import { InputSuffix } from "./InputSuffix";

export type { InputProps } from "./types";
export type { InputHandle } from "./Input";

// Attach compound components
export const Input = Object.assign(InputComponent, {
  Label: InputLabel,
  Helper: InputHelper,
  Error: InputError,
  Prefix: InputPrefix,
  Suffix: InputSuffix,
});

export default Input;

import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment";

export default function ControlledComponent() {
  const [value, setValue] = React.useState(moment.unix('1039392000').utc());

  React.useEffect(() => {
    const utcDate = moment.utc(value).unix();
    console.log(utcDate);

    const utcDat = moment.utc("2003-12-03").unix().toString(); //1070409600
    // const utcDat = moment.utc("2003-12-04").unix().toString(); //1070496000
    console.log(utcDat);
    console.log(Date.now())

    console.log(moment.unix(1039392000).utc());
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      {/* <DemoContainer components={['DatePicker']}> */}
      <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
}

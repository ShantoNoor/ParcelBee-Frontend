import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";
import { Stack } from "@mui/material";

export default function ReviewCard({ data }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            alt={data.user.name}
            src={data.user.photo || data.user.name}
          />
        }
        action={
          <Stack
            direction={"row"}
            spacing={0.5}
            justifyContent="center"
            alignContent="center"
          >
            <StarIcon color="warning" />
            <Typography component="span" variant="body1" fontSize={"18px"}>
              {data.rating}
            </Typography>
          </Stack>
        }
        title={data.user.name}
        subheader={moment(data.review_giving_date).format("MMMM DD, YYYY")}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.review}
        </Typography>
      </CardContent>
    </Card>
  );
}

import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { FlexBetween, UserImage, WidgetWrapper } from "components";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { createPost } from "helper/api";
import { useSnackbar } from "notistack";

const UploadPhoto = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [backDrop, setBackDrop] = useState(false);
  const { palette } = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper width={isNonMobileScreens ? 500 : 370}>
      {image && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={URL.createObjectURL(image)}
        />
      )}
      <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <FlexBetween>
              <Box
                {...getRootProps()}
                border={`2px dashed ${palette.primary.main}`}
                p="1rem"
                width="100%"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input {...getInputProps()} />
                {!image ? (
                  <p>Add Image Here</p>
                ) : (
                  <FlexBetween>
                    <Typography>{image.name}</Typography>
                    <EditOutlined />
                  </FlexBetween>
                )}
              </Box>
              {image && (
                <IconButton
                  onClick={() => setImage(null)}
                  sx={{ width: "15%" }}
                >
                  <DeleteOutlined />
                </IconButton>
              )}
            </FlexBetween>
          )}
        </Dropzone>
      </Box>

      <Box display={"flex"} justifyContent={"flex-end"} mt={"1.5rem"}>
        <Button
          disabled={!post}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </Box>
    </WidgetWrapper>
  );
};

export default UploadPhoto;

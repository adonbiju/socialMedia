import {
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { FlexBetween, WidgetWrapper } from "components";
import Dropzone from "react-dropzone";
import { useState } from "react";
import {useSnackbar} from "notistack"
import { UploadCoverPhoto } from "helper/api";
import { useSelector,useDispatch } from "react-redux";
import { setUserCoverPicture } from "state";

const UploadPhoto = () => {
  const token = useSelector((state) => state.token);
  const {_id} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const medium = palette.neutral.medium;
  const {enqueueSnackbar} = useSnackbar();
  
  const handleUploadCoverPhoto = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("picture", image);
      formData.append("coverPhotoPath", image.name);
    }
     const updatedUser = await  UploadCoverPhoto(_id,token,formData)
     dispatch(
        setUserCoverPicture({
            coverPhotoPath: updatedUser.coverPhotoPath,
        })
      )
    setImage(null);
    enqueueSnackbar('Cover Photo Uploaded Successfully!!', { variant: 'success',anchorOrigin:{ vertical: "top", horizontal: "right" } })
  };
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
          disabled={!image}
          onClick={handleUploadCoverPhoto}
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

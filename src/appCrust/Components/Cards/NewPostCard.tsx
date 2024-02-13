import React, { useEffect, useState } from "react";
// @ts-ignore
import BsImage from "@meronex/icons/bs/BsImage";
// @ts-ignore
import EnEmojiHappy from "@meronex/icons/en/EnEmojiHappy";
// @ts-ignore
import MdAccessTime from "@meronex/icons/md/MdAccessTime";
import TextArea from "antd/es/input/TextArea";
import {
  Button,
  // DatePicker,
  DatePickerProps,
  Divider,
  Popover,
  message,
} from "antd";
// import CustomUploadBtn from "../Items/CustomUploadBtn";
import EmojiPicker from "emoji-picker-react";
// import data from "@emoji-mart/data";
import { apiNewPost } from "src/services/BEApis/PostsAPIs/PostsApi";
import UtilUploadtoIK from "../Utils/functions/utilUploadtoIK";
// import useCustomImageKit from "src/hooks/imagekitHooks/useCustomImageKit";
import useUserPosts from "src/hooks/apisHooks/userPosts/useUserPosts";
// import UtilUploadtoIKJS from "../Utils/functions/utilUploadtoIKJS";

const NewPostCard = ({ isInFeed }: { isInFeed: boolean }) => {
  const [inputValue, setInputValue] = useState("");
  const [scheduleUtcDate, setScheduleUtcDate] = useState(new Date());
  const { newPostDetails, setNewPostDetails, setIsLoading, setError } =
    useUserPosts();

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setScheduleUtcDate(new Date(dateString));

    console.log(scheduleUtcDate);
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setNewPostDetails(
      (
        prevDetails = {
          postTextData: "",
          postImageData: [],
        }
      ) => ({
        ...prevDetails,
        postTextData: e.target.value,
      })
    );
  };

  const fnPostNewPost = async () => {
    setIsLoading(true);
    setError(null);

    console.log("newPostDetails in fnNewPost", newPostDetails);
    message.loading("Creating a cast");
    try {
      // console.log(inputValue);
      // console.log(scheduleUtcDate);
      const res = await apiNewPost({
        postTextData: newPostDetails.postTextData,
        // postImageData: newPostDetails.postImageData, // Fix: Allow array of any length

        // Getting Null here
        // https://ik.imagekit.io/quackmagic/posts/1707812654872_-YWZrghgU
        postImageData: [newPostDetails.postImageData.toString()], // Fix: Allow array of any length
      });

      console.log(res);
      message.destroy();
      message.success("Cast created successfully");
    } catch (err) {
      console.log(err);
      message.error(`${err}`);
    }
  };

  useEffect(() => {
    handleInput;
  }, [inputValue]);

  return (
    <>
      <div className="relative bg-white p-2 flex flex-col items-left justify-center">
        <TextArea
          color="yellow"
          placeholder="What's on your mind today?"
          rows={4}
          className={"m-1"}
          value={inputValue}
          onChange={handleInput}
        />

        <div className="flex justify-between align-middle m-1 ">
          <div className="flex ">
            {/* <BsImage size={20} className="m-2 text-slate-700 cursor-pointer" /> */}{" "}
            {/* <CustomUploadBtn2 /> */}
            <UtilUploadtoIK />
            {/* <UtilUploadtoIKJS /> */}
            <Popover
              placement="bottom"
              content={
                <EmojiPicker
                  style={{ width: "100%" }}
                  onEmojiClick={(e) => {
                    console.log(e);
                    setInputValue(inputValue + e.emoji);
                  }}
                />
              }
            >
              <EnEmojiHappy
                size={20}
                className=" m-2 text-slate-500 cursor-pointer"
              />
            </Popover>
          </div>

          {/* <div className="flex">
            <div className="m-1.5">
              <DatePicker
                size="small"
                placeholder="Schedule"
                renderExtraFooter={() => ""}
                onChange={onDateChange}
                showTime
              />
            </div>
          </div> */}
          {/* {isInFeed && <Button className="m-1" type="primary">Post</Button>} */}
        </div>
        <div className="flex gap-2 align-middle items-center justify-end">
          {/* {scheduleUtcDate.toDateString() !== "Invalid Date" && (
            <div className="text-xs text-slate-500">
              {scheduleUtcDate.toLocaleString()}
            </div>
          )} */}
          <Button onClick={fnPostNewPost} className="m-1" type="primary">
            Post
          </Button>
        </div>
      </div>
      {isInFeed && <Divider />}
    </>
  );
};

export default NewPostCard;

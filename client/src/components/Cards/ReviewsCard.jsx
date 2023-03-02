import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ReviewsContext from "../../contexts/ReviewsContext";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import Button from "../Form/Button";
import Input from "../Form/Input";
import TextArea from "../Form/TextArea";

export default function ReviewsCard({ user, review: movieReview }) {
  const [review, setReview] = useState(movieReview);

  const simpleDate = new Date(review.createdAt).toISOString().slice(0, 10);

  const [editMode, setEditMode] = useState(false);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const { user: loggedInUser } = useAuth();

  const { updateReview, deleteReview, isError, error, isLoading } = useApi();

  const { refetch, setRefetch, removeReviewFromState } =
    useContext(ReviewsContext);

  const {
    register,
    handleSubmit,
    watch,

    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (inputs) => {
    const updateReviewData = {
      title: inputs.title,
      review: inputs.review,
      reviewId: review._id,
    };

    const updatedData = await updateReview(updateReviewData);

    console.log(updatedData);

    setReview(updatedData);
    setEditMode(false);
  };

  const onDelete = async () => {
    await deleteReview(review._id);
    // removeReviewFromState(review._id);
  };

  return (
    <div className="flex flex-col  bg-white  space-y-6   px-8 py-8 rounded-xl shadow-sm overflow-hidden">
      <div className="flex-shrink-0 flex items-center space-x-2 ">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div className="">
          <p className="text-gray-700 font-normal">
            {capitalizeFirstLetter(user.name)}
          </p>
          <p className="text-gray-600 text-sm font-light">{simpleDate}</p>
        </div>
      </div>

      {editMode ? (
        <div className="w-full  space-y-4 break-words">
          <Input
            register={register}
            config={{ required: "Title Address is required" }}
            isError={errors.title ? true : false}
            errorMessage={errors.title?.message}
            name="title"
            label="Title"
            defaultValue={review.title}
          />
          <TextArea
            register={register}
            config={{ required: "Review Address is required" }}
            isError={errors.title ? true : false}
            errorMessage={errors.title?.message}
            name="review"
            label="Review"
            defaultValue={review.review}
          />
        </div>
      ) : (
        <div className="w-full  space-y-2 break-words">
          <h3 className="text-base text-gray-800 ">{review.title}</h3>
          <p className="text-sm text-gray-600 ">{review.review}</p>
        </div>
      )}

      {loggedInUser?._id === user._id && !editMode && (
        <div className="space-x-4">
          <Button
            onClick={() => setEditMode(true)}
            intent="secondary"
            size="xs"
            isDisabled={isLoading}
          >
            Edit
          </Button>
          <Button
            isLoading={isLoading}
            onClick={onDelete}
            intent="secondary"
            size="xs"
          >
            Delete
          </Button>
        </div>
      )}

      {editMode && (
        <div className="space-x-4">
          <Button
            isLoading={isLoading}
            onClick={handleSubmit(onSubmit)}
            intent="secondary"
            size="xs"
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setEditMode(false);
              reset();
            }}
            intent="secondary"
            size="xs"
            isDisabled={isLoading}
          >
            Discard
          </Button>
        </div>
      )}
    </div>
  );
}
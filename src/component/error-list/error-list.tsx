import { notification } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { clearAllError } from "../../store/slices/error";

export const ErrorList = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const queue = useAppSelector((state) => state.error.queue);

  useEffect(() => {
    if (queue.length > 0) {
      queue.forEach((elem) => {
        api.error({
          message: `${elem.text}`,
          description: <div>{elem.description}</div>,
          placement: "bottomRight",
        });
      });
      dispatch(clearAllError());
    }
  }, [queue]);

  return <>{contextHolder}</>;
};

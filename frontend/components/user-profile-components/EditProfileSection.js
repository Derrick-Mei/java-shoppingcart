import ChangeAvatarCard from "./ChangeAvatarCard";
import {useEffect, useState} from "react";
import getCustomerByUserId from "../../lib/requestsEndpoints/getCustomerByUserId";
import {notification} from "antd";
const EditProfileSection = () => {
  const [userId, setUserId] = useState();
  useEffect(() => {
    const fetchUserId = async () => {
      const userId = window.localStorage.getItem("userid");
      const customerData = await getCustomerByUserId(userId);
      console.log(customerData);
      if (customerData.status === "error") {
        notification.error({
          message: "There was an error retreiving user by userId",
        });
      }
      setUserId(userId);
    };
    fetchUserId();
  }, [userId]);
  return (
    <>
      <ChangeAvatarCard userId={userId} />
    </>
  );
};

export default EditProfileSection;

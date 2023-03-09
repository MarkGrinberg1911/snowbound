import React from "react";
import CustomizedBreadcrumbs from "../../general/CustomizedBreadcrumbs";
const ResortHeader = ({ resortData }) => {
  return (
    <section className={`flex justify-between items-center py-2  gap-4`}>
      <div className="flex flex-col max-w-[60%] gap-10 justify-between">
        <CustomizedBreadcrumbs
          continent={resortData?.continent_id}
          country={resortData?.country_id}
          resort={resortData?.name}
        />
        <header className="text-4xl font-bold py-4 ">{resortData?.name}</header>
        <p className="text-xl">{resortData?.description}</p>
      </div>

      <div className="flex flex-col items-center-center">
        <p className="text-center text-lg font-bold">Live Cam</p>
        <iframe
          width="560"
          height="315"
          src={
            resortData?.livecam + "?rel=1;autoplay=1" ||
            "//www.youtube.com/embed/EmwRY2ZVwwk?rel=0;autoplay=1"
          }
        ></iframe>
      </div>
    </section>
  );
};

export default ResortHeader;

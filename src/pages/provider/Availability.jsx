import {
  useState,
  useEffect,
} from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import AvailabilityCalendar
from "../../components/provider/AvailabilityCalendar";

import Card from
"../../components/common/Card";

import Button from
"../../components/common/Button";

import Loader from
"../../components/common/Loader";

import {

  useProviderProfile,
  useAvailability,
  useUpdateAvailability,

} from "../../hooks/useProviders";

import {

  showSuccess,
  showError,

} from "../../utils/swal";

const DAYS = [

  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",

];

export default function Availability(){

  const {

    data:profile,

    isLoading,

  } = useProviderProfile();

  const providerId =
    profile?.id;

  const {

    data:availability,

  } = useAvailability(
    providerId
  );

  const updateAvailability =
    useUpdateAvailability();

  const [schedule,
    setSchedule
  ] = useState([]);

 useEffect(() => {

  if (!Array.isArray(availability)) {
    setSchedule([]);
    return;
  }

  const formatted = availability.map(item => ({

    day:
      item.dayOfWeek.charAt(0) +
      item.dayOfWeek
        .slice(1)
        .toLowerCase(),

    startTime:
      item.startTime.substring(0, 5),

    endTime:
      item.endTime.substring(0, 5),

  }));

  setSchedule(formatted);

}, [availability]);

  const toggleDay =
    (day)=>{

    const exists =

      schedule.find(

        (item)=>

          item.day===day

      );

    if(exists){

      setSchedule(

        schedule.filter(

          (item)=>

            item.day!==day

        )

      );

      return;

    }

    setSchedule([

      ...schedule,

      {

        day,

        startTime:
          "09:00",

        endTime:
          "18:00",

      },

    ]);

  };

  const handleTimeChange =

    (

      day,

      field,

      value

    )=>{

    setSchedule(

      schedule.map(

        (item)=>

          item.day===day

          ? {

            ...item,

            [field]:
              value,

          }

          : item

      )

    );

  };

  const handleSave =
    async()=>{

    try{

      await updateAvailability
      .mutateAsync({

        id:providerId,

        schedule,

      });

      showSuccess(

        "Saved",

        "Availability updated."

      );

    }catch(error){

      showError(

        "Update Failed",

        error.message

      );

    }

  };

  if(isLoading){

    return(

      <DashboardLayout>

        <div
          className="

min-h-[70vh]

flex
items-center
justify-center

"

        >

          <Loader />

        </div>

      </DashboardLayout>

    );

  }

  return(

    <DashboardLayout>

      {/* HEADER */}

      <div className="mb-10">

        <h1
          className="

text-4xl
font-bold

"

        >

          Availability

        </h1>

        <p
          className="

mt-3
text-slate-500

"

        >

          Configure your
          working schedule.

        </p>

      </div>

      {/* CALENDAR */}

      <Card
        className="
mb-10
"
      >

        <AvailabilityCalendar

          availabilityData={
            schedule
          }

        />

      </Card>

      {/* SCHEDULE */}

      <Card>

        <h2
          className="

text-2xl
font-bold

mb-8

"

        >

          Weekly Schedule

        </h2>

        <div
          className="
space-y-6
"
        >

          {DAYS.map(

            (day)=>{

            const active =

              schedule.find(

                (item)=>

                  item.day===day

              );

            return(

              <div

                key={day}

                className="

grid
lg:grid-cols-4

gap-4

items-center

"

              >

                <label
                  className="

flex
items-center
gap-3

"

                >

                  <input

                    type="checkbox"

                    checked={
                      !!active
                    }

                    onChange={()=>

                      toggleDay(
                        day
                      )

                    }

                  />

                  {day}

                </label>

                <input

                  type="time"

                  disabled={
                    !active
                  }

                  value={

                    active
                    ?.startTime

                    ||

                    "09:00"

                  }

                  onChange={(e)=>

handleTimeChange(

day,

"startTime",

e.target.value

)

                  }

                  className="

border
border-slate-300

rounded-xl
px-4
py-3

"

                />

                <input

                  type="time"

                  disabled={
                    !active
                  }

                  value={

                    active
                    ?.endTime

                    ||

                    "18:00"

                  }

                  onChange={(e)=>

handleTimeChange(

day,

"endTime",

e.target.value

)

                  }

                  className="

border
border-slate-300

rounded-xl
px-4
py-3

"

                />

              </div>

            );

          })}

        </div>

        <div
          className="
mt-10
"
        >

          <Button

            loading={

updateAvailability
.isPending

            }

            onClick={
              handleSave
            }

          >

            Save Schedule

          </Button>

        </div>

      </Card>

    </DashboardLayout>

  );

}
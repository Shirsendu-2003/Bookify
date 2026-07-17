import { useState } from "react";
import Swal from "sweetalert2";

import Card from "../common/Card";
import Button from "../common/Button";
import Select from "../common/Select";

const DAYS = [

  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",

];

const statuses = [

  {
    label:"Available",
    value:"AVAILABLE",
  },

  {
    label:"Busy",
    value:"BUSY",
  },

  {
    label:"Offline",
    value:"OFFLINE",
  },

];

export default function AvailabilityCalendar({

  availabilityData,

  onSave,

}) {

  const [schedule,setSchedule] =
    useState(

      availabilityData ||

      DAYS.map((day)=>({

        day,

        status:"AVAILABLE",

        start:"09:00",

        end:"18:00",

      }))

    );

  const updateField=(

    index,

    field,

    value

  )=>{

    const updated =
      [...schedule];

    updated[index][field] =
      value;

    setSchedule(updated);

  };

  const handleSave=async()=>{

    try{

      await onSave?.(
        schedule
      );

      Swal.fire({

        icon:"success",

        title:
          "Availability Updated",

        text:
          "Schedule saved successfully.",

      });

    }catch{

      Swal.fire({

        icon:"error",

        title:
          "Save Failed",

        text:
          "Unable to update schedule.",

      });

    }

  };

  return (

    <Card>

      {/* HEADER */}

      <div
        className="

flex
flex-col
lg:flex-row
lg:items-center
lg:justify-between
gap-5
mb-8

"
      >

        <div>

          <h2
            className="

text-2xl
font-bold
text-slate-900

"
          >

            Availability Calendar

          </h2>

          <p
            className="

mt-2
text-slate-500

"
          >

            Manage your weekly
            availability schedule.

          </p>

        </div>

        <Button
          onClick={
            handleSave
          }
        >

          Save Schedule

        </Button>

      </div>

      {/* TABLE */}

      <div className="space-y-5">

        {schedule.map(
          (item,index)=>(

          <div
            key={item.day}
            className="

rounded-2xl
border
border-slate-200
bg-slate-50

p-6

"
          >

            <div
              className="

grid
xl:grid-cols-[180px_220px_1fr]
gap-6
items-center

"
            >

              {/* DAY */}

              <div>

                <h3
                  className="

font-bold
text-lg

"
                >

                  {item.day}

                </h3>

              </div>

              {/* STATUS */}

              <Select
                value={
                  item.status
                }
                options={
                  statuses
                }
                onChange={(e)=>

                  updateField(

                    index,

                    "status",

                    e.target.value

                  )

                }
              />

              {/* TIME */}

              <div
                className="

grid
sm:grid-cols-2
gap-5

"
              >

                <input
                  type="time"
                  value={
                    item.startTime
                  }
                  onChange={(e)=>

                    updateField(index,"startTime",value)

                  }
                  disabled={
                    item.status===
                    "OFFLINE"
                  }
                  className="

rounded-xl
border
border-slate-300
px-4
py-3
outline-none

focus:ring-2
focus:ring-blue-200

disabled:bg-slate-100

"
                />

                <input
                  type="time"
                  value={
                    item.endTime
                  }
                  onChange={(e)=>

                    updateField(index,"endTime",value)

                  }
                  disabled={
                    item.status===
                    "OFFLINE"
                  }
                  className="

rounded-xl
border
border-slate-300
px-4
py-3
outline-none

focus:ring-2
focus:ring-blue-200

disabled:bg-slate-100

"
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    </Card>

  );

}
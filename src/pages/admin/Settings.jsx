import { useEffect, useState } from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import { useTheme }
from "../../context/ThemeContext";

import dashboardService
from "../../services/dashboardService";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

export default function Settings(){

  const { theme, toggleTheme }
    = useTheme();

  const [loading,setLoading]
    = useState(true);

  const [settings,setSettings]
    = useState({

      platformName:"",

      supportEmail:"",

      notifications:true,

      maintenance:false,

      defaultTheme:theme,
    });

  useEffect(()=>{

    loadSettings();

  },[]);

  const loadSettings =
    async()=>{

    try{

      const data =

        await dashboardService
          .getSettings();

      setSettings(data);

    }catch(error){

      showError(
        "Load Failed",
        error.message
      );

    }finally{

      setLoading(false);

    }
  };

  const handleChange =
    (field,value)=>{

      setSettings(

        prev=>({

          ...prev,

          [field]:value,

        })

      );
    };

  const handleSave =
    async()=>{

    try{

      await dashboardService
        .saveSettings(settings);

      if(
        settings.defaultTheme
        !==
        theme
      ){

        toggleTheme();

      }

      showSuccess(

        "Saved",

        "Settings updated."

      );

    }catch(error){

      showError(

        "Save Failed",

        error.message

      );
    }
  };

  if(loading){

    return(

      <DashboardLayout>

        <Loader/>

      </DashboardLayout>

    );
  }

  return(

    <DashboardLayout>

      <div className="mb-10">

        <h1 className="text-4xl font-bold">

          Settings

        </h1>

      </div>

      <div className="grid xl:grid-cols-2 gap-8">

        <Card>

          <h2 className="text-2xl font-bold mb-8">

            General Settings

          </h2>

          <div className="space-y-6">

            <Input

              label="Platform Name"

              value={settings.platformName}

              onChange={(e)=>

                handleChange(

                  "platformName",

                  e.target.value

                )

              }

            />

            <Input

              label="Support Email"

              value={settings.supportEmail}

              onChange={(e)=>

                handleChange(

                  "supportEmail",

                  e.target.value

                )

              }

            />

            <Select

              label="Theme"

              value={settings.defaultTheme}

              onChange={(e)=>

                handleChange(

                  "defaultTheme",

                  e.target.value

                )

              }

              options={[

                {

                  label:"Light",

                  value:"light"

                },

                {

                  label:"Dark",

                  value:"dark"

                }

              ]}

            />

          </div>

        </Card>

        <Card>

          <h2 className="text-2xl font-bold mb-8">

            Feature Controls

          </h2>

          <div className="space-y-8">

            <label className="flex justify-between">

              <span>

                Notifications

              </span>

              <input

                type="checkbox"

                checked={
                  settings.notifications
                }

                onChange={(e)=>

                  handleChange(

                    "notifications",

                    e.target.checked

                  )

                }

              />

            </label>

            <label className="flex justify-between">

              <span>

                Maintenance Mode

              </span>

              <input

                type="checkbox"

                checked={
                  settings.maintenance
                }

                onChange={(e)=>

                  handleChange(

                    "maintenance",

                    e.target.checked

                  )

                }

              />

            </label>

          </div>

          <div className="mt-10">

            <Button
              onClick={
                handleSave
              }
            >

              Save Settings

            </Button>

          </div>

        </Card>

      </div>

    </DashboardLayout>
  );
}
import { useMemo, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import {
  useUsers,
  useToggleUserStatus,
} from "../../hooks/useDashboard";

import { formatDate } from "../../utils/formatter";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

export default function Users() {

  const [search, setSearch] =
    useState("");

  const [role, setRole] =
    useState("");

  const {
    data,
    isLoading,
    error,
  } = useUsers();

  const toggleStatus =
    useToggleUserStatus();

  const users = useMemo(() => {

    const list =
      data?.content || [];

    return list.filter((user) => {

      const matchesSearch =

        user.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesRole =

        !role ||

        user.roles?.includes(
          `ROLE_${role}`
        );

      return (

        matchesSearch &&
        matchesRole

      );

    });

  }, [

    data,
    role,
    search,

  ]);

  const handleToggle =
    async (user) => {

      try {

        await toggleStatus
          .mutateAsync({

            userId:
              user.id,

            enabled:
              user.status !==
              "ACTIVE",

          });

        showSuccess(
          "Updated",
          "User status changed."
        );

      } catch (error) {

        showError(
          "Failed",
          error.message
        );

      }

    };

  if (isLoading) {

    return (

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

  if (error) {

    return (

      <DashboardLayout>

        <EmptyState
          title="Unable To Load Users"
          description="Please refresh."
        />

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      {/* HEADER */}

      <div className="mb-10">

        <h1
          className="
text-4xl
font-bold
"
        >
          Users
        </h1>

        <p
          className="
mt-3
text-slate-500
"
        >
          Manage customers,
          Professional Services and admins.
        </p>

      </div>

      {/* FILTERS */}

      <div
        className="
grid
lg:grid-cols-2
gap-6
mb-10
"
      >

        <Input
          placeholder="Search user..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <Select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
          options={[

            {
              label:
                "All Roles",
              value: "",
            },

            {
              label:
                "CUSTOMER",
              value:
                "CUSTOMER",
            },

            {
              label:
                "PROVIDER",
              value:
                "PROVIDER",
            },

            {
              label:
                "ADMIN",
              value:
                "ADMIN",
            },

          ]}
        />

      </div>

      {/* TABLE */}

      {

        users.length === 0

          ? (

            <EmptyState
              title="No Users Found"
              description="Try different filters."
            />

          )

          : (

            <Card>

              <div
                className="
overflow-x-auto
"
              >

                <table
                  className="
w-full
"
                >

                  <thead>

                    <tr
                      className="
border-b
border-slate-200
"
                    >

                      <th
                        className="
text-left
p-4
"
                      >
                        User
                      </th>

                      <th
                        className="
text-left
p-4
"
                      >
                        Role
                      </th>

                      <th
                        className="
text-left
p-4
"
                      >
                        Joined
                      </th>

                      <th
                        className="
text-left
p-4
"
                      >
                        Status
                      </th>

                      <th
                        className="
text-right
p-4
"
                      >
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {

                      users.map(
                        (user) => (

                          <tr
                            key={
                              user.id
                            }
                            className="
border-b
border-slate-100
"
                          >

                            <td
                              className="
p-4
"
                            >

                              <h4
                                className="
font-bold
"
                              >

                                {
                                  user.name
                                }

                              </h4>

                              <p
                                className="
text-sm
text-slate-500
"
                              >

                                {
                                  user.email
                                }

                              </p>

                            </td>

                            <td
                              className="
p-4
"
                            >

                              {

                                user.roles
                                  ?.join(
                                    ", "
                                  )

                              }

                            </td>

                            <td
                              className="
p-4
"
                            >

                              {

                                formatDate(
                                  user.createdAt
                                )

                              }

                            </td>

                            <td
                              className="
p-4
"
                            >

                              <span
                                className={`

px-3
py-1
rounded-full
text-xs

${

user.status ===
"ACTIVE"

? "bg-emerald-100 text-emerald-700"

: "bg-red-100 text-red-700"

}

`}
                              >

                                {

                                  user.status ===
                                  "ACTIVE"

                                    ? "ACTIVE"

                                    : "DISABLED"

                                }

                              </span>

                            </td>

                            <td
                              className="
p-4
text-right
"
                            >

                              <Button

                                size="sm"

                                variant={

                                  user.status ===
                                  "ACTIVE"

                                    ? "danger"

                                    : "secondary"

                                }

                                onClick={() =>
                                  handleToggle(
                                    user
                                  )
                                }

                              >

                                {

                                  user.status ===
                                  "ACTIVE"

                                    ? "Disable"

                                    : "Enable"

                                }

                              </Button>

                            </td>

                          </tr>

                        )

                      )

                    }

                  </tbody>

                </table>

              </div>

            </Card>

          )

      }

    </DashboardLayout>

  );

}